"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
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

type ProjectCategory = "emEvolucao" | "experimentacao"

const projectCategories: Record<ProjectCategory, string[]> = {
  emEvolucao: ["diocese", "market"],
  experimentacao: ["capelas", "waas"],
}

export function ProjectsSection() {
  const t = useTranslations("projects")

  const getProjectsByCategory = (category: ProjectCategory) => {
    const ids = projectCategories[category]
    return ids.map((id) => ({
      title: t(`${id}.title`),
      description: t(`${id}.description`),
      chips: [] as string[],
      href: undefined as string | undefined,
      highlight: id === "diocese",
    }))
  }

  const allProjects = [
    ...getProjectsByCategory("emEvolucao"),
    ...getProjectsByCategory("experimentacao"),
  ]

  return (
    <section id="projetos" className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-2">
          <span className="font-mono text-xs text-muted-foreground tracking-wider">
            {t("sectionLabel")}
          </span>
        </div>
        <h2 className="text-2xl font-medium mb-8">{t("title")}</h2>

        {/* Em Evolução */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <h3 className="text-sm font-medium text-foreground">Em Evolução</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4 max-w-2xl">
            Projetos ativos com desenvolvimento contínuo, focados em arquitetura escalável e decisões técnicas de longo prazo.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {getProjectsByCategory("emEvolucao").map((p) => (
              <motion.div key={p.title} variants={item}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Experimentação */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <h3 className="text-sm font-medium text-foreground">Experimentação</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4 max-w-2xl">
            Projetos de aprendizado e exploração tecnológica, onde o foco é entender padrões e validar abordagens.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {getProjectsByCategory("experimentacao").map((p) => (
              <motion.div key={p.title} variants={item}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
