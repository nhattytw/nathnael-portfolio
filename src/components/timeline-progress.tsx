"use client";

import type React from "react";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/** Vertical timeline whose line fills as the visitor scrolls through it. */
export function TimelineProgress({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative ml-3 md:ml-6 space-y-12">
      <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-px bg-border/50" />
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-px origin-top bg-primary"
        style={{ scaleY }}
      />
      {children}
    </div>
  );
}
