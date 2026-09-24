/**
 * @copyright 2025 Nathnael Tesfaye Woldekidan
 * @license All Rights Reserved
 * This data is proprietary content and may not be used without permission.
 */

export interface ProjectMedia {
  screenshots: string[];
  demos: string[];
}

/** How a project may be shared, which decides its badge and links. */
export type ProjectCategory =
  | "founding" // Built as founding engineer, public link
  | "public-sector" // Client, restricted access, no link
  | "in-house" // Company's own product in production
  | "client" // Client work
  | "internal" // Internal tool (may have an open-source version)
  | "freelance"
  | "academic"
  | "assessment";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  founding: "Founding Engineer",
  "public-sector": "Client · Public Sector",
  "in-house": "In-house Product",
  client: "Client Work",
  internal: "Internal Project",
  freelance: "Freelance",
  academic: "Academic · Graduation Project",
  assessment: "Technical Assessment",
};

export interface Project {
  /** Anchor on /projects (e.g. /projects#yenecart). */
  id: string;
  title: string;
  subtitle: string;
  /** Short label for chips on the experience page. */
  kind: string;
  description: string;
  technologies: string[];
  highlights: string[];
  category: ProjectCategory;
  /** Company it was delivered through, matching experienceData company names. */
  company?: string;
  client?: string;
  period?: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Label for the GitHub button, e.g. when the repo is an open-source version. */
  githubLabel?: string;
  image?: { src: string; alt: string };
  media?: ProjectMedia;
  /** Shown first and wider on the projects page. */
  featured?: boolean;
  /** Certificate (generalData certificateId) shown via the protected viewer. */
  certificateId?: string;
}

