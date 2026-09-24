"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon, SunIcon, Menu, X, Command } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCommandPalette } from "./command-palette";
import { Logo } from "./logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const palette = useCommandPalette();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    toast.success(
      `Theme switched to ${newTheme === "dark" ? "Dark" : "Light"}`
    );
  };

  if (!mounted)
    return <div className="h-16 bg-background/95 sticky top-0 z-50 border-b" />;

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 h-16 grid grid-cols-2 md:grid-cols-3 items-center">
          <div className="flex justify-start">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-sans text-lg font-extrabold tracking-tight"
              aria-label="Nathnael Tesfaye Woldekidan, home"
            >
              <Logo className="h-9 w-9" />
              <span className="hidden sm:inline">Nathnael T.</span>
            </Link>
          </div>

          <div className="hidden md:flex justify-center items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100",
                    pathname === item.href && "scale-x-100"
                  )}
                />
              </Link>
            ))}
          </div>

          <div className="flex justify-end items-center gap-2 md:gap-4">
            <button
              onClick={palette.open}
              className="flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              title="Open command palette (Ctrl/⌘ + K)"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-mono">K</span>
              <span className="sr-only">Open command palette</span>
            </button>
            <div className="hidden md:block">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>

            <div className="md:hidden">
              <Button
                ref={buttonRef}
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-x-4 top-20 z-40 p-6 rounded-xl border bg-popover shadow-2xl md:hidden animate-in slide-in-from-top-5 duration-200"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-lg font-medium py-2 transition-colors border-b border-border/50 last:border-0",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between mt-2 pt-2">
              <span className="text-sm font-medium text-muted-foreground">
                Switch Theme
              </span>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ThemeToggle({
  theme,
  toggleTheme,
}: {
  theme: string | undefined;
  toggleTheme: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full hover:bg-muted"
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 transition-all text-yellow-500" />
      ) : (
        <MoonIcon className="h-5 w-5 transition-all text-primary" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
