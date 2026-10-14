/**
 * @copyright 2025 Nathnael Tesfaye Woldekidan
 * Content, not code: excluded from the MIT license. See LICENSE.md.
 */

export interface Certification {
  name: string;
  issuer: string;
  link?: string;
  date?: string;
  /**
   * Id of the encrypted image in private/certificates, shown through the
   * protected, view-only certificate viewer.
   */
  certificateId?: string;
  /** Highlighted as a formal recognition rather than a course certificate. */
  recognition?: boolean;
  /** One-line summary shown in the viewer. */
  summary?: string;
}

export interface ImpactMetric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source: string;
}

export interface Skill {
  name: string;
  /** Short line under the name on the toolkit card. */
  detail: string;
  /** Key into the toolkit's icon map. */
  icon: string;
}

export interface SkillGroup {
  group: string;
  summary: string;
  items: Skill[];
}

export const generalData = {
  name: "Nathnael Tesfaye Woldekidan",
  title: "Senior Software Engineer",
  /** Typed out under the name in the hero, after the title badge. */
  roles: ["Senior Backend Engineer", "Founding Engineer", "Consultant & Trainer"],
  /** Scrolls under the name in the hero. */
  heroStack: [
    "Node.js",
    "PostgreSQL",
    "Next.js",
    "TypeScript",
    "MongoDB",
    "Docker",
    "Nginx",
    "Supabase",
    "WebSockets",
    "Express.js",
    "React.js",
    "Python",
  ],
  /** One-line positioning used in the hero and terminal. */
  tagline: "I build software that people rely on day to day.",
  bio: "5+ years taking systems from idea to production: from HR systems with biometric and location-based check-in, to a live public-sector platform, to a multi-module enterprise ERP where I'm a founding engineer.",
  languages: ["English", "Amharic"],
  about: {
    /** What drives me: first-person story for the About page. */
    story: [
      {
        heading: "From idea to something people depend on",
        body: [
          "What drives me most is taking something from an idea to a system real people depend on. At Baro Technologies I worked on IIMCS, a member management platform for a regional public-sector organization. I was involved from requirements gathering and the proposal through to deployment, and seeing it go live and actually get used is the most rewarding part of my career so far.",
          "I have the same kind of ownership now as a founding engineer at Agentic Curve, where the CRM, inventory, and international trade modules are mine end to end, from how the data is modeled to what the user sees on screen.",
        ],
      },
      {
        heading: "Under the hood",
        body: [
          "I'm most drawn to backend systems, and I especially enjoy understanding how things work under the hood. At Ahaz, I integrated a biometric attendance scanner into a desktop HR system. The vendor's documentation was thin, so we tracked down a community reverse-engineered driver on GitHub and adapted it to the device we had.",
          "The first successful ping was the breakthrough. From there we worked out the records the device produced and built a Python desktop app that carried that data through an automated workflow all the way to payroll. Getting hardware and software to work together reliably is the kind of problem I enjoy most.",
        ],
      },
      {
        heading: "Both sides of the table",
        body: [
          "I've also worked on the client side of the table. As an account executive at Baro I wrote technical proposals and sat with clients to work out what they actually needed, and I still consult and train enterprise teams on CRM adoption today. It means I can talk to a client in the morning and ship the feature by the evening, without anything getting lost in translation.",
        ],
      },
    ],
    principles: [
      {
        title: "Own it end to end",
        body: "Data model, API, UI, and deployment. I'd rather understand the whole path than hand off halfway.",
      },
      {
        title: "Model the data first",
        body: "Sensible data models make everything downstream simpler, and they keep systems maintainable long after launch.",
      },
      {
        title: "Talk to the people using it",
        body: "Requirements are clearer in conversation than in tickets, so I stay close to clients and users.",
      },
      {
        title: "Leave the team better",
        body: "Code reviews, testing standards, and mentoring outlast any single feature.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "HiLCoE School of Computer Science and Technology",
        location: "Addis Ababa, Ethiopia",
        year: "2022",
      },
    ],
    certifications: [
      {
        name: "Certificate of Recognition: IIMCS Digital Platform Delivery",
        issuer:
          "South West Ethiopia People's Region Prosperity Party Branch Office",
        date: "May 2026",
        certificateId: "iimcs",
        recognition: true,
        summary:
          "Awarded to Nathnael Tesfaye Woldekidan for the development and successful delivery of the Integrated Information Management and Communication System (IIMCS), from start to finish.",
      },
      {
        name: "Scientific Computing with Python",
        issuer: "freeCodeCamp",
        date: "December 2021",
        link: "https://freecodecamp.org/certification/nhattytw/scientific-computing-with-python-v7",
        certificateId: "scientific-python",
        summary:
          "Developer certification representing approximately 300 hours of work, completed December 10, 2021.",
      },
      {
        name: "ALX AiCE - AI Career Essentials",
        issuer: "ALX",
        date: "July 2024",
        link: "https://savanna.alxafrica.com/certificates/HF5R9GrSYh",
        certificateId: "alx-aice",
        summary:
          "Certificate of achievement for an 8-week programme in AI-augmented professional development skills, issued July 8, 2024.",
      },
      {
        name: "Git & GitHub Projects: Project-Based Learning",
        issuer: "Udemy",
        date: "December 2021",
        link: "https://www.udemy.com/certificate/UC-16666ab4-3d9e-4be5-8598-ea755c8f6560/",
        certificateId: "git-github",
        summary:
          "Certificate of completion for Git and GitHub Projects: Project Based Learning (8 projects), December 10, 2021.",
      },
      {
        name: "Business Fundamentals: Effective Communication",
        issuer: "FutureLearn",
        link: "https://www.futurelearn.com/certificates/25y5xnf",
      },
    ] as Certification[],
  },
  contact: {
    email: "nathnaelwoldekidan@gmail.com",
    phone: "+251922351343",
  },
  socials: {
    linkedin: "https://linkedin.com/in/nathnael-woldekidan/",
    github: "https://github.com/nhattytw",
  },
  project: "https://github.com/nhattytw/nathnael-portfolio",
  resume: {
    href: "/file/Software Engineer Nathnael T. Woldekidan.pdf",
    downloadName: "Nathnael_Tesfaye_Senior_Software_Engineer.pdf",
  },
  impactMetrics: [
    { value: 5, suffix: "+", label: "Years Experience", source: "Since February 2021" },
    { value: 99, suffix: "%+", label: "Production Uptime", source: "IIMCS, YeneCart & client sites · Nginx" },
    { value: 12, suffix: "+", label: "Projects Delivered", source: "Production, client, freelance & academic" },
    { value: 85, suffix: "%", label: "Bid Win Rate", source: "Technical proposals at Baro" },
  ] as ImpactMetric[],
  availability: {
    roles: ["Full-time", "Part-time", "Contract"],
    workplaces: [
      { label: "Remote", detail: "Worldwide" },
      { label: "Hybrid / On-site", detail: "Addis Ababa, Ethiopia" },
    ],
    interests: "Senior software and backend engineering roles, founding-team work, and freelance projects where a product needs to be built properly from scratch.",
  },
  skills: [
    {
      group: "Languages",
      summary: "Typed application code, scripting and data queries",
      items: [
        { name: "TypeScript", detail: "Type-Safe Services & UI", icon: "typescript" },
        { name: "JavaScript", detail: "Modern ES6+ Ecosystem", icon: "javascript" },
        { name: "Python", detail: "Scripting & Automation", icon: "python" },
        { name: "SQL", detail: "Queries & Schema Design", icon: "sql" },
      ],
    },
    {
      group: "Backend & APIs",
      summary: "Services, real-time channels and API contracts",
      items: [
        { name: "Node.js", detail: "Event-Driven Server Runtime", icon: "nodejs" },
        { name: "Express.js", detail: "REST APIs & Middleware", icon: "express" },
        { name: "RESTful APIs", detail: "Resource Design & Versioning", icon: "api" },
        { name: "WebSockets", detail: "Real-Time Updates", icon: "websockets" },
        { name: "JWT", detail: "Stateless Auth & Sessions", icon: "jwt" },
        { name: "Microservices", detail: "Independently Deployed Services", icon: "microservices" },
        { name: "Monorepos", detail: "Shared Code Across Apps", icon: "monorepo" },
        { name: "Postman", detail: "API Testing & Collections", icon: "postman" },
      ],
    },
    {
      group: "Frontend",
      summary: "Client interfaces, server rendering and design systems",
      items: [
        { name: "React.js", detail: "Component Architecture", icon: "react" },
        { name: "Next.js", detail: "SSR, SSG & App Router", icon: "nextjs" },
        { name: "Vue.js", detail: "Reactive UI & Vite Builds", icon: "vue" },
        { name: "Tailwind CSS", detail: "Design Tokens & Responsive UI", icon: "tailwind" },
        { name: "Material-UI", detail: "Component Library Theming", icon: "mui" },
        { name: "Shadcn/UI", detail: "Accessible UI Primitives", icon: "shadcn" },
      ],
    },
    {
      group: "Databases",
      summary: "Relational modelling, documents and query tuning",
      items: [
        { name: "PostgreSQL", detail: "Indexing & Query Optimization", icon: "postgresql" },
        { name: "MongoDB", detail: "Document Store & Aggregation", icon: "mongodb" },
        { name: "MySQL", detail: "Relational Schemas & Joins", icon: "mysql" },
        { name: "Supabase", detail: "Cloud Postgres & Auth", icon: "supabase" },
      ],
    },
    {
      group: "DevOps & Infrastructure",
      summary: "Containers, traffic and deployment pipelines",
      items: [
        { name: "Docker", detail: "Containerized Services", icon: "docker" },
        { name: "Nginx", detail: "Reverse Proxy & Web Server", icon: "nginx" },
        { name: "Load Balancing", detail: "Spreading Traffic Across Instances", icon: "loadbalancing" },
        { name: "Linux", detail: "Production Server OS", icon: "linux" },
        { name: "CI/CD", detail: "Automated Build & Deploy", icon: "cicd" },
        { name: "Git / GitHub", detail: "Version Control & Reviews", icon: "git" },
      ],
    },
    {
      group: "Practices",
      summary: "How the work gets planned, built and checked",
      items: [
        { name: "Unit Testing", detail: "Fast, Isolated Checks", icon: "test" },
        { name: "Integration Testing", detail: "End-to-End API Flows", icon: "integration" },
        { name: "Agile", detail: "Sprints & Iterative Delivery", icon: "agile" },
        { name: "OOP", detail: "Modular, Maintainable Design", icon: "oop" },
        { name: "Technical Documentation", detail: "Specs, Guides & Handover", icon: "docs" },
        { name: "AI Coding Tools", detail: "Assisted Build & Review", icon: "ai" },
      ],
    },
    {
      group: "Business",
      summary: "Working with clients from first brief to handover",
      items: [
        { name: "Requirements Gathering", detail: "Turning Briefs into Specs", icon: "requirements" },
        { name: "Proposals & Bids", detail: "85% Bid Win Rate at Baro", icon: "proposal" },
        { name: "Client Training", detail: "Onboarding End Users", icon: "training" },
        { name: "Consulting", detail: "Technical Direction & Advice", icon: "consulting" },
      ],
    },
  ] as SkillGroup[],
};

/** Certificates that have an encrypted image the API route may serve. */
export const CERTIFICATE_IDS = generalData.about.certifications
  .map((c) => c.certificateId)
  .filter((id): id is string => Boolean(id));
