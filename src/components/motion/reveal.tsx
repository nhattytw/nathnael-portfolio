"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { inView, motion } from "motion/react";
import { IN_VIEW_MARGIN } from "@/components/motion/viewport";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and slides its children in as they scroll into view.
 *
 * Content only hides again once it drops back below the screen, so scrolling
 * up replays the reveal. Anything scrolled past, above the screen or near its
 * top edge, stays visible: hiding it left blank gaps, most visibly over the
 * contact band when a short page bottomed out against the footer.
 *
 * The outer wrapper is observed and never moves; only the inner element is
 * transformed. Observing the moving element itself made it flicker at the
 * threshold, since the slide pushed it back out of view and retriggered.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    return inView(
      ref.current,
      () => {
        setShown(true);
        // On leaving, hide only if it left through the bottom of the screen.
        return (entry) => {
          if (entry.boundingClientRect.top > window.innerHeight / 2) setShown(false);
        };
      },
      { amount: 0.15, margin: IN_VIEW_MARGIN }
    );
  }, []);

  return (
    <div ref={ref} className={className?.includes("h-full") ? "h-full" : undefined}>
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={
          shown ? { duration: 0.9, delay, ease: EASE } : { duration: 0.4, ease: EASE }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
