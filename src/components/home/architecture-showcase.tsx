"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

type NodeTag = "owned" | "contributed";

interface DiagramNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  sub?: string;
  tag?: NodeTag;
  info: string;
}

interface Diagram {
  id: string;
  tab: string;
  company: string;
  title: string;
  summary: string;
  height: number;
  /** "vertical" forces top-to-bottom links (layered diagrams). */
  flow?: "vertical" | "auto";
  nodes: DiagramNode[];
  edges: [string, string][];
}

const NODE_H = 56;

const DIAGRAMS: Diagram[] = [
  {
    id: "erp",
    tab: "Enterprise ERP",
    company: "Agentic Curve · Founding Engineer",
    title: "Multi-module ERP in a monorepo",
    summary:
      "One Next.js platform, many business modules. Shared API contracts keep CRM, trade, inventory, and finance interoperable on a single Supabase/PostgreSQL core.",
    height: 440,
    flow: "vertical",
    nodes: [
      { id: "app", x: 250, y: 16, w: 300, label: "Next.js Platform", sub: "monorepo · TypeScript", info: "A single Next.js app in a monorepo hosts every module, sharing UI, auth, and types." },
      { id: "api", x: 190, y: 128, w: 420, label: "Shared API Layer", sub: "cross-module data flows & contracts", info: "I designed the shared API structures and cross-module data flows that keep modules interoperable." },
      { id: "crm", x: 16, y: 248, w: 100, h: 64, label: "CRM", tag: "owned", info: "CRM module: owned end-to-end, from data modeling and API design to frontend delivery." },
      { id: "inv", x: 126, y: 248, w: 100, h: 64, label: "Inventory", tag: "owned", info: "Inventory Management: owned end-to-end." },
      { id: "trade", x: 236, y: 248, w: 100, h: 64, label: "Intl Trade", tag: "owned", info: "International Trade Management: owned end-to-end." },
      { id: "fleet", x: 346, y: 248, w: 100, h: 64, label: "Fleet", tag: "contributed", info: "Fleet Management: built together with a partner engineering team." },
      { id: "acct", x: 456, y: 248, w: 100, h: 64, label: "Accounting", info: "Accounting & finance module, integrated through the shared API layer." },
      { id: "hrm", x: 566, y: 248, w: 100, h: 64, label: "HRM", info: "Human resource management module." },
      { id: "sign", x: 676, y: 248, w: 108, h: 64, label: "Doc Signing", info: "Document signing module." },
      { id: "db", x: 250, y: 368, w: 300, label: "Supabase · PostgreSQL", sub: "auth · storage · relational core", info: "Supabase-managed PostgreSQL is the single source of truth for all modules." },
    ],
    edges: [
      ["app", "api"],
      ["api", "crm"], ["api", "inv"], ["api", "trade"], ["api", "fleet"], ["api", "acct"], ["api", "hrm"], ["api", "sign"],
      ["crm", "db"], ["inv", "db"], ["trade", "db"], ["fleet", "db"], ["acct", "db"], ["hrm", "db"], ["sign", "db"],
    ],
  },
  {
    id: "yenecart",
    tab: "YeneCart SaaS",
    company: "Baro Technologies · In-house product",
    title: "Containerized multi-server SaaS",
    summary:
      "A multi-tenant e-commerce SaaS serving 300+ daily active users at 99% uptime. Nginx load-balances two Dockerized app containers, with MongoDB and MinIO in their own containers and recurring billing through ArifPay.",
    height: 400,
    nodes: [
      { id: "users", x: 16, y: 172, w: 120, label: "Users", sub: "300+ DAUs", info: "Merchants and shoppers across tenants: 300+ daily active users." },
      { id: "nginx", x: 180, y: 172, w: 150, label: "Nginx", sub: "reverse proxy · LB", info: "Nginx terminates traffic and load-balances across the two app containers, key to 99% uptime." },
      { id: "app1", x: 376, y: 104, w: 180, label: "App container 1", sub: "Next.js · Docker", tag: "owned", info: "Stateless Next.js/TypeScript app in Docker. Either container can be drained without downtime." },
      { id: "app2", x: 376, y: 240, w: 180, label: "App container 2", sub: "Next.js · Docker", tag: "owned", info: "An identical second container behind Nginx, so traffic keeps flowing during deploys." },
      { id: "db", x: 612, y: 40, w: 172, label: "MongoDB", sub: "container · multi-tenant", info: "MongoDB in its own container, with a multi-tenant schema and tenant isolation." },
      { id: "minio", x: 612, y: 172, w: 172, label: "MinIO", sub: "container · object storage", info: "S3-compatible object storage in its own container, for product media." },
      { id: "pay", x: 612, y: 304, w: 172, label: "ArifPay", sub: "external · subscriptions", info: "External payment gateway: recurring billing, webhooks, and failure handling." },
    ],
    edges: [
      ["users", "nginx"],
      ["nginx", "app1"], ["nginx", "app2"],
      ["app1", "db"], ["app2", "db"],
      ["app1", "minio"], ["app2", "minio"],
      ["app2", "pay"],
    ],
  },
  {
    id: "hr",
    tab: "Biometric HR",
    company: "Ahaz · Two client systems",
    title: "Fingerprint attendance → payroll",
    summary:
      "Two HR systems wired into fingerprint scanners. Gize is a Python/Qt5 desktop app that talks to a ZKTeco device through an adapted, reverse-engineered driver. The Akile system is a MERN web app with live WebSocket attendance feeds.",
    height: 330,
    nodes: [
      { id: "zk", x: 16, y: 40, w: 150, label: "ZKTeco Scanner", sub: "fingerprint device", info: "The vendor's documentation was thin, so the connection started from a community reverse-engineered driver." },
      { id: "driver", x: 206, y: 40, w: 160, label: "Adapted Driver", sub: "reverse-engineered", tag: "owned", info: "The driver was adapted to our device model. The first successful ping was the breakthrough." },
      { id: "gize", x: 406, y: 40, w: 170, label: "Gize Desktop", sub: "Python · Qt5", tag: "owned", info: "A Python/Qt5 desktop app that processes attendance records end to end." },
      { id: "sqlite", x: 616, y: 40, w: 168, label: "SQLite → Payroll", sub: "automated runs", info: "Local SQLite storage feeding automated payroll processing." },
      { id: "fp", x: 16, y: 220, w: 150, label: "Fingerprint Scanner", sub: "attendance capture", info: "Fingerprint scans feed the web platform's attendance records." },
      { id: "api", x: 206, y: 220, w: 160, label: "Express API", sub: "Node.js · MongoDB", tag: "owned", info: "The Node.js/Express backend of the MERN stack stores attendance and HR data in MongoDB." },
      { id: "ws", x: 406, y: 220, w: 170, label: "WebSocket Feed", sub: "real-time events", tag: "owned", info: "WebSockets push attendance events to connected clients as they happen." },
      { id: "dash", x: 616, y: 220, w: 168, label: "React Dashboard", sub: "Akile HR · web", info: "HR teams see employees, daily attendance, reports, check-in/out, and payroll in the browser." },
    ],
    edges: [
      ["zk", "driver"], ["driver", "gize"], ["gize", "sqlite"],
      ["fp", "api"], ["api", "ws"], ["ws", "dash"],
    ],
  },
];

