"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { stackGroups } from "@/lib/data"

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
  const groups: GroupData[] = stackGroups.map((group) => ({
    label: t(`groups.${group.id}`),
    chips: group.chips,
    wide: group.wide,
  }))

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
