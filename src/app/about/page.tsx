import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ContactBand, Container, PageHeader, SectionHeading } from "@/components/site/primitives";
import { ViewCertificateButton } from "@/components/view-certificate-button";
import { generalData } from "@/lib/generalData";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const { about } = generalData;

  return (
    <Container>
      <PageHeader
        eyebrow={`About · Addis Ababa, Ethiopia · ${generalData.languages.join(" & ")}`}
        title={
          <>
            What <em className="text-primary">drives</em> me
          </>
        }
        lead={generalData.bio}
      />

      {/* Story: three chapters, each with a big number and a heading in the margin */}
      <div className="pt-10">
        {about.story.map((chapter, i) => (
          <Reveal key={chapter.heading}>
            <section className="grid gap-4 border-t border-border py-10 md:grid-cols-[4rem_16rem_minmax(0,1fr)] md:gap-8">
              <span className="font-display text-5xl leading-none text-primary">{i + 1}</span>
              <h2 className="font-display text-3xl leading-tight tracking-tight">{chapter.heading}</h2>
              <div className="max-w-[65ch] space-y-4 text-[17px] leading-relaxed">
                {chapter.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      {/* Principles */}
      <div className="pt-16">
        <SectionHeading index="How I work" title="Four habits I keep" />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {about.principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08} className="h-full">
              <div className="h-full space-y-2 bg-card p-7">
                <p className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Education and certifications */}
      <div className="grid gap-16 pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <div>
          <SectionHeading index="Education" title="Studied" />
          {about.education.map((edu) => (
            <Reveal key={edu.degree}>
              <div className="space-y-1 py-6">
                <p className="font-mono text-xs text-muted-foreground">{edu.year}</p>
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-muted-foreground">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{edu.location}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div>
          <SectionHeading index="Certifications & recognition" title="Recognised" />
          <ul className="divide-y divide-border">
            {about.certifications.map((cert) => (
              <li key={cert.name}>
                <Reveal y={16}>
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 py-5">
                    <div className="min-w-0 max-w-xl space-y-1">
                      {cert.recognition && (
                        <span className="inline-block rounded-full bg-primary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-foreground">
                          Recognition
                        </span>
                      )}
                      <h3 className="font-medium leading-snug">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer}
                        {cert.date && ` · ${cert.date}`}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cert.certificateId && (
                        <ViewCertificateButton certificateId={cert.certificateId} label="View" className="h-8 rounded-full px-3 text-sm" />
                      )}
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 items-center gap-1 rounded-full border border-border px-3 text-sm hover:border-foreground/40"
                        >
                          Verify <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-20">
        <ContactBand title="Sound like a fit for your team?" />
      </div>
    </Container>
  );
}
