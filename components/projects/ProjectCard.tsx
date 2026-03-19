"use client"
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion"
import { useRef } from "react"

type ProjectStatus = "production" | "inDev" | "beta" | "done" | "paused"

interface Project {
  title: string
  description: string
  version?: string
  statusKey?: ProjectStatus
  statusLabel?: string
  chips: string[]
  href?: string
  links?: { label: string; url: string }[]
  highlight?: boolean
}

const statusStyles: Record<ProjectStatus, string> = {
  production: "bg-green-500/10  text-green-600  dark:text-green-400",
  inDev: "bg-amber-500/10  text-amber-600  dark:text-amber-400",
  beta: "bg-blue-500/10   text-blue-600   dark:text-blue-400",
  done: "bg-muted         text-muted-foreground",
  paused: "bg-muted/60    text-muted-foreground",
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
      aria-label={`${project.title} — ${project.statusLabel}`}
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
          {project.statusLabel && (
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusStyles[project.statusKey || "done"]}`}>
              {project.statusLabel}
            </span>
          )}
          {project.version && (
            <span className="font-mono text-xs text-muted-foreground">{project.version}</span>
          )}
        </div>
        <h3 className="font-medium text-sm mb-1.5 text-foreground">{project.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-2">
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
        {project.links && project.links.length > 0 && (
          <div className="flex gap-4 mt-4 pt-4 border-t border-border/40">
            {project.links.map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-medium text-foreground hover:text-amber-500 transition-colors flex items-center gap-1.5 font-mono"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
