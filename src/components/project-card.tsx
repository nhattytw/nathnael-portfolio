"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { ViewCertificateButton } from "@/components/view-certificate-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Lock,
  Server,
  Github,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Star,
  ShieldCheck,
  CloudOff,
  Building2,
} from "lucide-react";
import { CATEGORY_LABELS, type Project } from "@/lib/projectData";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project & { isLive: boolean };
}

/** Status badge: live checks only apply to projects with a public link. */
function StatusBadge({ project }: ProjectCardProps) {
  const liveClasses = "gap-1 bg-live/10 text-live border-live/30 hover:bg-live/15";
  if (project.category === "public-sector") {
    return (
      <Badge className={liveClasses}>
        <ShieldCheck className="h-3 w-3" /> {project.status}
      </Badge>
    );
  }
  if (project.liveUrl) {
    return project.isLive ? (
      <Badge className={liveClasses}>
        <span className="h-1.5 w-1.5 rounded-full bg-live" /> {project.status}
      </Badge>
    ) : (
      <Badge variant="secondary" className="gap-1">
        <CloudOff className="h-3 w-3" /> Link unavailable
      </Badge>
    );
  }
  return <Badge variant="secondary">{project.status}</Badge>;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const screenshots = project.media?.screenshots || [];
  const demos = project.media?.demos || [];

  const hasScreenshots = screenshots.length > 0;
  const hasDemos = demos.length > 0;
  const hasMedia = hasScreenshots || hasDemos;

  const [mediaType, setMediaType] = useState<"screenshot" | "video">(
    hasScreenshots ? "screenshot" : "video"
  );
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  const handleNextScreenshot = () => {
    setCurrentScreenshotIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrevScreenshot = () => {
    setCurrentScreenshotIndex(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length
    );
  };

  const meta = [project.company, project.client, project.period].filter(Boolean);
  const showLiveButton = Boolean(project.liveUrl && project.isLive);
  const showUnreachable = Boolean(project.liveUrl && !project.isLive);
  // Explain why there's no link, unless an open-source/GitHub link covers it.
  const privateNote =
    project.category === "public-sector"
      ? "Proprietary · Restricted access"
      : project.category === "internal"
        ? "Internal tool · Not public"
        : !project.liveUrl && !project.githubUrl
          ? "Delivered to client · Not public"
          : null;

  return (
    <SpotlightCard
      tilt={project.featured ? 1.5 : 3}
      className={cn(
        "flex flex-col h-full hover:border-primary/50 group",
        project.featured && "border-primary/40"
      )}
    >
      <CardHeader>
        <div className="flex justify-between items-start gap-3 mb-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{CATEGORY_LABELS[project.category]}</Badge>
            {project.featured && (
              <Badge className="gap-1">
                <Star className="h-3 w-3" /> Featured
              </Badge>
            )}
          </div>
          <StatusBadge project={project} />
        </div>
        <CardTitle className="text-2xl">{project.title}</CardTitle>
        <p className="text-sm font-medium text-primary">{project.subtitle}</p>
        {meta.length > 0 && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="h-3.5 w-3.5 shrink-0" />
            {meta.join(" · ")}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {project.image && (
          <div className="relative w-full overflow-hidden rounded-lg border border-border aspect-[812/395] bg-muted/30">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}

        {/* Media Section - Only renders if actual media exists */}
        {hasMedia && (
          <div className="space-y-3">
            <div className="flex gap-2 border-b border-border pb-3">
              {hasScreenshots && (
                <Button
                  variant={mediaType === "screenshot" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMediaType("screenshot")}
                  className="text-xs h-7"
                >
                  Screenshots ({screenshots.length})
                </Button>
              )}
              {hasDemos && (
                <Button
                  variant={mediaType === "video" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMediaType("video")}
                  className="text-xs h-7"
                >
                  Demo
                </Button>
              )}
            </div>

            <div className="w-full bg-muted/30 rounded-lg aspect-video flex items-center justify-center border border-border overflow-hidden relative group/media">
              {mediaType === "screenshot" && hasScreenshots && (
                <>
                  <Image
                    src={screenshots[currentScreenshotIndex]}
                    alt={`${project.title} screenshot ${currentScreenshotIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                  {screenshots.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevScreenshot();
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover/media:opacity-100 transition-opacity hover:bg-black/70 z-10"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextScreenshot();
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover/media:opacity-100 transition-opacity hover:bg-black/70 z-10"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full z-10">
                        {currentScreenshotIndex + 1} / {screenshots.length}
                      </div>
                    </>
                  )}
                </>
              )}

              {mediaType === "video" && hasDemos && (
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
                    <PlayCircle className="text-primary h-6 w-6" />
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Demo Video Available
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="space-y-3 pt-2">
          <h4 className="text-xs uppercase tracking-wider font-semibold flex items-center gap-2 text-foreground/80">
            <Server className="h-3 w-3" /> Technical Highlights
          </h4>
          <ul className="space-y-2">
            {project.highlights.slice(0, 4).map((highlight, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground flex items-start gap-2.5"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="leading-snug">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 items-start pt-2 border-t mt-auto">
        <div className="flex flex-wrap gap-2 pt-4">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-muted text-foreground/80 hover:bg-muted/80"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 w-full mt-2">
          {showLiveButton && (
            <Button variant="outline" size="sm" asChild className="flex-1 min-w-[140px]">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" /> Live Project
              </a>
            </Button>
          )}

          {showUnreachable && (
            <div className="flex-1 min-w-[140px] flex items-center justify-center text-xs text-muted-foreground py-2 bg-muted/30 rounded border border-dashed h-9 px-2 text-center">
              <CloudOff className="h-3 w-3 mr-2 shrink-0" />
              <span>Site currently unreachable</span>
            </div>
          )}

          {privateNote && (
            <div className="flex-1 min-w-[140px] flex items-center justify-center text-xs text-muted-foreground py-2 bg-muted/30 rounded border border-dashed h-9 px-2 text-center cursor-not-allowed">
              <Lock className="h-3 w-3 mr-2 shrink-0" />
              <span>{privateNote}</span>
            </div>
          )}

          {project.certificateId && (
            <ViewCertificateButton
              certificateId={project.certificateId}
              label="View recognition"
              className="flex-1 min-w-[140px] justify-center h-9 text-sm"
            />
          )}

          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild className="flex-1 min-w-[120px]">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> {project.githubLabel ?? "Source Code"}
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </SpotlightCard>
  );
}
