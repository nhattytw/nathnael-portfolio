"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const NODES = [
  { id: "clients", label: "Clients", x: 130, y: 12, title: "Clients", body: "Shoppers and store owners across tenants. 300+ daily active users." },
  { id: "nginx", label: "Nginx", x: 130, y: 86, title: "Nginx", body: "Reverse proxy that load-balances traffic across two app containers." },
  { id: "arifpay", label: "ArifPay", x: 250, y: 86, title: "ArifPay", body: "Recurring subscription billing. Webhooks come back into the app, with payment-failure handling." },
  { id: "app1", label: "App 1", x: 40, y: 160, title: "App container 1", body: "Next.js and Node.js in Docker. Two identical instances behind Nginx." },
  { id: "app2", label: "App 2", x: 220, y: 160, title: "App container 2", body: "Next.js and Node.js in Docker. Two identical instances behind Nginx." },
  { id: "mongo", label: "MongoDB", x: 40, y: 248, title: "MongoDB", body: "Multi-tenant schema with tenant isolation, in its own container." },
  { id: "minio", label: "MinIO", x: 220, y: 248, title: "MinIO", body: "Object storage for store assets, in its own container." },
];

const EDGES = [
  "M180 46 L180 86",
  "M180 120 C180 140 90 140 90 160",
  "M180 120 C180 140 270 140 270 160",
  "M90 194 L90 248",
  "M90 194 C90 222 270 222 270 248",
  "M270 194 L270 248",
  "M270 194 C270 222 90 222 90 248",
];

/** Requests travelling along the edges: [edge index, start delay in seconds]. */
const PACKETS: [number, number][] = [
  [0, 0], [1, 0.3], [2, 0.9], [3, 1.4], [5, 1.9], [0, 1.6], [2, 2.4], [6, 0.6],
];

/** YeneCart's production setup. Hovering or tapping a component explains it. */
export function YeneCartDiagram({ caption }: { caption: { title: string; body: string } }) {
  const [active, setActive] = useState<(typeof NODES)[number] | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <figure className="m-0 overflow-hidden rounded-2xl border border-primary/40 bg-card">
      <div className="grid place-items-center px-4 py-7">
        <svg viewBox="0 0 360 292" role="img" aria-label="YeneCart architecture: clients, Nginx, two app containers, MongoDB, MinIO and ArifPay" className="block h-auto w-full max-w-[520px]">
          {EDGES.map((d, i) => (
            <path key={d} id={`yc-edge-${i}`} d={d} fill="none" className="stroke-line" strokeWidth={1.6} />
          ))}
          <path d="M300 120 L282 160" fill="none" className="stroke-line" strokeWidth={1.6} strokeDasharray="4 4" />
          {!reduceMotion &&
            PACKETS.map(([edge, begin], i) => (
              // Hidden until its start time, so it doesn't wait in the corner.
              <circle key={i} r={3.2} className="fill-primary" visibility="hidden">
                <set attributeName="visibility" to="visible" begin={`${begin}s`} />
                <animateMotion dur="2.4s" begin={`${begin}s`} repeatCount="indefinite">
                  <mpath href={`#yc-edge-${edge}`} />
                </animateMotion>
              </circle>
            ))}
          <text x={304} y={146} className="fill-muted-foreground font-mono text-[10px]">webhooks</text>
          {NODES.map((node) => {
            const on = active?.id === node.id;
            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={node.title}
                className="cursor-pointer outline-none"
                onMouseEnter={() => setActive(node)}
                onFocus={() => setActive(node)}
                onClick={() => setActive(node)}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={100}
                  height={34}
                  rx={8}
                  strokeWidth={1.4}
                  className={cn("transition-colors", on ? "fill-primary stroke-primary" : "fill-background stroke-line")}
                />
                <text
                  x={node.x + 50}
                  y={node.y + 21.5}
                  textAnchor="middle"
                  className={cn("font-mono text-xs", on ? "fill-primary-foreground" : "fill-foreground")}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption aria-live="polite" className="min-h-16 border-t border-dashed border-border px-5 py-3.5 text-[15px]">
        <b className="block font-sans text-sm text-primary">{active ? active.title : caption.title}</b>
        {active ? active.body : caption.body}
      </figcaption>
    </figure>
  );
}
