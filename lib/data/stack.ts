export interface StackGroup {
  id: "frontend" | "backend" | "infra" | "architecture" | "ai"
  chips: Array<{ name: string; highlight: boolean }>
  wide?: boolean
}

export const stackGroups: StackGroup[] = [
  {
    id: "frontend",
    chips: [
      { name: "Next.js 16", highlight: true },
      { name: "React 19", highlight: true },
      { name: "TypeScript Strict", highlight: false },
      { name: "Tailwind CSS", highlight: false },
      { name: "Shadcn/ui", highlight: false },
      { name: "Framer Motion", highlight: false },
      { name: "Astro", highlight: false },
    ],
  },
  {
    id: "backend",
    chips: [
      { name: "Fastify", highlight: true },
      { name: "Node.js", highlight: true },
      { name: "NestJS", highlight: false },
      { name: "Prisma ORM", highlight: false },
      { name: "PostgreSQL", highlight: false },
      { name: "Redis", highlight: false },
      { name: "Zod", highlight: false },
    ],
  },
  {
    id: "infra",
    chips: [
      { name: "Docker", highlight: true },
      { name: "Turborepo", highlight: true },
      { name: "Git Flow", highlight: false },
      { name: "Vercel", highlight: false },
      { name: "Railway", highlight: false },
      { name: "nvm / Volta", highlight: false },
    ],
  },
  {
    id: "architecture",
    wide: true,
    chips: [
      { name: "Monorepo", highlight: true },
      { name: "Multi-tenancy", highlight: true },
      { name: "Clean Architecture", highlight: true },
      { name: "RBAC", highlight: false },
      { name: "RLS", highlight: false },
      { name: "Feature Flags", highlight: false },
      { name: "Registry Pattern", highlight: false },
      { name: "Config-driven", highlight: false },
      { name: "SOLID", highlight: false },
    ],
  },
  {
    id: "ai",
    chips: [
      { name: "AGENTS.md", highlight: false },
      { name: "knowledge base", highlight: false },
      { name: "Cursor / Windsurf", highlight: false },
      { name: "Ollama", highlight: false },
      { name: "structured prompts", highlight: false },
    ],
  },
]
