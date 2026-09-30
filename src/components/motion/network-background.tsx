"use client";

import type React from "react";
import { useEffect, useRef } from "react";

interface NetworkBackgroundProps {
  /** Text blocks inside this element dim the network where it passes behind them. */
  contentRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

type Point = { x: number; y: number; vx: number; vy: number; behindText: boolean };
type Zone = { x0: number; y0: number; x1: number; y1: number };

const LINK_DISTANCE = 110;
const CURSOR_DISTANCE = 150;
/** Lines and dots behind text keep about a fifth of their strength. */
const BEHIND_TEXT = 0.22;
const ZONE_PADDING = 16;

/**
 * Drifting dots joined by faint lines, with the ones near the cursor lit up.
 * Behind the hero's text the network fades so the words stay easy to read.
 */
export function NetworkBackground({ contentRef, className }: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const content = contentRef.current;
    // The canvas sits in a pointer-events-none layer; track the cursor on the hero wrapper above it.
    const area = canvas?.parentElement?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !content || !area || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let zones: Zone[] = [];
    let cursor: { x: number; y: number } | null = null;
    let colors = { dot: "", accent: "" };
    let frame = 0;
    let raf = 0;
    let visible = true;

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      colors = {
        dot: style.getPropertyValue("--line").trim() || "#7fa886",
        accent: style.getPropertyValue("--primary").trim() || "#2e6cba",
      };
    };

    const readZones = () => {
      const box = canvas.getBoundingClientRect();
      zones = Array.from(content.children)
        .filter((el) => (el as HTMLElement).offsetHeight > 0)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            x0: r.left - box.left - ZONE_PADDING,
            y0: r.top - box.top - ZONE_PADDING,
            x1: r.right - box.left + ZONE_PADDING,
            y1: r.bottom - box.top + ZONE_PADDING,
          };
        });
    };

    const inZone = (x: number, y: number) =>
      zones.some((z) => x > z.x0 && x < z.x1 && y > z.y0 && y < z.y1);

    // Sample along the line so one crossing a word is caught even if its ends are clear.
    const crossesText = (ax: number, ay: number, bx: number, by: number) => {
      for (let t = 0.15; t < 0.9; t += 0.175) {
        if (inZone(ax + (bx - ax) * t, ay + (by - ay) * t)) return true;
      }
      return false;
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readZones();
      const count = Math.round(Math.min(64, Math.max(22, (width * height) / 10000)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        behindText: false,
      }));
    };

    const line = (ax: number, ay: number, bx: number, by: number, alpha: number, color: string) => {
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    };

    const draw = () => {
      // Theme and layout can change at any time; re-read them twice a second.
      if (frame++ % 30 === 0) {
        readColors();
        readZones();
      }
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        p.behindText = inZone(p.x, p.y);
      }

      const cursorOverText = cursor ? inZone(cursor.x, cursor.y) : false;
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= LINK_DISTANCE) continue;
          const dim = a.behindText || b.behindText || crossesText(a.x, a.y, b.x, b.y) ? BEHIND_TEXT : 1;
          line(a.x, a.y, b.x, b.y, (1 - d / LINK_DISTANCE) * 0.45 * dim, colors.dot);
        }
        if (cursor) {
          const d = Math.hypot(a.x - cursor.x, a.y - cursor.y);
          if (d < CURSOR_DISTANCE) {
            const dim =
              a.behindText || cursorOverText || crossesText(a.x, a.y, cursor.x, cursor.y) ? BEHIND_TEXT : 1;
            line(a.x, a.y, cursor.x, cursor.y, (1 - d / CURSOR_DISTANCE) * 0.8 * dim, colors.accent);
          }
        }
      }

      for (const p of points) {
        const near = cursor && Math.hypot(p.x - cursor.x, p.y - cursor.y) < CURSOR_DISTANCE;
        ctx.globalAlpha = (near ? 0.95 : 0.55) * (p.behindText ? BEHIND_TEXT : 1);
        ctx.fillStyle = near ? colors.accent : colors.dot;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? 2.6 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduceMotion && visible) raf = requestAnimationFrame(draw);
    };

    const restart = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      cursor = { x: e.clientX - box.left, y: e.clientY - box.top };
      if (reduceMotion) restart();
    };
    const onLeave = () => {
      cursor = null;
      if (reduceMotion) restart();
    };

    readColors();
    resize();
    restart();

    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) restart();
    });
    resizeObserver.observe(canvas);
    resizeObserver.observe(content);
    // Stop drawing while the hero is scrolled out of view.
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) restart();
    });
    viewObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      resizeObserver.disconnect();
      viewObserver.disconnect();
    };
  }, [contentRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
