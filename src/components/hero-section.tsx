"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { NetworkBackground } from "@/components/motion/network-background";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generalData } from "@/lib/generalData";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Types out each role, pauses, deletes it, then moves to the next. */
function useTypewriter(words: string[], enabled: boolean) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setText(words[0]);
      return;
    }
    const word = words[index];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";

    const delay = done ? 1800 : cleared ? 300 : deleting ? 35 : 70;
    const timer = setTimeout(() => {
      if (done) setDeleting(true);
      else if (cleared) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, enabled]);

  return text;
}

/**
 * `children` (the transition wave) render inside the same wrapper, so the hero
 * background runs underneath them and fades out instead of stopping at a hard edge.
 */
export function HeroSection({ children }: { children?: React.ReactNode }) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // The entrance replays whenever the hero comes back into view, not just on load.
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { amount: 0.6 });
  const contentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const role = useTypewriter(generalData.roles, !reduceMotion);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleScroll = () => {
    const nextSection = document.getElementById("impact");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleScroll();
    }, 400);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };


  const nameParts = generalData.name.split(" ");
  const firstName = nameParts.slice(0, 2).join(" ");
  const lastName = nameParts.slice(2).join(" ");

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: heroInView
      ? { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: EASE } }
      : { opacity: 0, y: 24, transition: { duration: 0.6, ease: EASE } },
  });

  return (
    <div className="relative overflow-x-clip">
      {/* Background: a quiet network that fades behind the text. It spans
          the hero and the wave below it, fading out under the wave. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 0, black calc(100% - 8rem), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0, black calc(100% - 8rem), transparent 100%)",
        }}
      >
        <NetworkBackground contentRef={contentRef} className="absolute inset-0 h-full w-full mask-fade-edges" />
      </div>

      <section ref={heroRef} className="relative flex flex-col justify-center min-h-[calc(100vh-4rem)] pt-10 pb-32">
        <div ref={contentRef} className="relative flex w-full flex-col items-center text-center space-y-7 max-w-4xl mx-auto z-10 px-4">
          <motion.div {...fadeUp(0)}>
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-xs sm:text-sm md:text-base rounded-full border-primary/50 text-primary bg-primary/10 gap-2 whitespace-normal"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {generalData.title}
              <span className="hidden sm:inline"> · Open to roles & consulting</span>
            </Badge>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-bold tracking-tight text-foreground">
            <span className="block">
              {firstName.split(" ").map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={
                    heroInView
                      ? { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, delay: 0.1 + i * 0.12, ease: EASE } }
                      : { opacity: 0, y: 40, filter: "blur(8px)", transition: { duration: 0.6, ease: EASE } }
                  }
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <motion.span className="block text-primary mt-2" {...fadeUp(0.35)}>
              {lastName}
            </motion.span>
          </h1>

          <motion.div
            {...fadeUp(0.5)}
            className="font-mono text-base sm:text-lg md:text-2xl text-primary min-h-[2em]"
            aria-label={generalData.roles.join(", ")}
          >
            <span aria-hidden="true">
              <span className="text-muted-foreground">&gt; </span>
              {role}
              <span className="ml-0.5 inline-block w-[0.6ch] animate-caret border-b-2 border-primary" />
            </span>
          </motion.div>

          <motion.p {...fadeUp(0.6)} className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            Based in Addis Ababa, working with teams worldwide.
          </motion.p>

          <motion.div {...fadeUp(0.7)} className="w-full max-w-2xl">
            <StackTicker items={generalData.heroStack} />
          </motion.div>

          <motion.div
            {...fadeUp(0.8)}
            className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Button
              asChild
              size="lg"
              className="h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full shadow-lg shadow-primary/20 transition-transform hover:scale-105"
            >
              <Link href="/projects">
                View My Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full border-2 hover:bg-secondary/50"
              asChild
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <a
              href={generalData.resume.href}
              download={generalData.resume.downloadName}
              className="inline-flex items-center gap-2 px-2 py-3 text-base font-semibold text-primary underline underline-offset-4 decoration-primary/40 transition-colors hover:decoration-primary"
            >
              <Download className="h-4 w-4" /> Résumé
            </a>
          </motion.div>
        </div>

        <motion.div {...fadeUp(1)} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={handleScroll}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group cursor-pointer p-2"
            aria-label="Scroll to content"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
              Scroll
            </span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1 opacity-70 group-hover:opacity-100 transition-all">
              <div className="w-1 h-2 bg-current rounded-full animate-bounce mt-1"></div>
            </div>
          </button>
        </motion.div>
      </section>
      {children}
    </div>
  );
}

/** The stack, scrolling slowly under the name. Pauses on hover. */
function StackTicker({ items }: { items: string[] }) {
  const chips = (hidden?: boolean) =>
    items.map((item) => (
      <li
        key={item}
        aria-hidden={hidden || undefined}
        className="shrink-0 rounded-full border border-border bg-card/80 px-3 py-1 font-mono text-xs sm:text-sm text-foreground"
      >
        {item}
      </li>
    ));

  return (
    <div
      className="group overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <ul aria-label="Stack" className="flex w-max gap-2.5 animate-marquee group-hover:[animation-play-state:paused]">
        {chips()}
        {chips(true)}
      </ul>
    </div>
  );
}
