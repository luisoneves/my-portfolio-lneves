"use client"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  enter:  { opacity: 1, y: 0,  filter: "blur(0px)" },
  exit:   { opacity: 0, y: -8, filter: "blur(2px)" },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
