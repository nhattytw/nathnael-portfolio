import { generalData } from "@/lib/generalData";

/** The stack, drifting slowly along a hairline strip at the foot of the hero. */
export function StackMarquee() {
  const items = generalData.heroStack;
  // Two copies side by side, so the strip loops without a seam at -50%.
  const track = [...items, ...items];

  return (
    <div className="marquee group overflow-hidden border-t border-border py-4" aria-label={`Stack: ${items.join(", ")}`}>
      <ul className="animate-marquee flex w-max group-hover:[animation-play-state:paused]" aria-hidden>
        {track.map((item, i) => (
          <li key={i} className="flex items-center gap-8 pr-8 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {item}
            <span className="h-1 w-1 rounded-full bg-line" />
          </li>
        ))}
      </ul>
    </div>
  );
}
