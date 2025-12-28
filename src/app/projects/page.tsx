import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe, Lock, Server } from "lucide-react";

const projects = [
  {
    title: "High-Availability E-commerce Platform",
    subtitle: "YeneCart",
    description:
      "Architected a multi-tenant SaaS platform with a focus on scalability and resilience. Designed the system to handle isolated tenant data and high traffic loads.",
    technologies: ["Next.js", "MongoDB", "Docker", "Nginx", "ArifPay"],
    highlights: [
      "Designed scalable MongoDB schema for multi-tenancy",
      "Integrated ArifPay for recurring billing and webhooks",
      "Achieved 99.9% uptime via Docker & Nginx load balancing",
    ],
    type: "Architecture",
    status: "Production",
    links: { demo: "#", github: "#" }, // Placeholders or removed if proprietary
  },
  {
    title: "Biometric HR Management Platform",
    subtitle: "Desktop & System Integration",
    description:
      "A standalone desktop application automating critical HR workflows. Bridged the gap between hardware (biometric devices) and software for real-time attendance tracking.",
    technologies: [
      "Python",
      "Qt5",
      "SQLite",
      "Biometric SDK",
      "Data Processing",
    ],
    highlights: [
      "Real-time attendance tracking from hardware devices",
      "Automated payroll processing logic",
      "Lightweight local data management with SQLite",
    ],
    type: "System Integration",
    status: "Delivered",
  },
  {
    title: "Integrated Project Management System",
    subtitle: "Real-time Collaboration Tool",
    description:
      "A MERN-stack collaborative platform featuring instant updates. Engineered the backend to handle complex state management for Kanban boards.",
    technologies: ["React.js", "Node.js", "WebSockets", "Express", "MongoDB"],
    highlights: [
      "WebSocket integration for instant task updates",
      "Modular API structure for Kanban logic",
      "Complex state management for team collaboration",
    ],
    type: "Full Stack",
    status: "Delivered",
  },
  {
    title: "Pharmacy Inventory System",
    subtitle: "Enterprise Management",
    description:
      "A comprehensive system for stock management with strict data integrity requirements. Implemented granular security controls.",
    technologies: ["PostgreSQL", "React.js", "Node.js", "RBAC"],
    highlights: [
      "Relational database design for thousands of items",
      "Dynamic Role-Based Access Control (RBAC)",
      "Data integrity enforcement via strict schema validation",
    ],
    type: "Enterprise",
    status: "Delivered",
  },
  {
    title: "Corporate & Client Websites",
    subtitle: "Frontend Implementation",
    description:
      "Delivered 4+ high-fidelity websites for diverse clients (Law, Tech, Retail). Converted Figma designs into pixel-perfect, responsive code.",
    technologies: ["React", "Tailwind CSS", "Figma", "Responsive Design"],
    highlights: [
      "Pixel-perfect Figma to Code conversion",
      "Cross-device compatibility optimization",
      "Modern UI/UX implementation",
    ],
    type: "Frontend",
    status: "Live",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <SectionContainer className="pt-24 pb-16">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Featured Projects
            </h1>
            <p className="text-xl text-muted-foreground">
              A selection of architected systems, demonstrating expertise in
              high-availability, security, and complex data management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="flex flex-col h-full hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="mb-2">
                      {project.type}
                    </Badge>
                    {project.status === "Production" ||
                    project.status === "Live" ? (
                      <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                        {project.status}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">{project.status}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <p className="text-sm font-medium text-primary">
                    {project.subtitle}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 space-y-6">
                  <p className="text-muted-foreground">{project.description}</p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <Server className="h-4 w-4" /> Technical Highlights
                    </h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1.5">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 items-start pt-2">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-secondary/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Links section intentionally minimal as many are internal/proprietary */}
                  <div className="flex gap-3 w-full pt-4 border-t mt-2">
                    {project.links?.demo && project.links.demo !== "#" && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="mr-2 h-4 w-4" /> Live Demo
                        </a>
                      </Button>
                    )}
                    {/* If no public links, show proprietary tag */}
                    {(!project.links || project.links.demo === "#") && (
                      <div className="flex items-center text-xs text-muted-foreground w-full justify-center py-2 bg-muted/30 rounded">
                        <Lock className="h-3 w-3 mr-2" /> Internal / Client
                        Proprietary
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
