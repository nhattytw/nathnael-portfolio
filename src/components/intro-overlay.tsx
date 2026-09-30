"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

/** Keeps a fast load from flashing the overlay on and straight off. */
const MIN_MS = 700;
/** Never hold the page behind the overlay longer than this. */
const MAX_MS = 4000;
const FADE_MS = 300;

/** Resolves once the page's resources and web fonts have loaded. */
function pageReady(): Promise<void> {
  const loaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
  return loaded.then(() => document.fonts?.ready).then(() => undefined);
}

/**
 * Full-screen logo loader. It is server-rendered, so it covers the page from
 * the first paint on every load and reload, and it leaves as soon as the page
 * is ready. Client-side navigations use NavProgress instead.
 */
export function IntroOverlay() {
  const [phase, setPhase] = useState<"show" | "leaving" | "gone">("show");

  useEffect(() => {
    let cancelled = false;
    // performance.now() counts from the start of the page load, not from hydration.
    const minWait = new Promise((r) => setTimeout(r, Math.max(0, MIN_MS - performance.now())));
    const maxWait = new Promise((r) => setTimeout(r, Math.max(0, MAX_MS - performance.now())));
    let remove: ReturnType<typeof setTimeout>;

    Promise.race([Promise.all([pageReady(), minWait]), maxWait]).then(() => {
      if (cancelled) return;
      setPhase("leaving");
      remove = setTimeout(() => setPhase("gone"), FADE_MS);
    });

    return () => {
      cancelled = true;
      clearTimeout(remove);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className={`intro-overlay fixed inset-0 z-[100] flex items-center justify-center bg-background transition-[opacity,transform] duration-300 ease-out ${
        phase === "leaving" ? "pointer-events-none opacity-0 scale-105" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <Logo animated pace={0.5} className="h-24 w-24 md:h-28 md:w-28" />
        <span
          className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground opacity-0"
          style={{ animation: "fade-in-up 0.4s ease-out 0.4s forwards" }}
        >
          Nathnael T.
        </span>
      </div>
    </div>
  );
}
