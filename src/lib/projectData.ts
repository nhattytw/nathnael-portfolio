export interface ProjectMedia {
  screenshots: string[];
  demos: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  highlights: string[];
  type: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
  media?: ProjectMedia;
}

export const projectData: Project[] = [
  {
    title: "High-Availability E-commerce Platform",
    subtitle: "YeneCart",
    description:
      "A multi-tenant SaaS platform architected for scalability and resilience. The system handles isolated tenant data and high traffic loads through a custom-designed scalable schema and high-availability infrastructure.",
    technologies: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Docker",
      "CI/CD Pipelines",
      "Nginx",
      "ArifPay API",
      "Minio",
      "i18n Support",
      "Tailwind CSS",
      "Deployment",
      "Zod",
    ],
    highlights: [
      "Designed scalable MongoDB schema for multi-tenancy with tenant isolation",
      "Integrated ArifPay for recurring billing, webhooks, and failure handling",
      "Achieved 99.9% uptime via Docker containerization & Nginx load balancing strategy",
    ],
    type: "Architecture",
    status: "Production",
    liveUrl: "https://yenecart.com",
    media: { screenshots: [], demos: [] },
  },
  {
    title: "FM Coffee Import",
    subtitle: "Corporate Import Website",
    description:
      "A corporate import portal facilitating international coffee trade. The site serves as a digital storefront for B2B engagement, featuring corporate branding and optimized asset delivery.",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "EmailJS",
      "React Hook Form",
      "SEO Optimization",
      "Deployment",
      "Responsive Design",
    ],
    highlights: [
      "High-performance React implementation using Vite for sub-second load times",
      "Corporate branding strategy translated into component design system",
      "Optimized assets and lazy loading for global access speed",
    ],
    type: "Frontend",
    status: "Live",
    liveUrl: "https://fmcoffeeimport.com",
    media: { screenshots: [], demos: [] },
  },
  {
    title: "Shibeshi Law Firm",
    subtitle: "Legal Services Website",
    description:
      "A professional digital presence for a legal firm, designed for reliability, SEO performance, and client accessibility. The platform provides a streamlined interface for clients to access legal resources.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Google Analytics",
      "Deployment",
      "Responsive Design",
    ],
    highlights: [
      "Server-Side Rendering (SSR) implementation for superior SEO ranking",
      "Optimized accessibility (WCAG 2.1 AA) for broad client access",
      "Responsive professional design with high-fidelity asset rendering",
    ],
    type: "Frontend",
    status: "Live",
    liveUrl: "https://shibeshilawfirm.com",
    media: { screenshots: [], demos: [] },
  },
  {
    title: "Moddi Coffee",
    subtitle: "Brand Website",
    description:
      "A visually appealing brand website designed for Moddi Coffee. The platform features a fully responsive layout that adapts flawlessly to various screen sizes, ensuring a consistent brand experience.",
    technologies: [
      "Vue.js",
      "Vite",
      "Tailwind CSS",
      "C-Panel Deployment",
      "Responsive Design",
      "Cloudinary",
    ],
    highlights: [
      "Responsive fluid layouts using Tailwind CSS utility patterns",
      "Flawless adaptation to mobile and desktop screens with custom breakpoints",
      "Efficient CI/CD deployment pipeline for C-Panel/Shared Hosting",
    ],
    type: "Frontend",
    status: "Live",
    liveUrl: "https://moddicoffee.com",
    media: { screenshots: [], demos: [] },
  },
  {
    title: "Flex Living",
    subtitle: "Modern Real Estate Interface",
    description:
      "A pixel-perfect implementation of a modern property listing and booking platform. Focuses on high-end UI interactions, advanced filtering, and responsive gallery layouts to showcase properties effectively.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Lucide Icons",
      "Responsive Design",
      "Vercel Deployment",
    ],
    highlights: [
      "Implemented complex grid layouts and carousel interactions",
      "Performance optimized image loading with Next.js Image component",
      "Component-driven architecture for reusable UI elements",
    ],
    type: "Frontend",
    status: "Live",
    liveUrl: "https://flex-living-assessment.vercel.app/",
    media: { screenshots: [], demos: [] },
  },
  {
    title: "Wabi Laws Platform",
    subtitle: "Legal Tech Platform",
    description:
      "A dynamic platform developed to seamlessly connect lawyers, law firms, and clients. It offers features such as account management, meeting event booking, blogging for lawyers, and an interactive Q&A section.",
    technologies: [
      "Ruby on Rails",
      "Ruby",
      "PostgreSQL",
      "React (Vite)",
      "Devise Auth",
      "Active Admin",
      "Cloudinary",
      "Docker",
      "i18n Support",
    ],
    highlights: [
      "Friendly URL implementation for lawyer profiles and SEO",
      "Bilingual support (English/Amharic) via i18n locales",
      "Secure image upload management via Cloudinary API",
    ],
    type: "Backend Engineering",
    status: "Live",
    liveUrl: "https://wabilaws.com",
    media: { screenshots: [], demos: [] },
  },
  {
    title: "Document Management System",
    subtitle: "Internal Secure Storage",
    description:
      "An internal secure document storage and retrieval platform designed for corporate use. Features robust role-based access control (RBAC), version management, and secure deployment pipelines.",
    technologies: [
      "React (Vite)",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Sequelize ORM",
      "JWT Auth",
      "Multer",
      "Helmet Security",
    ],
    highlights: [
      "Granular Role-Based Access Control (RBAC) middleware",
      "Optimized search and retrieval functionality with DB indexing",
      "Containerized application utilizing Docker for streamlined deployment",
    ],
    type: "Full Stack",
    status: "Delivered",
    githubUrl: "https://github.com/nhattytw/Document-Management-System",
    media: { screenshots: [], demos: [] },
  },
  {
    title: "User Management Platform",
    subtitle: "Modern User Administration",
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
    type: "Full Stack",
    status: "Delivered",
    githubUrl: "https://github.com/nhattytw/UserManager",
    media: { screenshots: [], demos: [] },
  },
  {
    title: "Integrated Project Management System",
    subtitle: "Real-time Collaboration Tool",
    description:
      "A collaborative platform featuring instant updates and task tracking. The backend is engineered to handle complex state management for Kanban boards and real-time team synchronization.",
    technologies: [
      "Node.js",
      "Express.js",
      "Socket.io",
      "MongoDB",
      "React.js",
      "Redux Toolkit",
      "JWT",
      "REST API",
      "Docker",
    ],
    highlights: [
      "WebSocket integration for instant task updates and notifications",
      "Modular API structure for complex Kanban logic",
      "Complex client-side state management for real-time collaboration",
    ],
    type: "Full Stack",
    status: "Delivered",
    githubUrl:
      "https://github.com/nhattytw/Integrated-Project-Management-System",
    media: { screenshots: [], demos: [] },
  },
  {
    title: "Biometric HR Management Platform",
    subtitle: "Desktop & System Integration",
    description:
      "A standalone desktop application automating critical HR workflows. The system bridges the gap between hardware (biometric devices) and software for real-time attendance tracking.",
    technologies: [
      "Python 3",
      "PyQt5",
      "SQLite",
      "Biometric SDK",
      "Pandas",
      "Hardware Integration API",
    ],
    highlights: [
      "Real-time attendance tracking via low-level hardware integration",
      "Automated payroll processing logic with complex calculations",
      "Lightweight local data management with SQLite and file export",
    ],
    type: "System Integration",
    status: "Delivered",
    media: { screenshots: [], demos: [] },
  },
  {
    title: "Pharmacy Inventory System",
    subtitle: "Enterprise Management",
    description:
      "A comprehensive system for stock management designed to meet strict data integrity requirements. The platform implements granular security controls and efficient inventory tracking mechanisms.",
    technologies: [
      "PostgreSQL",
      "Node.js",
      "Express.js",
      "React.js",
      "Material UI",
      "JWT",
      "Bcrypt",
    ],
    highlights: [
      "Relational database design handling thousands of inventory records",
      "Dynamic Role-Based Access Control (RBAC) for staff management",
      "Data integrity enforcement via strict SQL schema validation",
    ],
    type: "Enterprise",
    status: "Delivered",
    media: { screenshots: [], demos: [] },
  },
];
