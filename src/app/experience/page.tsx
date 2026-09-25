import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experienceData } from "@/lib/experienceData";
import { projectsById } from "@/lib/projectData";
import { generalData } from "@/lib/generalData";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { TimelineProgress } from "@/components/timeline-progress";
import {
  Download,
  FolderGit2,
  MapPin,
  Briefcase,
  ExternalLink,
  ArrowUpRight,
  Building2,
  TrendingUp,
  Users,
  Award,
  Target,
  GitMerge,
  Handshake,
  Presentation,
  Calendar,
  Rocket,
  Sparkles,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { AnimatedIcon } from "@/components/motion/animated-icon";
import { DecorIcons, FloatingIcons } from "@/components/motion/floating-icons";

export const metadata: Metadata = { title: "Experience" };

// Fill the empty end of each metrics row; sets rotate so neighbouring rows differ.
const ROW_ICONS: LucideIcon[][] = [
  [TrendingUp, Target, Sparkles],
  [Award, Rocket, Users],
  [Presentation, Lightbulb, GitMerge],
  [Handshake, Calendar, Building2],
];

export default function ExperiencePage() {
  return (
    <div className="relative isolate min-h-screen bg-background text-foreground">
      <Navigation />
      <FloatingIcons
        icons={[Building2, TrendingUp, Users, Award, Target, GitMerge, Handshake, Presentation, Calendar, Rocket]}
        column="4xl"
        className="top-16"
      />

      <SectionContainer className="pt-16 pb-12">
        <div className="space-y-10 max-w-4xl mx-auto">
          {/* Header with Resume Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <AnimatedIcon loop="wiggle" className="h-11 w-11 items-center justify-center rounded-full border-2 border-primary text-primary">
                <Briefcase className="h-5 w-5" />
              </AnimatedIcon>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Professional Experience
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Five companies, each role building on the last.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="h-12 px-6 shadow-lg shadow-primary/10"
            >
              <a
                href={generalData.resume.href}
                download={generalData.resume.downloadName}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-5 w-5" /> Download Resume
              </a>
            </Button>
          </div>

          <TimelineProgress>
            {experienceData.map((company, ci) => (
              <Reveal key={company.company} className="relative pl-8 md:pl-12">
                <div className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background" />

                {/* Company header: name, then location, then work type */}
                <div className="space-y-1.5 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h2 className="text-2xl font-bold leading-tight">
                      {company.company}
                      {company.note && (
                        <span className="ml-2 align-middle text-sm font-medium text-muted-foreground">
                          ({company.note})
                        </span>
                      )}
                    </h2>
                    <Badge variant="secondary" className="w-fit font-mono text-xs">
                      {company.period}
                    </Badge>
                  </div>
                  <p className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    {company.location}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4 shrink-0" />
                    {company.workType}
                  </p>
                </div>

                {/* Roles, newest first */}
                <ol className="space-y-8 border-l border-dashed border-line/70 pl-5">
                  {company.roles.map((role, ri) => (
                    <li key={`${role.title}-${role.period}`} className="relative space-y-4 font-sans">
                      <span className="absolute -left-[25px] top-2 h-2 w-2 rounded-full bg-line" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="text-lg font-bold text-primary">{role.title}</h3>
                        <span className="font-mono text-xs text-muted-foreground">
                          {role.period}
                          {role.employment && ` · ${role.employment}`}
                        </span>
                      </div>

                      {role.metrics && (
                        <div className="flex flex-wrap gap-3">
                          {role.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2"
                            >
                              <CountUp
                                value={metric.value}
                                prefix={metric.prefix}
                                suffix={metric.suffix}
                                className="block text-xl font-extrabold text-primary tabular-nums"
                              />
                              <span className="text-xs text-muted-foreground">
                                {metric.label}
                              </span>
                            </div>
                          ))}
                          <DecorIcons
                            icons={ROW_ICONS[(ci + ri) % ROW_ICONS.length]}
                            offset={ci + ri}
                            className="ml-auto self-center pr-4"
                          />
                        </div>
                      )}

                      <ul className="space-y-2.5">
                        {role.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm md:text-base"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="bg-background/50"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>

                {/* Projects delivered here: each chip links to its card */}
                {company.projects && (
                  <div className="mt-6 space-y-2">
                    <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <AnimatedIcon loop="bob"><FolderGit2 className="h-4 w-4 text-primary" /></AnimatedIcon> Projects delivered
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {company.projects.map((id) => {
                        const project = projectsById[id];
                        if (!project) return null;
                        return (
                          <Link
                            key={id}
                            href={`/projects#${id}`}
                            className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-card px-3 py-1 text-sm transition-colors hover:border-primary hover:bg-primary/10"
                          >
                            <span className="font-semibold text-foreground">{project.title}</span>
                            <span className="text-muted-foreground">· {project.kind}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-primary opacity-60 transition-opacity group-hover:opacity-100" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {company.reference && (
                  <a
                    href={company.reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
                  >
                    {company.reference.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </Reveal>
            ))}
          </TimelineProgress>
        </div>
      </SectionContainer>
    </div>
  );
}
