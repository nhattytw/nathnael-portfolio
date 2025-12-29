"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generalData } from "@/lib/generalData";

export function HeroSection() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleScroll = () => {
    const nextSection = document.getElementById("expertise-section");
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

  return (
    <section className="relative flex flex-col justify-center min-h-[calc(100vh-4rem)] pt-10 pb-32 overflow-hidden">
      <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto z-10 px-4">
        <Badge
          variant="outline"
          className="px-4 py-1.5 text-base rounded-full border-primary/50 text-primary bg-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          Available for Senior Roles & Consultancy
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 text-foreground">
          {firstName}
          <span className="block text-primary mt-2">{lastName}</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {generalData.title} architecting secure, scalable, and
          high-availability systems. Expert in Node.js, Python, and
          Microservices.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 transition-transform hover:scale-105"
          >
            <Link href="/projects">
              View Architecture & Projects{" "}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 text-lg rounded-full border-2 hover:bg-secondary/50"
            asChild
          >
            <Link href="/contact">Schedule a Discussion</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-in fade-in duration-1000 delay-500">
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
      </div>
    </section>
  );
}
