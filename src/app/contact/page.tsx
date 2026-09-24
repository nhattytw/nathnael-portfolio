import { Navigation } from "@/components/navigation";
import { SectionContainer } from "@/components/section-container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { generalData } from "@/lib/generalData";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <SectionContainer className="pt-32">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Let&apos;s Build Something
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell me about the role or the product. I usually reply within a
              day or two.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-8 bg-card border-border/50">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-primary">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors border border-transparent hover:border-primary/10">
                    <Mail className="h-6 w-6 text-primary mt-1 shrink-0" />
                    <div className="flex-1 space-y-1 min-w-0">
                      <p className="font-sans font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Email Address
                      </p>
                      <a
                        href={`mailto:${generalData.contact.email}`}
                        className="text-lg font-medium hover:text-primary transition-colors block truncate"
                      >
                        {generalData.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors border border-transparent hover:border-primary/10">
                    <Phone className="h-6 w-6 text-primary mt-1 shrink-0" />
                    <div className="space-y-1 min-w-0">
                      <p className="font-sans font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Phone Number
                      </p>
                      <a
                        href={`tel:${generalData.contact.phone}`}
                        className="text-lg font-medium hover:text-primary transition-colors block truncate"
                      >
                        {generalData.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors border border-transparent hover:border-primary/10">
                    <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                    <div className="space-y-1 min-w-0">
                      <p className="font-sans font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Location
                      </p>
                      <p className="text-lg font-medium truncate">
                        Addis Ababa, Ethiopia
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Open to remote work worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 text-primary">
                  Professional Networks
                </h3>
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 w-full justify-start px-6 text-base font-medium border-primary/20 bg-secondary/10 hover:bg-secondary/30 hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                    asChild
                  >
                    <a
                      href={generalData.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate"
                    >
                      <Linkedin className="h-5 w-5 mr-3 text-[#0077b5] shrink-0" />
                      LinkedIn Profile
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 w-full justify-start px-6 text-base font-medium border-primary/20 bg-secondary/10 hover:bg-secondary/30 hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                    asChild
                  >
                    <a
                      href={generalData.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate"
                    >
                      <Github className="h-5 w-5 mr-3 shrink-0" />
                      GitHub Profile
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

            <div className="flex flex-col justify-center space-y-8 p-4">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-primary">
                  Availability
                </h3>
                <p className="text-lg leading-relaxed text-foreground/90">
                  {generalData.availability.interests}
                </p>
                <dl className="space-y-5 font-sans">
                  <div className="space-y-2">
                    <dt className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Employment
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {generalData.availability.roles.map((role) => (
                        <span
                          key={role}
                          className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm font-medium"
                        >
                          {role}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div className="space-y-2">
                    <dt className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Where
                    </dt>
                    {generalData.availability.workplaces.map((place) => (
                      <dd key={place.label} className="flex items-baseline gap-2">
                        <span className="font-semibold">{place.label}</span>
                        <span className="text-muted-foreground">· {place.detail}</span>
                      </dd>
                    ))}
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <Reveal>
            <Card className="p-8 space-y-6 bg-card border-border/50">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-primary">
                  Send a Message
                </h3>
                <p className="text-muted-foreground">
                  This opens your email app with the message ready to send.
                </p>
              </div>
              <ContactForm />
            </Card>
          </Reveal>
        </div>
      </SectionContainer>
    </div>
  );
}
