"use client";

import type React from "react";
import { motion } from "motion/react";
import { IN_VIEW_MARGIN } from "@/components/motion/viewport";
import { cn } from "@/lib/utils";

export type IconLoop = "spin" | "bob" | "pulse" | "wiggle" | "none";

interface AnimatedIconProps {
  /** The icon element, e.g. <Server className="h-6 w-6" />. */
  children: React.ReactNode;
  /** Idle loop once it has popped in. */
  loop?: IconLoop;
  className?: string;
}

/**
 * A living icon: pops in when it scrolls into view, springs when its nearest
 * `.group` ancestor is hovered, and idles on a slow loop.
 */
export function AnimatedIcon({ children, loop = "none", className }: AnimatedIconProps) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn("inline-flex", className)}
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: false, amount: 0.6, margin: IN_VIEW_MARGIN }}
      transition={{ type: "spring", stiffness: 260, damping: 14 }}
    >
      <span className="inline-flex transition-transform duration-300 ease-[cubic-bezier(.3,1.6,.5,1)] group-hover:scale-115 group-hover:-rotate-8">
        <span className={cn("inline-flex", loop !== "none" && `icon-${loop}`)}>{children}</span>
      </span>
    </motion.span>
  );
}
