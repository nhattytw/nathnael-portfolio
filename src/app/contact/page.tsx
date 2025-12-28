import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, Copy } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <SectionContainer className="pt-32">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Let's Discuss Architecture
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Available for Senior Engineering roles, System Design consulting,
              and Technical Leadership opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">Email Address</p>
                      <a
                        href="mailto:nhattytw@outlook.com"
                        className="text-lg text-primary hover:underline break-all"
                      >
                        nhattytw@outlook.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div className="space-y-1">
                      <p className="font-medium">Phone Number</p>
                      <a
                        href="tel:+251922351343"
                        className="text-lg text-muted-foreground hover:text-primary"
                      >
                        +251 922 351 343
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div className="space-y-1">
                      <p className="font-medium">Location</p>
                      <p className="text-lg text-muted-foreground">
                        Addis Ababa, Ethiopia
                      </p>
                      <p className="text-sm text-muted-foreground">
                        (Open to Remote Work)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Professional Networks
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 justify-start h-12"
                    asChild
                  >
                    <a
                      href="https://linkedin.com/in/nathnael-woldekidan/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5 mr-3 text-[#0077b5]" />
                      LinkedIn Profile
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 justify-start h-12"
                    asChild
                  >
                    <a
                      href="https://github.com/nhattytw"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5 mr-3" />
                      GitHub Profile
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

            <div className="flex flex-col justify-center space-y-8 p-4">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Why Hire Me?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Proven Scalability</h4>
                      <p className="text-muted-foreground text-sm">
                        Experience deploying systems handling high traffic with
                        99.9% uptime.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Full-Cycle Leadership</h4>
                      <p className="text-muted-foreground text-sm">
                        From requirement analysis to deployment and team
                        mentorship.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Security First</h4>
                      <p className="text-muted-foreground text-sm">
                        Deep understanding of RBAC, JWT, and secure data
                        handling.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
