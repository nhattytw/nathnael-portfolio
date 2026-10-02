"use client";

import { useEffect, useState } from "react";
import { generalData } from "@/lib/generalData";

const ROLES = generalData.roles;

/**
 * Types out each role, holds it, deletes it and moves to the next. The first
 * role renders in full on the server, and the loop only starts after mount.
 */
export function HeroRole() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(ROLES[0]);
  const [deleting, setDeleting] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const word = ROLES[index];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";
    const delay = done ? 2200 : cleared ? 300 : deleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (done) setDeleting(true);
      else if (cleared) {
        setDeleting(false);
        setIndex((i) => (i + 1) % ROLES.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, enabled]);

  return (
    <p className="flex items-center gap-3 font-mono text-sm" aria-label={ROLES.join(", ")}>
      <span className="label" aria-hidden>
        Role
      </span>
      <span className="h-px w-6 bg-line" aria-hidden />
      <span aria-hidden className="text-foreground">
        {text}
        <span className="animate-caret ml-0.5 inline-block h-[1.1em] w-px translate-y-[0.2em] bg-primary" />
      </span>
    </p>
  );
}
