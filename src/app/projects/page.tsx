import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { projectData } from "@/lib/projectData";
import { isSiteReachable } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";
import { ProjectHashFocus } from "@/components/project-hash-focus";
import { Reveal } from "@/components/motion/reveal";

export const revalidate = 1800; // Revalidate every 30 minutes

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projectsWithStatus = await Promise.all(
    projectData.map(async (project) => ({
      ...project,
      isLive: project.liveUrl ? await isSiteReachable(project.liveUrl) : false,
    }))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ProjectHashFocus />

      <SectionContainer className="pt-24 pb-16 [&>div]:max-w-6xl">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground">
              Production systems, client work, and the tools and experiments
              in between.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projectsWithStatus.map((project, index) => (
              <div
                key={project.id}
                id={project.id}
                className={`scroll-mt-24 ${project.featured ? "md:col-span-2" : ""}`}
              >
                <Reveal delay={(index % 2) * 0.08} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
