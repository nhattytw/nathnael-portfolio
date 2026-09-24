import { cn } from "@/lib/utils";

/**
 * Terminal-window mark: an N whose data trail curves from the top-left
 * corner into a packet on the bottom-right corner.
 * Colors come from theme tokens, so it adapts to light and dark mode.
 * With `animated`, the window, N, and trail draw in (used by the page intro).
 */
export const TRAIL = [
  { cx: 22, cy: 27, r: 0.6 },
  { cx: 25.73, cy: 29.03, r: 1 },
  { cx: 29.87, cy: 32.11, r: 1.5 },
  { cx: 34.17, cy: 36.54, r: 2 },
  { cx: 38.25, cy: 42.4, r: 2.5 },
];
export const PACKET = { cx: 42, cy: 50, r: 2.7, ring: 1.2 };

export function Logo({
  className,
  animated = false,
  title = "Nathnael Tesfaye Woldekidan",
}: {
  className?: string;
  animated?: boolean;
  title?: string;
}) {
  const draw = (len: number, delay: number) =>
    animated
      ? {
          strokeDasharray: len,
          strokeDashoffset: len,
          animation: `logo-draw 0.7s cubic-bezier(.65,0,.35,1) ${delay}s forwards`,
        }
      : undefined;
  const pop = (delay: number) =>
    animated
      ? {
          transformBox: "fill-box" as const,
          transformOrigin: "center",
          transform: "scale(0)",
          animation: `logo-pop 0.35s cubic-bezier(.34,1.56,.64,1) ${delay}s forwards`,
        }
      : undefined;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <title>{title}</title>
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="var(--foreground)" strokeWidth="3" style={draw(240, 0)} />
      <path d="M6 18 H58" stroke="var(--foreground)" strokeWidth="3" style={draw(60, 0.2)} />
      <circle cx="12.5" cy="12" r="2" fill="var(--primary)" style={pop(0.35)} />
      <circle cx="18.5" cy="12" r="2" fill="var(--foreground)" style={pop(0.42)} />
      <circle cx="24.5" cy="12" r="2" fill="var(--foreground)" style={pop(0.49)} />
      <path
        d="M22 50 V27 L42 50 V27"
        stroke="var(--foreground)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={draw(100, 0.45)}
      />
      {TRAIL.map((dot, i) => (
        <circle key={i} {...dot} fill="var(--logo-trail)" style={pop(0.95 + i * 0.07)} />
      ))}
      <circle
        cx={PACKET.cx}
        cy={PACKET.cy}
        r={PACKET.r}
        fill="var(--primary)"
        stroke="var(--logo-trail)"
        strokeWidth={PACKET.ring}
        style={pop(1.35)}
      />
    </svg>
  );
}
