import type { Metadata } from "next";
import { Container, PrimaryButton, TextLink } from "@/components/site/primitives";
import { NotFoundTrace } from "@/components/site/not-found-trace";

export const metadata: Metadata = { title: "Page not found" };

/** 404, drawn as a failed request on the site's status board. */
export default function NotFound() {
  return (
    <Container className="grid grid-cols-1 gap-12 pb-24 pt-10 md:pt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
      <div className="space-y-6 lg:order-2">
        <NotFoundTrace />
      </div>
      <div className="space-y-6 lg:order-1">
        <p className="label">Error 404 · Not found</p>
        <h1 className="font-display text-5xl leading-[0.98] tracking-tight md:text-6xl">
          This page isn&apos;t <em className="text-primary">in production.</em>
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          The link may be old or mistyped. The site itself is up, and everything else is where it should be.
        </p>
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <PrimaryButton href="/">Back to the home page</PrimaryButton>
          <TextLink href="/projects">See all work</TextLink>
        </div>
      </div>
    </Container>
  );
}
