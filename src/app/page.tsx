import type React from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ImpactMetrics } from "@/components/home/impact-metrics";
import { ArchitectureShowcase } from "@/components/home/architecture-showcase";
import { CareerJourney } from "@/components/home/career-journey";
import { SkillsMap } from "@/components/home/skills-map";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionWave } from "@/components/section-wave";
import { AnimatedIcon, type IconLoop } from "@/components/motion/animated-icon";
import { DecorIcons, FloatingIcons } from "@/components/motion/floating-icons";
import {
  Database,
  Server,
  Layout,
  Handshake,
  ArrowRight,
  Sparkles,
  Settings,
  Layers,
  Send,
  Cpu,
  Braces,
  Cloud,
  ShieldCheck,
  Network,
  Container,
  Workflow,
  HardDrive,
  Webhook,
  FileCode,
  Terminal,
  Binary,
  Puzzle,
  Rocket,
  Lightbulb,
  MessageCircle,
  Coffee,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

const competencies = [
  {
    icon: Server,
    loop: "pulse" as IconLoop,
    title: "Backend Engineering",
    body: "RESTful APIs and real-time WebSocket systems on Node.js and Express, with JWT, RBAC, and payment gateway integration.",
  },
  {
    icon: Layout,
    loop: "bob" as IconLoop,
    title: "Full-Stack Delivery",
    body: "Production Next.js and React apps in monorepos, taken from data model to the screen the user sees.",
  },
  {
    icon: Database,
    loop: "pulse" as IconLoop,
    title: "Data & Infrastructure",
    body: "PostgreSQL and MongoDB data models tuned for speed, Supabase, and containerized deployments behind Nginx.",
  },
  {
    icon: Handshake,
    loop: "wiggle" as IconLoop,
    title: "Client-Facing Engineering",
    body: "Requirements, proposals, and training, so what gets built is what the client actually needed.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  icon,
  loop,
  decor,
  offset = 0,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  loop: IconLoop;
  /** Icons for the empty space left and right of the heading (large screens). */
  decor?: [LucideIcon[], LucideIcon[]];
  offset?: number;
}) {
  return (
    <Reveal className="relative text-center space-y-4 mb-10">
      {decor && (
        <>
          <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">
            <DecorIcons icons={decor[0]} layout="cluster" offset={offset} className="h-32 w-40" />
          </div>
          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
            <DecorIcons icons={decor[1]} layout="cluster" offset={offset + 2} className="h-32 w-40" />
          </div>
        </>
      )}
      <AnimatedIcon
        loop={loop}
        className="h-11 w-11 items-center justify-center rounded-full border-2 border-primary text-primary"
      >
        {icon}
      </AnimatedIcon>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
    </Reveal>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <HeroSection>
        {/* Transparent top so the hero background shows through the wave */}
        <SectionWave from="transparent" to="var(--secondary)" className="relative z-10" />
      </HeroSection>
      <ImpactMetrics />

      {/* Core Competencies */}
      <section id="expertise-section" className="relative isolate bg-gradient-to-b from-secondary via-background to-background py-12 md:py-16 scroll-mt-16">
        <div className="container max-w-6xl mx-auto px-4">
          <FloatingIcons icons={[Cpu, Braces, Cloud, ShieldCheck]} column="6xl" />
          <SectionHeading
            eyebrow="What I do"
            title="Core Competencies"
            icon={<Sparkles className="h-5 w-5" />}
            loop="wiggle"
            decor={[
              [Server, Cloud, Braces],
              [ShieldCheck, Cpu, Database],
            ]}
            subtitle="Delivering enterprise-grade systems with a focus on performance, security, and maintainability."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map(({ icon: Icon, loop, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08} className="h-full">
                <SpotlightCard className="group h-full p-8 gap-4 border-none">
                  <div className="relative h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <AnimatedIcon loop={loop}>
                      <Icon className="h-7 w-7 text-primary" />
                    </AnimatedIcon>
                  </div>
                  <h3 className="relative text-xl font-bold">{title}</h3>
                  <p className="relative text-muted-foreground leading-relaxed">{body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Showcase */}
      <SectionWave from="var(--background)" to="var(--secondary)" flip />
      <section id="architecture" className="relative isolate bg-secondary pt-6 pb-12 md:pt-8 md:pb-16 scroll-mt-16">
        <div className="container max-w-5xl mx-auto px-4">
          <FloatingIcons icons={[Network, Container, Workflow, HardDrive, Webhook]} column="5xl" />
          <SectionHeading
            eyebrow="Systems I've built"
            title="Architecture Showcase"
            icon={<Settings className="h-5 w-5" />}
            loop="spin"
            decor={[
              [Network, Container, Webhook],
              [Workflow, HardDrive, Server],
            ]}
            offset={1}
            subtitle="Four systems I've shipped, drawn from the inside. Hover any component to see what it does and what I owned."
          />
          <Reveal>
            <ArchitectureShowcase />
          </Reveal>
        </div>
      </section>

      {/* Career Journey */}
      {/* Heading lives inside CareerJourney: a side panel on desktop, centered on mobile */}
      <section id="journey" className="bg-gradient-to-b from-secondary via-background to-background scroll-mt-16">
        <CareerJourney />
      </section>

      {/* Skills Map */}
      <section id="skills" className="relative isolate bg-gradient-to-b from-background to-secondary py-12 md:py-16 scroll-mt-16">
        <div className="container max-w-5xl mx-auto px-4">
          <FloatingIcons icons={[FileCode, Terminal, Binary, Puzzle]} column="5xl" />
          <SectionHeading
            eyebrow="Stack"
            title="Skills Map"
            icon={<Layers className="h-5 w-5" />}
            loop="bob"
            decor={[
              [FileCode, Terminal, Binary],
              [Puzzle, Braces, GitBranch],
            ]}
            offset={3}
            subtitle="Each skill shows how many companies and projects I've used it in. Hover or tap to see where."
          />
          <Reveal>
            <SkillsMap />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <SectionWave from="var(--secondary)" to="var(--background)" />
      <section className="relative isolate pt-6 pb-12 md:pt-8 md:pb-16">
        <FloatingIcons icons={[Rocket, Lightbulb, MessageCircle, Coffee]} column="3xl" />
        <Reveal className="container max-w-3xl mx-auto px-4 text-center space-y-6">
          <AnimatedIcon
            loop="wiggle"
            className="h-11 w-11 items-center justify-center rounded-full border-2 border-primary text-primary"
          >
            <Send className="h-5 w-5" />
          </AnimatedIcon>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Building something ambitious?
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether it&apos;s a senior role, a founding team, or a product that
            needs building properly from scratch, I&apos;d like to hear about it.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 rounded-full">
              <Link href="/contact">
                Get in touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 rounded-full border-2">
              <Link href="/projects">See projects</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
