"use client";

import { useEffect, useRef } from "react";

const GAP = 24;
/** How far the pointer reaches: dots inside it light up and are pushed aside. */
const REACH = 150;
/** Dots this close are wired to the pointer, like a small network. */
const LINK = 96;

/**
 * The hero's dot grid, drawn on a canvas so it can react to the pointer: nearby
 * dots take the accent colour, drift away from the cursor and link up to it.
 * Without a fine pointer, or with reduced motion, it stays a static grid.
 */
export function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const interactive =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let colors = { line: "#999", primary: "#36c" };
    // Where the pointer is, where the effect is drawn (eased toward it), and
    // how strongly the effect shows, from 0 to 1.
    const target = { x: 0, y: 0, inside: false };
    const pointer = { x: 0, y: 0 };
    let strength = 0;
    let frame = 0;

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      colors = {
        line: style.getPropertyValue("--line").trim() || colors.line,
        primary: style.getPropertyValue("--primary").trim() || colors.primary,
      };
    };

    /** The resting grid fades out from a soft centre on the right. */
    const restAlpha = (x: number, y: number) => {
      const dx = (x / width - 0.8) / 0.7;
      const dy = (y / height - 0.45) / 0.8;
      const d = Math.sqrt(dx * dx + dy * dy);
      return Math.max(0, Math.min(1, (0.7 - d) / 0.6));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const s = strength;
      const links: [number, number, number][] = [];

      for (let gx = GAP / 2; gx < width; gx += GAP) {
        for (let gy = GAP / 2; gy < height; gy += GAP) {
          let x = gx;
          let y = gy;
          let t = 0;
          if (s > 0.001) {
            const dx = gx - pointer.x;
            const dy = gy - pointer.y;
            const d = Math.hypot(dx, dy);
            if (d < REACH) {
              t = (1 - d / REACH) * s;
              const push = t * t * 10;
              if (d > 0.01) {
                x += (dx / d) * push;
                y += (dy / d) * push;
              }
              if (d < LINK) links.push([x, y, (1 - d / LINK) * s]);
            }
          }

          const rest = restAlpha(gx, gy);
          if (t > 0.02) {
            ctx.globalAlpha = Math.max(rest, 0.25 + t * 0.75);
            ctx.fillStyle = colors.primary;
            ctx.beginPath();
            ctx.arc(x, y, 1 + t * 1.2, 0, Math.PI * 2);
            ctx.fill();
          } else if (rest > 0.01) {
            ctx.globalAlpha = rest;
            ctx.fillStyle = colors.line;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 1;
      for (const [x, y, a] of links) {
        ctx.globalAlpha = a * a * 0.6;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    // Only animates while the pointer is easing or the effect is fading.
    const tick = () => {
      pointer.x += (target.x - pointer.x) * 0.18;
      pointer.y += (target.y - pointer.y) * 0.18;
      const goal = target.inside ? 1 : 0;
      strength += (goal - strength) * 0.12;
      draw();
      const settled =
        Math.abs(target.x - pointer.x) < 0.3 && Math.abs(target.y - pointer.y) < 0.3 && Math.abs(goal - strength) < 0.01;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      // Appear where the pointer enters, rather than sweeping over from the last spot.
      if (inside && !target.inside && strength < 0.05) {
        pointer.x = x;
        pointer.y = y;
      }
      target.x = x;
      target.y = y;
      target.inside = inside;
      wake();
    };
    const onLeave = () => {
      target.inside = false;
      wake();
    };

    readColors();
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    // Theme switches change the class on <html>.
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
