import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProjectRowVisual } from "@/components/projects/project-visual";
import { StatusPill } from "@/components/projects/status-pill";
import { CATEGORY_LABELS, type Project } from "@/lib/projectData";

/** The three case studies as large numbered rows. */
export function FeaturedWork({
  projects,
  liveChecks,
}: {
  projects: Project[];
  liveChecks: Record<string, Promise<boolean>>;
}) {
  return (
    <ol className="divide-y divide-border">
      {projects.map((p, i) => {
        const study = p.caseStudy;
        return (
          <li key={p.id} id={p.id} className="scroll-mt-24">
            <Reveal>
              <Link
                href={study ? `/projects/${p.id}` : `/projects#${p.id}`}
                className="group grid gap-6 py-10 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,20rem)] md:gap-8"
              >
                <span className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="label">{CATEGORY_LABELS[p.category]}</span>
                    <StatusPill project={p} isLive={liveChecks[p.id]} />
                  </div>
                  <h3 className="font-display text-4xl leading-none tracking-tight transition-colors group-hover:text-primary md:text-5xl">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground">{p.subtitle}</p>
                  {study && (
                    <dl className="grid gap-3 pt-1 text-[15px] sm:grid-cols-2">
                      <div>
                        <dt className="label mb-1">My role</dt>
                        <dd>{study.summary.role}</dd>
                      </div>
                      <div>
                        <dt className="label mb-1">Outcome</dt>
                        <dd>{study.summary.outcome}</dd>
                      </div>
                    </dl>
                  )}
                  <span className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-primary">
                    Read the case study
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>

                <div className="relative grid min-h-52 place-items-center overflow-hidden rounded-xl border border-primary/40 bg-card px-4 pb-8 pt-6 transition-colors group-hover:border-primary">
                  <ProjectRowVisual id={p.id} />
                </div>
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
