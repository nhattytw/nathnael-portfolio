import { cn } from "@/lib/utils";

/**
 * Animated wave between two sections. The top half shows `from`, the wave
 * fills with `to`, and a sage line rides the crest. Each path spans two
 * repeats of the wave so a -50% drift loops seamlessly.
 */
const PERIOD = 720;
const WIDTH = PERIOD * 4;

function wavePath(amplitude: number, baseline: number, height: number) {
  let d = `M0 ${baseline}`;
  for (let x = 0; x < WIDTH; x += PERIOD) {
    d += ` Q${x + PERIOD / 4} ${baseline - amplitude} ${x + PERIOD / 2} ${baseline}`;
    d += ` T${x + PERIOD} ${baseline}`;
  }
  return { line: d, fill: `${d} L${WIDTH} ${height} L0 ${height} Z` };
}

const back = wavePath(18, 44, 96);
const front = wavePath(26, 56, 96);

export function SectionWave({
  from = "var(--background)",
  to = "var(--secondary)",
  flip = false,
  className,
}: {
  from?: string;
  to?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-16 md:h-24 overflow-hidden", flip && "-scale-x-100", className)}
      style={{ background: from }}
    >
      <svg
        className="absolute inset-y-0 left-0 h-full w-[200%] animate-wave-slow"
        viewBox={`0 0 ${WIDTH} 96`}
        preserveAspectRatio="none"
      >
        <path d={back.fill} fill="var(--cornflower-blue)" opacity={0.28} />
        <path d={back.line} fill="none" stroke="var(--cornflower-blue)" strokeOpacity={0.6} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      </svg>
      <svg
        className="absolute inset-y-0 left-0 h-full w-[200%] animate-wave"
        viewBox={`0 0 ${WIDTH} 96`}
        preserveAspectRatio="none"
      >
        <path d={front.fill} fill={to} />
        <path d={front.line} fill="none" stroke="var(--line)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
