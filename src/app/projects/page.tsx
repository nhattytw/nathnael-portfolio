import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { projectData } from "@/lib/projectData";
import { isSiteReachable } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";
import { ProjectHashFocus } from "@/components/project-hash-focus";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedIcon } from "@/components/motion/animated-icon";
import { DecorIcons, FloatingIcons } from "@/components/motion/floating-icons";
import {
  Boxes,
  Code2,
  Coffee,
  Database,
  Fingerprint,
  FolderGit2,
  Globe,
  LayoutDashboard,
  Layers,
  Package,
  Rocket,
  Scale,
  ShoppingCart,
  Sparkles,
  Terminal,
  GitBranch,
} from "lucide-react";

export const revalidate = 1800; // Revalidate every 30 minutes

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  // Live checks stream in per card, so a slow site never blocks the page.
  const projectsWithStatus = projectData.map((project) => ({
    ...project,
    isLive: project.liveUrl ? isSiteReachable(project.liveUrl) : Promise.resolve(false),
  }));

  return (
    <div className="relative isolate min-h-screen bg-background">
      <Navigation />
      <ProjectHashFocus />
      <FloatingIcons
        icons={[Rocket, Globe, Layers, Boxes, ShoppingCart, Scale, Coffee, Fingerprint, Database, LayoutDashboard, Package, Code2]}
        column="6xl"
        className="top-16"
      />

      <SectionContainer className="pt-16 pb-12 [&>div]:max-w-6xl">
        <div className="space-y-10">
          <div className="relative">
            <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">
              <DecorIcons icons={[Rocket, Code2, Sparkles]} layout="cluster" className="h-32 w-40" />
            </div>
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
              <DecorIcons icons={[Terminal, GitBranch, Globe]} layout="cluster" offset={2} className="h-32 w-40" />
            </div>
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <AnimatedIcon loop="bob" className="h-11 w-11 items-center justify-center rounded-full border-2 border-primary text-primary">
                <FolderGit2 className="h-5 w-5" />
              </AnimatedIcon>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Projects
              </h1>
              <p className="text-xl text-muted-foreground">
                Production systems, client work, and the tools and experiments
                in between.
              </p>
            </div>
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
