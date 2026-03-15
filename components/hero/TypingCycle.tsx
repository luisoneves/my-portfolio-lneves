"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const phrases = [
  "Estruturo sistemas.",
  "Dirijo a IA.",
  "Entrego produção.",
  "Penso em arquitetura.",
]

export function TypingCycle() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="relative inline-block min-w-[280px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-amber-500 dark:text-amber-400"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
