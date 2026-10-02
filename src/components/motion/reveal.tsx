"use client";

import type React from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { IN_VIEW_MARGIN } from "@/components/motion/viewport";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and slides its children in every time they scroll into view.
 *
 * The outer wrapper is observed and never moves; only the inner element is
 * transformed. Observing the moving element itself made it flicker at the
 * threshold, since the slide pushed it back out of view and retriggered.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, margin: IN_VIEW_MARGIN });

  return (
    <div ref={ref} className={className?.includes("h-full") ? "h-full" : undefined}>
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={
          inView ? { duration: 0.9, delay, ease: EASE } : { duration: 0.4, ease: EASE }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
