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
  Flame,
  Lightbulb,
  BookOpen,
  Globe,
  Mountain,
  Fingerprint,

  Handshake,
  Coffee,
  Rocket,
  Users,
  Sparkles,
  Target,
  Trophy,
  Star,
} from "lucide-react";
import { AnimatedIcon } from "@/components/motion/animated-icon";
import { DecorIcons, FloatingIcons } from "@/components/motion/floating-icons";
import { AboutStory } from "@/components/about-story";
import { generalData } from "@/lib/generalData";

export const metadata: Metadata = { title: "About" };

// One icon per story section, shown beside its number on wider screens.
// Launching IIMCS, the biometric scanner work, and sitting with clients.
const STORY_ICONS = [Rocket, Fingerprint, Handshake];

export default function AboutPage() {
  const { about } = generalData;

  return (
    <div className="relative isolate min-h-screen bg-background text-foreground">
      <Navigation />
      <FloatingIcons
        icons={[Lightbulb, BookOpen, Globe, Compass, Mountain, Rocket, Coffee, Languages]}
        column="4xl"
        className="top-16"
      />

      <SectionContainer className="pt-16 pb-12">
        <div className="space-y-12 max-w-4xl mx-auto">
          {/* Header */}
          <Reveal className="relative space-y-5">
            <div className="absolute right-0 top-2 hidden lg:block">
              <DecorIcons icons={[Lightbulb, Globe, BookOpen]} layout="cluster" />
            </div>
            <AnimatedIcon loop="pulse" className="h-11 w-11 items-center justify-center rounded-full border-2 border-primary text-primary">
              <Flame className="h-5 w-5" />
            </AnimatedIcon>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              About
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              What drives me
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground font-sans">
              <span className="flex items-center gap-1.5">
                <AnimatedIcon loop="bob"><MapPin className="h-4 w-4 text-primary" /></AnimatedIcon> Addis Ababa, Ethiopia · Remote worldwide
              </span>
              <span className="flex items-center gap-1.5">
                <Languages className="h-4 w-4 text-primary" /> {generalData.languages.join(" · ")}
              </span>
            </div>
          </Reveal>

          {/* Story */}
          <AboutStory
            story={about.story}
            icons={STORY_ICONS.map((Icon, i) => <Icon key={i} className="h-5 w-5" />)}
          />

          <Separator />

          {/* How I work */}
          <Reveal className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
              <AnimatedIcon loop="wiggle"><Compass className="h-6 w-6" /></AnimatedIcon> How I work
              <DecorIcons icons={[Users, Target, Sparkles]} className="ml-auto" />
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
              <AnimatedIcon loop="bob"><GraduationCap className="h-6 w-6" /></AnimatedIcon> Education
              <DecorIcons icons={[BookOpen, Star, Lightbulb]} offset={2} className="ml-auto" />
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
              <AnimatedIcon loop="pulse"><Award className="h-6 w-6" /></AnimatedIcon> Certifications & Recognition
              <DecorIcons icons={[Trophy, Star, Sparkles]} offset={4} className="ml-auto" />
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
