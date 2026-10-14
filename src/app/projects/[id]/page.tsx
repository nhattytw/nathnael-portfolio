import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CaseStudyVisual } from "@/components/projects/project-visual";
import { ReferenceLink } from "@/components/projects/reference-link";
import { StatusPill } from "@/components/projects/status-pill";
import { ContactBand, Container } from "@/components/site/primitives";
import { ViewCertificateButton } from "@/components/view-certificate-button";
import { CATEGORY_LABELS, projectData } from "@/lib/projectData";
import { isReferenceLive, isSiteReachable } from "@/lib/utils";

export const revalidate = 900;
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

function Section({ id, index, title, children }: { id: string; index: number; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section id={id} className="grid scroll-mt-24 gap-4 border-t border-border pt-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10">
        <h2 className="space-y-1">
          <span className="label block">{String(index).padStart(2, "0")}</span>
          <span className="block font-display text-3xl leading-tight tracking-tight">{title}</span>
        </h2>
        <div className="max-w-[65ch] space-y-4 text-[17px] leading-relaxed">{children}</div>
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
  const referenceLive = project.reference
    ? isReferenceLive(project.reference.href, project.reference.match)
    : Promise.resolve(false);

  // Only sections with written content appear, numbered in order.
  const sections: { id: string; title: string; body: React.ReactNode }[] = [
    { id: "overview", title: "Overview", body: <p>{project.description}</p> },
    {
      id: "problem",
      title: "The problem",
      body: (
        <>
          <p>{study.problem}</p>
          {study.problemDetail && <p>{study.problemDetail}</p>}
        </>
      ),
    },
    {
      id: "built",
      title: "What I built",
      body: (
        <ul className="space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-3 h-1 w-3 shrink-0 bg-primary" />
              {h}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "stack",
      title: "Built with",
      body: (
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li key={t} className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-sm">
              {t}
            </li>
          ))}
        </ul>
      ),
    },
  ];
  if (study.decisions.length > 0) {
    sections.push({
      id: "decisions",
      title: "Key decisions",
      body: (
        <div className="grid gap-3">
          {study.decisions.map((d) => (
            <div key={d.title} className="space-y-1.5 rounded-xl border border-primary/40 bg-card p-5">
              <h3 className="font-semibold">{d.title}</h3>
              <p className="text-base text-muted-foreground">{d.body}</p>
              {d.detail && <p className="text-base text-muted-foreground">{d.detail}</p>}
            </div>
          ))}
        </div>
      ),
    });
  }
  if (study.metrics.length > 0) {
    sections.push({
      id: "outcome",
      title: "Outcome",
      body: (
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-6">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <dt className="font-display text-5xl leading-none tracking-tight text-primary">{m.value}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{m.label}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }
  if (study.lessons) sections.push({ id: "lessons", title: "Looking back", body: <p>{study.lessons}</p> });

  const facts = [
    { label: "Role", value: study.role },
    { label: "Scope", value: study.scope },
    { label: "Stack", value: project.technologies.slice(0, 5).join(", ") },
  ];

  return (
    <Container>
      <article className="space-y-14">
        <div className="flex flex-wrap items-center justify-between gap-3 pt-8">
          <Link href="/projects" className="group inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All work
          </Link>
          <span className="font-mono text-xs text-muted-foreground">
            case study {index + 1} / {caseStudies.length}
          </span>
        </div>

        <header className="space-y-6">
          <p className="label">
            {[CATEGORY_LABELS[project.category], project.company, project.period].filter(Boolean).join(" · ")}
          </p>
          <h1 className="font-display text-6xl leading-[0.95] tracking-tight md:text-8xl">{project.title}</h1>
          <p className="max-w-2xl text-xl text-muted-foreground">{project.subtitle}</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-5 md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="label">{f.label}</dt>
                <dd className="mt-1.5 text-[15px]">{f.value}</dd>
              </div>
            ))}
            <div>
              <dt className="label">Status</dt>
              <dd className="mt-1.5">
                <StatusPill project={project} isLive={isLive} />
              </dd>
            </div>
          </dl>
          {(project.liveUrl || project.certificateId || project.reference) && (
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-sm hover:border-foreground/40"
                >
                  <Globe className="h-4 w-4" /> {host(project.liveUrl)}
                </a>
              )}
              {project.reference && (
                <ReferenceLink
                  reference={project.reference}
                  isLive={referenceLive}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-sm hover:border-foreground/40"
                  iconClassName="h-4 w-4"
                />
              )}
              {project.certificateId && (
                <ViewCertificateButton
                  certificateId={project.certificateId}
                  label="View certificate"
                  className="h-9 rounded-full px-4 text-sm"
                />
              )}
            </div>
          )}
        </header>

        <Reveal>
          <CaseStudyVisual id={project.id} caption={study.visualCaption} />
        </Reveal>

        <div className="space-y-12">
          {sections.map((s, i) => (
            <Section key={s.id} id={s.id} index={i + 1} title={s.title}>
              {s.body}
            </Section>
          ))}
        </div>

        {next && next.id !== project.id && (
          <Reveal>
            <Link
              href={`/projects/${next.id}`}
              className="group flex flex-wrap items-end justify-between gap-4 border-y border-border py-10"
            >
              <span>
                <span className="label block">Next case study</span>
                <span className="mt-2 block font-display text-5xl leading-none tracking-tight transition-colors group-hover:text-primary md:text-6xl">
                  {next.title}
                </span>
              </span>
              <ArrowRight className="h-8 w-8 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </Reveal>
        )}

        <ContactBand title="Building something like this?" />
      </article>
    </Container>
  );
}
