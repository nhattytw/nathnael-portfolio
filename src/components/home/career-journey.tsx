"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { IN_VIEW_MARGIN } from "@/components/motion/viewport";
import { ArrowRight, Award, Code2, Rocket, Server, Trophy, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Milestone {
  year: string;
  title: string;
  org: string;
  detail: string;
  icon: LucideIcon;
  status?: string;
  /** Taken from that role's skills in experienceData. */
  skills: string[];
}

// Newest first: the timeline reads back in time as you scroll.
const MILESTONES: Milestone[] = [
  {
    year: "2026",
    title: "Founding Engineer",
    org: "Agentic Curve",
    detail: "Owning the CRM, inventory, and trade modules of a multi-module ERP, end to end.",
    icon: Rocket,
    status: "Now",
    skills: ["Next.js", "Supabase", "PostgreSQL"],
  },
  {
    year: "2023",
    title: "Account Executive → Software Engineer",
    org: "Baro Technologies",
    detail: "Won the bids, then built what we won: IIMCS and YeneCart.",
    icon: Trophy,
    status: "IIMCS Recognition",
    skills: ["Next.js", "Docker", "Nginx"],
  },
  {
    year: "2023",
    title: "Senior Backend Developer & Project Lead",
    org: "Ahaz",
    detail: "Owned backend architecture and brought unit testing and code review to the team.",
    icon: Users,
    status: "Promoted",
    skills: ["Software Architecture", "Technical Leadership", "Unit Testing"],
  },
  {
    year: "2022",
    title: "Software Engineer",
    org: "Ahaz",
    detail: "Real-time HR backends over WebSockets, and secure APIs with JWT and RBAC.",
    icon: Server,
    status: "Promoted",
    skills: ["WebSockets", "RESTful APIs", "PyQt5"],
  },
  {
    year: "2021",
    title: "Junior Software Engineer",
    org: "Ahaz",
    detail: "MERN and Python apps, and my first biometric hardware integration.",
    icon: Code2,
    skills: ["Node.js", "Python", "Hardware Integration"],
  },
];

const HEADING = {
  eyebrow: "today → 2021",
  title: "Career Journey",
  subtitle: "From junior engineer to founding engineer in five years.",
};

function MilestoneBody({ m }: { m: Milestone }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-sm font-bold text-primary">{m.year}</p>
        {m.status && (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            · {m.status === "IIMCS Recognition" && <Award className="h-3 w-3 text-primary" />}
            {m.status}
          </span>
        )}
      </div>
      <h3 className="mt-1 text-lg font-bold leading-snug">{m.title}</h3>
      <p className="text-sm font-medium text-foreground/80">{m.org}</p>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.detail}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {m.skills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
          >
            {s}
          </span>
        ))}
      </div>
    </>
  );
}

function MilestoneIcon({ m, isNow, size }: { m: Milestone; isNow: boolean; size: "sm" | "lg" }) {
  const Icon = m.icon;
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg shadow-primary/10",
        size === "lg" ? "relative h-14 w-14" : "absolute left-0 top-0 h-10 w-10"
      )}
    >
      {isNow && <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-40" />}
      <Icon className={cn("text-primary", size === "lg" ? "h-6 w-6" : "h-4 w-4")} />
    </div>
  );
}

const NAV_H = 64;

const TimelineLink = () => (
  <Link
    href="/experience"
    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
  >
    Full experience timeline <ArrowRight className="h-4 w-4" />
  </Link>
);

