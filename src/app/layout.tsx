import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "../components/ui/sonner";
import { Footer } from "../components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

// Primary Font
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Code/Tech Stack Font
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const BASE_URL = "https://nathnael-portfolio-wine.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Nathnael Tesfaye | Senior Full-Stack Engineer & Architect",
    template: "%s | Nathnael Tesfaye",
  },
  description:
    "Senior Software Engineer specializing in high-availability backend systems, microservices, and secure cloud architecture. Expert in Node.js, Python, Next.js, and DevOps orchestration.",
  keywords: [
    "Senior Software Engineer",
    "Backend Architect",
    "Full Stack Developer",
    "Node.js",
    "Python",
    "Next.js",
    "Microservices",
    "System Design",
    "Addis Ababa",
    "Ethiopia",
    "Software Consultant",
  ],
  authors: [{ name: "Nathnael Tesfaye Woldekidan", url: BASE_URL }],
  creator: "Nathnael Tesfaye Woldekidan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Nathnael Tesfaye Woldekidan | Senior Software Engineer",
    description:
      "Architecting scalable digital solutions. Expertise in distributed systems, API design, and full-cycle software development.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --font-sans: ${fontSans.style.fontFamily};
            --font-mono: ${fontMono.style.fontFamily};
          }
          body {
            font-family: var(--font-sans);
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-sans);
            letter-spacing: -0.01em; /* Inter looks better tight */
          }
          code, pre, .font-mono {
            font-family: var(--font-mono);
          }
        `}</style>
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
