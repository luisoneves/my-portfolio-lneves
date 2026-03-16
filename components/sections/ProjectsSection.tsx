"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { EvolutionTimeline } from "@/components/projects/EvolutionTimeline"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { projectsData } from "@/lib/data"

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
  const projects = projectsData.map((project) => ({
    title: t(`${project.id}.title`),
    description: t(`${project.id}.description`),
    version: project.version,
    statusKey: project.status,
    statusLabel: t(`status.${project.status}`),
    chips: project.chips,
    href: project.href,
    highlight: project.highlight,
  }))

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
