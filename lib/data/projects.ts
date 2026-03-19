export type ProjectStatus = "production" | "inDev" | "beta" | "done"

export interface ProjectData {
  id: "diocese" | "capelas" | "waas" | "market" | "beautycare" | "staticmockup"
  version: string
  status: ProjectStatus
  chips: string[]
  href?: string
  highlight?: boolean
}

export const projectsData: ProjectData[] = [
  {
    id: "diocese",
    version: "v3",
    status: "inDev",
    chips: ["Fastify", "Next.js 16", "Prisma", "Turborepo", "RBAC", "Multi-tenancy"],
    href: "https://github.com/luisoneves",
    highlight: true,
  },
  {
    id: "capelas",
    version: "v2",
    status: "production",
    chips: ["Next.js 15", "Strapi v4", "PostgreSQL", "Docker", "RLS"],
    href: "https://gestao-capelas.vercel.app",
  },
  {
    id: "waas",
    version: "WaaS",
    status: "inDev",
    chips: ["Next.js 15", "Tailwind 4", "Zod", "Registry Pattern", "Config-driven"],
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
    id: "beautycare",
    version: "beauty",
    status: "done",
    chips: ["Design", "UI/UX", "Frontend"],
  },
  {
    id: "staticmockup",
    version: "v1",
    status: "done",
    chips: ["Mockup", "Layout", "Estrutura"],
  },
]
