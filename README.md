# nathnaeltw.pro.et

[![CI](https://github.com/nhattytw/nathnael-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/nhattytw/nathnael-portfolio/actions/workflows/ci.yml)

Portfolio of Nathnael Tesfaye Woldekidan, Senior Software Engineer. The site
is laid out like a status page: each project shows whether its production
deployment is answering right now.

Live at **[nathnaeltw.pro.et](https://nathnaeltw.pro.et)**.

## What's worth looking at

- **Live project checks** (`src/lib/utils.ts`). Each project's URL is probed
  on the server with a `HEAD` request. If that fails or is slow, a 50-byte
  ranged `GET` is tried next. Results are cached for 15 minutes with
  `unstable_cache`, and the pages are regenerated on a 15-minute ISR interval.
  Status codes that mean "up, but refusing this request" (401, 403, 405, 429,
  and 503 from Cloudflare challenges) count as live.
- **View-only certificates** (`src/app/api/cert/[id]/route.ts`). Certificate
  images are committed only as AES-256-GCM ciphertext. The route decrypts one
  only for an id on the allowlist, and only for a same-origin `fetch()`, which
  it checks with Fetch Metadata and falls back to `Referer` on older browsers.
  Opening the URL directly or embedding it as an `<img>` is refused.
- **Contact form** (`src/components/contact-form.tsx`, `src/lib/contact.ts`).
  Fields are validated on the client, then posted as JSON to
  [FormSubmit](https://formsubmit.co)'s AJAX endpoint, which emails them on. A
  honeypot field drops bot submissions. Beside the form, a live preview shows
  the exact request being sent and, once it's sent, the response.

## Stack

Next.js 15 (App Router, React Server Components), React 19, TypeScript
(strict), Tailwind CSS v4, Motion, Radix primitives, next-themes. Fonts are
Geist, Geist Mono and Instrument Serif via `next/font`. Tooling is ESLint
(`next/core-web-vitals`, `next/typescript`), Vitest and GitHub Actions.

## Running it

Requires Node 24 and pnpm 11. Run `corepack enable` to get the version pinned
in `package.json`.

```bash
pnpm install
pnpm dev          # http://localhost:4000
```

| Script            | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `pnpm typecheck`  | `tsc --noEmit`                                      |
| `pnpm lint`       | ESLint, fails on any warning                        |
| `pnpm test`       | Vitest unit tests                                   |
| `pnpm build`      | Production build (type errors and lint errors fail) |
| `pnpm cert:build` | Re-encrypt certificate previews (see below)         |

CI runs typecheck, lint, test and build on every push to `main` and every pull
request.

### Environment

| Variable                       | Needed for                                                       |
| ------------------------------ | ---------------------------------------------------------------- |
| `CERT_KEY`                     | Decrypting certificate previews. Base64, 32 bytes.               |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | `https://formsubmit.co/ajax/<form id>`. Defaults to the address in `generalData.ts`. |

Put them in `.env.local` for development. FormSubmit emails a one-time
activation link on the first submission to a new address; after that, use the
random form id it gives you so the address stays out of the page source.

### Certificates

To add or replace a certificate:

1. Drop the original image into `private/certificates/` as
   `<id>-original.png` or `<id>-original.jpg`. Originals are git-ignored.
2. Give the matching certification a `certificateId` in
   `src/lib/generalData.ts`.
3. Run `pnpm cert:build`. It writes a downscaled, encrypted `<id>.enc`. If no
   `CERT_KEY` is set, it generates one into `.env.local`.

## Layout

```
src/
  app/                 routes: /, /about, /experience, /projects, /projects/[id], /contact
    api/cert/[id]/     encrypted certificate preview route
  components/
    site/              header, footer, status board, project list, hero, ledger
    motion/            scroll reveal and motion provider
    ui/                Radix-based primitives
  lib/
    generalData.ts     bio, education, skills, certifications
    experienceData.ts  work history
    projectData.ts     case studies
    contact.ts         contact form rules
    utils.ts           cn() and the live site check
scripts/encrypt-cert.mjs
```

Content lives in the three `*Data.ts` files. Edit those to change what the
site says.

## License

The code is MIT. The personal content (the `*Data.ts` files, résumé, logo and
certificates) is all rights reserved. [LICENSE.md](LICENSE.md) lists exactly
what each covers.
