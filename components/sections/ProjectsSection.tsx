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

type ProjectCategory = "emEvolucao" | "experimentacao" | "pausados"

const projectCategories: Record<ProjectCategory, string[]> = {
  emEvolucao: ["portfolio", "waas", "market", "airulessystem"],
  experimentacao: ["beautycare", "capelas"],
  pausados: ["diocese", "staticmockup"],
}

export function ProjectsSection() {
  const t = useTranslations("projects")

  const getProjectsByCategory = (category: ProjectCategory) => {
    const ids = projectCategories[category]
    return ids.map((id) => {
      let links: { label: string; url: string }[] = []
      if (id === "market") {
        links = [
          { label: "GitHub", url: "https://github.com/luisoneves/c4ts-project-market-research" },
          { label: "Demo", url: "https://c4ts-project-market-research.vercel.app/" }
        ]
      } else if (id === "beautycare") {
        links = [
          { label: "GitHub", url: "https://github.com/luisoneves/BeautyCare" },
          { label: "Demo", url: "https://beauty-care-smoky.vercel.app/" }
        ]
      } else if (id === "capelas") {
        links = [
          { label: "GitHub", url: "https://github.com/luisoneves/gestao-capelas-frontend" },
          { label: "Demo", url: "https://gestao-capelas.vercel.app/" }
        ]
      } else if (id === "staticmockup") {
        links = [
          { label: "GitHub", url: "https://github.com/luisoneves/web-static-mockup" },
          { label: "Demo", url: "https://web-static-mockup.vercel.app/" }
        ]
      }

      return {
        title: t(`${id}.title`),
        description: t(`${id}.description`),
        chips: [] as string[],
        href: undefined as string | undefined,
        links,
        highlight: id === "portfolio",
      }
    })
  }

  return (
    <section id="projetos" className="py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="mb-2">
          <span className="font-mono text-xs text-muted-foreground tracking-wider">
            {t("sectionLabel")}
          </span>
        </div>
        <h2 className="text-2xl font-medium mb-8">{t("title")}</h2>

        {/* Evolution Timeline */}
        <div className="mb-10 pb-6 border-b border-border/50">
          <p className="text-xs font-mono text-muted-foreground mb-4">Trilha de evolução</p>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { label: "Portfolio", status: "active" },
              { label: "WaaS", status: "active" },
              { label: "C4TS", status: "active" },
              { label: "AI Rules", status: "active" },
              { label: "Capelas", status: "experiment" },
              { label: "BeautyCare", status: "experiment" },
              { label: "Diocese", status: "paused" },
              { label: "Mockup", status: "paused" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`text-xs font-mono px-2 py-1 rounded whitespace-nowrap ${
                  item.status === "active" 
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30" 
                    : item.status === "experiment"
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                      : "bg-muted text-muted-foreground border border-border"
                }`}>
                  {item.label}
                </span>
                {i < 7 && <span className="text-muted-foreground/50">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Em Evolução */}
        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <h3 className="text-sm font-medium text-foreground">Em Evolução</h3>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl">
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
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <h3 className="text-sm font-medium text-foreground">Experimentação</h3>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl">
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
        {/* Pausados */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Pausados</h3>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Projetos ou mockups arquivados, utilizados para experimentação de layout e estrutura.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {getProjectsByCategory("pausados").map((p) => (
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
