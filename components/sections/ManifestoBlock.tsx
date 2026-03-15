"use client"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function ManifestoBlock() {
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
        &ldquo;Não serei o dev que pega a maior feature. Serei quem garante que as features
        de todos funcionam juntas — dentro do padrão, com qualidade, prontas para produção.&rdquo;
      </p>
      <footer className="mt-2 text-xs text-muted-foreground font-mono">
        — Plano de Contribuição · março 2025
      </footer>
    </motion.blockquote>
  )
}
