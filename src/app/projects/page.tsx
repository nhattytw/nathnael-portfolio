import type { Metadata } from "next";
import { FeaturedWork } from "@/components/site/featured-work";
import { ContactBand, Container, PageHeader, SectionHeading } from "@/components/site/primitives";
import { ProjectList } from "@/components/site/project-list";
import { projectData } from "@/lib/projectData";
import { isSiteReachable } from "@/lib/utils";

export const revalidate = 900; // Revalidate every 15 minutes

export const metadata: Metadata = { title: "Work" };

export default function ProjectsPage() {
  // Live checks stream in per project, so a slow site never blocks the page.
  const liveChecks = Object.fromEntries(
    projectData.map((p) => [p.id, p.liveUrl ? isSiteReachable(p.liveUrl) : Promise.resolve(false)])
  );
  const featured = projectData.filter((p) => p.featured);
  const others = projectData.filter((p) => !p.featured);

  return (
    <Container>
      <PageHeader
        eyebrow={`Work · ${projectData.length} projects since 2021`}
        title={
          <>
            Things I&apos;ve <em className="text-primary">shipped</em>
          </>
        }
        lead="Three systems written up in depth, then everything else in one index. Status dots are real: each public site is checked every 15 minutes."
      />

      <div className="pt-10">
        <SectionHeading index="Case studies" title="In depth" />
        <FeaturedWork projects={featured} liveChecks={liveChecks} />
      </div>

      <div className="space-y-8 pt-16">
        <SectionHeading index="Index" title="Everything else" />
        <ProjectList projects={others} liveChecks={liveChecks} />
      </div>

      <div className="pt-24">
        <ContactBand title="Need something like this built?" />
      </div>
    </Container>
  );
}
