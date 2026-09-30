import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { projectData } from "@/lib/projectData";
import { isSiteReachable } from "@/lib/utils";
import { ProjectHashFocus } from "@/components/project-hash-focus";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { ProjectIndex } from "@/components/projects/project-index";

export const revalidate = 1800; // Revalidate every 30 minutes

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  // Live checks stream in per project, so a slow site never blocks the page.
  const liveChecks = Object.fromEntries(
    projectData.map((p) => [p.id, p.liveUrl ? isSiteReachable(p.liveUrl) : Promise.resolve(false)])
  );
  const featured = projectData.filter((p) => p.featured);
  const others = projectData.filter((p) => !p.featured);

  return (
    <div className="relative isolate min-h-screen bg-background">
      <Navigation />
      <ProjectHashFocus />

      <div className="container mx-auto max-w-6xl space-y-14 px-4 pb-16 pt-14 md:pt-20">
        <Reveal>
          <header className="grid items-end gap-4 md:grid-cols-[1fr_minmax(0,24rem)]">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                Work · {projectData.length} projects since 2021
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Selected work</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Three systems in depth, then everything else in one index you can filter.
            </p>
          </header>
        </Reveal>

        <FeaturedProjects projects={featured} liveChecks={liveChecks} />

        <Reveal>
          <ProjectIndex projects={others} liveChecks={liveChecks} />
        </Reveal>
      </div>
    </div>
  );
}
