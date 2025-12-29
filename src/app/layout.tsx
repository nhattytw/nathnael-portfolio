import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "../components/ui/sonner";
import { Footer } from "../components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

// Primary Font - Inter (Senior, Clean, Professional)
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

export const metadata: Metadata = {
  title:
    "Nathnael Tesfaye Woldekidan | Senior Backend-focused Full-stack Engineer",
  description:
    "Senior Software Engineer with 4+ years of experience specializing in scalable backend systems, microservices architecture, and high-availability infrastructure using Node.js, Python, and Next.js.",
  generator: "v0.app",
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
