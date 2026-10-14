import Link from "next/link";
import { generalData } from "@/lib/generalData";
import { copyrightYears } from "@/lib/site";

const SITE = [
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const { contact, socials, resume } = generalData;
  const elsewhere = [
    { href: `mailto:${contact.email}`, label: "Email" },
    { href: socials.linkedin, label: "LinkedIn" },
    { href: socials.github, label: "GitHub" },
    { href: resume.href, label: "Résumé (PDF)" },
  ];

  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10 md:px-6">
        <div className="col-span-2 space-y-3 md:col-span-1">
          <p className="font-display text-3xl leading-tight">{generalData.name}</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {generalData.title} in Addis Ababa, working remotely worldwide.
          </p>
        </div>
        <div className="space-y-3">
          <p className="label">Site</p>
          <ul className="space-y-1.5 text-sm">
            {SITE.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="label">Elsewhere</p>
          <ul className="space-y-1.5 text-sm">
            {elsewhere.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-5 font-mono text-xs text-muted-foreground md:px-6">
        <span>
          © {copyrightYears(new Date().getFullYear())} {generalData.name}
        </span>
        <a href={generalData.project} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
          Source on GitHub ↗
        </a>
      </div>
    </footer>
  );
}
