import { Reveal } from "@/components/motion/reveal";
import { experienceData } from "@/lib/experienceData";

/** A compact, table-like summary of every company and the roles held there. */
export function ExperienceLedger() {
  return (
    <ul className="divide-y divide-border">
      {experienceData.map((c) => (
        <li key={c.company}>
          <Reveal y={16}>
            <div className="grid gap-3 py-6 md:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-8">
              <span className="font-mono text-xs text-muted-foreground md:pt-1.5">{c.period}</span>
              <div>
                <p className="text-lg font-semibold leading-snug">{c.company}</p>
                <p className="text-sm text-muted-foreground">
                  {[c.note, c.workType].filter(Boolean).join(" · ")}
                </p>
              </div>
              <ol className="space-y-1.5">
                {c.roles.map((r) => (
                  <li key={`${r.title}-${r.period}`} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span>{r.title}</span>
                    <span className="font-mono text-xs text-muted-foreground">{r.period}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
