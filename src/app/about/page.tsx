import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, GraduationCap, Award, Terminal } from "lucide-react";

const skills = {
  backend: [
    "Node.js",
    "Express.js",
    "Python",
    "RESTful APIs",
    "WebSockets",
    "Microservices",
  ],
  database: [
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "SQLite",
    "NoSQL",
    "Query Optimization",
  ],
  devops: [
    "Docker",
    "Nginx",
    "CI/CD",
    "Linux",
    "Reverse Proxy",
    "Load Balancing",
  ],
  frontend: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Vue.js"],
  tools: [
    "Git/GitHub",
    "Postman",
    "Unit Testing",
    "Integration Testing",
    "AI Coding Tools",
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <SectionContainer className="pt-24 pb-16">
        <div className="space-y-16 max-w-4xl mx-auto">
          {/* Header */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              About Me
            </h1>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I am a{" "}
                  <span className="font-semibold text-foreground">
                    Senior Backend-focused Full-stack Software Engineer
                  </span>{" "}
                  based in Addis Ababa, Ethiopia. With over 4 years of hands-on
                  experience, I specialize in architecting secure, scalable
                  applications and designing high-availability infrastructure.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My expertise spans the full software development
                  lifecycle—from system architecture and database design to
                  deployment and DevOps automation. I have a proven track record
                  of optimizing complex systems, leading agile teams, and
                  implementing robust security measures like JWT and RBAC.
                </p>
              </div>

              {/* Optional: Add a placeholder div for a photo or a stylized graphic */}
              <div className="w-full md:w-64 aspect-square bg-muted rounded-2xl flex items-center justify-center border border-border/50 shrink-0">
                <User className="h-24 w-24 text-muted-foreground/50" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Education & Certifications */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" /> Education
              </h2>
              <Card>
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-bold text-lg">
                    Bachelor of Science in Computer Science
                  </h3>
                  <p className="text-primary font-medium">
                    HiLCoE School of Computer Science and Technology
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Addis Ababa, Ethiopia
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" /> Certifications
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <div>
                    <span className="font-medium block">
                      Scientific Computing with Python
                    </span>
                    <span className="text-sm text-muted-foreground">
                      freeCodeCamp
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <div>
                    <span className="font-medium block">
                      Git & GitHub Projects: Project-Based Learning
                    </span>
                    <span className="text-sm text-muted-foreground">Udemy</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <div>
                    <span className="font-medium block">
                      ALX AiCE - AI Career Essentials
                    </span>
                    <span className="text-sm text-muted-foreground">ALX</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <div>
                    <span className="font-medium block">
                      Business Fundamentals: Effective Communication
                    </span>
                    <span className="text-sm text-muted-foreground">
                      FutureLearn
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <Separator />

          {/* Technical Skills */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Terminal className="h-6 w-6 text-primary" /> Technical Arsenal
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, items]) => (
                <Card key={category} className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 capitalize text-lg">
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
