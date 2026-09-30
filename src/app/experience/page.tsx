import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ContactBand, Container, PageHeader, ResumeButton } from "@/components/site/primitives";
import { experienceData } from "@/lib/experienceData";
import { projectsById } from "@/lib/projectData";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Experience · since February 2021"
        title={
          <>
            Each role built <em className="text-primary">on the last</em>
          </>
        }
        lead="From junior engineer to project lead at Ahaz, account executive to software engineer at Baro, and now founding engineer at Agentic Curve."
      />
      <Reveal className="pb-6">
        <ResumeButton />
      </Reveal>

      <div className="pt-8">
        {experienceData.map((company) => (
          <section
            key={company.company}
            className="grid gap-6 border-t border-border py-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12"
          >
            <Reveal>
              <div className="space-y-2 lg:sticky lg:top-24">
                <p className="font-mono text-xs text-muted-foreground">{company.period}</p>
                <h2 className="font-display text-4xl leading-none tracking-tight">{company.company}</h2>
                {company.note && <p className="text-sm text-primary">{company.note}</p>}
                <p className="text-sm text-muted-foreground">{company.location}</p>
                <p className="text-sm text-muted-foreground">{company.workType}</p>
                {company.reference && (
                  <a
                    href={company.reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 pt-1 text-sm underline-offset-4 hover:text-primary hover:underline"
                  >
                    {company.reference.label} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </Reveal>

            <div className="space-y-10">
              {company.roles.map((role) => (
                <Reveal key={`${role.title}-${role.period}`}>
                  <article className="space-y-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-xl font-semibold">{role.title}</h3>
                      <span className="font-mono text-xs text-muted-foreground">
                        {role.period}
                        {role.employment && ` · ${role.employment}`}
                      </span>
                    </div>

                    {role.metrics && (
                      <dl className="flex flex-wrap gap-x-10 gap-y-4 border-y border-dashed border-border py-4">
                        {role.metrics.map((m) => (
                          <div key={m.label}>
                            <dt className="font-display text-4xl leading-none tracking-tight">
                              {m.prefix}
                              {m.value}
                              <span className="text-primary">{m.suffix}</span>
                            </dt>
                            <dd className="mt-1 text-xs text-muted-foreground">{m.label}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <ul className="space-y-2.5">
                      {role.achievements.map((a) => (
                        <li key={a} className="flex gap-3 text-[15px] leading-relaxed">
                          <span className="mt-2.5 h-1 w-3 shrink-0 bg-primary" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    <ul className="flex flex-wrap gap-1.5">
                      {role.skills.map((s) => (
                        <li key={s} className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-xs text-muted-foreground">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}

              {company.projects && (
                <Reveal>
                  <div className="space-y-3">
                    <p className="label">Projects delivered</p>
                    <ul className="flex flex-wrap gap-2">
                      {company.projects.map((id) => {
                        const project = projectsById[id];
                        if (!project) return null;
                        return (
                          <li key={id}>
                            <Link
                              href={project.caseStudy ? `/projects/${id}` : `/projects#${id}`}
                              className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm transition-colors hover:border-primary"
                            >
                              {project.title}
                              <span className="text-muted-foreground">· {project.kind}</span>
                              <ArrowUpRight className="h-3.5 w-3.5 text-primary opacity-60 group-hover:opacity-100" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="pt-12">
        <ContactBand />
      </div>
    </Container>
  );
}
