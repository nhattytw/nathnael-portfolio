"use client";

import type React from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import { toast } from "sonner";
import {
  Award,
  Briefcase,
  Download,
  FolderGit2,
  Github,
  Home,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sparkles,
  SquareTerminal,
  User,
  Workflow,
  Map as MapIcon,
  BarChart3,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Terminal } from "@/components/terminal";
import { useCertificateViewer } from "@/components/protected-certificate";
import { generalData } from "@/lib/generalData";

const PaletteContext = createContext<{ open: () => void }>({ open: () => {} });

export function useCommandPalette() {
  return useContext(PaletteContext);
}

type Mode = "commands" | "terminal";

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("commands");
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const certificate = useCertificateViewer();

  const open = useCallback(() => {
    setMode("commands");
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMode("commands");
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  const goToSection = (id: string) => {
    if (window.location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = generalData.resume.href;
    link.download = generalData.resume.downloadName;
    link.click();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(generalData.contact.email);
      toast.success("Email copied to clipboard");
    } catch {
      window.location.href = `mailto:${generalData.contact.email}`;
    }
  };

  return (
    <PaletteContext.Provider value={{ open }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="overflow-hidden p-0 sm:max-w-xl top-[20%] translate-y-0"
        >
          <DialogTitle className="sr-only">
            {mode === "commands" ? "Command palette" : "Terminal"}
          </DialogTitle>
          {mode === "terminal" ? (
            <Terminal onExit={() => setMode("commands")} onClose={() => setIsOpen(false)} />
          ) : (
            <Command
              loop
              className="flex flex-col [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              <div className="flex items-center gap-2 border-b px-4">
                <Search className="h-4 w-4 shrink-0 opacity-60" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search…"
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="hidden sm:inline rounded border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-[360px] overflow-y-auto overscroll-contain p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No results. Try “terminal”.
                </Command.Empty>

                <Command.Group heading="Navigate">
                  <Item icon={Home} onSelect={() => run(() => router.push("/"))}>Home</Item>
                  <Item icon={User} onSelect={() => run(() => router.push("/about"))}>About</Item>
                  <Item icon={Briefcase} onSelect={() => run(() => router.push("/experience"))}>Experience</Item>
                  <Item icon={FolderGit2} onSelect={() => run(() => router.push("/projects"))}>Projects</Item>
                  <Item icon={Mail} onSelect={() => run(() => router.push("/contact"))}>Contact</Item>
                </Command.Group>

                <Command.Group heading="Jump to">
                  <Item icon={BarChart3} onSelect={() => run(() => goToSection("impact"))}>Impact metrics</Item>
                  <Item icon={Workflow} onSelect={() => run(() => goToSection("architecture"))}>Architecture showcase</Item>
                  <Item icon={Sparkles} onSelect={() => run(() => goToSection("journey"))}>Career journey</Item>
                  <Item icon={MapIcon} onSelect={() => run(() => goToSection("skills"))}>Skills map</Item>
                </Command.Group>

                <Command.Group heading="Actions">
                  <Item icon={SquareTerminal} keywords={["shell", "cli", "whoami"]} onSelect={() => setMode("terminal")}>
                    Open terminal
                  </Item>
                  <Item icon={Award} keywords={["iimcs", "certificate", "recognition"]} onSelect={() => run(() => certificate.open("iimcs"))}>
                    View IIMCS recognition
                  </Item>
                  <Item icon={Download} keywords={["cv", "resume", "pdf"]} onSelect={() => run(downloadResume)}>
                    Download CV
                  </Item>
                  <Item icon={Mail} keywords={["contact"]} onSelect={() => run(copyEmail)}>
                    Copy email address
                  </Item>
                  <Item
                    icon={Moon}
                    keywords={["dark", "light", "theme"]}
                    onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
                  >
                    Toggle theme
                  </Item>
                </Command.Group>

                <Command.Group heading="Elsewhere">
                  <Item icon={Linkedin} onSelect={() => run(() => window.open(generalData.socials.linkedin, "_blank", "noopener"))}>
                    LinkedIn
                  </Item>
                  <Item icon={Github} onSelect={() => run(() => window.open(generalData.socials.github, "_blank", "noopener"))}>
                    GitHub
                  </Item>
                </Command.Group>
              </Command.List>
            </Command>
          )}
        </DialogContent>
      </Dialog>
    </PaletteContext.Provider>
  );
}

function Item({
  icon: Icon,
  children,
  onSelect,
  keywords,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  onSelect: () => void;
  keywords?: string[];
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      keywords={keywords}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm aria-selected:bg-primary/10 aria-selected:text-primary"
    >
      <Icon className="h-4 w-4 opacity-70" />
      {children}
    </Command.Item>
  );
}
