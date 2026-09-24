import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { generalData } from "@/lib/generalData";

export function ImpactMetrics() {
  return (
    <section id="impact" className="bg-secondary pt-8 pb-20 scroll-mt-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 text-center max-w-5xl mx-auto">
          {generalData.impactMetrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.08} className="space-y-2">
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
          ))}
        </div>
      </div>
    </section>
  );
}
