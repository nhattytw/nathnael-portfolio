import Link from "next/link";
import { ArrowRight, Code, Database, Server, Cpu } from "lucide-react";
import { Navigation } from "../components/navigation";
import { SectionContainer } from "../components/section-container";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <SectionContainer className="pt-32 pb-20">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <Badge
            variant="outline"
            className="px-4 py-1 text-base rounded-full border-primary/50 text-primary animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            Available for Senior Roles & Consultancy
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
            Nathnael Tesfaye
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Woldekidan
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Senior Backend-focused Full-stack Engineer architecting secure,
            scalable, and high-availability systems. Expert in Node.js, Python,
            and Microservices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/projects">
                View Architecture & Projects{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
              asChild
            >
              <Link href="/contact">Schedule a Discussion</Link>
            </Button>
          </div>
        </div>
      </SectionContainer>

      {/* Expertise Grid */}
      <SectionContainer className="bg-muted/30">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Core Competencies
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Delivering enterprise-grade solutions with a focus on performance,
              security, and maintainability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow border-primary/10">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Backend Architecture</h3>
              <p className="text-muted-foreground leading-relaxed">
                Designing RESTful APIs and WebSockets systems using Node.js,
                Express, and Python. Expertise in JWT authentication, RBAC, and
                payment gateway integration.
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow border-primary/10">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Data & Infrastructure</h3>
              <p className="text-muted-foreground leading-relaxed">
                Optimizing complex queries in PostgreSQL and MongoDB. Deploying
                high-availability infrastructure with Docker, Nginx, and CI/CD
                pipelines.
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow border-primary/10">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cpu className="h-6 w-6 text-primary" />
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

      {/* Impact Stats */}
      <SectionContainer className="border-y bg-background">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
          <div className="p-4 space-y-2">
            <div className="text-4xl font-extrabold text-primary">4+</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Years Experience
            </div>
          </div>
          <div className="p-4 space-y-2">
            <div className="text-4xl font-extrabold text-primary">99.9%</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Uptime Achieved
            </div>
          </div>
          <div className="p-4 space-y-2">
            <div className="text-4xl font-extrabold text-primary">4</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Teams Led
            </div>
          </div>
          <div className="p-4 space-y-2">
            <div className="text-4xl font-extrabold text-primary">10+</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Systems Deployed
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
