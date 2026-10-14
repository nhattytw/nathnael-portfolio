"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const CHECK_MS = 1800;

/** Long paths are cut in the middle so the trace keeps its shape. */
const shorten = (path: string, max = 14) =>
  path.length > max ? `${path.slice(0, max - 6)}…${path.slice(-5)}` : path;

/**
 * The 404 graphic: "404" with an open ring for the zero, and a request trace
 * where packets reach the site but fall away before the missing page.
 */
export function NotFoundTrace() {
  const pathname = usePathname() || "/";
  const reduceMotion = useReducedMotion();
  const [checked, setChecked] = useState(false);

  // The status reads "Checking…" first, the same as a live check on the status board.
  // With reduced motion it settles straight away.
  useEffect(() => {
    const timer = window.setTimeout(() => setChecked(true), reduceMotion ? 0 : CHECK_MS);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  const path = shorten(pathname);

  return (
    <div className="space-y-10">
      <p
        aria-hidden
        className="flex items-center font-display text-[clamp(7rem,26vw,16rem)] leading-none tracking-tight"
      >
        4
        <svg viewBox="0 0 100 100" className="mx-[0.04em] h-[0.72em] w-[0.6em] overflow-visible">
          <circle cx="50" cy="50" r="40" fill="none" className="stroke-border" strokeWidth={9} />
          {/* The ring draws itself, then stops short: the zero never closes. */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            pathLength={100}
            strokeDasharray="88 100"
            strokeLinecap="round"
            strokeWidth={9}
            transform="rotate(-90 50 50)"
            className={cn("stroke-primary", !reduceMotion && "nf-ring")}
          />
          <circle cx="50" cy="50" r="7" className={cn("fill-destructive", !reduceMotion && "nf-blink")} />
        </svg>
        4
      </p>

      <figure className="m-0 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border px-5 py-3 font-mono text-xs">
          <span className="min-w-0 truncate text-muted-foreground">
            GET <span className="text-foreground">{pathname}</span>
          </span>
          <span aria-live="polite">
            {checked ? (
              <span className="inline-flex items-center gap-2 text-destructive">
                <span className="h-2 w-2 rounded-full bg-destructive" /> 404 · Not found
              </span>
            ) : (
              <span className="animate-pulse text-muted-foreground">Checking…</span>
            )}
          </span>
        </div>

        <div className="grid place-items-center px-4 py-8">
          <svg
            viewBox="0 0 420 110"
            role="img"
            aria-label={`Request trace: your browser reached the site, but ${pathname} does not exist`}
            className="block h-auto w-full max-w-[560px] font-mono"
          >
            <path id="nf-edge-0" d="M92 55 L160 55" fill="none" className="stroke-line" strokeWidth={1.6} />
            <path
              id="nf-edge-1"
              d="M260 55 L328 55"
              fill="none"
              className="stroke-line"
              strokeWidth={1.6}
              strokeDasharray="4 4"
            />

            {/* Requests: the first leg always arrives; the second fades out before the missing page. */}
            {!reduceMotion &&
              [0, 0.8, 1.6].map((begin) => (
                <g key={begin}>
                  <circle r={3.2} className="fill-primary" visibility="hidden">
                    <set attributeName="visibility" to="visible" begin={`${begin}s`} />
                    <animateMotion dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.45;1" calcMode="linear">
                      <mpath href="#nf-edge-0" />
                    </animateMotion>
                    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.45;0.46;1" dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" />
                  </circle>
                  <circle r={3.2} className="fill-primary" visibility="hidden">
                    <set attributeName="visibility" to="visible" begin={`${begin}s`} />
                    <animateMotion dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" keyPoints="0;0;0.75;0.75" keyTimes="0;0.5;0.9;1" calcMode="linear">
                      <mpath href="#nf-edge-1" />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.5;0.9;1" dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}

            <g>
              <rect x="12" y="35" width="80" height="40" rx="8" className="fill-background stroke-border" />
              <text x="52" y="59" textAnchor="middle" className="fill-foreground text-[12px]">You</text>
            </g>
            <g>
              <rect x="160" y="35" width="100" height="40" rx="8" className="fill-background stroke-border" />
              <circle cx="176" cy="55" r="3.5" className="fill-live" />
              <text x="216" y="59" textAnchor="middle" className="fill-foreground text-[12px]">this site</text>
              <text x="210" y="95" textAnchor="middle" className="fill-muted-foreground text-[10px]">up</text>
            </g>
            <g className={cn(!reduceMotion && "nf-flicker")}>
              <rect
                x="328"
                y="35"
                width="80"
                height="40"
                rx="8"
                fill="none"
                strokeDasharray="5 4"
                className="stroke-destructive"
              />
              <text x="368" y="59" textAnchor="middle" className="fill-destructive text-[12px]">?</text>
              <text x="368" y="95" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {path}
              </text>
            </g>
          </svg>
        </div>
      </figure>
    </div>
  );
}
