import { Reveal } from "@/components/motion/reveal";
import { ExperienceLedger } from "@/components/site/experience-ledger";
import { FeaturedWork } from "@/components/site/featured-work";
import {
  ContactBand,
  Container,
  PrimaryButton,
  ResumeButton,
  SectionHeading,
  TextLink,
} from "@/components/site/primitives";
import { StatusBoard } from "@/components/site/status-board";
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
  const { availability, contact, socials } = generalData;

  return (
    <>
      {/* Hero: rendered without scroll reveals so it shows before JavaScript loads. */}
      <Container className="grid items-center gap-12 pb-20 pt-12 md:pt-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
        <div className="space-y-7">
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
            <span className="live-dot" />
            <span className="text-foreground">Available for new roles</span>
            <span aria-hidden>·</span>
            <span>Addis Ababa, GMT+3</span>
            <span aria-hidden>·</span>
            <span>Remote worldwide</span>
          </p>
          <h1 className="font-display text-[3.4rem] leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]">
            I build software people rely on <em className="text-primary">day to day.</em>
          </h1>
          <div className="max-w-xl space-y-3 text-lg text-muted-foreground">
            <p>
              I&apos;m <span className="font-medium text-foreground">{generalData.name}</span>, a{" "}
              {generalData.title.toLowerCase()} who takes backend-heavy systems from idea to production.
            </p>
            <p className="text-base">{generalData.bio}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton href="/contact">Send a message</PrimaryButton>
            <ResumeButton />
          </div>
          <p className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted-foreground">
            <a href={`mailto:${contact.email}`} className="hover:text-foreground">
              {contact.email}
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              LinkedIn ↗
            </a>
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              GitHub ↗
            </a>
          </p>
        </div>

        <div>
          <StatusBoard projects={featured} liveChecks={liveChecks} />
        </div>
      </Container>

      {/* Numbers */}
      <section aria-label="At a glance" className="border-y border-border bg-card">
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
      <Container className="pt-24">
        <SectionHeading index="01 / Selected work" title="Three systems, in depth" aside={<TextLink href="/projects">All projects</TextLink>} />
        <FeaturedWork projects={featured} liveChecks={liveChecks} />
      </Container>

      {/* Experience */}
      <Container className="pt-20">
        <SectionHeading
          index="02 / Experience"
          title="Five years, five teams"
          aside={<TextLink href="/experience">Full experience</TextLink>}
        />
        <ExperienceLedger />
      </Container>

      {/* Toolkit */}
      <Container className="pt-20">
        <SectionHeading index="03 / Toolkit" title="What I work with" />
        <div className="grid gap-x-10 gap-y-8 pt-8 sm:grid-cols-2 lg:grid-cols-4">
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
          <Reveal y={16}>
            <h3 className="label mb-3">Looking for</h3>
            <ul className="space-y-1 text-[15px]">
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
      </Container>

      <Container className="pt-24">
        <ContactBand title="Building something ambitious?" />
      </Container>
    </>
  );
}