export const projectData: Project[] = [
  {
    id: "enterprise-erp",
    title: "Enterprise ERP Platform",
    subtitle: "Multi-module ERP for a US-based startup",
    kind: "ERP",
    description:
      "A multi-module enterprise ERP covering CRM, international trade, fleet, inventory, accounting/finance, HRM, and document signing, built as a monorepo on Next.js, Supabase, and PostgreSQL. I own the CRM, Inventory, and International Trade modules end-to-end.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React.js",
      "Supabase",
      "PostgreSQL",
      "Monorepo",
      "Tailwind CSS",
      "Vercel",
    ],
    highlights: [
      "Owned CRM, Inventory Management, and International Trade modules from data model to UI",
      "Designed cross-module data flows and shared API structures for interoperability",
      "Contributed to Fleet Management alongside a partner engineering team",
    ],
    category: "founding",
    company: "Agentic Curve",
    period: "2026 – Present",
    status: "Live",
    liveUrl: "https://ceo-web-project-v1-app.vercel.app/",
    featured: true,
  },
  {
    id: "iimcs",
    title: "IIMCS",
    subtitle: "Integrated Information Management & Communication System",
    kind: "Public-sector platform",
    description:
      "A live member management and communication platform delivered for a regional public-sector organization in South West Ethiopia. Access is restricted to authorized users, so the system is not publicly linked. Its delivery earned a Certificate of Recognition (May 2026).",
    technologies: [
      "Full-Stack Web Platform",
      "Member Management",
      "Role-Based Access Control",
      "Secure Authentication",
      "Production Deployment",
    ],
    highlights: [
      "Involved from requirements gathering and the proposal through to deployment",
      "Secure, sign-in-only access with role-based permissions",
      "Formally recognized for seamless development and delivery",
    ],
    category: "public-sector",
    company: "Baro Technologies",
    status: "Live · Restricted access",
    featured: true,
    certificateId: "iimcs",
  },
  {
    id: "yenecart",
    title: "YeneCart",
    subtitle: "Multi-tenant E-commerce SaaS",
    kind: "SaaS",
    description:
      "A multi-tenant SaaS platform architected for scalability and resilience, taken from concept to launch with full ownership of the product lifecycle. Two load-balanced app containers sit behind Nginx, with MongoDB and MinIO in their own containers.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Docker",
      "Nginx",
      "Microservices",
      "CI/CD",
      "ArifPay API",
      "MinIO",
      "i18n",
      "Tailwind CSS",
      "Zod",
    ],
    highlights: [
      "Serves 300+ daily active users with integrated subscription payments",
      "Achieved 99% uptime with Docker containers load-balanced by Nginx",
      "Designed a multi-tenant MongoDB schema with tenant isolation",
      "Integrated ArifPay for recurring billing, webhooks, and failure handling",
    ],
    category: "in-house",
    company: "Baro Technologies",
    status: "Production",
    liveUrl: "https://yenecart.com",
    featured: true,
  },
  {
    id: "wabi-laws",
    title: "Wabi Laws Platform",
    subtitle: "Legal Tech Platform",
    kind: "Legal platform",
    description:
      "A dynamic platform developed to seamlessly connect lawyers, law firms, and clients. It offers features such as account management, meeting event booking, blogging for lawyers, and an interactive Q&A section.",
    technologies: [
      "Ruby on Rails",
      "Ruby",
      "PostgreSQL",
      "React.js",
      "Vite",
      "Devise Auth",
      "Active Admin",
      "Cloudinary",
      "Docker",
      "i18n",
    ],
    highlights: [
      "Friendly URL implementation for lawyer profiles and SEO",
      "Bilingual support (English/Amharic) via i18n locales",
      "Secure image upload management via Cloudinary API",
    ],
    category: "client",
    company: "Baro Technologies",
    status: "Live",
    liveUrl: "https://wabilaws.com",
  },
  {
    id: "fm-coffee-import",
    title: "FM Coffee Import",
    subtitle: "Corporate Import Website",
    kind: "Corporate website",
    description:
      "A corporate import portal facilitating international coffee trade. The site serves as a digital storefront for B2B engagement, featuring corporate branding and optimized asset delivery.",
    technologies: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "EmailJS",
      "React Hook Form",
      "SEO Optimization",
      "Responsive Design",
    ],
    highlights: [
      "High-performance React implementation using Vite for sub-second load times",
      "Corporate branding strategy translated into component design system",
      "Optimized assets and lazy loading for global access speed",
    ],
    category: "client",
    company: "Baro Technologies",
    status: "Live",
    liveUrl: "https://fmcoffeeimport.com",
  },
  {
    id: "shibeshi-law-firm",
    title: "Shibeshi Law Firm",
    subtitle: "Legal Services Website",
    kind: "Law firm website",
    description:
      "A professional digital presence for a legal firm, designed for reliability, SEO performance, and client accessibility. The platform provides a streamlined interface for clients to access legal resources.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/UI",
      "Google Analytics",
      "Responsive Design",
    ],
    highlights: [
      "Server-Side Rendering (SSR) implementation for superior SEO ranking",
      "Optimized accessibility (WCAG 2.1 AA) for broad client access",
      "Responsive professional design with high-fidelity asset rendering",
    ],
    category: "client",
    company: "Baro Technologies",
    status: "Live",
    liveUrl: "https://shibeshilawfirm.com",
  },
  {
    id: "moddi-coffee",
    title: "Moddi Coffee",
    subtitle: "Brand Website",
    kind: "Brand website",
    description:
      "A visually appealing brand website designed for Moddi Coffee. The platform features a fully responsive layout that adapts flawlessly to various screen sizes, ensuring a consistent brand experience.",
    technologies: [
      "Vue.js",
      "Vite",
      "Tailwind CSS",
      "cPanel Deployment",
      "Responsive Design",
      "Cloudinary",
    ],
    highlights: [
      "Responsive fluid layouts using Tailwind CSS utility patterns",
      "Flawless adaptation to mobile and desktop screens with custom breakpoints",
      "Efficient CI/CD deployment pipeline for cPanel/shared hosting",
    ],
    category: "client",
    company: "Baro Technologies",
    status: "Live",
    liveUrl: "https://moddicoffee.com",
  },
  {
    id: "document-management-system",
    title: "Document Management System",
    subtitle: "Internal Secure Storage",
    kind: "Internal tool",
    description:
      "An internal secure document storage and retrieval platform built for company use, with role-based access control, version management, and secure deployment. A derivative of it is published as an open-source project.",
    technologies: [
      "React.js",
      "Vite",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Sequelize ORM",
      "JWT",
      "Multer",
      "Helmet",
      "Docker",
    ],
    highlights: [
      "Granular Role-Based Access Control (RBAC) middleware",
      "Optimized search and retrieval functionality with DB indexing",
      "Containerized application utilizing Docker for streamlined deployment",
    ],
    category: "internal",
    company: "Baro Technologies",
    status: "Open-source version",
    githubUrl: "https://github.com/nhattytw/Document-Management-System",
    githubLabel: "Open-source version",
  },
  {
    id: "akile-hr",
    title: "Web-Based HR & Attendance System",
    subtitle: "With fingerprint integration",
    kind: "Web HR system",
    description:
      "A web-based HR management and attendance system designed to streamline workforce administration. It integrates fingerprint technology for accurate attendance tracking and offers a comprehensive suite of HR features, including employees, attendance reports, check-in/out, payroll, assignments, and sites.",
    technologies: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "WebSockets",
      "Fingerprint Integration",
    ],
    highlights: [
      "Real-time attendance tracking over WebSockets",
      "Fingerprint integration improved attendance accuracy",
      "Streamlined administrative processes for HR teams",
    ],
    category: "client",
    company: "Ahaz Software and Web Technology Solutions",
    client: "Akile Painting and Finishing",
    period: "Mar 2021 – Nov 2021",
    status: "Delivered",
  },
  {
    id: "gize",
    title: "Gize",
    subtitle: "Desktop HR & Attendance System with Fingerprint Integration",
    kind: "Desktop HR app",
    description:
      "A desktop HR management and attendance system designed to streamline HR tasks and improve attendance monitoring. By integrating ZKTeco fingerprint technology, it tracks employee attendance precisely and automates the workflow from attendance capture through payroll processing.",
    technologies: [
      "Python",
      "PyQt5",
      "SQLite",
      "ZKTeco Integration",
      "Pandas",
      "Hardware Integration",
    ],
    highlights: [
      "Adapted a community reverse-engineered driver to talk to the ZKTeco device",
      "Automated payroll processing from captured attendance",
      "Balanced performance, accuracy, and security for HR teams",
    ],
    category: "client",
    company: "Ahaz Software and Web Technology Solutions",
    period: "Aug 2021 – Feb 2022",
    status: "Delivered",
  },
  {
    id: "user-management-platform",
    title: "User Management Platform",
    subtitle: "Modern User Administration",
    kind: "Admin platform",
    description:
      "A robust User Management Web Application built to handle complex user data flows. Leverages GraphQL for efficient data fetching and NestJS for a scalable backend architecture.",
    technologies: [
      "NestJS",
      "GraphQL",
      "Apollo Server",
      "MongoDB",
      "Mongoose",
      "React.js",
      "Apollo Client",
    ],
    highlights: [
      "Efficient data fetching with GraphQL resolvers and schemas",
      "Scalable modular backend architecture using NestJS patterns",
      "Seamless state management and caching with Apollo Client",
    ],
    category: "freelance",
    status: "Delivered",
    githubUrl: "https://github.com/nhattytw/UserManager",
    githubLabel: "Source code",
  },
  {
    id: "pharmacy-inventory",
    title: "Pharmacy Inventory System",
    subtitle: "Enterprise Management",
    kind: "Inventory system",
    description:
      "A comprehensive system for stock management designed to meet strict data integrity requirements. The platform implements granular security controls and efficient inventory tracking mechanisms.",
    technologies: [
      "PostgreSQL",
      "Node.js",
      "Express.js",
      "React.js",
      "Material-UI",
      "JWT",
      "Bcrypt",
    ],
    highlights: [
      "Relational database design handling thousands of inventory records",
      "Dynamic Role-Based Access Control (RBAC) for staff management",
      "Data integrity enforcement via strict SQL schema validation",
    ],
    category: "freelance",
    status: "Delivered",
  },
  {
    id: "flex-living",
    title: "Flex Living",
    subtitle: "Modern Real Estate Interface",
    kind: "Real estate UI",
    description:
      "A pixel-perfect implementation of a modern property listing and booking platform. Focuses on high-end UI interactions, advanced filtering, and responsive gallery layouts to showcase properties effectively.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Lucide Icons",
      "Responsive Design",
      "Vercel",
    ],
    highlights: [
      "Implemented complex grid layouts and carousel interactions",
      "Performance optimized image loading with Next.js Image component",
      "Component-driven architecture for reusable UI elements",
    ],
    category: "assessment",
    status: "Live",
    liveUrl: "https://flex-living-assessment.vercel.app/",
  },
  {
    id: "integrated-project-management",
    title: "Integrated Project Management System",
    subtitle: "Real-time Collaboration Tool",
    kind: "Graduation project",
    description:
      "My graduation project: a collaborative platform with instant updates and task tracking. The backend handles complex state for Kanban boards and real-time team synchronization.",
    technologies: [
      "Node.js",
      "Express.js",
      "Socket.io",
      "MongoDB",
      "React.js",
      "Redux Toolkit",
      "JWT",
      "RESTful APIs",
      "Docker",
    ],
    highlights: [
      "WebSocket integration for instant task updates and notifications",
      "Modular API structure for complex Kanban logic",
      "Complex client-side state management for real-time collaboration",
    ],
    category: "academic",
    client: "HiLCoE School of Computer Science and Technology",
    status: "Delivered",
    githubUrl:
      "https://github.com/nhattytw/Integrated-Project-Management-System",
    githubLabel: "Source code",
  },
];

export const projectsById = Object.fromEntries(
  projectData.map((p) => [p.id, p])
) as Record<string, Project>;
