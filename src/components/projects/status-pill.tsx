"use client";

import { Suspense, use } from "react";
import { PackageCheck, ShieldCheck } from "lucide-react";
import type { Project } from "@/lib/projectData";
import { cn } from "@/lib/utils";

interface StatusPillProps {
  project: Project;
  /** Whether the public link answered; checked on the server. */
  isLive: Promise<boolean>;
  className?: string;
}

const base = "inline-flex items-center gap-1.5 font-mono text-xs whitespace-nowrap";

function Status({ project, isLive, className }: StatusPillProps) {
  const live = use(isLive);
  if (project.category === "public-sector") {
    return (
      <span className={cn(base, "text-live", className)}>
        <ShieldCheck className="h-3.5 w-3.5" /> {project.status}
      </span>
    );
  }
  if (project.liveUrl) {
    // A site that doesn't answer is shown as delivered rather than live.
    return live ? (
      <span className={cn(base, "text-live", className)}>
        <span className="h-1.5 w-1.5 rounded-full bg-live" /> {project.status}
      </span>
    ) : (
      <span className={cn(base, "text-muted-foreground", className)}>
        <PackageCheck className="h-3.5 w-3.5" /> Delivered
      </span>
    );
  }
  return <span className={cn(base, "text-muted-foreground", className)}>{project.status}</span>;
}

export function StatusPill(props: StatusPillProps) {
  return (
    <Suspense fallback={<span className={cn(base, "text-muted-foreground animate-pulse", props.className)}>Checking…</span>}>
      <Status {...props} />
    </Suspense>
  );
}
