import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedIcon, type IconLoop } from "@/components/motion/animated-icon";
import { FloatingIcons } from "@/components/motion/floating-icons";
import { generalData } from "@/lib/generalData";
import { Activity, BarChart3, CalendarClock, FolderCheck, Gauge, Target, Trophy, type LucideIcon } from "lucide-react";

// Matched by label so reordering the metrics keeps each icon with its number.
const METRIC_ICONS: Record<string, { icon: LucideIcon; loop: IconLoop }> = {
  "Years Experience": { icon: CalendarClock, loop: "wiggle" },
  "Production Uptime": { icon: Activity, loop: "pulse" },
  "Projects Delivered": { icon: FolderCheck, loop: "bob" },
  "Bid Win Rate": { icon: Trophy, loop: "wiggle" },
};

export function ImpactMetrics() {
  return (
    <section id="impact" className="relative isolate bg-secondary pt-8 pb-14 scroll-mt-16">
      <FloatingIcons icons={[BarChart3, Gauge, Target, Activity]} column="5xl" />
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 text-center max-w-5xl mx-auto">
          {generalData.impactMetrics.map((metric, i) => {
            const icon = METRIC_ICONS[metric.label];
            return (
              <Reveal key={metric.label} delay={i * 0.08} className="space-y-2">
                {icon && (
                  <AnimatedIcon loop={icon.loop} className="text-primary/70">
                    <icon.icon className="h-6 w-6" />
                  </AnimatedIcon>
                )}
                <CountUp
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  className="block font-sans text-5xl md:text-6xl font-extrabold text-primary tabular-nums"
                />
                <div className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider">
                  {metric.label}
                </div>
                <p className="text-sm text-muted-foreground">{metric.source}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
