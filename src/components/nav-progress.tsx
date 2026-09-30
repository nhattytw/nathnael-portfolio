"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** Navigations faster than this never show the bar. */
const SHOW_AFTER_MS = 300;
/** Give up if the new page never arrives. */
const GIVE_UP_MS = 10000;
const FINISH_MS = 250;

let notifyStart: ((pathname: string) => void) | null = null;

/**
 * Starts the progress bar for a navigation to `href`. Link clicks are picked
 * up automatically; call this before a programmatic router.push().
 */
export function startNavProgress(href: string) {
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
  notifyStart?.(url.pathname);
}

/**
 * Thin bar across the top of the screen during client-side navigations. It
 * only appears when the next page takes longer than SHOW_AFTER_MS to show up.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const pending = useRef(false);
  const shown = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    notifyStart = () => {
      clearTimers();
      pending.current = true;
      timers.current.push(
        setTimeout(() => {
          if (!pending.current) return;
          shown.current = true;
          setState("loading");
        }, SHOW_AFTER_MS),
        setTimeout(() => {
          pending.current = false;
          shown.current = false;
          setState("idle");
        }, GIVE_UP_MS)
      );
    };

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link || !link.href || link.target === "_blank" || link.hasAttribute("download")) return;
      startNavProgress(link.href);
    };

    // Capture phase: Next's <Link> handles the click before it bubbles up.
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      notifyStart = null;
      clearTimers();
    };
  }, []);

  // The new page has rendered: finish the bar if it was showing.
  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    clearTimers();
    if (!shown.current) return;
    shown.current = false;
    setState("done");
    timers.current.push(setTimeout(() => setState("idle"), FINISH_MS));
  }, [pathname]);

  if (state === "idle") return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-0.5">
      <div
        className={`nav-progress h-full bg-primary shadow-[0_0_8px_var(--primary)] ${
          state === "done" ? "nav-progress-done" : ""
        }`}
      />
    </div>
  );
}
