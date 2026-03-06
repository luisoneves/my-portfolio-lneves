/**
 * Site Data — All mocked content for the portfolio
 * Edit this file to update content across the entire site.
 */

const siteData = {
  meta: {
    title: "Luis Neves | Software Engineer",
    description:
      "Software engineer building modular systems, SaaS platforms, and experimental products. Focused on architecture, clean code, and product engineering.",
    url: "https://www.luisneves.dev/",
    ogImage: "https://www.luisneves.dev/images/og-image.png",
    locale: "en",
  },

  nav: [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Technologies", href: "#technologies" },
    { label: "Notes", href: "#notes" },
    { label: "Reading", href: "#reading" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    name: "Luis Neves",
    title: "Software Engineer in formation",
    tagline:
      "I build modular systems, SaaS platforms and experimental products.",
    exploring: [
      "Software Architecture",
      "SaaS systems",
      "Product engineering",
    ],
    ctas: [
      { label: "View Projects", href: "#projects", style: "primary" },
      { label: "Read Notes", href: "#notes", style: "ghost" },
    ],
    photo: "./public/images/LuisNeves.png",
    stats: [
      { value: "15+", label: "Years in IT" },
      { value: "4+", label: "Years building interfaces" },
      { value: "3", label: "Core focuses" },
    ],
  },

  technologies: [
    {
      category: "Front-end",
      icon: "🎨",
      items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
    },
    {
      category: "Back-end",
      icon: "⚙️",
      items: ["Node.js", "Fastify", "Express", "REST APIs"],
    },
    {
      category: "Database & ORM",
      icon: "🗄️",
      items: ["PostgreSQL", "Prisma", "Strapi"],
    },
    {
      category: "DevOps & Tools",
      icon: "🚀",
      items: ["Docker", "Git", "CI/CD", "Vercel", "Linux"],
    },
    {
      category: "Architecture & Design",
      icon: "🧠",
      items: ["Design Systems", "Multi-tenancy", "RBAC", "Domain Modeling"],
    },
  ],

  projects: [
    {
      title: "Diocese SaaS",
      problem:
        "Managing hundreds of chapels with content autonomy.",
      solution:
        "Multi-tenant architecture with RBAC and feature flags.",
      stack: ["Next.js", "Fastify", "Prisma", "Postgres"],
      link: null,
    },
    {
      title: "C4ts — Technology & Innovation",
      problem:
        "Client needed fast, modular landing pages with conversion focus.",
      solution:
        "Modular landing page with editorial layout, performance and SEO.",
      stack: ["HTML", "CSS", "JavaScript", "SEO"],
      link: "#contact",
    },
    {
      title: "BeautyCare",
      problem:
        "Needed insight capture and real data collection for analysis.",
      solution:
        "Website for capturing insights and running real data surveys.",
      stack: ["HTML", "CSS", "JavaScript"],
      link: "#contact",
    },
    {
      title: "Chapel Management",
      problem:
        "Institutional site needing agile content management.",
      solution:
        "Landing page with headless CMS (Strapi v4) for client autonomy.",
      stack: ["Strapi", "Next.js", "CSS"],
      link: "#contact",
    },
  ],

  notes: [
    {
      title: "How studying software architecture changed how I build software",
      excerpt:
        "Moving from code-first to architecture-first thinking transformed the way I approach every new project.",
      date: "2026-02",
    },
    {
      title: "From CMS to SaaS architecture",
      excerpt:
        "The journey from monolithic CMS to multi-tenant SaaS — lessons, mistakes, and breakthroughs.",
      date: "2026-01",
    },
    {
      title: "Why domain modeling matters before writing code",
      excerpt:
        "Lessons learned from modeling complex domains before writing a single line of implementation.",
      date: "2025-12",
    },
  ],

  reading: {
    books: [
      {
        title: "Clean Architecture",
        keyIdea: "Frameworks are details.",
        notesUrl: null,
      },
      {
        title: "The Pragmatic Programmer",
        keyIdea: "Be a catalyst for change.",
        notesUrl: null,
      },
      {
        title: "Designing Data-Intensive Applications",
        keyIdea: "Think in data flows.",
        notesUrl: null,
      },
    ],
    courses: [
      { title: "System Design Fundamentals", notesUrl: null },
      { title: "Software Architecture & Design", notesUrl: null },
    ],
  },

  about: {
    bio: "I started in IT infrastructure, managing servers and networks at institutions like INPE and Faculdade Canção Nova. Over the past 4+ years I've been transitioning into software engineering — building modular systems, SaaS platforms, and landing pages with real architectural thinking.",
    highlights: [
      "15+ years in IT infrastructure",
      "Transitioning to software engineering",
      "Focused on architecture and product systems",
    ],
    skills: [
      "HTML / CSS / JavaScript",
      "TypeScript",
      "Next.js / React",
      "Node.js / Fastify",
      "Prisma / Postgres",
      "Docker / CI-CD",
      "SEO & Accessibility",
      "Design Systems",
    ],
  },

  contact: {
    heading: "Let's talk about your next project.",
    description:
      "I'm available for freelance work and partnerships. I respond within 48 business hours.",
    email: "luis.fneves@proton.me",
    linkedin: "https://www.linkedin.com/in/luisneves-dev/",
    github: "https://github.com/luisoneves",
    whatsapp: "https://wa.me/55012992486884",
    resumeUrl: "./public/docs/06-03-2026-curriculo-luis-otavio.html",
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Luis Neves.`,
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/luisneves-dev/",
      },
      { label: "GitHub", href: "https://github.com/luisoneves" },
      { label: "WhatsApp", href: "https://wa.me/55012992486884" },
    ],
  },
};
