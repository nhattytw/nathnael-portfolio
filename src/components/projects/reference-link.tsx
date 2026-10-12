"use client";

import { Suspense, use } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ExternalReference } from "@/lib/projectData";

interface ReferenceLinkProps {
  reference: ExternalReference;
  /** Whether the page still exists and is still about this work; checked on the server. */
  isLive: Promise<boolean>;
  className?: string;
  iconClassName?: string;
}

function Link({ reference, isLive, className, iconClassName }: ReferenceLinkProps) {
  if (!use(isLive)) return null;
  return (
    <a href={reference.href} target="_blank" rel="noopener noreferrer" className={className}>
      {reference.label} <ArrowUpRight className={iconClassName} />
    </a>
  );
}

/** A link to a write-up hosted elsewhere, which stays hidden while it's missing or changed. */
export function ReferenceLink(props: ReferenceLinkProps) {
  return (
    <Suspense fallback={null}>
      <Link {...props} />
    </Suspense>
  );
}
