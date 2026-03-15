export interface Note {
  slug: string
  date: string
  category: string
  title: string
  summary: string
  href?: string
}

export const notes: Note[] = [
  {
    slug: "strapi-para-saas",
    date: "2025-03",
    category: "arquitetura",
    title: "Por que abandonei o Strapi e construí minha própria stack",
    summary: "Multi-tenancy com RLS, feature flags e a decisão que transformou um sistema headless num SaaS real. O que o Strapi não consegue fazer quando você escala para 200 filiais.",
    href: "#",
  },
  {
    slug: "agents-tarefas-atomicas",
    date: "2025-02",
    category: "ia + engenharia",
    title: "AGENTS.md e tarefas atômicas — IA como ferramenta, não atalho",
    summary: "Como estruturo contexto (knowledge base versionada, PRD, AGENTS.md) para que o agente produza arquitetura consistente em vez de código aleatório.",
    href: "#",
  },
  {
    slug: "clean-arch-fastify",
    date: "2025-01",
    category: "clean architecture",
    title: "Transport → Application → Domain → Infra na prática",
    summary: "Separação real de camadas num projeto Fastify com exemplos concretos do Diocese SaaS. O que muda no dia a dia quando você respeita as fronteiras.",
    href: "#",
  },
]
