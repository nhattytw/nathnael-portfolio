import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experienceData } from "@/lib/experienceData";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <SectionContainer className="pt-24 pb-16">
        <div className="space-y-12 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Professional Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A track record of building resilient systems, optimizing
              performance, and leading engineering teams.
            </p>
          </div>

          <div className="relative border-l border-border/50 ml-3 md:ml-6 space-y-12">
            {experienceData.map((exp, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />

                <Card className="border-none shadow-none bg-transparent">
                  <CardHeader className="p-0 mb-4 space-y-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <h3 className="text-2xl font-bold leading-none">
                        {exp.title}
                      </h3>
                      <Badge variant="secondary" className="w-fit">
                        {exp.period}
                      </Badge>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {exp.company}
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span>{exp.location}</span>
                      <span className="hidden md:inline">•</span>
                      <span className="text-xs uppercase tracking-wider">
                        {exp.type}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 space-y-6">
                    <p className="text-muted-foreground italic">
                      {exp.description}
                    </p>

                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm md:text-base"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="bg-background/50"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
