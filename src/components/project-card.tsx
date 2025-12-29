"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Image as ImageIcon,
} from "lucide-react";
import type { Project } from "@/lib/projectData";

interface ProjectCardProps {
  project: Project & { isLive: boolean };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const screenshots = project.media?.screenshots || [];
  const demos = project.media?.demos || [];

  const hasScreenshots = screenshots.length > 0;
  const hasDemos = demos.length > 0;
  const hasMedia = hasScreenshots || hasDemos;

  // Initialize state based on what's available
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

  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors group">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="mb-2">
            {project.type}
          </Badge>
          {/* Only show 'Production' or 'Live' badge if the live check PASSED */}
          {project.isLive ? (
            <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
              {project.status === "Production" ? "Production" : "Live"}
            </Badge>
          ) : (
            <Badge variant="secondary">{project.status}</Badge>
          )}
        </div>
        <CardTitle className="text-2xl">{project.title}</CardTitle>
        <p className="text-sm font-medium text-primary">{project.subtitle}</p>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {/* Media Section - Only renders if actual media exists */}
        {hasMedia && (
          <div className="space-y-3">
            {/* Media Toggles */}
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

            {/* Display Area */}
            <div className="w-full bg-muted/30 rounded-lg aspect-video flex items-center justify-center border border-border overflow-hidden relative group/media">
              {/* Screenshots View */}
              {mediaType === "screenshot" && hasScreenshots && (
                <>
                  <Image
                    src={screenshots[currentScreenshotIndex]}
                    alt={`${project.title} screenshot ${
                      currentScreenshotIndex + 1
                    }`}
                    fill
                    className="object-cover"
                  />
                  {/* Carousel Controls - Only show if > 1 screenshot */}
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

              {/* Video View */}
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
            {project.highlights.slice(0, 3).map((highlight, i) => (
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
              className="bg-muted text-muted-foreground hover:bg-muted/80"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap gap-3 w-full mt-2">
          {/* Live Link Button - Only if check PASSED and URL exists */}
          {project.isLive && project.liveUrl ? (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 min-w-[140px]"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="mr-2 h-4 w-4" /> Live Project
              </a>
            </Button>
          ) : (
            <div className="flex-1 min-w-[140px] flex items-center justify-center text-xs text-muted-foreground py-2 bg-muted/30 rounded border border-dashed h-9 px-2 text-center cursor-not-allowed">
              <Lock className="h-3 w-3 mr-2 shrink-0" />
              <span>Internal / Client Proprietary</span>
            </div>
          )}

          {/* GitHub Link Button */}
          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 min-w-[120px]"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" /> Source Code
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
