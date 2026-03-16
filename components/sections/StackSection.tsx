"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

interface ChipData {
  name: string
  highlight: boolean
}

interface GroupData {
  label: string
  chips: ChipData[]
  wide?: boolean
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function StackSection() {
  const t = useTranslations("stack")
  const groups: GroupData[] = [
    {
      label: t("groups.frontend"),
      chips: [
        { name: "Next.js 16",      highlight: true  },
        { name: "React 19",        highlight: true  },
        { name: "TypeScript Strict", highlight: false },
        { name: "Tailwind CSS",    highlight: false },
        { name: "Shadcn/ui",       highlight: false },
        { name: "Framer Motion",   highlight: false },
        { name: "Astro",           highlight: false },
      ],
    },
    {
      label: t("groups.backend"),
      chips: [
        { name: "Fastify",   highlight: true  },
        { name: "Node.js",   highlight: true  },
        { name: "NestJS",    highlight: false },
        { name: "Prisma ORM",highlight: false },
        { name: "PostgreSQL",highlight: false },
        { name: "Redis",     highlight: false },
        { name: "Zod",       highlight: false },
      ],
    },
    {
      label: t("groups.infra"),
      chips: [
        { name: "Docker",       highlight: true  },
        { name: "Turborepo",    highlight: true  },
        { name: "Git Flow",     highlight: false },
        { name: "Vercel",       highlight: false },
        { name: "Railway",      highlight: false },
        { name: "nvm / Volta",  highlight: false },
      ],
    },
    {
      label: t("groups.architecture"),
      chips: [
        { name: "Monorepo",          highlight: true  },
        { name: "Multi-tenancy",     highlight: true  },
        { name: "Clean Architecture",highlight: true  },
        { name: "RBAC",              highlight: false },
        { name: "RLS",               highlight: false },
        { name: "Feature Flags",     highlight: false },
        { name: "Registry Pattern",  highlight: false },
        { name: "Config-driven",     highlight: false },
        { name: "SOLID",             highlight: false },
      ],
      wide: true,
    },
    {
      label: t("groups.ai"),
      chips: [
        { name: "AGENTS.md",        highlight: false },
        { name: "knowledge base",   highlight: false },
        { name: "Cursor / Windsurf",highlight: false },
        { name: "Ollama",           highlight: false },
        { name: "structured prompts",highlight: false },
      ],
    },
  ]

  return (
    <section id="stack" className="py-16">
      <div className="mb-2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          {t("sectionLabel")}
        </span>
      </div>
      <h2 className="text-2xl font-medium mb-8">{t("title")}</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {groups.map((g) => (
          <motion.div
            key={g.label}
            variants={item}
            className={`rounded-xl border border-border bg-card p-4 ${g.wide ? "md:col-span-2" : ""}`}
          >
            <p className="font-mono text-xs text-muted-foreground mb-3">{g.label}</p>
            <div className="flex flex-wrap gap-2">
              {g.chips.map((chip) => (
                <span
                  key={chip.name}
                  className={`font-mono text-[11px] px-2.5 py-1 rounded border
                    ${chip.highlight
                      ? "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/8"
                      : "border-border text-muted-foreground bg-muted/40"}
                  `}
                >
                  {chip.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