/** Desktop: the section pins while vertical scroll drives the timeline sideways. */
function HorizontalJourney() {
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [stickyTop, setStickyTop] = useState(NAV_H);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !trackRef.current || !stickyRef.current) return;
      const h = stickyRef.current.offsetHeight;
      setDistance(Math.max(0, trackRef.current.offsetWidth - viewportRef.current.clientWidth));
      setContentHeight(h);
      // Pin the content centred in the space below the nav, not at full screen height.
      setStickyTop(Math.max(NAV_H, NAV_H + (window.innerHeight - NAV_H - h) / 2));
    };
    measure();
    const ro = new ResizeObserver(measure);
    [viewportRef, trackRef, stickyRef].forEach((r) => r.current && ro.observe(r.current));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // 0 when the content reaches its pinned spot, 1 after `distance` more pixels of scroll.
  const rawProgress = useMotionValue(0);
  const { scrollY } = useScroll();
  const update = () => {
    const top = outerRef.current?.getBoundingClientRect().top ?? 0;
    const p = distance > 0 ? (stickyTop - top) / distance : 0;
    rawProgress.set(Math.min(1, Math.max(0, p)));
  };
  useMotionValueEvent(scrollY, "change", update);
  useLayoutEffect(update);

  const progress = useSpring(rawProgress, { stiffness: 160, damping: 32, restDelta: 0.001 });
  const x = useTransform(progress, (p) => -p * distance);
  const hintOpacity = useTransform(rawProgress, [0, 0.08], [1, 0]);

  useMotionValueEvent(rawProgress, "change", (p) => {
    setActive(Math.min(MILESTONES.length - 1, Math.round(p * (MILESTONES.length - 1))));
  });

  return (
    <div className="py-12">
      <div ref={outerRef} className="relative" style={{ height: contentHeight ? contentHeight + distance : undefined }}>
        <div ref={stickyRef} className="sticky flex items-center overflow-hidden" style={{ top: stickyTop }}>
          <div className="flex w-full items-center pl-[max(1rem,calc((100vw-72rem)/2+1rem))]">
            <div className="w-72 shrink-0 space-y-5 pr-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{HEADING.eyebrow}</p>
              <h2 className="text-4xl font-bold tracking-tight">{HEADING.title}</h2>
              <p className="text-muted-foreground text-lg">{HEADING.subtitle}</p>
              <div className="flex items-baseline gap-3 pt-2 font-mono">
                <span className="text-3xl font-bold text-primary tabular-nums">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-muted-foreground">/ {String(MILESTONES.length).padStart(2, "0")}</span>
                <motion.span style={{ opacity: hintOpacity }} className="ml-2 text-xs text-muted-foreground">
                  scroll →
                </motion.span>
              </div>
              <TimelineLink />
            </div>

            {/* Runs off the right edge; the left edge fades so milestones slide out under the panel */}
            <div
              ref={viewportRef}
              className="min-w-0 flex-1 overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_4rem)]"
            >
              <motion.div ref={trackRef} style={{ x }} className="relative w-max pl-16 pr-24">
                <div aria-hidden="true" className="absolute left-0 right-0 top-7 h-0.5 bg-border/40" />
                <motion.div
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-7 h-0.5 origin-left bg-primary"
                  style={{ scaleX: progress }}
                />
                <ol className="relative flex gap-12">
                  {MILESTONES.map((m, i) => (
                    <li
                      key={m.title}
                      className={cn(
                        "relative w-72 shrink-0 transition-opacity duration-300",
                        i === active ? "opacity-100" : "opacity-60"
                      )}
                    >
                      <MilestoneIcon m={m} isNow={i === 0} size="lg" />
                      <div className="mt-6">
                        <MilestoneBody m={m} />
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile: a vertical timeline that fills as you scroll past it. */
function VerticalJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{HEADING.eyebrow}</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{HEADING.title}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{HEADING.subtitle}</p>
      </div>
      <div ref={ref} className="relative">
        <div aria-hidden="true" className="absolute left-5 top-0 bottom-0 w-0.5 bg-border/40" />
        <motion.div
          aria-hidden="true"
          className="absolute left-5 top-0 bottom-0 w-0.5 origin-top bg-primary"
          style={{ scaleY: progress }}
        />
        <ol className="relative grid gap-10">
          {MILESTONES.map((m, i) => (
            <motion.li
              key={m.title}
              className="relative pl-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3, margin: IN_VIEW_MARGIN }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <MilestoneIcon m={m} isNow={i === 0} size="sm" />
              <MilestoneBody m={m} />
            </motion.li>
          ))}
        </ol>
      </div>
      <div className="text-center">
        <TimelineLink />
      </div>
    </div>
  );
}

export function CareerJourney() {
  return (
    <>
      <div className="lg:hidden">
        <VerticalJourney />
      </div>
      <div className="hidden lg:block">
        <HorizontalJourney />
      </div>
    </>
  );
}
