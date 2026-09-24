"use client";

import { useEffect } from "react";

/**
 * When /projects is opened with a #project-id (e.g. from the experience page),
 * scroll that card into view and make it glow briefly.
 */
export function ProjectHashFocus() {
  useEffect(() => {
    const focus = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      // Wait a frame so layout (and the page fade-in) has settled.
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.remove("project-target");
        void el.offsetWidth;
        el.classList.add("project-target");
        window.setTimeout(() => el.classList.remove("project-target"), 2600);
      });
    };
    // Run after the logo loader (about 2.2s) has faded out.
    const timer = window.setTimeout(focus, 2300);
    window.addEventListener("hashchange", focus);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", focus);
    };
  }, []);

  return null;
}
