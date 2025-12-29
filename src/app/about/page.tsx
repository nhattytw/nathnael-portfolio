import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Award, Terminal, ExternalLink } from "lucide-react";
import { generalData } from "@/lib/generalData";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <SectionContainer className="pt-24 pb-16">
        <div className="space-y-16 max-w-4xl mx-auto">
          {/* Header */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              About Me
            </h1>
            <div className="space-y-6">
              {generalData.about.summary.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <Separator />

          {/* Education & Certifications */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education Column */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
                <GraduationCap className="h-6 w-6" /> Education
              </h2>
              <div className="space-y-4">
                {generalData.about.education.map((edu, index) => (
                  <Card
                    key={index}
                    className="border-border/50 bg-card hover:border-primary/20 transition-colors"
                  >
                    <CardContent className="p-6 space-y-2">
                      <h3 className="font-bold text-lg">{edu.degree}</h3>
                      <p className="text-primary font-medium">
                        {edu.institution}
                      </p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{edu.location}</span>
                        {edu.year && <span>{edu.year}</span>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certifications Column */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
                <Award className="h-6 w-6" /> Certifications
              </h2>
              <ul className="space-y-4">
                {generalData.about.certifications.map((cert, index) => (
                  <li
                    key={index}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 group-hover:scale-125 transition-transform" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-foreground">
                          {cert.name}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer}
                      </p>
                      {cert.link && (
                        <Link
                          href={cert.link}
                          target="_blank"
                          className="inline-flex items-center text-xs text-primary hover:underline underline-offset-4 border border-white px-2 py-0.5 rounded-md mt-1 transition-colors"
                        >
                          Verify <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator />

          {/* Technical Skills */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
              <Terminal className="h-6 w-6" /> Technical Stack
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(generalData.skills).map(([category, items]) => (
                <Card
                  key={category}
                  className="border-border/50 bg-card hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 capitalize text-lg text-primary">
                      {category.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="hover:bg-primary/20 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
