"use client";

import type React from "react";
import { motion, type Variants } from "motion/react";
import { IN_VIEW_MARGIN } from "@/components/motion/viewport";
import { AnimatedIcon } from "@/components/motion/animated-icon";

const EASE = [0.22, 1, 0.36, 1] as const;

// Animate in and out while the element is still on screen, at either edge.
const VIEWPORT = { once: false, amount: 0.3, margin: IN_VIEW_MARGIN } as const;

// Hidden text stays faintly visible (a blurred ghost) so the page never looks
// like it ends while the next section is waiting to animate in.
const blurIn: Variants = {
  hidden: { opacity: 0.12, y: 10, filter: "blur(6px)", transition: { duration: 0.8, ease: EASE } },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, delay, ease: EASE },
  }),
};

const wipe: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", transition: { duration: 0.8, ease: EASE } },
  show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.4, delay: 0.25, ease: EASE } },
};

const drawLine: Variants = {
  hidden: { scaleX: 0, transition: { duration: 0.6, ease: EASE } },
  show: { scaleX: 1, transition: { duration: 1.1, delay: 0.15, ease: EASE } },
};

interface AboutStoryProps {
  story: { heading: string; body: string[] }[];
  /** One icon per section, shown at the end of its number row on wider screens. */
  icons?: React.ReactNode[];
}

/** Numbered story sections stacked vertically: number, heading, then paragraphs. */
export function AboutStory({ story, icons = [] }: AboutStoryProps) {
  return (
    <div className="space-y-12">
      {story.map((section, i) => (
        <section key={section.heading} className="space-y-4">
          <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} className="space-y-2">
            <div className="flex items-center gap-3">
              <motion.span variants={blurIn} className="font-mono text-sm text-primary">
                0{i + 1}
              </motion.span>
              <motion.span variants={drawLine} className="h-px w-16 origin-left bg-primary" />
              {icons[i] && (
                <AnimatedIcon loop="bob" className="hidden md:inline-flex text-primary/70">
                  {icons[i]}
                </AnimatedIcon>
              )}
            </div>
            {/* A faint copy sits underneath so the heading's slot is visible before the wipe. */}
            <h2 className="relative text-2xl md:text-3xl font-bold leading-snug">
              <span aria-hidden="true" className="opacity-10 blur-[2px]">
                {section.heading}
              </span>
              <motion.span variants={wipe} className="absolute inset-0">
                {section.heading}
              </motion.span>
            </h2>
          </motion.div>

          {section.body.map((paragraph, j) => (
            <motion.p
              key={j}
              variants={blurIn}
              custom={0.1}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              lang="en"
              className="text-lg leading-relaxed text-foreground/90 text-pretty md:text-justify md:hyphens-auto"
            >
              {paragraph}
            </motion.p>
          ))}
        </section>
      ))}
    </div>
  );
}
