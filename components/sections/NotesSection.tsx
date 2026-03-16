"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { notesData } from "@/lib/data"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const card = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function NotesSection() {
  const t = useTranslations("notes")

  return (
    <section id="notas" className="py-16">
      <div className="mb-2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          {t("sectionLabel")}
        </span>
      </div>
      <h2 className="text-2xl font-medium mb-8">{t("title")}</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {notesData.map((note) => (
          <motion.a
            key={note.key}
            href={note.href ?? "#"}
            variants={card}
            whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 20 } }}
            className="rounded-xl border border-border bg-card p-5 no-underline group block"
          >
            <div className="font-mono text-xs text-muted-foreground mb-2">
              {t(`${note.key}.date`)} · {t(`${note.key}.category`)}
            </div>
            <h3 className="font-medium text-sm text-foreground leading-snug mb-2 group-hover:text-amber-500 transition-colors">
              {t(`${note.key}.title`)}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t(`${note.key}.summary`)}
            </p>
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
