"use client";

import type React from "react";
import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.ComponentProps<typeof Card> {
  /** Max tilt in degrees; 0 disables tilt. */
  tilt?: number;
}

/** Card with a cursor-following glow and a subtle 3D tilt. */
export function SpotlightCard({
  className,
  children,
  tilt = 4,
  onMouseMove,
  onMouseLeave,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e);
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);
    if (!reduceMotion && tilt) {
      const rx = ((y / rect.height) - 0.5) * -tilt;
      const ry = ((x / rect.width) - 0.5) * tilt;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e);
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Card
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "group/spot relative isolate overflow-hidden transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:shadow-xl",
        className
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--glow), transparent 60%)",
        }}
      />
      {children}
    </Card>
  );
}
