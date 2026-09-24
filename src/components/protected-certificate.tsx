"use client";

import type React from "react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { generalData } from "@/lib/generalData";

const CertificateContext = createContext<{ open: (id: string) => void }>({ open: () => {} });

/** Opens a view-only certificate (by its certificateId) from anywhere in the app. */
export function useCertificateViewer() {
  return useContext(CertificateContext);
}

export function CertificateProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const open = useCallback((id: string) => setActiveId(id), []);
  const cert = generalData.about.certifications.find((c) => c.certificateId === activeId);

  return (
    <CertificateContext.Provider value={{ open }}>
      {children}
      <Dialog open={Boolean(cert)} onOpenChange={(o) => !o && setActiveId(null)}>
        <DialogContent className="protected-cert sm:max-w-4xl p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 pr-6">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              {cert?.name}
            </DialogTitle>
            <DialogDescription>
              {cert?.issuer}
              {cert?.date && ` · ${cert.date}`}
              {cert?.summary && <span className="block mt-1">{cert.summary}</span>}
              <span className="block mt-1 text-xs">View only.</span>
            </DialogDescription>
          </DialogHeader>
          {cert?.certificateId && (
            <CertificateCanvas key={cert.certificateId} id={cert.certificateId} label={cert.name} />
          )}
        </DialogContent>
      </Dialog>
    </CertificateContext.Provider>
  );
}

function CertificateCanvas({ id, label }: { id: string; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [hidden, setHidden] = useState(false);

  // Fetch the image as a blob and paint it onto a canvas, so there is never an
  // <img> element or a navigable image URL to save.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/cert/${encodeURIComponent(id)}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const bitmap = await createImageBitmap(await res.blob());
        const canvas = canvasRef.current;
        if (cancelled || !canvas) return;
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
        bitmap.close();
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Block save / print shortcuts and hide the certificate when the tab loses focus.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (key === "s" || key === "p" || key === "c")) {
        e.preventDefault();
        toast.info("This certificate is view-only.");
      }
      if (key === "printscreen") setHidden(true);
    };
    const hide = () => setHidden(true);
    const show = () => setHidden(false);
    const onVisibility = () => setHidden(document.hidden);

    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const block = (e: React.SyntheticEvent) => e.preventDefault();

  return (
    <div
      className="relative w-full overflow-hidden rounded-md bg-muted/30 select-none [-webkit-touch-callout:none] [-webkit-user-select:none]"
      onContextMenu={block}
      onDragStart={block}
      onCopy={block}
    >
      <canvas
        ref={canvasRef}
        aria-label={label}
        role="img"
        className={cn(
          "block w-full transition-[filter] duration-200",
          status === "ready" ? "h-auto" : "invisible h-0",
          hidden && "blur-xl"
        )}
      />
      {/* Transparent shield: intercepts long-press and right-click on the canvas. */}
      <div aria-hidden="true" className="absolute inset-0" onContextMenu={block} />

      {status === "loading" && (
        <div className="flex aspect-[3/2] items-center justify-center text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {status === "error" && (
        <div className="flex aspect-[3/2] items-center justify-center p-6 text-center text-sm text-muted-foreground">
          The certificate preview is unavailable right now.
        </div>
      )}
    </div>
  );
}
