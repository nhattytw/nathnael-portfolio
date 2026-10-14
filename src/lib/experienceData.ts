/**
 * @copyright 2025 Nathnael Tesfaye Woldekidan
 * Content, not code: excluded from the MIT license. See LICENSE.md.
 */

import type { ExternalReference } from "./projectData";

export interface ExperienceMetric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface Role {
  title: string;
  period: string;
  /** Employment type when it differs from the company's (e.g. Part-time, Contract). */
  employment?: string;
  achievements: string[];
  skills: string[];
  metrics?: ExperienceMetric[];
}

export interface Company {
  company: string;
  /** Extra context shown after the name, e.g. "US-based startup". */
  note?: string;
  location: string;
  /** e.g. "Full-time · Hybrid" */
  workType: string;
  period: string;
  /** Newest role first. */
  roles: Role[];
  /** Project ids from projectData delivered here. */
  projects?: string[];
  /** Third-party page that confirms the role. */
  reference?: ExternalReference;
}

export const experienceData: Company[] = [
  {
    company: "Agentic Curve",
    note: "US-based startup",
    location: "United States · Remote",
    workType: "Full-time · Remote",
    period: "01/2026 – Present",
    roles: [
      {
        title: "Founding Engineer",
        period: "01/2026 – Present",
        achievements: [
          "Founding engineer and stakeholder in a multi-module enterprise ERP platform built with Next.js, Supabase, and PostgreSQL, covering CRM, international trade management, fleet management, inventory, accounting/finance, HRM, and document signing.",
          "Owned the CRM, Inventory Management, and International Trade Management modules end-to-end, from data modeling and API design through frontend delivery.",
          "Contributed to the Fleet Management module in collaboration with a partner engineering team.",
          "Designed cross-module data flows and shared API structures to keep modules interoperable within a single platform.",
        ],
        skills: [
          "Next.js",
          "React.js",
          "TypeScript",
          "Supabase",
          "PostgreSQL",
          "Monorepo",
          "Software Architecture",
          "Database Design",
        ],
        metrics: [{ value: 3, label: "Modules owned end-to-end" }],
      },
    ],
    projects: ["enterprise-erp"],
  },
  {
    company: "VuleroTech",
    location: "Addis Ababa, Ethiopia · On-site",
    workType: "Freelance · Part-time",
    period: "06/2026 – Present",
    roles: [
      {
        title: "Consultant & Trainer",
        period: "06/2026 – Present",
        achievements: [
          "Deliver CRM consulting and hands-on training to enterprise clients including Akoya Properties and Ermias Advertising.",
          "Advise client teams on CRM configuration, adoption, and workflow design to fit existing business processes.",
          "Run structured training sessions for non-technical staff, translating platform capabilities into day-to-day operational use.",
        ],
        skills: [
          "Requirements Gathering",
          "Stakeholder Management",
          "Client Training",
          "Consulting",
        ],
      },
    ],
  },
  {
    company: "Baro Technologies",
    location: "Burien, WA, USA (Remote) & Addis Ababa, Ethiopia (On-site)",
    workType: "Full-time · Hybrid",
    period: "11/2023 – 07/2026",
    roles: [
      {
        title: "Software Engineer",
        period: "05/2024 – 07/2026",
        achievements: [
          "Developed and deployed the Integrated Information Management and Communication System (IIMCS), a live member management platform for a regional public-sector organization in South West Ethiopia. Received a formal Certificate of Recognition for successful delivery.",
          "Architected, developed, and deployed YeneCart, a multi-tenant SaaS platform, from concept to launch, taking full ownership of the product lifecycle with Next.js, TypeScript, and Node.js. It serves 300+ daily active users with integrated subscription payment processing.",
          "Designed containerized multi-server infrastructure with Docker, with Nginx for reverse proxying and load balancing.",
          "Delivered high-performance client websites for various industries, converting high-fidelity Figma designs into responsive, production-ready code.",
          "Led a team of 4 developers on select projects in an Agile environment, facilitating code reviews, daily stand-ups, and architectural planning.",
          "Established code review workflows and testing standards the team continues to use.",
          "Developed Python-based automation tools, including a custom Telegram bot, to streamline internal workflows.",
        ],
        skills: [
          "Next.js",
          "TypeScript",
          "Node.js",
          "Express.js",
          "React.js",
          "MongoDB",
          "PostgreSQL",
          "MySQL",
          "Docker",
          "Nginx",
          "Microservices",
          "CI/CD",
          "Tailwind CSS",
          "Python",
          "Payment Gateways",
          "Team Leadership",
          "Code Review",
          "Unit Testing",
          "Agile",
          "Git",
          "Technical Documentation",
        ],
        metrics: [
          { value: 300, suffix: "+", label: "YeneCart daily users" },
          { value: 99, suffix: "%+", label: "Uptime across deployed systems" },
          { value: 4, label: "Developers led" },
        ],
      },
      {
        title: "Account Executive",
        period: "11/2023 – 04/2024",
        achievements: [
          "Authored technical documentation and proposals for 10+ project bids with an 85% win rate, translating client requirements into scoped technical solutions.",
          "Acted as primary liaison between external clients and the internal technical team, gathering requirements and feature requests.",
          "Conducted initial requirements gathering to assess client readiness and technical fit.",
          "Managed the client onboarding lifecycle, including verification and profile compliance.",
          "Transitioned into a full-time Software Engineer role within the company in May 2024.",
        ],
        skills: [
          "Proposal Writing",
          "Requirements Gathering",
          "Stakeholder Management",
          "Customer Onboarding",
          "Technical Documentation",
        ],
        metrics: [
          { value: 85, suffix: "%", label: "Bid win rate" },
          { value: 10, suffix: "+", label: "Proposals authored" },
        ],
      },
    ],
    projects: [
      "iimcs",
      "yenecart",
      "wabi-laws",
      "fm-coffee-import",
      "shibeshi-law-firm",
      "moddi-coffee",
      "document-management-system",
      "dose",
    ],
  },
  {
    company: "Ethio Robo Robotics",
    location: "Addis Ababa, Ethiopia · On-site",
    workType: "Part-time",
    period: "10/2022 – 06/2024",
    roles: [
      {
        title: "Programming Lecturer",
        period: "10/2022 – 06/2024",
        achievements: [
          "Lectured C++, C#, Java, Python, and web development (HTML, CSS, and JavaScript) courses for 30+ students, one-on-one and in groups.",
        ],
        skills: ["C++", "C#", "Java", "Python", "JavaScript", "Mentorship"],
        metrics: [{ value: 30, suffix: "+", label: "Students taught" }],
      },
      {
        title: "African Robotics Championship Judge",
        period: "03/2024",
        employment: "Contract",
        achievements: [
          "Judged the VEX IQ Robotics Competition African Championship at Elilly International Hotel, March 14–16, 2024.",
        ],
        skills: ["Leadership", "Communication"],
      },
      {
        title: "African Robotics Championship Judge",
        period: "02/2023",
        employment: "Contract",
        achievements: [
          "Judged the VEX Robotics African Championship at the Addis Ababa Science Museum, February 23–25, 2023.",
        ],
        skills: ["Leadership", "Communication"],
      },
    ],
  },
  {
    company: "Ahaz Software and Web Technology Solutions",
    location: "Addis Ababa, Ethiopia · Remote",
    workType: "Full-time · Remote",
    period: "02/2021 – 06/2023",
    roles: [
      {
        title: "Senior Backend Developer & Project Lead",
        period: "01/2023 – 06/2023",
        achievements: [
          "Led engineering and served as technical point of contact between the development team and project stakeholders.",
          "Owned backend architecture decisions across active projects.",
          "Introduced unit testing and code review practices across the team.",
          "Mentored interns and junior developers on design patterns and maintainable code.",
        ],
        skills: [
          "Node.js",
          "Express.js",
          "PostgreSQL",
          "Software Architecture",
          "Technical Leadership",
          "Code Review",
          "Unit Testing",
          "Agile",
        ],
      },
      {
        title: "Software Engineer",
        period: "01/2022 – 12/2022",
        achievements: [
          "Built the backend for a real-time HR and attendance platform using WebSockets, Node.js, and Express.js.",
          "Built a Python/Qt5 desktop app integrating third-party biometric scanning hardware to automate the full attendance-to-payroll workflow, eliminating manual timesheet entry.",
          "Architected RESTful APIs with JWT authentication and role-based access control (RBAC).",
          "Optimized PostgreSQL queries by adding indexes and restructuring the data model, noticeably reducing API response times.",
          "Co-led a 3-person development team, managing timelines and delivery.",
        ],
        skills: [
          "Node.js",
          "Express.js",
          "WebSockets",
          "RESTful APIs",
          "JWT",
          "PostgreSQL",
          "MongoDB",
          "MySQL",
          "Microservices",
          "Python",
          "PyQt5",
          "React.js",
          "Tailwind CSS",
          "Query Optimization",
          "JavaScript",
          "SQL",
          "Git",
          "Postman",
          "Agile",
        ],
      },
      {
        title: "Junior Software Engineer",
        period: "02/2021 – 12/2021",
        achievements: [
          "Built web and desktop applications using the MERN stack and Python, contributing to both backend and frontend development.",
          "Designed database schemas in PostgreSQL and MongoDB for multi-platform solutions.",
          "Integrated third-party biometric scanning devices into desktop applications, writing drivers and API bridges for hardware communication.",
          "Created technical documentation and user manuals for internal and client-facing applications.",
        ],
        skills: [
          "MongoDB",
          "Express.js",
          "React.js",
          "Node.js",
          "PostgreSQL",
          "MySQL",
          "Python",
          "Hardware Integration",
          "JavaScript",
          "SQL",
          "OOP",
          "Git",
          "Postman",
          "Technical Documentation",
        ],
      },
    ],
    projects: ["akile-hr", "gize"],
  },
];
