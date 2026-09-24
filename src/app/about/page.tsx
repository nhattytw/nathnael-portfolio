import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Reveal } from "@/components/motion/reveal";
import { ViewCertificateButton } from "@/components/view-certificate-button";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap,
  Award,
  ExternalLink,
  Languages,
  Compass,
  MapPin,
} from "lucide-react";
import { generalData } from "@/lib/generalData";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const { about } = generalData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <SectionContainer className="pt-24 pb-16">
        <div className="space-y-16 max-w-4xl mx-auto">
          {/* Header */}
          <Reveal className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              About
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              What drives me
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground font-sans">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" /> Addis Ababa, Ethiopia · Remote worldwide
              </span>
              <span className="flex items-center gap-1.5">
                <Languages className="h-4 w-4 text-primary" /> {generalData.languages.join(" · ")}
              </span>
            </div>
          </Reveal>

          {/* Story */}
          <div className="space-y-12">
            {about.story.map((section, i) => (
              <Reveal key={section.heading} className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-10">
                <div className="flex md:flex-col items-baseline md:items-start gap-3">
                  <span className="font-mono text-sm text-primary">0{i + 1}</span>
                  <h2 className="text-xl font-bold leading-snug">{section.heading}</h2>
                </div>
                <div className="space-y-4">
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="text-lg leading-relaxed text-foreground/90">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Separator />

          {/* How I work */}
          <Reveal className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
              <Compass className="h-6 w-6" /> How I work
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {about.principles.map((principle) => (
                <SpotlightCard key={principle.title} className="border-border/60 py-0">
                  <CardContent className="p-6 space-y-2">
                    <h3 className="font-bold text-lg">{principle.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{principle.body}</p>
                  </CardContent>
                </SpotlightCard>
              ))}
            </div>
          </Reveal>

          <Separator />

          {/* Education (full width), then certifications */}
          <Reveal className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
              <GraduationCap className="h-6 w-6" /> Education
            </h2>
            {about.education.map((edu) => (
              <SpotlightCard key={edu.degree} className="border-border/60 py-0" tilt={1.5}>
                <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <p className="text-primary font-sans font-medium">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-muted-foreground sm:text-right font-sans">
                    <div>{edu.location}</div>
                    {edu.year && <div className="font-mono">{edu.year}</div>}
                  </div>
                </CardContent>
              </SpotlightCard>
            ))}
          </Reveal>

          <Reveal className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
              <Award className="h-6 w-6" /> Certifications & Recognition
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {about.certifications.map((cert) => (
                <SpotlightCard
                  key={cert.name}
                  className={`py-0 ${cert.recognition ? "border-primary/50 sm:col-span-2" : "border-border/60"}`}
                  tilt={cert.recognition ? 1 : 3}
                >
                  <CardContent className="p-5 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold leading-snug">{cert.name}</h3>
                      {cert.recognition && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          Verified recognition
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                      {cert.date && ` · ${cert.date}`}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {cert.certificateId && <ViewCertificateButton certificateId={cert.certificateId} />}
                      {cert.link && (
                        <Link
                          href={cert.link}
                          target="_blank"
                          className="inline-flex items-center text-xs font-medium text-primary border border-primary/40 px-2 py-0.5 rounded-md hover:bg-primary/10 transition-colors"
                        >
                          Verify <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </SpotlightCard>
              ))}
            </div>
          </Reveal>
        </div>
      </SectionContainer>
    </div>
  );
}
