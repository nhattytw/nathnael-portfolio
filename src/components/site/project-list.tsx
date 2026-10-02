"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Github, Globe, Plus } from "lucide-react";
import { StatusPill } from "@/components/projects/status-pill";
import { ViewCertificateButton } from "@/components/view-certificate-button";
import { CATEGORY_LABELS, type Project, type ProjectCategory } from "@/lib/projectData";
import { cn } from "@/lib/utils";

const ALL = "all";
const NO_CHECK = Promise.resolve(false);
const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Filter({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1 text-sm transition-colors",
        active ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

/** Every other project as an index; a row expands in place to show details. */
export function ProjectList({
  projects,
  liveChecks,
}: {
  projects: Project[];
  liveChecks: Record<string, Promise<boolean>>;
}) {
  const [category, setCategory] = useState<ProjectCategory | typeof ALL>(ALL);
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [projects]);
  const shown = projects.filter((p) => category === ALL || p.category === category);

  // /projects#gize (e.g. from the experience page) opens and highlights that row.
  useEffect(() => {
    const sync = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!projects.some((p) => p.id === id)) return;
      setCategory(ALL);
      setOpenId(id);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.remove("project-target");
        void el.offsetWidth;
        el.classList.add("project-target");
      });
    };
    const timer = window.setTimeout(sync, 400);
    window.addEventListener("hashchange", sync);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", sync);
    };
  }, [projects]);

  return (
    <div className="space-y-6">
      <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
        <Filter active={category === ALL} onClick={() => setCategory(ALL)}>
          All <span className="opacity-60">{projects.length}</span>
        </Filter>
        {categories.map((c) => (
          <Filter key={c} active={category === c} onClick={() => setCategory(c)}>
            {CATEGORY_LABELS[c]}
          </Filter>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="hidden grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_9rem_2rem] gap-6 border-b border-border py-3 md:grid">
          <span className="label">Project</span>
          <span className="label">Type</span>
          <span className="label">Delivered through</span>
          <span className="label">Status</span>
          <span />
        </div>

        <ul>
          {shown.map((p) => {
            const open = openId === p.id;
            return (
              <li key={p.id} id={p.id} className="scroll-mt-24 border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : p.id)}
                  aria-expanded={open}
                  aria-controls={`${p.id}-details`}
                  className="group grid w-full grid-cols-[minmax(0,1fr)_2rem] items-center gap-x-6 gap-y-1 py-5 text-left md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_9rem_2rem]"
                >
                  <span className="text-lg font-medium leading-snug transition-colors group-hover:text-primary">
                    {p.title}
                    <span className="block text-sm font-normal text-muted-foreground md:hidden">
                      {p.kind} · {CATEGORY_LABELS[p.category]}
                    </span>
                  </span>
                  <span className="hidden text-sm text-muted-foreground md:block">{p.kind}</span>
                  <span className="hidden text-sm text-muted-foreground md:block">
                    {p.company ?? CATEGORY_LABELS[p.category]}
                  </span>
                  <span className="hidden md:block">
                    <StatusPill project={p} isLive={liveChecks[p.id] ?? NO_CHECK} />
                  </span>
                  <span className="col-start-2 row-span-2 row-start-1 grid h-8 w-8 place-items-center rounded-full border border-border md:col-start-auto md:row-span-1 md:row-start-auto">
                    <Plus className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-45")} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`${p.id}-details`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">{p.subtitle}</p>
                          <p>{p.description}</p>
                          <ul className="space-y-1.5">
                            {p.highlights.map((h) => (
                              <li key={h} className="flex gap-3 text-[15px]">
                                <span className="mt-2.5 h-1 w-3 shrink-0 bg-primary" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-5">
                          <dl className="grid grid-cols-2 gap-4 text-sm">
                            {p.client && (
                              <div className="col-span-2">
                                <dt className="label mb-1">Client</dt>
                                <dd>{p.client}</dd>
                              </div>
                            )}
                            {p.period && (
                              <div>
                                <dt className="label mb-1">Period</dt>
                                <dd>{p.period}</dd>
                              </div>
                            )}
                            <div className="md:hidden">
                              <dt className="label mb-1">Status</dt>
                              <dd>
                                <StatusPill project={p} isLive={liveChecks[p.id] ?? NO_CHECK} />
                              </dd>
                            </div>
                          </dl>
                          <div>
                            <p className="label mb-2">Built with</p>
                            <ul className="flex flex-wrap gap-1.5">
                              {p.technologies.map((t) => (
                                <li key={t} className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-xs">
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {p.liveUrl && (
                              <a
                                href={p.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-sm hover:border-foreground/40"
                              >
                                <Globe className="h-4 w-4" /> {host(p.liveUrl)}
                              </a>
                            )}
                            {p.githubUrl && (
                              <a
                                href={p.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-sm hover:border-foreground/40"
                              >
                                <Github className="h-4 w-4" /> {p.githubLabel ?? "GitHub"}
                              </a>
                            )}
                            {p.reference && (
                              <a
                                href={p.reference.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-sm hover:border-foreground/40"
                              >
                                {p.reference.label} <ArrowUpRight className="h-4 w-4" />
                              </a>
                            )}
                            {p.certificateId && (
                              <ViewCertificateButton certificateId={p.certificateId} className="h-9 rounded-full px-4 text-sm" />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
