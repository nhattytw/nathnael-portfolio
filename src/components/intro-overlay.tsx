"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";

/** Time the logo needs to finish drawing before the overlay fades. */
const HOLD_MS = 1700;
const FADE_MS = 500;

/**
 * Full-screen logo loader. It is server-rendered, so it covers the page from
 * the first paint on every load and reload, and it replays on every
 * client-side navigation (pathname change).
 */
export function IntroOverlay() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"show" | "leaving" | "gone">("show");
  const [run, setRun] = useState(0);
  const lastPath = useRef(pathname);

  // Replay on navigation (the initial load is handled by the first render).
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    setPhase("show");
    setRun((r) => r + 1);
  }, [pathname]);

  useEffect(() => {
    if (phase !== "show") return;
    const leave = setTimeout(() => setPhase("leaving"), HOLD_MS);
    const remove = setTimeout(() => setPhase("gone"), HOLD_MS + FADE_MS);
    return () => {
      clearTimeout(leave);
      clearTimeout(remove);
    };
  }, [phase, run]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className={`intro-overlay fixed inset-0 z-[100] flex items-center justify-center bg-background transition-[opacity,transform] duration-500 ease-out ${
        phase === "leaving" ? "pointer-events-none opacity-0 scale-105" : "opacity-100"
      }`}
    >
      {/* key restarts the draw-in animation on every run */}
      <div key={run} className="flex flex-col items-center gap-5">
        <Logo animated className="h-24 w-24 md:h-28 md:w-28" />
        <span
          className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground opacity-0"
          style={{ animation: "fade-in-up 0.6s ease-out 1s forwards" }}
        >
          Nathnael T.
        </span>
      </div>
    </div>
  );
}
