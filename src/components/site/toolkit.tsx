import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Boxes,
  ClipboardList,
  Database,
  FileSignature,
  FileText,
  FlaskConical,
  FolderTree,
  GraduationCap,
  Handshake,
  Network,
  Radio,
  RefreshCcw,
  Sparkles,
  Split,
  Webhook,
  Workflow,
} from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import {
  siDocker,
  siExpress,
  siGit,
  siJavascript,
  siJsonwebtokens,
  siLinux,
  siMongodb,
  siMui,
  siMysql,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siShadcnui,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
} from "simple-icons";
import { Reveal } from "@/components/motion/reveal";
import { generalData } from "@/lib/generalData";

/**
 * Brand logos keep their brand colour; `ink` ones are black or near-black
 * marks that take the text colour instead, so they stay visible in dark mode.
 */
const BRANDS: Record<string, { icon: SimpleIcon; ink?: boolean }> = {
  typescript: { icon: siTypescript },
  javascript: { icon: siJavascript },
  python: { icon: siPython },
  nodejs: { icon: siNodedotjs },
  express: { icon: siExpress, ink: true },
  jwt: { icon: siJsonwebtokens, ink: true },
  react: { icon: siReact },
  nextjs: { icon: siNextdotjs, ink: true },
  vue: { icon: siVuedotjs },
  tailwind: { icon: siTailwindcss },
  mui: { icon: siMui },
  shadcn: { icon: siShadcnui, ink: true },
  postgresql: { icon: siPostgresql },
  mongodb: { icon: siMongodb },
  mysql: { icon: siMysql },
  supabase: { icon: siSupabase },
  docker: { icon: siDocker },
  nginx: { icon: siNginx },
  linux: { icon: siLinux, ink: true },
  git: { icon: siGit },
  postman: { icon: siPostman },
};

/** Skills without a brand mark use a line icon in the accent colour. */
const CONCEPTS: Record<string, LucideIcon> = {
  sql: Database,
  api: Webhook,
  websockets: Radio,
  microservices: Boxes,
  monorepo: FolderTree,
  loadbalancing: Split,
  cicd: Workflow,
  test: FlaskConical,
  integration: Network,
  agile: RefreshCcw,
  oop: Blocks,
  docs: FileText,
  ai: Sparkles,
  requirements: ClipboardList,
  proposal: FileSignature,
  training: GraduationCap,
  consulting: Handshake,
};

function SkillIcon({ name }: { name: string }) {
  const brand = BRANDS[name];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-6 shrink-0"
        fill={brand.ink ? "currentColor" : `#${brand.icon.hex}`}
      >
        <path d={brand.icon.path} />
      </svg>
    );
  }
  const Icon = CONCEPTS[name] ?? Sparkles;
  return <Icon aria-hidden className="size-6 shrink-0 text-primary" strokeWidth={1.75} />;
}

/** Skill groups as rows: the group on the left, its tools as cards on the right. */
export function Toolkit() {
  return (
    <div className="divide-y divide-border">
      {generalData.skills.map(({ group, summary, items }) => (
        <Reveal key={group} y={16}>
          <div className="grid gap-5 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
            <div>
              <h3 className="text-xl font-semibold leading-snug">{group}</h3>
              <p className="mt-2 max-w-xs text-muted-foreground">{summary}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {items.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center gap-4 rounded-xl border border-primary/40 bg-card px-4 py-3.5 transition-colors hover:border-primary"
                >
                  <SkillIcon name={s.icon} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold leading-snug">{s.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
