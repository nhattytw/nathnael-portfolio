# Nathnael Tesfaye Woldekidan | Senior Full-Stack Engineer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A high-performance, accessible, and scalable portfolio website built to showcase advanced engineering capabilities, architectural expertise, and technical projects.

## 🚀 Overview

This portfolio is engineered with a focus on **performance**, **maintainability**, and **modern web standards**. It leverages the latest features of Next.js 15 (App Router) and Tailwind CSS v4 to deliver a lightning-fast user experience.

The design system implements a custom **"Iced Mint"** semantic color palette with strict WCAG compliance for accessibility across both light and dark modes.

## ✨ Key Features

*   **Architecture:** Built on Next.js 15 App Router with React Server Components (RSC) for optimal initial load and SEO.
*   **Type Safety:** Strict TypeScript configuration for robust and maintainable code.
*   **Design System:**
    *   Custom **Iced Mint** & **Deep Green** aesthetic.
    *   **Inter** font for UI and **JetBrains Mono** for technical data.
    *   WCAG AA/AAA compliant contrast ratios.
*   **Component Library:** Modular UI components built with **Shadcn UI** (Radix Primitives) and **Tailwind CSS v4**.
*   **Dynamic Data Layer:** Centralized data management in `src/lib/` for easy content updates without code alteration.
*   **Interactive UI:**
    *   Smooth scroll handling with Intersection Observers.
    *   Image carousels for project showcases.
    *   Server-side validation for live project availability.
*   **Performance:** Optimized image loading (Next/Image), font subsetting, and route prefetching.

## 🛠️ Tech Stack

*   **Framework:** [Next.js 15](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **UI Primitives:** [Radix UI](https://www.radix-ui.com/) (via Shadcn)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Animation:** Tailwind Animate
*   **Deployment:** Vercel

## ⚡ Getting Started

### Prerequisites

*   Node.js 24+
*   pnpm 11 (`corepack enable` picks up the pinned version from `package.json`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nhattytw/nathnael-portfolio.git
    cd nathnael-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set the certificate key:** add `CERT_KEY` (base64, 32 bytes) to `.env.local` and to the Vercel project's environment variables. It decrypts the committed `private/certificates/*.enc` files, which `/api/cert/[id]` serves view-only. To add or replace a certificate, drop the image into `private/certificates/` as `<id>-original.png|jpg` (git-ignored), give the matching certification a `certificateId` in `src/lib/generalData.ts`, and run `pnpm cert:build`.

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```

5.  Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## 📂 Project Structure

```bash
src/
├── app/                 # Next.js App Router pages
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── experience/      # Experience timeline
│   ├── projects/        # Project listing & dynamic slugs
│   ├── layout.tsx       # Root layout & providers
│   └── page.tsx         # Landing page
├── components/          # React components
│   ├── ui/              # Reusable UI atoms (Buttons, Cards, etc.)
│   ├── navigation.tsx   # Responsive Nav
│   ├── footer.tsx       # Site Footer
│   └── ...
├── lib/                 # Data & Utilities
│   ├── generalData.ts   # Bio, Education, Skills
│   ├── projectData.ts   # Project details & Tech stacks
│   └── utils.ts         # CN helper & Site reachability check
└── styles/              # Global styles
```

## 🎨 Customization

### Content
To update the portfolio content (Bio, Experience, Projects), modify the TypeScript files located in `src/lib/`. The UI will automatically reflect these changes.

### Theme
The color palette is defined in `src/app/globals.css` using CSS variables. The theme is fully compatible with `next-themes` for dark mode support.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

**Nathnael Tesfaye Woldekidan**
*   **Email:** nhattytw@outlook.com
*   **GitHub:** [github.com/nhattytw](https://github.com/nhattytw)
*   **LinkedIn:** [linkedin.com/in/nathnael-woldekidan/](https://linkedin.com/in/nathnael-woldekidan/)
