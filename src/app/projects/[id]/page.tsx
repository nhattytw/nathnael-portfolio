import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CaseStudyVisual } from "@/components/projects/project-visual";
import { StatusPill } from "@/components/projects/status-pill";
import { ViewCertificateButton } from "@/components/view-certificate-button";
import { CATEGORY_LABELS, projectData } from "@/lib/projectData";
import { isSiteReachable } from "@/lib/utils";

export const revalidate = 1800;
export const dynamicParams = false;

const caseStudies = projectData.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return caseStudies.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = caseStudies.find((p) => p.id === id);
  return project ? { title: `${project.title} case study`, description: project.subtitle } : {};
}

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section id={id} className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = caseStudies.findIndex((p) => p.id === id);
  const project = caseStudies[index];
  const study = project?.caseStudy;
  if (!project || !study) notFound();

  const next = caseStudies[(index + 1) % caseStudies.length];
  const isLive = project.liveUrl ? isSiteReachable(project.liveUrl) : Promise.resolve(false);

  // Only sections with written content appear, and the page menu follows them.
  const sections = [
    { id: "overview", title: "Overview", show: true },
    { id: "problem", title: "The problem", show: true },
    { id: "built", title: "What I built", show: true },
    { id: "decisions", title: "Key decisions", show: study.decisions.length > 0 },
    { id: "outcome", title: "Outcome", show: study.metrics.length > 0 },
    { id: "lessons", title: "Looking back", show: Boolean(study.lessons) },
  ].filter((s) => s.show);

  const facts = [
    { label: "Role", value: study.role },
    { label: "Scope", value: study.scope },
    { label: "Stack", value: project.technologies.slice(0, 5).join(", ") },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <article className="container mx-auto max-w-6xl space-y-12 px-4 pb-16 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/projects" className="group inline-flex items-center gap-1.5 font-semibold text-primary">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All Projects
          </Link>
          <span className="font-mono text-xs text-muted-foreground">projects / {project.id}</span>
        </div>

        <Reveal>
          <header className="max-w-4xl space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {["Case study", CATEGORY_LABELS[project.category], project.company, project.period].filter(Boolean).join(" · ")}
            </p>
            <h1 className="text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">{project.title}</h1>
            <p className="text-lg text-muted-foreground md:text-xl">{project.subtitle}</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-4 md:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{f.label}</dt>
                  <dd className="mt-1 text-[15px]">{f.value}</dd>
                </div>
              ))}
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Status</dt>
                <dd className="mt-1">
                  <StatusPill project={project} isLive={isLive} />
                </dd>
              </div>
            </dl>
            {(project.liveUrl || project.certificateId) && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {project.liveUrl && (
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-1.5 h-4 w-4" /> {host(project.liveUrl)}
                    </a>
                  </Button>
                )}
                {project.certificateId && (
                  <ViewCertificateButton
                    certificateId={project.certificateId}
                    label="View Certificate"
                    className="h-8 rounded-full px-3 text-sm"
                  />
                )}
              </div>
            )}
          </header>
        </Reveal>

        <Reveal>
          <CaseStudyVisual id={project.id} caption={study.visualCaption} />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-14">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-24 space-y-0.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block border-l-2 border-border py-1.5 pl-3 font-sans text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-[68ch] space-y-12 text-[17px] leading-relaxed">
            <Section id="overview" title="Overview">
              <p>{project.description}</p>
            </Section>

            <Section id="problem" title="The problem">
              <p>{study.problem}</p>
              {study.problemDetail && <p>{study.problemDetail}</p>}
            </Section>

            <Section id="built" title="What I built">
              <ul className="list-disc space-y-2 pl-5">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Section>

            {study.decisions.length > 0 && (
              <Section id="decisions" title="Key decisions">
                <div className="grid gap-3.5">
                  {study.decisions.map((d) => (
                    <div key={d.title} className="space-y-2 rounded-xl border border-border bg-card p-5">
                      <h3 className="text-lg font-bold">{d.title}</h3>
                      <p className="text-base">{d.body}</p>
                      {d.detail && <p className="text-base text-muted-foreground">{d.detail}</p>}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {study.metrics.length > 0 && (
              <Section id="outcome" title="Outcome">
                <dl className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-5">
                  {study.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="text-4xl font-extrabold tracking-tight text-primary tabular-nums">{m.value}</dt>
                      <dd className="mt-1 font-mono text-xs text-muted-foreground">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              </Section>
            )}

            {study.lessons && (
              <Section id="lessons" title="Looking back">
                <p>{study.lessons}</p>
              </Section>
            )}
          </div>
        </div>

        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-primary px-7 py-6 text-primary-foreground">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Building something like this?</h2>
              <p className="opacity-85">I&apos;d like to hear about it.</p>
            </div>
            <Button asChild size="lg" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/contact">
                Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        {next && next.id !== project.id && (
          <div className="flex justify-end">
            <Link href={`/projects/${next.id}`} className="group text-right">
              <small className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Next case study</small>
              <span className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-3xl">
                {next.title} <ArrowRight className="inline h-6 w-6 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}
