import Link from "next/link";

/** The name as a wordmark, with the status dot that runs through the site. */
export function Wordmark() {
  return (
    <Link href="/" aria-label="Nathnael Tesfaye, home" className="group inline-flex items-baseline gap-1.5">
      <span className="font-display text-2xl leading-none tracking-tight">Nathnael Tesfaye</span>
      <span className="h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-150" />
    </Link>
  );
}
