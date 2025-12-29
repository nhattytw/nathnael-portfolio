import { Terminal } from "lucide-react";
import { generalData } from "@/lib/generalData";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground py-12 border-t border-border/50">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 text-center px-6">
        {/* Line 1: Built by & Source Code */}
        <div className="flex flex-col md:flex-row items-center gap-2 text-sm">
          <span className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            Built by{" "}
            <span className="font-semibold text-foreground">
              {generalData.name}
            </span>
            .
          </span>
          <span className="hidden md:inline opacity-50">•</span>
          <span>
            The source code is available on{" "}
            <a
              href={generalData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary transition-colors text-foreground"
            >
              GitHub
            </a>
            .
          </span>
        </div>

        {/* Line 2: Copyright & Tech Stack */}
        <div className="flex items-center gap-3 text-xs opacity-80">
          <p>© {currentYear}</p>
          <div className="h-3 w-[1px] bg-border" />
          <p>
            Made with{" "}
            <span className="font-semibold text-foreground">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
