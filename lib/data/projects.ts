export type ProjectStatus = "production" | "inDev" | "beta" | "done"

export interface ProjectData {
  id: "portfolio" | "waas" | "market" | "airulessystem" | "capelas" | "beautycare" | "diocese" | "staticmockup"
  version: string
  status: ProjectStatus
  chips: string[]
  href?: string
  highlight?: boolean
}

export const projectsData: ProjectData[] = [
  {
    id: "portfolio",
    version: "v3",
    status: "inDev",
    chips: ["Next.js 16", "TypeScript", "Framer Motion", "next-intl", "Tailwind 4"],
    href: "https://dev-luisneves.me",
    highlight: true,
  },
  {
    id: "waas",
    version: "WaaS",
    status: "inDev",
    chips: ["Next.js 16", "Tailwind 4", "Zod", "Registry Pattern", "Config-driven"],
    href: "https://github.com/luisoneves",
  },
  {
    id: "market",
    version: "beta",
    status: "beta",
    chips: ["Next.js 16", "TypeScript", "Git Flow"],
    href: "https://c4ts-project-market-research.vercel.app",
  },
  {
    id: "airulessystem",
    version: "rules",
    status: "inDev",
    chips: ["AGENTS.md", "Context Engineering", "AI Best Practices"],
  },
  {
    id: "beautycare",
    version: "beauty",
    status: "done",
    chips: ["Design", "UI/UX", "Frontend"],
    href: "https://beauty-care-smoky.vercel.app",
  },
  {
    id: "capelas",
    version: "v2",
    status: "production",
    chips: ["Next.js 15", "Strapi v4", "PostgreSQL", "Docker", "RLS"],
    href: "https://gestao-capelas.vercel.app",
  },
  {
    id: "diocese",
    version: "v3",
    status: "inDev",
    chips: ["Fastify", "Next.js 16", "Prisma", "Turborepo", "RBAC", "Multi-tenancy"],
    href: "https://github.com/luisoneves",
  },
  {
    id: "staticmockup",
    version: "v1",
    status: "done",
    chips: ["Mockup", "Layout", "Estrutura"],
    href: "https://web-static-mockup.vercel.app",
  },
]
