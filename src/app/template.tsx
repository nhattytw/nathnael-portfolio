"use client";

import type React from "react";
import { useEffect } from "react";
import { motion } from "motion/react";

// The first page load renders visible straight away; only later navigations fade in.
let hasNavigated = false;

/** Fades each page in on client-side navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasNavigated;
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
