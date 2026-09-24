"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowRight, Award, GraduationCap, Rocket, Trophy, Users, Code2, type LucideIcon } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  org: string;
  detail: string;
  icon: LucideIcon;
  badge?: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2021",
    title: "Junior Software Engineer",
    org: "Ahaz",
    detail: "MERN and Python apps, and my first biometric hardware integration.",
    icon: Code2,
  },
  {
    year: "2022",
    title: "Software Engineer",
    org: "Ahaz · HiLCoE",
    detail: "Real-time HR backends and secure APIs, and a BSc in Computer Science.",
    icon: GraduationCap,
    badge: "Promoted",
  },
  {
    year: "2023",
    title: "Senior Backend Developer & Project Lead",
    org: "Ahaz · Ethio Robo Robotics",
    detail: "Led engineering and mentored juniors, while teaching and judging robotics.",
    icon: Users,
    badge: "VEX Judge",
  },
  {
    year: "2023",
    title: "Account Executive → Software Engineer",
    org: "Baro Technologies",
    detail: "Won the bids, then built what we won: IIMCS and YeneCart.",
    icon: Trophy,
    badge: "IIMCS Recognition",
  },
  {
    year: "2026",
    title: "Founding Engineer",
    org: "Agentic Curve · VuleroTech",
    detail: "Owning ERP modules end to end, and consulting on CRM adoption.",
    icon: Rocket,
    badge: "Now",
  },
];

export function CareerJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="space-y-10">
      <div ref={ref} className="relative">
        {/* Track + animated fill: horizontal on desktop, vertical on mobile */}
        <div aria-hidden="true" className="absolute left-5 top-0 bottom-0 w-0.5 bg-border/40 lg:left-0 lg:right-0 lg:top-7 lg:bottom-auto lg:h-0.5 lg:w-auto" />
        <motion.div
          aria-hidden="true"
          className="absolute left-5 top-0 bottom-0 w-0.5 origin-top bg-primary lg:hidden"
          style={{ scaleY: progress }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-0 right-0 top-7 hidden h-0.5 origin-left bg-primary lg:block"
          style={{ scaleX: progress }}
        />

        <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          {MILESTONES.map((m, i) => {
            const Icon = m.icon;
            const isNow = i === MILESTONES.length - 1;
            return (
              <motion.li
                key={m.title}
                className="relative pl-16 lg:pl-0 lg:pt-20"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute left-0 top-0 lg:left-0 flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg shadow-primary/10">
                  {isNow && (
                    <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-40" />
                  )}
                  <Icon className="h-4 w-4 lg:h-6 lg:w-6 text-primary" />
                </div>
                <p className="font-mono text-sm font-bold text-primary">{m.year}</p>
                <h3 className="mt-1 text-lg font-bold leading-snug">{m.title}</h3>
                <p className="text-sm font-medium text-foreground/80">{m.org}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.detail}</p>
                {m.badge && (
                  <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {m.badge === "IIMCS Recognition" && <Award className="h-3 w-3" />}
                    {m.badge}
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>

      <div className="text-center">
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
        >
          Full experience timeline <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
