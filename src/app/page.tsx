import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { Card } from "@/components/ui/card";
import { HeroSection } from "@/components/hero-section";
import { Database, Server, Cpu, Layout } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section (Client Component for Interactivity) */}
      <HeroSection />

      {/* Expertise Grid - Alternating Background (Secondary) */}
      <section
        id="expertise-section"
        className="bg-secondary py-24 scroll-mt-16"
      >
        <SectionContainer className="py-0">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Core Competencies
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Delivering enterprise-grade solutions with a focus on
                performance, security, and maintainability.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 space-y-4 hover:shadow-xl transition-all duration-300 border-none">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                  <Server className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Backend Architecture</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Designing RESTful APIs and WebSockets systems using Node.js,
                  Express, and Python. Expertise in JWT authentication, RBAC,
                  and payment gateway integration.
                </p>
              </Card>

              <Card className="p-8 space-y-4 hover:shadow-xl transition-all duration-300 border-none">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                  <Layout className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Frontend Engineering</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building responsive, pixel-perfect interfaces with React,
                  Next.js, and Tailwind CSS. Translating high-fidelity Figma
                  designs into production-ready, accessible code.
                </p>
              </Card>

              <Card className="p-8 space-y-4 hover:shadow-xl transition-all duration-300 border-none">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                  <Database className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Data & Infrastructure</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Optimizing complex queries in PostgreSQL and MongoDB.
                  Deploying high-availability infrastructure with Docker, Nginx,
                  and CI/CD pipelines.
                </p>
              </Card>

              <Card className="p-8 space-y-4 hover:shadow-xl transition-all duration-300 border-none">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                  <Cpu className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Technical Leadership</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Leading agile teams, conducting code reviews, and mentoring
                  junior developers. Translating complex business requirements
                  into technical roadmaps.
                </p>
              </Card>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Impact Stats - Base Background */}
      <section className="bg-background border-t py-24">
        <SectionContainer className="py-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4 space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-primary">
                4+
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Years Experience
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-primary">
                99.9%
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Uptime Achieved
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-primary">
                5+
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Teams Led
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-primary">
                10+
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Systems Deployed
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}
