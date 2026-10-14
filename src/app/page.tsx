import { Reveal } from "@/components/motion/reveal";
import { ExperienceLedger } from "@/components/site/experience-ledger";
import { FeaturedWork } from "@/components/site/featured-work";
import { HeroGrid } from "@/components/site/hero-grid";
import { HeroRole } from "@/components/site/hero-role";
import {
  ContactBand,
  Container,
  PrimaryButton,
  ResumeButton,
  SectionHeading,
  TextLink,
} from "@/components/site/primitives";
import { StackMarquee } from "@/components/site/stack-marquee";
import { generalData } from "@/lib/generalData";
import { projectData } from "@/lib/projectData";
import { isSiteReachable } from "@/lib/utils";

export const revalidate = 900;

export default function HomePage() {
  const featured = projectData.filter((p) => p.featured);
  // Live checks stream in per project, so a slow site never blocks the page.
  const liveChecks = Object.fromEntries(
    featured.map((p) => [p.id, p.liveUrl ? isSiteReachable(p.liveUrl) : Promise.resolve(false)])
  );
  const { availability } = generalData;

  return (
    <>
      {/* Hero: rendered without scroll reveals so it shows before JavaScript loads. */}
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col">
        <HeroGrid />

        <Container className="relative flex w-full flex-1 flex-col pt-10 md:pt-16">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border pb-4 font-mono text-xs text-muted-foreground">
            <span>{generalData.title}</span>
            <span className="inline-flex items-center gap-2 text-foreground">
              <span className="live-dot" /> Available for new roles
            </span>
          </div>

          <div className="my-auto max-w-2xl space-y-6 py-16">
            <HeroRole />
            <h1 className="text-balance font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              I build software people rely on <em className="text-primary">day&nbsp;to&nbsp;day.</em>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              I&apos;m Nathnael. For 5+ years I&apos;ve been taking backend-heavy systems from idea to production.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <PrimaryButton href="#work" arrow="up-right" pulse>
                See My Work
              </PrimaryButton>
              <ResumeButton />
            </div>
          </div>

          <a
            href="#glance"
            aria-label="Scroll to content"
            className="group mb-8 inline-flex items-center gap-3 self-start font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="relative h-8 w-px overflow-hidden bg-border">
              <span className="scroll-tick absolute inset-x-0 top-0 h-1/3 bg-primary" />
            </span>
            Scroll
          </a>
        </Container>

        <StackMarquee />
      </section>

      {/* Numbers */}
      <section id="glance" aria-label="At a glance" className="scroll-mt-16 border-y border-border bg-card">
        <Container>
          <dl className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
            {generalData.impactMetrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08} className="px-2 py-8 md:px-8">
                <dt className="label">{m.label}</dt>
                <dd className="mt-2 font-display text-5xl leading-none tracking-tight md:text-6xl">
                  {m.prefix}
                  {m.value}
                  <span className="text-primary">{m.suffix}</span>
                </dd>
                <dd className="mt-2 text-xs text-muted-foreground">{m.source}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Work */}
      <Container id="work" className="scroll-mt-20 pt-16">
        <SectionHeading index="01 / Selected work" title="Three systems, in depth" aside={<TextLink href="/projects">All projects</TextLink>} />
        <FeaturedWork projects={featured} liveChecks={liveChecks} />
      </Container>

      {/* Experience */}
      <Container className="pt-14">
        <SectionHeading
          index="02 / Experience"
          title="Five years, five teams"
          aside={<TextLink href="/experience">Full experience</TextLink>}
        />
        <ExperienceLedger />
      </Container>

      {/* Toolkit */}
      <Container className="pt-14">
        <SectionHeading index="03 / Toolkit" title="What I work with" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-8 sm:gap-x-10 lg:grid-cols-4">
          {Object.entries(generalData.skills).map(([group, skills], i) => (
            <Reveal key={group} delay={(i % 4) * 0.06} y={16}>
              <h3 className="label mb-3">{group}</h3>
              <ul className="space-y-1">
                {skills.map((s) => (
                  <li key={s} className="text-[15px]">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          {/* Its own full-width row, under the skill groups. */}
          <div className="col-span-full">
            <Reveal y={16} className="border-t border-border pt-6">
              <h3 className="label mb-3">Looking for</h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[15px]">
                {availability.roles.map((r) => (
                  <li key={r}>{r}</li>
                ))}
                {availability.workplaces.map((w) => (
                  <li key={w.label} className="text-muted-foreground">
                    {w.label}, {w.detail}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>

      <Container className="pt-16">
        <ContactBand title="Building something ambitious?" />
      </Container>
    </>
  );
}
