import type React from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { generalData } from "@/lib/generalData";
import { cn } from "@/lib/utils";

/** Page-width container used by every section. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto max-w-6xl px-4 md:px-6", className)}>{children}</div>;
}

/** Section heading: a mono index, a display title and an optional aside. */
export function SectionHeading({
  index,
  title,
  aside,
}: {
  index?: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-border pb-5">
        <div className="space-y-2">
          {index && <p className="label">{index}</p>}
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">{title}</h2>
        </div>
        {aside}
      </div>
    </Reveal>
  );
}

/** Page title block used at the top of inner pages. No scroll reveal, so it shows before JavaScript loads. */
export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead?: React.ReactNode }) {
  return (
    <header className="max-w-4xl space-y-5 pb-4 pt-12 md:pt-20">
      <p className="label">{eyebrow}</p>
      <h1 className="font-display text-5xl leading-[0.98] tracking-tight md:text-7xl">{title}</h1>
      {lead && <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">{lead}</p>}
    </header>
  );
}

export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary", className)}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export const pillClass = "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all";

export function PrimaryButton({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn(pillClass, "group bg-primary text-primary-foreground hover:brightness-110", className)}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function ResumeButton({ className }: { className?: string }) {
  return (
    <a
      href={generalData.resume.href}
      download={generalData.resume.downloadName}
      className={cn(pillClass, "border border-border bg-card hover:border-foreground/40", className)}
    >
      <Download className="h-4 w-4" /> Résumé
    </a>
  );
}

/** Closing call to action at the bottom of every page. */
export function ContactBand({ title = "Have a role or a project in mind?" }: { title?: string }) {
  const { availability } = generalData;
  return (
    <Reveal>
      <section className="overflow-hidden rounded-2xl bg-foreground text-background">
        <div className="grid gap-x-8 gap-y-6 p-8 md:grid-cols-[1.5fr_1fr] md:items-end md:p-12">
          {/* The title spans both columns so it has room to sit on one line. */}
          <div className="space-y-4 md:col-span-2">
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] opacity-70">
              <span className="live-dot" /> Open to {availability.roles.join(", ").toLowerCase()} work
            </p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">{title}</h2>
          </div>
          <p className="max-w-lg opacity-75">{availability.interests}</p>
          <div className="flex flex-col gap-3 md:items-end">
            {/* The band is inverted, so the button inverts too: the accent has too little contrast on it. */}
            <PrimaryButton href="/contact" className="bg-background text-foreground hover:brightness-95 md:w-64">
              Send a message
            </PrimaryButton>
            <a
              href={`mailto:${generalData.contact.email}`}
              className="text-center font-mono text-sm opacity-75 underline-offset-4 hover:underline hover:opacity-100 md:w-64"
            >
              {generalData.contact.email}
            </a>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
