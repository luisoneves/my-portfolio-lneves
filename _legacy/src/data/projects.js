export const projects = {
  en: [
    {
      title: "Chapels — Mockup",
      subtitle: "Phase: v1 (Front only)",
      problemLabel: "Description:",
      problem: "Frontend prototype to present features to the client before any backend. Automated data extraction script from the original site to populate the prototype.",
      solutionLabel: "Learnings:",
      solution: "Revealed what the client actually needed to manage — product validation before code.",
      stack: ["Next.js", "TypeScript", "Prototyping"],
      image: "/images/projects/mockup-placeholder.png",
      link: "https://web-static-mockup.vercel.app",
      linkText: "View project",
      status: "live"
    },
    {
      title: "Chapel Management System",
      subtitle: "Phase: v2 (Headless CMS)",
      problemLabel: "Description:",
      problem: "1 admin + 200 branches with editable layouts and content. Headless architecture: Strapi v4 backend + Next.js frontend. Multi-tenancy with Row-Level Security.",
      solutionLabel: "Learnings:",
      solution: "Scaling to multi-branch revealed Strapi wasn't the ideal tool — motivating the next refactoring. Live test of Strapi on Railway + Next.js on Vercel.",
      stack: ["Next.js 15", "Strapi v4", "Docker", "RLS"],
      image: "/images/projects/strapi-placeholder.png",
      link: "https://gestao-capelas.vercel.app",
      linkText: "View project",
      status: "live"
    },
    {
      title: "Diocese SaaS Platform",
      subtitle: "Phase: v3 (In development)",
      problemLabel: "Description:",
      problem: "Complete refactoring driven by previous learnings. Monorepo with Turborepo (apps: web, admin, api · packages: database, types, validators). Layered architecture, hierarchical RBAC, feature flags per tenant.",
      solutionLabel: "Track:",
      solution: "Chapels → Diocese SaaS. This project proved I need to expand my architectural experience, which led me to practice with WaaS.",
      stack: ["Fastify", "Next.js 16", "Prisma", "PostgreSQL", "Turborepo", "RBAC"],
      image: "/images/projects/diocese-placeholder.png",
      link: null,
      linkText: "Request details",
      status: "development"
    },
    {
      title: "WaaS — Website as a Service",
      subtitle: "1 deploy · N clients",
      problemLabel: "Description:",
      problem: "Config-driven engine for freelancers: 1 deploy supports multiple clients. Registry Pattern, dynamic renderer, theme engine via CSS variables. Content, features, and layout isolated by tenant-id.",
      solutionLabel: "Track:",
      solution: "Product & Study. Initiated to practice modular architecture after the Diocese project challenges.",
      stack: ["Next.js 15", "Tailwind 4", "Zod", "Registry Pattern"],
      image: "/images/projects/waas-placeholder.png",
      link: null,
      linkText: "Request details",
      status: "development"
    },
    {
      title: "BeautyCare",
      subtitle: "Vue.js + UI/UX Study",
      problemLabel: "Description:",
      problem: "Exploring Vue.js to compare DX with React/Next.js. Focused on elegant visual identity and behavioral analysis via Clarity and heatmaps.",
      solutionLabel: "Track:",
      solution: "Product & Study. Practicing pleasant visuals, forms, and Vue.js. Surveying desired features via Clarity.",
      stack: ["Vue.js", "Microsoft Clarity", "GTM", "Technical SEO"],
      image: "/images/projects/beautycare-placeholder.png",
      link: "https://beauty-care-smoky.vercel.app",
      linkText: "View project",
      status: "live"
    },
    {
      title: "C4ts Market Research",
      subtitle: "Client acquisition",
      problemLabel: "Description:",
      problem: "Platform for freelance client acquisition and local positioning. Working forms and blob storage to receive quotes and product briefs.",
      solutionLabel: "Track:",
      solution: "Product & Study. Institutional page for C4ts. Built to showcase my partners/friends' projects and capture freelance leads.",
      stack: ["Next.js 16", "TypeScript", "Git Flow"],
      image: "/images/projects/c4ts-placeholder.png",
      link: "https://c4ts-project-market-research.vercel.app",
      linkText: "View project",
      status: "beta"
    }
  ],
  pt: [
    {
      title: "Capelas — Mockup",
      subtitle: "Fase: v1 (Front only)",
      problemLabel: "Descrição:",
      problem: "Protótipo frontend para apresentar features ao cliente antes de qualquer backend. Script de extração automatizada de dados do site original para popular o protótipo.",
      solutionLabel: "Aprendizados:",
      solution: "Revelou o que o cliente realmente precisava gerenciar — validação de produto antes de código.",
      stack: ["Next.js", "TypeScript", "Prototyping"],
      image: "/images/projects/mockup-placeholder.png",
      link: "https://web-static-mockup.vercel.app",
      linkText: "Ver projeto",
      status: "live"
    },
    {
      title: "Sistema de Gestão de Capelas",
      subtitle: "Fase: v2 (Headless CMS)",
      problemLabel: "Descrição:",
      problem: "1 administrador + 200 filiais com layouts e conteúdo editáveis. Arquitetura headless: Strapi v4 backend + Next.js front. Multi-tenancy com Row-Level Security.",
      solutionLabel: "Aprendizados:",
      solution: "Ao escalar para multi-filial, identificou que o Strapi não era a ferramenta ideal — motivando a próxima refatoração. Teste de conexão do Strapi no Railway e front na Vercel.",
      stack: ["Next.js 15", "Strapi v4", "Docker", "RLS"],
      image: "/images/projects/strapi-placeholder.png",
      link: "https://gestao-capelas.vercel.app",
      linkText: "Ver projeto",
      status: "live"
    },
    {
      title: "Diocese SaaS Platform",
      subtitle: "Fase: v3 (Em desenvolvimento)",
      problemLabel: "Descrição:",
      problem: "Refatoração completa motivada pelos aprendizados anteriores. Monorepo com Turborepo (apps: web, admin, api · packages: database, types, validators). Arquitetura em camadas, RBAC hierárquico, feature flags por tenant.",
      solutionLabel: "Trilha:",
      solution: "Capelas → Diocese SaaS. Escalei para este projeto pela limitação do Strapi, provando que eu precisava aumentar minha experiência arquitetural, o que me levou ao WaaS.",
      stack: ["Fastify", "Next.js 16", "Prisma", "PostgreSQL", "Turborepo", "RBAC"],
      image: "/images/projects/diocese-placeholder.png",
      link: null,
      linkText: "Solicitar detalhes",
      status: "development"
    },
    {
      title: "WaaS — Website as a Service",
      subtitle: "1 deploy · N clients",
      problemLabel: "Descrição:",
      problem: "Engine config-driven para freelances: 1 deploy suporta múltiplos clientes. Registry Pattern, renderer dinâmico, theme engine via CSS variables. Conteúdo, features e layout isolados por tenant-id.",
      solutionLabel: "Trilha:",
      solution: "Produto & Estudo. Iniciado para praticar arquitetura modular após os desafios do projeto Diocese.",
      stack: ["Next.js 15", "Tailwind 4", "Zod", "Registry Pattern"],
      image: "/images/projects/waas-placeholder.png",
      link: null,
      linkText: "Solicitar detalhes",
      status: "development"
    },
    {
      title: "BeautyCare",
      subtitle: "Estudo Vue.js + UI/UX",
      problemLabel: "Descrição:",
      problem: "Exploração do Vue.js para comparar DX com React/Next.js. Foco em identidade visual elegante e análise comportamental via Clarity e mapas de calor.",
      solutionLabel: "Trilha:",
      solution: "Produto & Estudo. Pratiquei visual agradável, formulários e Vue.js. Captação de features desejadas via mapas de calor.",
      stack: ["Vue.js", "Microsoft Clarity", "GTM", "SEO Técnico"],
      image: "/images/projects/beautycare-placeholder.png",
      link: "https://beauty-care-smoky.vercel.app",
      linkText: "Ver projeto",
      status: "live"
    },
    {
      title: "C4ts Market Research",
      subtitle: "Captação de clientes",
      problemLabel: "Descrição:",
      problem: "Plataforma para captação de clientes freela e posicionamento local. Forms e blob funcionando para receber pedidos de orçamento e briefings de produto.",
      solutionLabel: "Trilha:",
      solution: "Produto & Estudo. Página institucional para captação. Onde vou expor meus projetos e dos meus sócios/amigos para captar freelas.",
      stack: ["Next.js 16", "TypeScript", "Git Flow"],
      image: "/images/projects/c4ts-placeholder.png",
      link: "https://c4ts-project-market-research.vercel.app",
      linkText: "Ver projeto",
      status: "beta"
    }
  ]
};

export const uiLabels = {
  en: {
    badgeDev: "Under Development 🚧"
  },
  pt: {
    badgeDev: "Em Desenvolvimento 🚧"
  }
};
