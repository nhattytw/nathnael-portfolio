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
  bio: "5+ years taking systems from idea to production: from HR platforms wired into biometric hardware, to a live public-sector platform, to a multi-module enterprise ERP where I'm a founding engineer.",
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
          "I'm most drawn to backend systems, and I especially enjoy understanding how things work under the hood. At Ahaz, I integrated biometric attendance scanners into our HR systems. The vendor's documentation was thin, so we tracked down a community reverse-engineered driver on GitHub and adapted it to the device we had.",
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
    email: "nhattytw@outlook.com",
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
  skills: {
    Backend: [
      "Node.js",
      "Express.js",
      "Next.js",
      "RESTful APIs",
      "WebSockets",
      "JWT",
      "Microservices",
      "Monorepo",
    ],
    Frontend: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Vue.js",
      "Vite",
      "Material-UI",
      "Shadcn/UI",
    ],
    Databases: [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "MySQL",
      "Query Optimization",
    ],
    "DevOps & Infrastructure": [
      "Docker",
      "Nginx",
      "Reverse Proxy",
      "Load Balancing",
      "Linux",
      "CI/CD",
      "Git/GitHub",
    ],
    Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL"],
    Practices: [
      "Agile",
      "OOP",
      "Unit Testing",
      "Integration Testing",
      "Technical Documentation",
      "Postman",
      "AI Coding Tools",
    ],
    Business: [
      "Requirements Gathering",
      "Technical Proposals & Bids",
      "Client Training",
      "Consulting",
    ],
  } as Record<string, string[]>,
};

/** Certificates that have an encrypted image the API route may serve. */
export const CERTIFICATE_IDS = generalData.about.certifications
  .map((c) => c.certificateId)
  .filter((id): id is string => Boolean(id));
