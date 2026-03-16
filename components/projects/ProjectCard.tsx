"use client"
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion"
import { useRef } from "react"

interface Project {
  title: string
  description: string
  version: string
  status: "produção" | "em dev" | "beta" | "concluído"
  chips: string[]
  href?: string
  highlight?: boolean
}

const statusStyles: Record<string, string> = {
  "produção":  "bg-green-500/10  text-green-600  dark:text-green-400",
  "em dev":    "bg-amber-500/10  text-amber-600  dark:text-amber-400",
  "beta":      "bg-blue-500/10   text-blue-600   dark:text-blue-400",
  "concluído": "bg-muted         text-muted-foreground",
}

function GlowOverlay({ glowX, glowY }: { glowX: MotionValue<string>; glowY: MotionValue<string> }) {
  const background = useTransform(
    [glowX, glowY] as [MotionValue<string>, MotionValue<string>],
    ([lx, ly]) =>
      `radial-gradient(circle at ${lx} ${ly}, rgba(255,255,255,0.06) 0%, transparent 60%)`
  )

  return (
    <motion.div
      className="absolute inset-0 rounded-xl pointer-events-none"
      style={{ background }}
    />
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"])
  const glowX   = useTransform(springX, [-0.5, 0.5], ["0%", "100%"])
  const glowY   = useTransform(springY, [-0.5, 0.5], ["0%", "100%"])

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width  - 0.5)
    y.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.025 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      tabIndex={0}
      aria-label={project.title}
      onClick={() => project.href && window.open(project.href, "_blank")}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && project.href) {
          e.preventDefault()
          window.open(project.href, "_blank")
        }
      }}
      className={`
        relative rounded-xl border bg-card p-5 cursor-pointer overflow-hidden
        ${project.highlight ? "border-amber-500/50" : "border-border"}
      `}
    >
      <GlowOverlay glowX={glowX} glowY={glowY} />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusStyles[project.status]}`}>
            {project.status}
          </span>
          <span className="font-mono text-xs text-muted-foreground">{project.version}</span>
        </div>
        <h3 className="font-medium text-sm mb-1.5 text-foreground">{project.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.chips.map((chip) => (
            <span
              key={chip}
              className={`font-mono text-[11px] px-2 py-0.5 rounded border
                ${project.highlight
                  ? "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5"
                  : "border-border text-muted-foreground bg-muted/40"}
              `}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
