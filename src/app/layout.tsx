import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { CertificateProvider } from "@/components/protected-certificate";
import { MotionProvider } from "@/components/motion/motion-provider";
import { NavProgress } from "@/components/nav-progress";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

// Interface and reading text
const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Display headings
const fontDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Labels, data and status lines
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const BASE_URL = "https://nathnaeltw.pro.et/";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
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
    siteName: "Nathnael Tesfaye",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <CertificateProvider>
              <NavProgress />
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </CertificateProvider>
          </MotionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
