"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { EvolutionTimeline } from "@/components/projects/EvolutionTimeline"
import { ProjectCard } from "@/components/projects/ProjectCard"

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
  const t = useTranslations("projects")
  const projects = [
    {
      title: t("diocese.title"),
      description: t("diocese.description"),
      version: "v3",
      statusKey: "inDev" as const,
      statusLabel: t("status.inDev"),
      chips: ["Fastify", "Next.js 16", "Prisma", "Turborepo", "RBAC", "Multi-tenancy"],
      href: "https://github.com/luisoneves",
      highlight: true,
    },
    {
      title: t("capelas.title"),
      description: t("capelas.description"),
      version: "v2",
      statusKey: "production" as const,
      statusLabel: t("status.production"),
      chips: ["Next.js 15", "Strapi v4", "PostgreSQL", "Docker", "RLS"],
      href: "https://gestao-capelas.vercel.app",
    },
    {
      title: t("waas.title"),
      description: t("waas.description"),
      version: "WaaS",
      statusKey: "inDev" as const,
      statusLabel: t("status.inDev"),
      chips: ["Next.js 15", "Tailwind 4", "Zod", "Registry Pattern", "Config-driven"],
      href: "https://github.com/luisoneves",
    },
    {
      title: t("market.title"),
      description: t("market.description"),
      version: "beta",
      statusKey: "beta" as const,
      statusLabel: t("status.beta"),
      chips: ["Next.js 16", "TypeScript", "Git Flow"],
      href: "https://c4ts-project-market-research.vercel.app",
    },
  ]

  return (
    <section id="projetos" className="py-16">
      <div className="mb-2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          {t("sectionLabel")}
        </span>
      </div>
      <h2 className="text-2xl font-medium mb-8">{t("title")}</h2>

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
