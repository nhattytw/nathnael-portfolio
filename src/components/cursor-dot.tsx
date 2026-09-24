"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const SIZE = 12;
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/**
 * A small dot that trails the mouse across every page. The native cursor stays
 * visible; the dot only follows it. Disabled on touch devices and when the
 * visitor prefers reduced motion.
 */
export function CursorDot() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [overInteractive, setOverInteractive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(finePointer.matches && !reduceMotion.matches);
    update();
    finePointer.addEventListener("change", update);
    reduceMotion.addEventListener("change", update);
    return () => {
      finePointer.removeEventListener("change", update);
      reduceMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setOverInteractive(Boolean(target?.closest?.(INTERACTIVE)));
    };
    const hide = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] rounded-full bg-primary"
      style={{
        x: springX,
        y: springY,
        width: SIZE,
        height: SIZE,
        marginLeft: -SIZE / 2,
        marginTop: -SIZE / 2,
      }}
      animate={{
        opacity: visible ? (overInteractive ? 0.5 : 0.85) : 0,
        scale: overInteractive ? 2.2 : 1,
      }}
      transition={{ duration: 0.2 }}
    />
  );
}
