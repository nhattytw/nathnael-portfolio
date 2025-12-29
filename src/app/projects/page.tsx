import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { projectData } from "@/lib/projectData";
import { isSiteReachable } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";

export const revalidate = 1800; // Revalidate every 30 minutes

export default async function ProjectsPage() {
  const projectsWithStatus = await Promise.all(
    projectData.map(async (project) => {
      let isLive = false;
      if (project.liveUrl && project.liveUrl.length > 0) {
        isLive = await isSiteReachable(project.liveUrl);
      }
      return { ...project, isLive };
    })
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <SectionContainer className="pt-24 pb-16">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Featured Projects
            </h1>
            <p className="text-xl text-muted-foreground">
              A selection of architected systems, demonstrating expertise in
              high-availability, security, and complex data management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projectsWithStatus.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
