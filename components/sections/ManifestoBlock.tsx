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
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="border-l-2 border-amber-500 pl-5 py-4 my-12
        bg-muted/40 rounded-r-xl pr-5"
    >
      <p className="text-base font-medium text-foreground leading-relaxed">
        &ldquo;{t("quote")}&rdquo;
      </p>
      <footer className="mt-2 text-xs text-muted-foreground font-mono">
        — {t("author")}
      </footer>
    </motion.blockquote>
  )
}
