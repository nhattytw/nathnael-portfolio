"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProjectRowVisual } from "@/components/projects/project-visual";
import { StatusPill } from "@/components/projects/status-pill";
import { CATEGORY_LABELS, type Project } from "@/lib/projectData";
import { cn } from "@/lib/utils";

interface FeaturedProjectsProps {
  projects: Project[];
  liveChecks: Record<string, Promise<boolean>>;
}

/**
 * The featured projects as wide rows, each leading to its case study.
 * On phones they collapse into an accordion with one row open at a time.
 */
export function FeaturedProjects({ projects, liveChecks }: FeaturedProjectsProps) {
  const [openId, setOpenId] = useState<string | undefined>(projects[0]?.id);

  // Opening /projects#yenecart (e.g. from the experience page) opens that row.
  useEffect(() => {
    const sync = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (projects.some((p) => p.id === id)) setOpenId(id);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [projects]);

  return (
    <div className="border-t border-border">
      {projects.map((project, index) => {
        const study = project.caseStudy;
        const open = openId === project.id;
        const href = `/projects/${project.id}`;
        const meta = [CATEGORY_LABELS[project.category], project.company, project.period].filter(Boolean).join(" · ");
        return (
          <article key={project.id} id={project.id} className="scroll-mt-24 border-b border-border">
            <button
              type="button"
              onClick={() => setOpenId(open ? undefined : project.id)}
              aria-expanded={open}
              aria-controls={`featured-${project.id}`}
              className="flex w-full items-center justify-between gap-4 py-5 text-left md:hidden"
            >
              <span className="min-w-0">
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  {CATEGORY_LABELS[project.category]}
                </span>
                <span className="mt-1 block text-2xl font-bold tracking-tight">{project.title}</span>
                <span className="mt-0.5 block font-serif text-sm text-muted-foreground">{project.subtitle}</span>
              </span>
              <span
                aria-hidden
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full border-[1.5px] transition-all duration-300",
                  open ? "rotate-45 border-primary bg-primary text-primary-foreground" : "border-border text-primary"
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>

            <Reveal>
              <div
                id={`featured-${project.id}`}
                className={cn(
                  "gap-6 pb-7 md:grid md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-10 md:py-8",
                  open ? "grid" : "hidden"
                )}
              >
                <Link
                  href={href}
                  aria-label={`${project.title} case study`}
                  className={cn(
                    "relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60",
                    index % 2 === 1 && "md:order-2"
                  )}
                >
                  <ProjectRowVisual id={project.id} />
                </Link>

                <div className="grid gap-3">
                  <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-primary md:block">{meta}</p>
                  <h2 className="hidden text-3xl font-bold tracking-tight md:block lg:text-4xl">{project.title}</h2>
                  <p className="-mt-1 hidden text-muted-foreground md:block">{project.subtitle}</p>
                  {study && (
                    <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[15px]">
                      <dt className="pt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Role</dt>
                      <dd className="font-serif">{study.summary.role}</dd>
                      <dt className="pt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Outcome</dt>
                      <dd className="font-serif">{study.summary.outcome}</dd>
                      <dt className="pt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Stack</dt>
                      <dd className="font-mono text-[13px]">{project.technologies.slice(0, 4).join(" · ")}</dd>
                    </dl>
                  )}
                  <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <Link href={href} className="group inline-flex items-center gap-1.5 font-semibold text-primary">
                      Read Case Study
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <StatusPill project={project} isLive={liveChecks[project.id]} />
                  </div>
                </div>
              </div>
            </Reveal>
          </article>
        );
      })}
    </div>
  );
}
