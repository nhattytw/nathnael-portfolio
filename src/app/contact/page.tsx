import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Container, PageHeader, ResumeButton } from "@/components/site/primitives";
import { generalData } from "@/lib/generalData";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const { contact, socials, availability } = generalData;
  const channels = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    { label: "LinkedIn", value: "in/nathnael-woldekidan", href: socials.linkedin },
    { label: "GitHub", value: "github.com/nhattytw", href: socials.github },
  ];

  return (
    <Container>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build <em className="text-primary">something</em>
          </>
        }
        lead="Tell me about the role or the product. I usually reply within a day or two."
      />

      <div className="grid gap-12 pt-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <Reveal>
          <section aria-labelledby="form-heading" className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="space-y-1">
              <h2 id="form-heading" className="font-display text-3xl tracking-tight">
                Send a message
              </h2>
              <p className="text-sm text-muted-foreground">
                Goes straight to my inbox. The panel shows the request as you type.
              </p>
            </div>
            <ContactForm />
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="space-y-10">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 font-mono text-xs text-foreground">
                <span className="live-dot" /> Available now
              </p>
              <p className="text-muted-foreground">{availability.interests}</p>
              <ul className="space-y-1 text-sm">
                <li>{availability.roles.join(" · ")}</li>
                {availability.workplaces.map((w) => (
                  <li key={w.label} className="text-muted-foreground">
                    {w.label}, {w.detail}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label mb-2">Or reach me directly</p>
              <ul className="divide-y divide-border border-y border-border">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center justify-between gap-3 py-3"
                    >
                      <span className="min-w-0">
                        <span className="block text-xs text-muted-foreground">{c.label}</span>
                        <span className="block truncate text-[15px] group-hover:text-primary">{c.value}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <ResumeButton className="w-full" />
          </aside>
        </Reveal>
      </div>
    </Container>
  );
}
