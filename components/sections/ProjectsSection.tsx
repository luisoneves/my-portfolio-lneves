"use client"
import { motion } from "framer-motion"
import { EvolutionTimeline } from "@/components/projects/EvolutionTimeline"
import { ProjectCard } from "@/components/projects/ProjectCard"

const projects = [
  {
    title: "Diocese SaaS Platform",
    description: "Monorepo Turborepo. RBAC Diocese→Chapel→Editor. Multi-tenancy com RLS e Feature Flags por tenant. Stack própria sem dependência de CMS externo.",
    version: "v3",
    status: "em dev" as const,
    chips: ["Fastify", "Next.js 16", "Prisma", "Turborepo", "RBAC", "Multi-tenancy"],
    href: "https://github.com/luisoneves",
    highlight: true,
  },
  {
    title: "Gestão de Capelas",
    description: "1 admin + 200 filiais com layouts editáveis. Arquitetura headless Strapi. O limite ao escalar motivou a refatoração completa para stack própria.",
    version: "v2",
    status: "produção" as const,
    chips: ["Next.js 15", "Strapi v4", "PostgreSQL", "Docker", "RLS"],
    href: "https://gestao-capelas.vercel.app",
  },
  {
    title: "Website as a Service",
    description: "1 deploy + N clientes. Engine config-driven com Registry Pattern, renderer dinâmico e theme engine via CSS variables. Multi-tenant por host.",
    version: "WaaS",
    status: "em dev" as const,
    chips: ["Next.js 15", "Tailwind 4", "Zod", "Registry Pattern", "Config-driven"],
    href: "https://github.com/luisoneves",
  },
  {
    title: "C4ts Market Research",
    description: "Plataforma para captação de clientes freela e posicionamento local. Forms e blob para receber pedidos de orçamento.",
    version: "beta",
    status: "beta" as const,
    chips: ["Next.js 16", "TypeScript", "Git Flow"],
    href: "https://c4ts-project-market-research.vercel.app",
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function ProjectsSection() {
  return (
    <section id="projetos" className="py-16">
      <div className="mb-2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          {"// trilha de projetos — problema → solução → refatoração"}
        </span>
      </div>
      <h2 className="text-2xl font-medium mb-8">Projetos</h2>

      <EvolutionTimeline />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {projects.map((p) => (
          <motion.div key={p.title} variants={item}>
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
