"use client"
import { motion } from "framer-motion"

const steps = [
  { id: "pr",    label: "PR",     sub: "git push",          color: "bg-blue-500/10   border-blue-500/30   text-blue-500"   },
  { id: "lint",  label: "lint",   sub: "ESLint · TS",       color: "bg-muted/60      border-border        text-muted-foreground" },
  { id: "test",  label: "test",   sub: "Vitest",            color: "bg-muted/60      border-border        text-muted-foreground" },
  { id: "build", label: "build",  sub: "Turbo cache",       color: "bg-muted/60      border-border        text-muted-foreground" },
  { id: "vcl",   label: "deploy", sub: "Vercel · Railway",  color: "bg-green-500/10  border-green-500/30  text-green-500"  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const step = {
  hidden: { opacity: 0, scale: 0.85 },
  show:   { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 22 } },
}

export function CICDSection() {
  return (
    <section className="py-12">
      <div className="mb-2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          {"// pipeline ci/cd — \"funciona na minha máquina\" não é critério de done"}
        </span>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 mt-4">
        <motion.div
          className="flex items-center gap-0 overflow-x-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center shrink-0">
              <motion.div variants={step} className="flex flex-col items-center gap-2 min-w-[72px]">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-mono text-xs font-medium ${s.color}`}>
                  {s.label}
                </div>
                <span className="text-[11px] text-muted-foreground text-center leading-tight">{s.sub}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="w-8 h-px bg-border mx-1 shrink-0" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
