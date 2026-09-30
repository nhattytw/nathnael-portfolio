"use client";

import { Suspense, use } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Github, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/projects/status-pill";
import { CATEGORY_LABELS, type Project } from "@/lib/projectData";

interface ProjectDrawerProps {
  project: Project | null;
  isLive: Promise<boolean>;
  prev: Project | null;
  next: Project | null;
  onNavigate: (id: string) => void;
  onClose: () => void;
}

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** The live link only shows once the site has answered the server's check. */
function LiveButton({ url, isLive }: { url: string; isLive: Promise<boolean> }) {
  if (!use(isLive)) return null;
  return (
    <Button asChild size="sm" className="rounded-full">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Globe className="mr-1.5 h-4 w-4" /> Visit {host(url)}
      </a>
    </Button>
  );
}

/** Details for a project without a case study, sliding in from the right. */
export function ProjectDrawer({ project, isLive, prev, next, onNavigate, onClose }: ProjectDrawerProps) {
  const meta = project
    ? [
        { label: "Through", value: project.company },
        { label: "Client", value: project.client },
        { label: "When", value: project.period },
      ].filter((m) => m.value)
    : [];

  return (
    <DialogPrimitive.Root open={Boolean(project)} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col gap-4 overflow-y-auto border-l border-border bg-background p-6 shadow-2xl duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right sm:p-7">
          {project && (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {CATEGORY_LABELS[project.category]}
                </span>
                <DialogPrimitive.Close className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card transition-colors hover:border-primary hover:text-primary">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </div>

              <div className="space-y-1">
                <DialogPrimitive.Title className="text-3xl font-bold leading-tight tracking-tight">
                  {project.title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="font-serif text-muted-foreground">
                  {project.subtitle}
                </DialogPrimitive.Description>
              </div>

              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-y border-border py-3 text-sm">
                {meta.map((m) => (
                  <div key={m.label} className="contents">
                    <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
                <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Status</dt>
                <dd>
                  <StatusPill project={project} isLive={isLive} />
                </dd>
              </dl>

              {project.image && (
                <div className="relative aspect-[812/395] w-full overflow-hidden rounded-lg border border-border bg-muted/30">
                  <Image src={project.image.src} alt={project.image.alt} fill sizes="28rem" className="object-cover object-top" />
                </div>
              )}

              <p className="leading-relaxed">{project.description}</p>

              <div className="space-y-2">
                <h3 className="text-sm font-bold">What I did</h3>
                <ul className="list-disc space-y-1.5 pl-5 text-[15px]">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold">Stack</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {project.liveUrl && (
                    <Suspense fallback={null}>
                      <LiveButton url={project.liveUrl} isLive={isLive} />
                    </Suspense>
                  )}
                  {project.githubUrl && (
                    <Button asChild size="sm" variant="outline" className="rounded-full">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1.5 h-4 w-4" /> {project.githubLabel ?? "Source Code"}
                      </a>
                    </Button>
                  )}
                </div>
              )}

              <nav aria-label="Other projects" className="mt-auto flex justify-between gap-4 border-t border-border pt-4">
                {prev ? (
                  <button type="button" onClick={() => onNavigate(prev.id)} className="text-left text-sm font-semibold text-primary">
                    <small className="block font-mono text-[10.5px] font-normal uppercase tracking-widest text-muted-foreground">Previous</small>
                    <ArrowLeft className="mr-1 inline h-3.5 w-3.5" />
                    {prev.title}
                  </button>
                ) : (
                  <span />
                )}
                {next && (
                  <button type="button" onClick={() => onNavigate(next.id)} className="text-right text-sm font-semibold text-primary">
                    <small className="block font-mono text-[10.5px] font-normal uppercase tracking-widest text-muted-foreground">Next</small>
                    {next.title}
                    <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                  </button>
                )}
              </nav>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
