import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const experiences = [
  {
    title: "Software Engineer",
    company: "Baro Technologies",
    location: "Addis Ababa, Ethiopia",
    period: "05/2024 - Present",
    type: "Full-time - Onsite",
    description:
      "Leading the development of a scalable SaaS platform, overseeing the full SDLC from architecture to deployment.",
    achievements: [
      "Architected and deployed a full-stack SaaS platform utilizing Next.js, TypeScript, and Tailwind CSS, taking full ownership of the system design.",
      "Engineered a high-availability, multi-server infrastructure from scratch using Docker for containerization and Nginx for reverse proxy/load balancing.",
      "Led a cross-functional team of 4 developers in an Agile environment, facilitating stand-ups, code reviews, and technical mentorship.",
      "Developed, deployed, and maintained 3+ mission-critical software solutions, consistently meeting strict project deadlines.",
    ],
    skills: [
      "System Architecture",
      "Next.js",
      "Docker",
      "Nginx",
      "Team Leadership",
    ],
  },
  {
    title: "Software Engineer & Technical Officer",
    company: "Ahaz Software and Web Technology Solutions",
    location: "Addis Ababa, Ethiopia",
    period: "03/2023 - 05/2023",
    type: "Full-time - Remote",
    description:
      "Focused on backend optimization and real-time system implementation for HR management solutions.",
    achievements: [
      "Developed robust MERN-stack applications for HR management, implementing WebSockets for real-time attendance tracking.",
      "Optimized complex PostgreSQL database queries through advanced indexing and data modeling, significantly reducing API response times.",
      "Implemented secure JWT authentication systems and Role-Based Access Control (RBAC) to ensure data integrity.",
      "Integrated third-party biometric hardware with RESTful APIs for seamless attendance data synchronization.",
    ],
    skills: [
      "PostgreSQL",
      "WebSockets",
      "Optimization",
      "Security",
      "Hardware Integration",
    ],
  },
  {
    title: "Programming Lecturer",
    company: "Ethio Robo-Robotics",
    location: "Addis Ababa, Ethiopia",
    period: "10/2022 - 06/2024",
    type: "Part-time - Onsite",
    description:
      "Delivering advanced technical curriculum and fostering the next generation of engineers.",
    achievements: [
      "Delivered comprehensive courses in C++, C#, Java, Python, and Web Development to 30+ students.",
      "Served as a Judge for the VEX African Robotics Championship (2023 & 2024), evaluating complex technical implementations.",
      "Demonstrated strong technical communication skills by breaking down complex algorithms for students.",
    ],
    skills: ["Technical Communication", "Mentorship", "C++", "Python", "Java"],
  },
  {
    title: "Junior Software Engineer",
    company: "Ahaz Software and Web Technology Solutions",
    location: "Addis Ababa, Ethiopia",
    period: "10/2021 - 10/2022",
    type: "Full-time - Remote",
    description:
      "Early career role focused on full-stack development and desktop application integration.",
    achievements: [
      "Developed over 5 web and desktop applications, designing backend functionality and schemas for PostgreSQL and MongoDB.",
      "Integrated biometric scanning devices into desktop applications using Python, enhancing system security.",
      "Collaborated with senior developers to implement third-party system integrations.",
    ],
    skills: [
      "Full-stack Development",
      "Python",
      "Database Design",
      "Desktop Apps",
    ],
  },
];

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
            {experiences.map((exp, index) => (
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
