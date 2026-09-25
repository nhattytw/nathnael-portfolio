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
import { Database, Server, Layout, Handshake, ArrowRight } from "lucide-react";

const competencies = [
  {
    icon: Server,
    title: "Backend Engineering",
    body: "RESTful APIs and real-time WebSocket systems on Node.js and Express, with JWT, RBAC, and payment gateway integration.",
  },
  {
    icon: Layout,
    title: "Full-Stack Delivery",
    body: "Production Next.js and React apps in monorepos, taken from data model to the screen the user sees.",
  },
  {
    icon: Database,
    title: "Data & Infrastructure",
    body: "PostgreSQL and MongoDB data models tuned for speed, Supabase, and containerized deployments behind Nginx.",
  },
  {
    icon: Handshake,
    title: "Client-Facing Engineering",
    body: "Requirements, proposals, and training, so what gets built is what the client actually needed.",
  },
];

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <Reveal className="text-center space-y-4 mb-14">
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
      <section id="expertise-section" className="bg-gradient-to-b from-secondary via-background to-background py-24 scroll-mt-16">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading
            eyebrow="What I do"
            title="Core Competencies"
            subtitle="Delivering enterprise-grade systems with a focus on performance, security, and maintainability."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08} className="h-full">
                <SpotlightCard className="h-full p-8 gap-4 border-none">
                  <div className="relative h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-primary" />
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
      <section id="architecture" className="bg-secondary pt-12 pb-24 scroll-mt-16">
        <div className="container max-w-5xl mx-auto px-4">
          <SectionHeading
            eyebrow="Systems I've built"
            title="Architecture Showcase"
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
      <section id="skills" className="bg-gradient-to-b from-background to-secondary py-24 scroll-mt-16">
        <div className="container max-w-5xl mx-auto px-4">
          <SectionHeading
            eyebrow="Stack"
            title="Skills Map"
            subtitle="Each skill shows how many companies and projects I've used it in. Hover or tap to see where."
          />
          <Reveal>
            <SkillsMap />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <SectionWave from="var(--secondary)" to="var(--background)" />
      <section className="pt-12 pb-24">
        <Reveal className="container max-w-3xl mx-auto px-4 text-center space-y-6">
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
