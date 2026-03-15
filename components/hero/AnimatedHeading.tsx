"use client"
import { motion } from "framer-motion"

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
}

const word = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring" as const, damping: 18, stiffness: 200 },
  },
}

export function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  return (
    <motion.h1
      variants={sentence}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {text.split(" ").map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block mr-[0.25em]">
          {w}
        </motion.span>
      ))}
    </motion.h1>
  )
}
