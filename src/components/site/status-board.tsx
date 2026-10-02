import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatusPill } from "@/components/projects/status-pill";
import type { Project } from "@/lib/projectData";

/**
 * The home page's signature: the systems I've shipped, laid out like a status
 * page. Live states come from a real reachability check on the server.
 */
export function StatusBoard({
  projects,
  liveChecks,
}: {
  projects: Project[];
  liveChecks: Record<string, Promise<boolean>>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_0_var(--border),0_24px_48px_-32px_rgb(0_0_0/0.35)]">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
        <span className="label">Systems in production</span>
        <span className="font-mono text-xs text-muted-foreground">checked every 15 min</span>
      </div>

      <ul className="divide-y divide-border">
        {projects.map((p) => (
          <li key={p.id}>
            <Link
              href={p.caseStudy ? `/projects/${p.id}` : `/projects#${p.id}`}
              className="group grid gap-1.5 px-5 py-4 transition-colors hover:bg-muted/60"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  {p.title}
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                <StatusPill project={p} isLive={liveChecks[p.id]} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span>
                  {p.kind}
                  {p.company && ` · ${p.company}`}
                </span>
                {p.headline && <span className="font-mono text-xs text-foreground/80">{p.headline}</span>}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/40 px-5 py-3 text-sm">
        <span className="text-muted-foreground">+ client sites, internal tools and more</span>
        <Link href="/projects" className="font-medium hover:text-primary">
          All work →
        </Link>
      </div>
    </div>
  );
}
