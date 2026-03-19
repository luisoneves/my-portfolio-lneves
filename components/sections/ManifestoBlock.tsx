"use client"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useTranslations } from "next-intl"

export function ManifestoBlock() {
  const t = useTranslations("manifesto")
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="my-12 py-8 border-t border-b border-border"
    >
      <h3 className="text-lg font-medium text-foreground mb-3">
        {t("title")}
      </h3>
      <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
        {t("quote")}
      </p>
    </motion.section>
  )
}