function edgePath(a: DiagramNode, b: DiagramNode, flow: Diagram["flow"] = "auto") {
  const ah = a.h ?? NODE_H;
  const bh = b.h ?? NODE_H;
  const acx = a.x + a.w / 2;
  const acy = a.y + ah / 2;
  const bcx = b.x + b.w / 2;
  const bcy = b.y + bh / 2;

  // Vertical link when target sits mostly below/above, horizontal otherwise.
  const vertical =
    flow === "vertical"
      ? bcy !== acy
      : Math.abs(bcy - acy) > Math.abs(bcx - acx) * 0.6 && Math.abs(bcy - acy) > ah;
  if (vertical) {
    const down = bcy > acy;
    const x1 = acx;
    const y1 = down ? a.y + ah : a.y;
    const x2 = bcx;
    const y2 = down ? b.y : b.y + bh;
    const my = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
  }
  const right = bcx > acx;
  const x1 = right ? a.x + a.w : a.x;
  const x2 = right ? b.x : b.x + b.w;
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${acy} C ${mx} ${acy}, ${mx} ${bcy}, ${x2} ${bcy}`;
}

export function ArchitectureShowcase() {
  const [activeId, setActiveId] = useState(DIAGRAMS[0].id);
  const [hovered, setHovered] = useState<string | null>(null);
  const diagram = DIAGRAMS.find((d) => d.id === activeId)!;
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  const hoveredNode = hovered ? byId[hovered] : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-2" role="tablist">
        <LayoutGroup id="arch-tabs">
          {DIAGRAMS.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={d.id === activeId}
              onClick={() => {
                setActiveId(d.id);
                setHovered(null);
              }}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                d.id === activeId ? "text-primary-foreground" : "text-muted-foreground hover:text-primary"
              )}
            >
              {d.id === activeId && (
                <motion.span
                  layoutId="arch-tab"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{d.tab}</span>
            </button>
          ))}
        </LayoutGroup>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-border/50 px-6 py-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {diagram.company}
            </p>
            <h3 className="text-xl font-bold">{diagram.title}</h3>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-primary" /> Owned
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm border-2 border-dashed border-primary" /> Contributed
            </span>
          </div>
        </div>

        {/* Diagram scrolls sideways on narrow screens instead of shrinking text */}
        <div className="overflow-x-auto bg-dot-grid">
          <AnimatePresence mode="wait">
            <motion.svg
              key={diagram.id}
              viewBox={`0 0 800 ${diagram.height}`}
              className="min-w-[680px] w-full h-auto p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              role="img"
              aria-label={`${diagram.title}. ${diagram.summary}`}
            >
              {diagram.edges.map(([from, to], i) => {
                const d = edgePath(byId[from], byId[to], diagram.flow);
                const lit = hovered === from || hovered === to;
                return (
                  <g key={`${from}-${to}`}>
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={lit ? "var(--primary)" : "var(--line)"}
                      strokeOpacity={lit ? 0.8 : 0.9}
                      strokeWidth={lit ? 2 : 1.5}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: "easeInOut" }}
                    />
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      strokeDasharray="4 8"
                      strokeLinecap="round"
                      className="animate-flow"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: lit ? 1 : 0.55 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ delay: 1 + i * 0.05 }}
                    />
                  </g>
                );
              })}

              {diagram.nodes.map((node, i) => {
                const h = node.h ?? NODE_H;
                const owned = node.tag === "owned";
                const isHovered = hovered === node.id;
                return (
                  <motion.g
                    key={node.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`${node.label}: ${node.info}`}
                    className="cursor-pointer outline-none"
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(node.id)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setHovered(node.id)}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <rect
                      x={node.x}
                      y={node.y}
                      width={node.w}
                      height={h}
                      rx={10}
                      fill={owned ? "var(--primary)" : "var(--card)"}
                      stroke="var(--primary)"
                      strokeOpacity={isHovered ? 1 : owned ? 0 : 0.45}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      strokeDasharray={node.tag === "contributed" ? "5 4" : undefined}
                      style={{ transition: "stroke-opacity 0.2s, stroke-width 0.2s" }}
                    />
                    <text
                      x={node.x + node.w / 2}
                      y={node.y + (node.sub ? h / 2 - 4 : h / 2 + 5)}
                      textAnchor="middle"
                      fontSize={14}
                      fontWeight={700}
                      fill={owned ? "var(--primary-foreground)" : "var(--foreground)"}
                    >
                      {node.label}
                    </text>
                    {node.sub && (
                      <text
                        x={node.x + node.w / 2}
                        y={node.y + h / 2 + 14}
                        textAnchor="middle"
                        fontSize={11}
                        fontFamily="var(--font-mono)"
                        fill={owned ? "var(--primary-foreground)" : "var(--muted-foreground)"}
                        fillOpacity={0.85}
                      >
                        {node.sub}
                      </text>
                    )}
                  </motion.g>
                );
              })}
            </motion.svg>
          </AnimatePresence>
        </div>

        <div className="flex gap-3 border-t border-border/50 px-6 py-4 min-h-[76px]" aria-live="polite">
          <Info className="h-4 w-4 mt-1 shrink-0 text-primary" />
          <AnimatePresence mode="wait">
            <motion.p
              key={hoveredNode?.id ?? diagram.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {hoveredNode ? (
                <>
                  <span className="font-semibold text-foreground">{hoveredNode.label}: </span>
                  {hoveredNode.info}
                </>
              ) : (
                <>
                  {diagram.summary}{" "}
                  <span className="text-foreground/70">Hover a component for details.</span>
                </>
              )}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
