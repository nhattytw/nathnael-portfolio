import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Each icon cycles through a different motion, size, and speed so the field never looks uniform.
const MOTIONS = ["icon-float", "icon-drift", "icon-spin-slow", "icon-sway", "icon-breathe"];
const SIZES = ["h-10 w-10", "h-7 w-7", "h-12 w-12", "h-8 w-8", "h-9 w-9"];
// Where in the gutter each icon sits, as a fraction of the gutter's width.
const GUTTER_POS = [0.5, 0.36, 0.62, 0.44, 0.56];

/**
 * Width of the content column the icons must stay clear of, and the viewport
 * width at which the side gutters get wide enough (80px+) to hold them.
 */
const COLUMNS = {
  "3xl": { width: "48rem", show: "min-[1024px]:block" },
  "4xl": { width: "56rem", show: "min-[1056px]:block" },
  "5xl": { width: "64rem", show: "min-[1184px]:block" },
  "6xl": { width: "72rem", show: "min-[1312px]:block" },
} as const;

function MovingIcon({ icon: Icon, i, size }: { icon: LucideIcon; i: number; size?: string }) {
  return (
    <span className={cn("block", MOTIONS[i % MOTIONS.length])} style={{ animationDelay: `${-i * 1.7}s` }}>
      <Icon className={size ?? SIZES[i % SIZES.length]} strokeWidth={1.5} />
    </span>
  );
}

/**
 * Faint tech icons scattered down the side gutters of their parent, alternating
 * left and right, never over the content column. The parent must be full width
 * and `relative isolate`.
 */
export function FloatingIcons({
  icons,
  column,
  className,
}: {
  icons: LucideIcon[];
  /** max-w-* of the content they surround. */
  column: keyof typeof COLUMNS;
  className?: string;
}) {
  const { width, show } = COLUMNS[column];
  const n = icons.length;
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden", show, className)}
    >
      {icons.map((Icon, i) => {
        const left = i % 2 === 0;
        const offset = `calc((100% - ${width}) / 2 * ${GUTTER_POS[i % GUTTER_POS.length]})`;
        return (
          <span
            key={i}
            className="absolute text-primary opacity-20"
            style={{
              top: `${((i + 0.5) / n) * 100}%`,
              [left ? "left" : "right"]: offset,
              transform: `translate(${left ? "-50%" : "50%"}, -50%)`,
            }}
          >
            <MovingIcon icon={Icon} i={i} />
          </span>
        );
      })}
    </div>
  );
}

// Loose triangle for a cluster of up to three icons.
const CLUSTER_POS = [
  { left: "10%", top: "8%" },
  { left: "62%", top: "0%" },
  { left: "38%", top: "52%" },
];

/**
 * A small group of moving icons that fills an empty spot inside the content,
 * e.g. beside a heading or at the end of a row. Position it with `className`;
 * it is hidden below `md` where those spots disappear.
 */
export function DecorIcons({
  icons,
  layout = "row",
  offset = 0,
  className,
}: {
  icons: LucideIcon[];
  /** "row": inline and evenly spaced. "cluster": up to three icons in a loose triangle. */
  layout?: "row" | "cluster";
  /** Shifts which motions are used, so neighbouring groups differ. */
  offset?: number;
  className?: string;
}) {
  if (layout === "cluster") {
    return (
      <div aria-hidden="true" className={cn("pointer-events-none relative hidden h-36 w-52 text-primary opacity-25 md:block", className)}>
        {icons.slice(0, CLUSTER_POS.length).map((Icon, i) => (
          <span key={i} className="absolute" style={CLUSTER_POS[i]}>
            <MovingIcon icon={Icon} i={i + offset} />
          </span>
        ))}
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none hidden items-center gap-8 text-primary opacity-25 md:flex", className)}
    >
      {icons.map((Icon, i) => (
        <span key={i} className={i % 2 ? "translate-y-3" : "-translate-y-2"}>
          <MovingIcon icon={Icon} i={i + offset} size="h-7 w-7" />
        </span>
      ))}
    </div>
  );
}
