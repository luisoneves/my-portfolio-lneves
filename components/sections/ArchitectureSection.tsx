"use client"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const monorepoStructure = [
  { path: "apps/web",       desc: "Next.js frontend",       color: "text-amber-500",   border: "border-amber-500/30",   bg: "bg-amber-500/5"  },
  { path: "apps/admin",     desc: "painel interno",          color: "text-amber-500",   border: "border-amber-500/30",   bg: "bg-amber-500/5"  },
  { path: "apps/api",       desc: "Fastify server",          color: "text-blue-500",    border: "border-blue-500/30",    bg: "bg-blue-500/5"   },
  { path: "packages/types",      desc: "contratos compartilhados", color: "text-muted-foreground", border: "border-border", bg: "bg-muted/40" },
  { path: "packages/database",   desc: "Prisma schema",           color: "text-muted-foreground", border: "border-border", bg: "bg-muted/40" },
  { path: "packages/validators", desc: "Zod schemas",             color: "text-muted-foreground", border: "border-border", bg: "bg-muted/40" },
]

const layers = [
  { name: "Transport",      sub: "HTTP / WebSocket",  highlight: false },
  { name: "Application",    sub: "use cases",         highlight: true  },
  { name: "Domain",         sub: "entities / rules",  highlight: false },
  { name: "Infrastructure", sub: "Prisma / Redis",    highlight: false },
]

function AnimatedLayer({ layer, index }: { layer: typeof layers[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`
        flex items-center justify-between px-4 py-3 rounded-lg border
        ${layer.highlight
          ? "border-amber-500/40 bg-amber-500/8"
          : "border-border bg-muted/40"}
      `}>
        <span className={`font-medium text-sm ${layer.highlight ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}>
          {layer.name}
        </span>
        <span className={`font-mono text-xs ${layer.highlight ? "text-amber-500/70" : "text-muted-foreground"}`}>
          {layer.sub}
        </span>
      </div>
      {index < layers.length - 1 && (
        <div className="text-center text-muted-foreground text-sm py-1">↓</div>
      )}
    </motion.div>
  )
}

export function ArchitectureSection() {
  return (
    <section id="arquitetura" className="py-16">
      <div className="mb-2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          {"// arquitetura — decisões que permitem trocar tecnologia sem reescrever o sistema"}
        </span>
      </div>
      <h2 className="text-2xl font-medium mb-8">Arquitetura</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monorepo */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-mono text-sm font-medium text-foreground mb-4">estrutura monorepo</h3>
          <div className="flex flex-col gap-2">
            {monorepoStructure.map((item) => (
              <div
                key={item.path}
                className={`flex items-center justify-between px-3 py-2 rounded-md border ${item.border} ${item.bg}`}
              >
                <span className={`font-mono text-xs font-medium ${item.color}`}>{item.path}</span>
                <span className="text-xs text-muted-foreground">— {item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Architecture */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-mono text-sm font-medium text-foreground mb-4">camadas (clean architecture)</h3>
          <div className="flex flex-col">
            {layers.map((layer, i) => (
              <AnimatedLayer key={layer.name} layer={layer} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
