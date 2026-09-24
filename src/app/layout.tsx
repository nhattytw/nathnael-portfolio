import type React from "react";
import type { Metadata, Viewport } from "next";
import { Raleway, Lora, Fira_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "../components/ui/sonner";
import { Footer } from "../components/footer";
import { BackToTop } from "../components/back-to-top";
import { CertificateProvider } from "../components/protected-certificate";
import { CommandPaletteProvider } from "../components/command-palette";
import { MotionProvider } from "../components/motion/motion-provider";
import { IntroOverlay } from "../components/intro-overlay";
import { CursorDot } from "../components/cursor-dot";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

// Headings, numbers, and UI
const fontRaleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

// Reading text
const fontLora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

// Terminal and code-style labels
const fontMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-fira-mono",
  display: "swap",
});

const BASE_URL = "https://nathnael-portfolio-wine.vercel.app/";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf0ca" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1b30" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Nathnael Tesfaye | Senior Software Engineer",
    template: "%s | Nathnael Tesfaye",
  },
  description:
    "Senior Software Engineer with 5+ years shipping production systems: founding engineer of a multi-module enterprise ERP, builder of a live public-sector platform, and the YeneCart SaaS. Node.js, Express.js, Next.js, PostgreSQL, and MongoDB.",
  keywords: [
    "Senior Software Engineer",
    "Senior Backend Engineer",
    "Founding Engineer",
    "Full Stack Developer",
    "Node.js",
    "Next.js",
    "PostgreSQL",
    "MongoDB",
    "Monorepo",
    "ERP",
    "Supabase",
    "System Design",
    "Addis Ababa",
    "Ethiopia",
    "Remote",
    "Software Consultant",
  ],
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  authors: [{ name: "Nathnael Tesfaye Woldekidan", url: BASE_URL }],
  creator: "Nathnael Tesfaye Woldekidan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Nathnael Tesfaye Woldekidan | Senior Software Engineer",
    description:
      "I build software that people rely on day to day: an enterprise ERP, a public-sector platform, and SaaS used by 300+ people daily.",
    siteName: "Nathnael's Portfolio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontRaleway.variable} ${fontLora.variable} ${fontMono.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <CertificateProvider>
              <CommandPaletteProvider>
                <IntroOverlay />
                <CursorDot />
                <main className="flex-1">{children}</main>
                <Footer />
                <BackToTop />
              </CommandPaletteProvider>
            </CertificateProvider>
          </MotionProvider>
          <Toaster />
        </ThemeProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
