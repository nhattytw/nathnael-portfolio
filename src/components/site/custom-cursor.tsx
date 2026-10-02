"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

const INTERACTIVE = "a, button, [role='button'], label, summary, select";
const TEXT = "input, textarea, [contenteditable='true']";
/** A rounded arrow pointer with its tip at (4, 4). */
const ARROW =
  "M4.04 4.69a.5.5 0 0 1 .65-.65l16 6.5a.5.5 0 0 1-.06.95l-6.13 1.58a2 2 0 0 0-1.43 1.43l-1.58 6.13a.5.5 0 0 1-.95.06z";

/**
 * Replaces the system cursor with a rounded arrow: paper with an ink outline by
 * default, and solid accent with a paper outline over anything clickable. The
 * contrasting outline keeps it visible on any background. Text fields keep the
 * native I-beam. Touch devices and reduced motion keep the normal cursor.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"default" | "link" | "text">("default");
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

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
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as Element | null;
      setMode(el?.closest?.(TEXT) ? "text" : el?.closest?.(INTERACTIVE) ? "link" : "default");
    };
    const hide = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  // Over text fields the native I-beam takes over.
  const show = visible && mode !== "text";
  const link = mode === "link";
  return (
    // Offset so the arrow's tip, at (4, 4) in its 24px box, sits on the pointer.
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120] -ml-1 -mt-1 h-6 w-6"
      style={{ x, y, transformOrigin: "4px 4px" }}
      animate={{ opacity: show ? 1 : 0, scale: (link ? 1.15 : 1) * (pressed ? 0.88 : 1) }}
      transition={{ duration: 0.15 }}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full overflow-visible drop-shadow-[0_1px_1.5px_rgb(0_0_0/0.25)]">
        <path
          d={ARROW}
          strokeLinejoin="round"
          className="transition-[fill,stroke] duration-150"
          style={
            link
              ? { fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 1.5 }
              : { fill: "var(--background)", stroke: "var(--foreground)", strokeWidth: 1.75 }
          }
        />
      </svg>
    </motion.div>
  );
}
