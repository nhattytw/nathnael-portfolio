"use client";

import { ShieldCheck } from "lucide-react";
import { useCertificateViewer } from "@/components/protected-certificate";
import { cn } from "@/lib/utils";

export function ViewCertificateButton({
  certificateId,
  className,
  label = "View certificate",
}: {
  certificateId: string;
  className?: string;
  label?: string;
}) {
  const { open } = useCertificateViewer();
  return (
    <button
      type="button"
      onClick={() => open(certificateId)}
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium text-primary border border-primary/40 px-2 py-0.5 rounded-md hover:bg-primary/10 transition-colors",
        className
      )}
    >
      <ShieldCheck className="h-3 w-3" /> {label}
    </button>
  );
}
