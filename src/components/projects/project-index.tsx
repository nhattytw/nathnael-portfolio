"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProjectDrawer } from "@/components/projects/project-drawer";
import { StatusPill } from "@/components/projects/status-pill";
import { CATEGORY_LABELS, type Project, type ProjectCategory } from "@/lib/projectData";
import { cn } from "@/lib/utils";

interface ProjectIndexProps {
  projects: Project[];
  liveChecks: Record<string, Promise<boolean>>;
}

const ANY = "Any";
/** Stack filters, in this order; only the ones these projects use are shown. */
const STACK_FILTERS = ["Node.js", "React.js", "Next.js", "PostgreSQL", "MongoDB", "Python"];
const NO_CHECK = Promise.resolve(false);

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-sm font-semibold transition-colors",
        active ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

/** Every non-featured project in one filterable list; a row opens its details. */
export function ProjectIndex({ projects, liveChecks }: ProjectIndexProps) {
  const [type, setType] = useState<ProjectCategory | typeof ANY>(ANY);
  const [stack, setStack] = useState(ANY);
  const [openId, setOpenId] = useState<string | null>(null);

  const types = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [projects]);
  const stacks = useMemo(
    () => STACK_FILTERS.filter((s) => projects.some((p) => p.technologies.includes(s))),
    [projects]
  );

  const shown = projects.filter(
    (p) => (type === ANY || p.category === type) && (stack === ANY || p.technologies.includes(stack))
  );

  // /projects#gize (e.g. from the experience page) opens that project's details.
  useEffect(() => {
    const sync = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (projects.some((p) => p.id === id)) setOpenId(id);
    };
    // Wait for the logo intro to fade out first, like the rest of the hash handling.
    const timer = window.setTimeout(sync, 2300);
    window.addEventListener("hashchange", sync);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", sync);
    };
  }, [projects]);

  const open = (id: string | null) => {
    setOpenId(id);
    // Keep the address shareable without triggering another scroll.
    const url = id ? `#${id}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  };

  const index = projects.findIndex((p) => p.id === openId);
  const current = index >= 0 ? projects[index] : null;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Everything else</h2>
        <span className="font-mono text-xs text-muted-foreground">
          showing {shown.length} of {projects.length}
        </span>
      </div>

      <div className="mt-4 grid gap-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="w-14 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Type</span>
          <FilterButton active={type === ANY} onClick={() => setType(ANY)}>All</FilterButton>
          {types.map((t) => (
            <FilterButton key={t} active={type === t} onClick={() => setType(t)}>
              {CATEGORY_LABELS[t]}
            </FilterButton>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="w-14 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Stack</span>
          <FilterButton active={stack === ANY} onClick={() => setStack(ANY)}>Any</FilterButton>
          {stacks.map((s) => (
            <FilterButton key={s} active={stack === s} onClick={() => setStack(s)}>
              {s}
            </FilterButton>
          ))}
        </div>
      </div>

      <ul className="mt-5 border-t border-border">
        {shown.map((project) => (
          <li key={project.id} id={project.id} className="scroll-mt-24 border-b border-border/70">
            <button
              type="button"
              onClick={() => open(project.id)}
              className="grid w-full grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1 px-1 py-3.5 text-left transition-colors hover:bg-card md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.1fr)_minmax(0,1.3fr)_minmax(0,1.5fr)_9.5rem_6.5rem] md:items-center md:px-3"
            >
              <span className="min-w-0">
                <span className="block font-bold">{project.title}</span>
                <span className="block font-serif text-sm text-muted-foreground">{project.subtitle}</span>
              </span>
              <span className="hidden font-serif text-sm text-muted-foreground md:block">{project.kind}</span>
              <span className="hidden font-serif text-sm text-muted-foreground md:block">
                {project.company ?? CATEGORY_LABELS[project.category]}
              </span>
              <span className="col-span-2 font-mono text-xs text-muted-foreground md:col-span-1 md:order-none order-last">
                {project.technologies.slice(0, 3).join(" · ")}
              </span>
              <StatusPill project={project} isLive={liveChecks[project.id] ?? NO_CHECK} />
              <span className="hidden items-center gap-1 text-sm font-semibold text-primary md:inline-flex">
                View Details <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="py-8 text-center text-muted-foreground">
            No projects match both filters. Pick another type or stack.
          </li>
        )}
      </ul>

      <ProjectDrawer
        project={current}
        isLive={(current && liveChecks[current.id]) || NO_CHECK}
        prev={index >= 0 ? projects[(index - 1 + projects.length) % projects.length] : null}
        next={index >= 0 ? projects[(index + 1) % projects.length] : null}
        onNavigate={open}
        onClose={() => open(null)}
      />
    </div>
  );
}
