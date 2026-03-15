"use client"
import { motion } from "framer-motion"

const versions = [
  { version: "v1", label: "mockup front-only", status: "concluído", color: "text-muted-foreground" },
  { version: "v2", label: "headless Strapi CMS", status: "concluído", color: "text-blue-500" },
  { version: "v3", label: "Diocese SaaS", status: "agora", color: "text-amber-500", current: true },
  { version: "v4", label: "WaaS em dev", status: "em breve", color: "text-muted-foreground/50", dashed: true },
]

export function EvolutionTimeline() {
  return (
    <div className="flex items-center gap-0 mb-8 p-4 rounded-xl bg-muted/40 overflow-x-auto">
      {versions.map((v, i) => (
        <div key={v.version} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5 min-w-[80px]">
            <div className={`
              w-8 h-8 rounded-full border flex items-center justify-center
              font-mono text-xs font-medium
              ${v.current
                ? "border-amber-500 bg-amber-500/10 text-amber-500"
                : "border-border bg-background text-muted-foreground"}
            `}>
              {v.version}
            </div>
            <span className={`text-[11px] text-center leading-tight ${v.color}`}>
              {v.label}
            </span>
            {v.current && (
              <span className="text-[10px] font-mono text-amber-500">← agora</span>
            )}
          </div>
          {i < versions.length - 1 && (
            <div className={`h-px flex-1 min-w-[24px] mx-1 ${v.dashed ? "border-t border-dashed border-border" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  )
}
