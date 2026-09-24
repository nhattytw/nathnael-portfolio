"use client";

import type React from "react";
import { MotionConfig } from "motion/react";

/** Disables transform/layout animations for visitors who prefer reduced motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
