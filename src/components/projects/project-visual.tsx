import type React from "react";
import { cn } from "@/lib/utils";
import { YeneCartDiagram } from "@/components/projects/yenecart-diagram";

const ERP_MODULES: { label: string; tag?: "owned" | "partner" }[] = [
  { label: "CRM", tag: "owned" },
  { label: "Inventory", tag: "owned" },
  { label: "Int'l Trade", tag: "owned" },
  { label: "Fleet", tag: "partner" },
  { label: "Finance" },
  { label: "HRM" },
  { label: "Doc signing" },
];

function Tile({ children, tag, className }: { children: React.ReactNode; tag?: "owned" | "partner"; className?: string }) {
  return (
    <span
      className={cn(
        "flex min-w-0 items-center justify-center rounded-lg border px-2 py-3 text-center font-mono text-[11px] leading-tight",
        tag === "owned" && "border-primary bg-primary font-bold text-primary-foreground",
        tag === "partner" && "border-dashed border-primary text-primary",
        !tag && "border-border bg-background text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap justify-center gap-4 font-mono text-[11px] text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <i className="h-2.5 w-2.5 rounded-sm bg-primary" /> owned end to end
      </span>
      <span className="inline-flex items-center gap-1.5">
        <i className="h-2.5 w-2.5 rounded-sm border border-dashed border-primary" /> with a partner team
      </span>
    </div>
  );
}

function ErpVisual({ large }: { large?: boolean }) {
  if (!large) {
    return (
      <div className="grid w-full max-w-[300px] grid-cols-3 gap-2">
        {ERP_MODULES.map((m) => (
          <Tile key={m.label} tag={m.tag === "owned" ? "owned" : undefined}>
            {m.label}
          </Tile>
        ))}
        <Tile>Shared API</Tile>
      </div>
    );
  }
  return (
    <div className="grid w-full justify-items-center gap-4">
      <div className="relative grid w-full max-w-2xl gap-2.5 rounded-2xl border-[1.5px] border-dashed border-border p-4">
        <span className="absolute -top-2.5 left-4 bg-card px-1.5 font-mono text-[11px] text-muted-foreground">monorepo</span>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(96px,1fr))] gap-2">
          {ERP_MODULES.map((m) => (
            <Tile key={m.label} tag={m.tag} className="py-3.5 text-xs">
              {m.label}
            </Tile>
          ))}
        </div>
        <div className="rounded-lg border border-line bg-background p-2.5 text-center font-mono text-xs">
          shared API structures · cross-module data flows
        </div>
        <div className="rounded-lg border border-line bg-muted p-2.5 text-center font-mono text-xs">Supabase · PostgreSQL</div>
      </div>
      <Legend />
    </div>
  );
}

const IIMCS_LEVELS = ["Region", "Zone", "Woreda / City", "Kebele"];

const IIMCS_MODULES = [
  "Members",
  "Reports",
  "Tasks",
  "Finance",
  "Approvals",
  "Users & roles",
  "Dashboard",
  "Search",
  "Notifications",
  "Audit log",
];

function IimcsVisual({ large }: { large?: boolean }) {
  if (!large) {
    return (
      <div className="grid justify-items-center gap-2 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-primary text-xl font-extrabold text-primary">
          2026
        </div>
        <small className="font-mono text-[11px] leading-snug text-muted-foreground">
          Certificate of Recognition
          <br />
          view-only, encrypted
        </small>
      </div>
    );
  }
  return (
    <div className="grid w-full max-w-3xl gap-4 font-mono text-xs sm:grid-cols-[auto_1fr]">
      <div className="relative grid content-center gap-1.5 rounded-2xl border-[1.5px] border-dashed border-border p-4 pt-5">
        <span className="absolute -top-2.5 left-4 bg-card px-1.5 text-[11px] text-muted-foreground">jurisdiction</span>
        {IIMCS_LEVELS.map((level, i) => (
          <span key={level} className="grid justify-items-center gap-1.5">
            {i > 0 && (
              <span className="text-muted-foreground" aria-hidden>
                ↑
              </span>
            )}
            <span className="w-full rounded-lg border border-line bg-background px-3 py-2 text-center">{level}</span>
          </span>
        ))}
        <span className="mt-1 text-center text-[11px] text-primary">approvals escalate upward</span>
      </div>
      <div className="grid content-start gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg border border-line bg-background px-3 py-2.5">Sign-in · session</span>
          <span className="text-muted-foreground" aria-hidden>
            →
          </span>
          <span className="flex-1 rounded-lg border border-primary bg-primary px-3 py-2.5 text-center text-primary-foreground">
            role · location · department · workflow
          </span>
        </div>
        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(104px,1fr))] gap-2 rounded-2xl border-[1.5px] border-dashed border-border p-3 pt-4">
          <span className="absolute -top-2.5 left-4 bg-card px-1.5 text-[11px] text-muted-foreground">modules</span>
          {IIMCS_MODULES.map((m) => (
            <Tile key={m} className="text-xs">
              {m}
            </Tile>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <span className="rounded-lg border border-line bg-background p-2.5 text-center">Express API · Zod validation</span>
          <span className="rounded-lg border border-line bg-background p-2.5 text-center">node-cron · escalation, expiry</span>
        </div>
        <div className="rounded-lg border border-line bg-muted p-2.5 text-center">PostgreSQL · Prisma · encrypted fields</div>
      </div>
    </div>
  );
}

function YeneCartVisual() {
  const box = "flex-1 rounded-lg border border-line bg-background px-1 py-2 text-center";
  return (
    <div className="grid w-full max-w-[300px] gap-2 font-mono text-[11px]">
      <div className="flex justify-center">
        <span className="w-1/2 rounded-lg border border-primary bg-primary py-2 text-center text-primary-foreground">Nginx</span>
      </div>
      <div className="flex gap-2">
        <span className={box}>App 1</span>
        <span className={box}>App 2</span>
      </div>
      <div className="flex gap-2">
        <span className={box}>MongoDB</span>
        <span className={box}>MinIO</span>
        <span className={box}>ArifPay</span>
      </div>
    </div>
  );
}

const TAGS: Record<string, string> = {
  "enterprise-erp": "modules · filled = mine",
  iimcs: "restricted access · no public link",
  yenecart: "production topology",
};

/** The picture beside a featured project on /projects. */
export function ProjectRowVisual({ id }: { id: string }) {
  return (
    <>
      {id === "enterprise-erp" && <ErpVisual />}
      {id === "iimcs" && <IimcsVisual />}
      {id === "yenecart" && <YeneCartVisual />}
      {TAGS[id] && (
        <span className="absolute bottom-2.5 left-3 font-mono text-[10.5px] tracking-wide text-muted-foreground">{TAGS[id]}</span>
      )}
    </>
  );
}

/** The large architecture picture at the top of a case study. */
export function CaseStudyVisual({ id, caption }: { id: string; caption: { title: string; body: string } }) {
  if (id === "yenecart") return <YeneCartDiagram caption={caption} />;
  return (
    <figure className="m-0 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid min-h-60 place-items-center px-4 py-7">
        {id === "enterprise-erp" && <ErpVisual large />}
        {id === "iimcs" && <IimcsVisual large />}
      </div>
      <figcaption className="border-t border-dashed border-border px-5 py-3.5 text-[15px]">
        <b className="block font-sans text-sm text-primary">{caption.title}</b>
        {caption.body}
      </figcaption>
    </figure>
  );
}
