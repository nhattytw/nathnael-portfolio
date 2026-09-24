"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Briefcase, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { generalData } from "@/lib/generalData";
import { buildSkillUsage } from "@/lib/skillUsage";
import { cn } from "@/lib/utils";

const ALL = "All";

export function SkillsMap() {
  const categories = [ALL, ...Object.keys(generalData.skills)];
  const [active, setActive] = useState(ALL);
  const [selected, setSelected] = useState<string | null>(null);
  const usage = useMemo(buildSkillUsage, []);

  const visible = useMemo(() => {
    const entries =
      active === ALL
        ? Object.entries(generalData.skills)
        : [[active, generalData.skills[active]] as const];
    const seen = new Set<string>();
    return entries.flatMap(([category, items]) =>
      items
        .filter((s) => !seen.has(s) && seen.add(s))
        .map((skill) => ({ skill, category }))
    );
  }, [active]);

  const detail = selected ? usage.get(selected) : null;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-2">
        <LayoutGroup id="skill-tabs">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActive(category);
                setSelected(null);
              }}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                active === category ? "text-primary-foreground" : "text-muted-foreground hover:text-primary"
              )}
            >
              {active === category && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{category}</span>
            </button>
          ))}
        </LayoutGroup>
      </div>

      <motion.div layout className="flex flex-wrap justify-center gap-2.5 min-h-[140px]">
        <AnimatePresence mode="popLayout">
          {visible.map(({ skill }) => {
            const count = (usage.get(skill)?.companies.length ?? 0) + (usage.get(skill)?.projects.length ?? 0);
            return (
              <motion.button
                layout
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                onMouseEnter={() => setSelected(skill)}
                onFocus={() => setSelected(skill)}
                onClick={() => setSelected(skill)}
                className={cn(
                  "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                  selected === skill
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "border-border/50 bg-card hover:border-primary/60"
                )}
              >
                {skill}
                {count > 0 && (
                  <span
                    className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-inherit opacity-80"
                    title={`${count} companies and projects`}
                  >
                    {count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <div className="mx-auto max-w-3xl min-h-[112px]" aria-live="polite">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-border/50 bg-card p-5 space-y-3"
            >
              <p className="font-mono text-sm text-primary">
                &gt; where-used <span className="font-bold">&quot;{selected}&quot;</span>
              </p>
              {detail && (detail.companies.length > 0 || detail.projects.length > 0) ? (
                <div className="grid gap-3 sm:grid-cols-2 text-sm">
                  {detail.companies.length > 0 && (
                    <div className="flex gap-2">
                      <Briefcase className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                      <span>
                        {detail.companies.length} {detail.companies.length === 1 ? "company" : "companies"}:{" "}
                        {detail.companies.join(" · ")}
                      </span>
                    </div>
                  )}
                  {detail.projects.length > 0 && (
                    <div className="flex gap-2">
                      <FolderGit2 className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                      <span>
                        {detail.projects.length} {detail.projects.length === 1 ? "project" : "projects"}:{" "}
                        {detail.projects.map((p, i) => (
                          <span key={p.id}>
                            {i > 0 && " · "}
                            <Link href={`/projects#${p.id}`} className="text-primary hover:underline underline-offset-4">
                              {p.title}
                            </Link>
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Applied across day-to-day delivery and client work.
                </p>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-6 text-center text-sm text-muted-foreground"
            >
              Hover or tap a skill to see where I&apos;ve used it.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
