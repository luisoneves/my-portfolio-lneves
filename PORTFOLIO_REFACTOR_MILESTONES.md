# PORTFOLIO_REFACTOR_MILESTONES.md
> Plano de execução para agente de IA — refatoração dev-luisneves.me  
> Stack: Next.js 15/16 · TypeScript Strict · Tailwind CSS · Framer Motion · Shadcn/ui  
> Gerado em: março 2025 | Autor: Luis Otavio Neves Faustino

---

## CONTEXTO GERAL

Portfolio em produção em `dev-luisneves.me`. Stack existente: Next.js App Router, TypeScript, Tailwind CSS.  
Objetivo: transformar portfólio com cara de currículo em portfólio com identidade de produto — arrojado, com animações físicas, narrativa de projeto e posicionamento de Engineering Lead / Software Architect.

**Princípio central de execução:**  
Cada milestone é autônomo. O agente deve ler o milestone, analisar os arquivos existentes relevantes, e executar. Sem perguntas desnecessárias — se houver ambiguidade de implementação, escolher a opção mais aderente à arquitetura já existente no projeto.

---

## MILESTONE 0 — Instalação de pacotes e setup base
**Estimativa:** 15–20 min | **Tipo:** automático | **Arquivos novos:** 2

### Objetivo
Instalar todas as dependências necessárias para os próximos milestones e configurar providers globais.

### Pacotes a instalar

```bash
npm install framer-motion lenis @studio-freight/lenis cmdk vaul sonner
npm install @radix-ui/react-dialog @radix-ui/react-kbd
npm install --save-dev @types/node
```

> Nota: `gsap` e `@react-three/fiber` são opcionais e estão no MILESTONE 8 (avançado).  
> Não instalar agora para manter o escopo gerenciável.

### Arquivos a criar

**`components/providers/SmoothScrollProvider.tsx`**
```tsx
"use client"
import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
```

**`components/providers/PageTransition.tsx`**
```tsx
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
```

### Arquivo a modificar

**`app/layout.tsx`** — envolver `{children}` com ambos os providers:
```tsx
// Adicionar imports:
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider"
import { PageTransition } from "@/components/providers/PageTransition"

// Envolver children:
<SmoothScrollProvider>
  <PageTransition>
    {children}
  </PageTransition>
</SmoothScrollProvider>
```

### Critério de done
- [ ] `npm run build` sem erros após instalação
- [ ] Scroll com inércia física funcionando na home
- [ ] Page transition com blur ao navegar entre rotas

---

## MILESTONE 1 — Hero Section refatorado
**Estimativa:** 30–45 min | **Tipo:** automático | **Arquivos novos:** 2 | **Arquivos modificados:** 1

### Objetivo
Substituir o hero atual por versão com posicionamento forte, texto animado com efeito de digitação cíclico, stats em linha e CTAs diretos.

### Arquivo a criar

**`components/hero/AnimatedHeading.tsx`**
```tsx
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
    transition: { type: "spring", damping: 18, stiffness: 200 },
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
```

**`components/hero/TypingCycle.tsx`**
```tsx
"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const phrases = ["Estruturo sistemas.", "Dirijo a IA.", "Entrego produção.", "Penso em arquitetura."]

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
```

### Arquivo a modificar

**`app/page.tsx` (ou equivalente da home)** — substituir o bloco hero por:

```tsx
// Estrutura esperada do novo hero:

<section className="pt-12 pb-20">
  {/* Badge de disponibilidade */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.05 }}
    className="mb-5"
  >
    <span className="inline-flex items-center gap-2 text-xs font-mono
      px-3 py-1.5 rounded-full border border-amber-500/30
      bg-amber-500/8 text-amber-600 dark:text-amber-400">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      Engineering Lead · Software Architect · FATEC ADS
    </span>
  </motion.div>

  {/* Heading principal */}
  <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-2">
    Não escrevo features.
  </h1>
  <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-6">
    <TypingCycle />
  </h1>

  {/* Manifesto de uma linha */}
  <p className="text-base text-muted-foreground max-w-xl leading-relaxed mb-8">
    15+ anos de TI e infraestrutura. Fullstack moderno com arquitetura-primeiro.{" "}
    <strong className="text-foreground font-medium">
      Quem entende o sistema dirige a IA.
    </strong>{" "}
    Quem só sabe sintaxe concorre com ela.
  </p>

  {/* Stats */}
  <div className="flex gap-8 mb-8 text-sm">
    <div>
      <span className="font-mono text-2xl font-medium text-foreground">15+</span>
      <p className="text-muted-foreground text-xs mt-0.5">anos em TI</p>
    </div>
    <div>
      <span className="font-mono text-2xl font-medium text-foreground">4</span>
      <p className="text-muted-foreground text-xs mt-0.5">projetos em produção</p>
    </div>
    <div>
      <span className="font-mono text-lg font-medium text-amber-500">v1→v3</span>
      <p className="text-muted-foreground text-xs mt-0.5">iterações / sistema</p>
    </div>
    <div>
      <span className="font-mono text-sm font-medium text-foreground leading-tight">
        Pragmatic<br/>Programmer
      </span>
      <p className="text-muted-foreground text-xs mt-0.5">lendo agora</p>
    </div>
  </div>

  {/* CTAs */}
  <div className="flex gap-3 flex-wrap">
    <a href="#projetos" className="btn-primary">ver projetos ↓</a>
    <a href="https://github.com/luisoneves" target="_blank" className="btn-secondary">github ↗</a>
    <a href="mailto:contato@luisneves.dev.br" className="btn-secondary">contato ↗</a>
  </div>
</section>
```

### Critério de done
- [ ] Badge com pulse animado visível no topo
- [ ] Texto cíclico trocando com transição suave a cada ~3s
- [ ] Stats horizontais renderizando corretamente
- [ ] CTAs com links funcionais

---

## MILESTONE 2 — Manifesto / Quote Block
**Estimativa:** 15 min | **Tipo:** automático | **Arquivos novos:** 1

### Objetivo
Adicionar o quote de posicionamento logo após o hero, com animação de entrada no scroll.

### Arquivo a criar

**`components/sections/ManifestoBlock.tsx`**
```tsx
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
      className="border-l-2 border-amber-500 pl-5 py-1 my-12
        bg-muted/40 rounded-r-xl pr-5"
    >
      <p className="text-base font-medium text-foreground leading-relaxed">
        "Não serei o dev que pega a maior feature. Serei quem garante que as features
        de todos funcionam juntas — dentro do padrão, com qualidade, prontas para produção."
      </p>
      <footer className="mt-2 text-xs text-muted-foreground font-mono">
        — Plano de Contribuição · março 2025
      </footer>
    </motion.blockquote>
  )
}
```

### Arquivo a modificar
**`app/page.tsx`** — adicionar `<ManifestoBlock />` após a seção hero e antes dos projetos.

### Critério de done
- [ ] Quote visível entre hero e projetos
- [ ] Entrada com slide da esquerda ao fazer scroll

---

## MILESTONE 3 — Seção de Projetos com Trilha Visual
**Estimativa:** 60–80 min | **Tipo:** automático | **Arquivos novos:** 3

### Objetivo
Substituir a listagem de projetos por uma narrativa de evolução com timeline v1→v2→v3→v4, cards com tilt 3D e stagger reveal.

### Arquivo a criar

**`components/projects/EvolutionTimeline.tsx`**
```tsx
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
            <div className={`h-px flex-1 min-w-[24px] mx-1 ${v.dashed || versions[i+1].dashed ? "border-t border-dashed border-border" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  )
}
```

**`components/projects/ProjectCard.tsx`**
```tsx
"use client"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
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
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.025 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`
        relative rounded-xl border bg-card p-5 cursor-pointer overflow-hidden
        ${project.highlight ? "border-amber-500/50" : "border-border"}
      `}
      onClick={() => project.href && window.open(project.href, "_blank")}
    >
      {/* Glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([lx, ly]: string[]) =>
              `radial-gradient(circle at ${lx} ${ly}, rgba(255,255,255,0.06) 0%, transparent 60%)`
          ),
        }}
      />

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
    </motion.div>
  )
}
```

**`components/sections/ProjectsSection.tsx`**
```tsx
"use client"
import { motion } from "framer-motion"
import { EvolutionTimeline } from "@/components/projects/EvolutionTimeline"
import { ProjectCard } from "@/components/projects/ProjectCard"

const projects = [
  {
    title: "Diocese SaaS Platform",
    description: "Monorepo Turborepo. RBAC Diocese→Chapel→Editor. Multi-tenancy com RLS e Feature Flags por tenant. Stack própria sem dependência de CMS externo.",
    version: "v3",
    status: "em dev" as const,
    chips: ["Fastify", "Next.js 16", "Prisma", "Turborepo", "RBAC", "Multi-tenancy"],
    href: "https://github.com/luisoneves",
    highlight: true,
  },
  {
    title: "Gestão de Capelas",
    description: "1 admin + 200 filiais com layouts editáveis. Arquitetura headless Strapi. O limite ao escalar motivou a refatoração completa para stack própria.",
    version: "v2",
    status: "produção" as const,
    chips: ["Next.js 15", "Strapi v4", "PostgreSQL", "Docker", "RLS"],
    href: "https://gestao-capelas.vercel.app",
  },
  {
    title: "Website as a Service",
    description: "1 deploy + N clientes. Engine config-driven com Registry Pattern, renderer dinâmico e theme engine via CSS variables. Multi-tenant por host.",
    version: "WaaS",
    status: "em dev" as const,
    chips: ["Next.js 15", "Tailwind 4", "Zod", "Registry Pattern", "Config-driven"],
    href: "https://github.com/luisoneves",
  },
  {
    title: "C4ts Market Research",
    description: "Plataforma para captação de clientes freela e posicionamento local. Forms e blob para receber pedidos de orçamento.",
    version: "beta",
    status: "beta" as const,
    chips: ["Next.js 16", "TypeScript", "Git Flow"],
    href: "https://c4ts-project-market-research.vercel.app",
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function ProjectsSection() {
  return (
    <section id="projetos" className="py-16">
      <div className="mb-2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          // trilha de projetos — problema → solução → refatoração
        </span>
      </div>
      <h2 className="text-2xl font-medium mb-8">Projetos</h2>

      <EvolutionTimeline />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {projects.map((p) => (
          <motion.div key={p.title} variants={item}>
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
```

### Arquivo a modificar
**`app/page.tsx`** — substituir seção de projetos existente por `<ProjectsSection />`.

### Critério de done
- [ ] Timeline v1→v4 visível acima dos cards
- [ ] Cards com tilt 3D ao passar o mouse
- [ ] Stagger reveal ao fazer scroll até a seção
- [ ] Card do Diocese SaaS com borda amber destacada

---

## MILESTONE 4 — Seção de Arquitetura (Monorepo + Camadas)
**Estimativa:** 45 min | **Tipo:** automático | **Arquivos novos:** 1

### Objetivo
Adicionar seção visual mostrando estrutura de monorepo e Clean Architecture em camadas — diferencial que nenhum portfólio de júnior tem.

### Arquivo a criar

**`components/sections/ArchitectureSection.tsx`**
```tsx
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
          // arquitetura — decisões que permitem trocar tecnologia sem reescrever o sistema
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
```

### Arquivo a modificar
**`app/page.tsx`** — adicionar `<ArchitectureSection />` após a seção de projetos.

### Critério de done
- [ ] Grid 2 colunas com monorepo e camadas
- [ ] Camada Application destacada em amber
- [ ] Layers animam em cascata ao entrar na viewport

---

## MILESTONE 5 — Pipeline CI/CD Visual
**Estimativa:** 30 min | **Tipo:** automático | **Arquivos novos:** 1

### Objetivo
Mostrar o pipeline de deploy como componente visual — evidencia mentalidade DevOps, raro em portfólios de júnior/pleno.

### Arquivo a criar

**`components/sections/CICDSection.tsx`**
```tsx
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
  show:   { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 22 } },
}

export function CICDSection() {
  return (
    <section className="py-12">
      <div className="mb-2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          // pipeline ci/cd — "funciona na minha máquina" não é critério de done
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
```

### Arquivo a modificar
**`app/page.tsx`** — adicionar após `<ArchitectureSection />`.

### Critério de done
- [ ] Steps do pipeline visíveis em sequência horizontal
- [ ] Animação de escala com stagger ao entrar na viewport
- [ ] Scroll horizontal em mobile (overflow-x-auto)

---

## MILESTONE 6 — Seção de Stack Contextualizada
**Estimativa:** 30 min | **Tipo:** automático | **Arquivos novos:** 1

### Objetivo
Substituir tabela/lista de tecnologias por chips agrupados por contexto de uso real — não é o que você conhece, é onde você usa.

### Arquivo a criar

**`components/sections/StackSection.tsx`**
```tsx
"use client"
import { motion } from "framer-motion"

const groups = [
  {
    label: "frontend",
    chips: [
      { name: "Next.js 16",      highlight: true  },
      { name: "React 19",        highlight: true  },
      { name: "TypeScript Strict", highlight: false },
      { name: "Tailwind CSS",    highlight: false },
      { name: "Shadcn/ui",       highlight: false },
      { name: "Framer Motion",   highlight: false },
      { name: "Astro",           highlight: false },
    ],
  },
  {
    label: "backend & dados",
    chips: [
      { name: "Fastify",   highlight: true  },
      { name: "Node.js",   highlight: true  },
      { name: "NestJS",    highlight: false },
      { name: "Prisma ORM",highlight: false },
      { name: "PostgreSQL",highlight: false },
      { name: "Redis",     highlight: false },
      { name: "Zod",       highlight: false },
    ],
  },
  {
    label: "infra & devops",
    chips: [
      { name: "Docker",       highlight: true  },
      { name: "Turborepo",    highlight: true  },
      { name: "Git Flow",     highlight: false },
      { name: "Vercel",       highlight: false },
      { name: "Railway",      highlight: false },
      { name: "nvm / Volta",  highlight: false },
    ],
  },
  {
    label: "arquitetura & padrões",
    chips: [
      { name: "Monorepo",          highlight: true  },
      { name: "Multi-tenancy",     highlight: true  },
      { name: "Clean Architecture",highlight: true  },
      { name: "RBAC",              highlight: false },
      { name: "RLS",               highlight: false },
      { name: "Feature Flags",     highlight: false },
      { name: "Registry Pattern",  highlight: false },
      { name: "Config-driven",     highlight: false },
      { name: "SOLID",             highlight: false },
    ],
    wide: true,
  },
  {
    label: "engenharia de ia",
    chips: [
      { name: "AGENTS.md",        highlight: false },
      { name: "knowledge base",   highlight: false },
      { name: "Cursor / Windsurf",highlight: false },
      { name: "Ollama",           highlight: false },
      { name: "structured prompts",highlight: false },
    ],
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

export function StackSection() {
  return (
    <section id="stack" className="py-16">
      <div className="mb-2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          // stack em contexto — não uma lista, uma decisão
        </span>
      </div>
      <h2 className="text-2xl font-medium mb-8">Stack</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {groups.map((g) => (
          <motion.div
            key={g.label}
            variants={item}
            className={`rounded-xl border border-border bg-card p-4 ${g.wide ? "md:col-span-2" : ""}`}
          >
            <p className="font-mono text-xs text-muted-foreground mb-3">{g.label}</p>
            <div className="flex flex-wrap gap-2">
              {g.chips.map((chip) => (
                <span
                  key={chip.name}
                  className={`font-mono text-[11px] px-2.5 py-1 rounded border
                    ${chip.highlight
                      ? "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/8"
                      : "border-border text-muted-foreground bg-muted/40"}
                  `}
                >
                  {chip.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
```

### Arquivo a modificar
**`app/page.tsx`** — substituir seção de Stack existente por `<StackSection />`.

### Critério de done
- [ ] 5 grupos de chips com contexto de uso
- [ ] Chips das stack primárias (Fastify, Next, Docker) em amber
- [ ] Grid responsivo 1→2→3 colunas

---

## MILESTONE 7 — Engineering Notes Cards
**Estimativa:** 35 min | **Tipo:** automático | **Arquivos novos:** 2

### Objetivo
Transformar "Engineering Notes" de seção genérica em cards de artigos com data, categoria, título e resumo. O diferencial de quem pensa em público.

### Arquivo a criar

**`lib/notes.ts`** — dados das notas (substituir por MDX/CMS futuramente)
```ts
export interface Note {
  slug: string
  date: string
  category: string
  title: string
  summary: string
  href?: string
}

export const notes: Note[] = [
  {
    slug: "strapi-para-saas",
    date: "2025-03",
    category: "arquitetura",
    title: "Por que abandonei o Strapi e construí minha própria stack",
    summary: "Multi-tenancy com RLS, feature flags e a decisão que transformou um sistema headless num SaaS real. O que o Strapi não consegue fazer quando você escala para 200 filiais.",
    href: "#",
  },
  {
    slug: "agents-tarefas-atomicas",
    date: "2025-02",
    category: "ia + engenharia",
    title: "AGENTS.md e tarefas atômicas — IA como ferramenta, não atalho",
    summary: "Como estruturo contexto (knowledge base versionada, PRD, AGENTS.md) para que o agente produza arquitetura consistente em vez de código aleatório.",
    href: "#",
  },
  {
    slug: "clean-arch-fastify",
    date: "2025-01",
    category: "clean architecture",
    title: "Transport → Application → Domain → Infra na prática",
    summary: "Separação real de camadas num projeto Fastify com exemplos concretos do Diocese SaaS. O que muda no dia a dia quando você respeita as fronteiras.",
    href: "#",
  },
]
```

**`components/sections/NotesSection.tsx`**
```tsx
"use client"
import { motion } from "framer-motion"
import { notes } from "@/lib/notes"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const card = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export function NotesSection() {
  return (
    <section id="notas" className="py-16">
      <div className="mb-2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          // notas de engenharia — thinking in public
        </span>
      </div>
      <h2 className="text-2xl font-medium mb-8">Notas de Engenharia</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {notes.map((note) => (
          <motion.a
            key={note.slug}
            href={note.href ?? "#"}
            variants={card}
            whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 20 } }}
            className="rounded-xl border border-border bg-card p-5 no-underline group block"
          >
            <div className="font-mono text-xs text-muted-foreground mb-2">
              {note.date} · {note.category}
            </div>
            <h3 className="font-medium text-sm text-foreground leading-snug mb-2 group-hover:text-amber-500 transition-colors">
              {note.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {note.summary}
            </p>
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
```

### Arquivo a modificar
**`app/page.tsx`** — substituir seção "Engineering Notes" existente por `<NotesSection />`.

### Critério de done
- [ ] 3 cards de notas com data, categoria, título e resumo
- [ ] Hover com lift suave (-3px spring)
- [ ] Título muda para amber no hover

---

## MILESTONE 8 — Command Palette (cmdk)
**Estimativa:** 45 min | **Tipo:** automático | **Arquivos novos:** 2

### Objetivo
Adicionar command palette acessível via `Cmd+K` / `Ctrl+K`. Transforma o portfólio em produto interativo — a cereja que impressiona recrutadores técnicos.

### Arquivo a criar

**`components/CommandPalette.tsx`**
```tsx
"use client"
import { useState, useEffect } from "react"
import { Command } from "cmdk"

const commands = [
  { group: "Navegação", items: [
    { label: "Ir para Projetos",    action: () => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Ir para Stack",       action: () => document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Ir para Notas",       action: () => document.getElementById("notas")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Ir para Arquitetura", action: () => document.getElementById("arquitetura")?.scrollIntoView({ behavior: "smooth" }) },
  ]},
  { group: "Links", items: [
    { label: "Abrir GitHub",    action: () => window.open("https://github.com/luisoneves", "_blank") },
    { label: "Ver Diocese SaaS", action: () => window.open("https://github.com/luisoneves", "_blank") },
    { label: "Ver Gestão Capelas", action: () => window.open("https://gestao-capelas.vercel.app", "_blank") },
    { label: "Enviar email",    action: () => window.open("mailto:contato@luisneves.dev.br") },
    { label: "LinkedIn",        action: () => window.open("https://linkedin.com/in/luisneves-dev", "_blank") },
  ]},
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <span className="text-muted-foreground text-sm">⌘</span>
            <Command.Input
              placeholder="Buscar projetos, links..."
              value={search}
              onValueChange={setSearch}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <kbd className="font-mono text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">ESC</kbd>
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="text-center text-sm text-muted-foreground py-8">
              Nenhum resultado.
            </Command.Empty>
            {commands.map((group) => (
              <Command.Group
                key={group.group}
                heading={group.group}
                className="[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
              >
                {group.items.map((cmd) => (
                  <Command.Item
                    key={cmd.label}
                    onSelect={() => { cmd.action(); setOpen(false) }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground
                      cursor-pointer aria-selected:bg-amber-500/10 aria-selected:text-amber-600
                      dark:aria-selected:text-amber-400 transition-colors"
                  >
                    {cmd.label}
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
```

**`components/CommandPaletteHint.tsx`** — hint discreto na navbar
```tsx
"use client"

export function CommandPaletteHint() {
  return (
    <button
      onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true, bubbles: true }))}
      className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground
        border border-border rounded-md px-2.5 py-1 hover:border-border/80 transition-colors"
    >
      <kbd className="font-mono">⌘K</kbd>
    </button>
  )
}
```

### Arquivos a modificar
1. **`app/layout.tsx`** — adicionar `<CommandPalette />` dentro do body (fora dos providers de layout)
2. **`components/Navbar.tsx`** (ou equivalente) — adicionar `<CommandPaletteHint />` no canto direito da navbar

### Critério de done
- [ ] `Cmd+K` / `Ctrl+K` abre a palette
- [ ] `ESC` fecha
- [ ] Navegação por seções funcionando via scroll
- [ ] Links externos abrindo em nova aba
- [ ] Hint `⌘K` visível na navbar em desktop

---

## MILESTONE 9 — Currículo Interativo (/curriculo)
**Estimativa:** 60 min | **Tipo:** semi-automático | **Arquivos novos:** 3

### Objetivo
Criar uma rota `/curriculo` com o currículo novo atualizado, renderizado como componente interativo com botão de download PDF. Sincronizar com o currículo do PDF enviado (versão nova superior).

### Notas para execução
- O conteúdo base está no arquivo `Luis_Otavio_Curriculo_Print.pdf` — usar os dados de lá
- A seção "USO DE IA NO DESENVOLVIMENTO" e a trilha de projetos v1→v3 são os diferenciais — garantir que apareçam
- O componente deve ser estático para SEO (Server Component), apenas o botão de download é client

### Arquivo a criar

**`app/curriculo/page.tsx`** — estrutura base:
```tsx
// Server Component
import { ResumeDownloadButton } from "@/components/resume/ResumeDownloadButton"

export const metadata = {
  title: "Currículo — Luis Otavio Neves Faustino",
  description: "Desenvolvedor Fullstack · Engineering Lead · Software Architect",
}

export default function CurriculoPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-2xl font-medium text-foreground">Luis Otavio Neves Faustino</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Desenvolvedor Fullstack · Product Engineer · Arquitetura de Sistemas
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-0.5">
            Cachoeira Paulista, SP · contato@luisneves.dev.br · (12) 99248-6884
          </p>
        </div>
        <ResumeDownloadButton />
      </div>

      {/* Seções do currículo com todo o conteúdo do PDF novo */}
      {/* Agente: popular com os dados completos do Luis_Otavio_Curriculo_Print.pdf */}
      {/* Incluir obrigatoriamente: Sobre, Competências, Experiência, Projetos (com trilha v1→v3), Uso de IA, Formação */}
    </main>
  )
}
```

**`components/resume/ResumeDownloadButton.tsx`**
```tsx
"use client"
export function ResumeDownloadButton() {
  return (
    <a
      href="/curriculo.pdf"
      download="Luis_Otavio_Neves_Faustino_Curriculo.pdf"
      className="btn-secondary text-sm"
    >
      download PDF ↓
    </a>
  )
}
```

### Arquivo a modificar
**Navbar** — adicionar link `/curriculo` na navegação.

### Critério de done
- [ ] Rota `/curriculo` acessível
- [ ] Conteúdo completo do currículo novo renderizado
- [ ] Botão de download funcional
- [ ] Link na navbar

---

## MILESTONE 10 — Ajustes finais de polish
**Estimativa:** 20 min | **Tipo:** automático | **Arquivos modificados:** 2–3

### Objetivo
Pequenos detalhes que separam "bom" de "produto de verdade".

### Checklist de ajustes

**`app/globals.css`** — adicionar:
```css
/* Seleção de texto em amber */
::selection {
  background-color: rgb(245 158 11 / 0.25);
  color: inherit;
}

/* Scrollbar sutil */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted-foreground)); }

/* Focus ring em amber para acessibilidade */
*:focus-visible {
  outline: 2px solid rgb(245 158 11 / 0.6);
  outline-offset: 2px;
}
```

**`app/layout.tsx`** — adicionar meta tags:
```tsx
export const metadata = {
  title: "Luis Neves — Engineering Lead · Software Architect",
  description: "Fullstack com arquitetura-primeiro. 15+ anos de TI. Diocese SaaS, multi-tenancy, monorepo. FATEC ADS.",
  openGraph: {
    title: "Luis Neves — Engineering Lead",
    description: "Não escrevo features. Estruturo sistemas.",
    url: "https://dev-luisneves.me",
  },
}
```

**`public/robots.txt`** — criar se não existir:
```
User-agent: *
Allow: /
Sitemap: https://dev-luisneves.me/sitemap.xml
```

### Critério de done
- [ ] Seleção de texto em amber
- [ ] Scrollbar sutil visível
- [ ] Meta tags OG corretas (verificar com og:image via opengraph.xyz)
- [ ] `npm run build` sem warnings de TypeScript

---

## ORDEM DE EXECUÇÃO RECOMENDADA

```
M0 → M1 → M2 → M3 → M6 → M5 → M4 → M7 → M8 → M9 → M10
```

> M0–M3: impacto visual imediato (hero + projetos)  
> M4–M7: profundidade técnica (arquitetura + stack + notas)  
> M8–M10: polish de produto (command palette + currículo + detalhes)

---

## NOTAS PARA O AGENTE

1. **Antes de criar qualquer arquivo:** ler os existentes na mesma pasta para entender o padrão de imports, aliases (`@/`), e convenções do projeto.
2. **Sobre o Tailwind:** o projeto usa Tailwind com classes utilitárias. Se houver classes customizadas (ex: `btn-primary`, `btn-secondary`), verificar se existem em `globals.css` antes de usar — se não existirem, criar junto com o componente.
3. **Sobre Server vs Client Components:** todos os componentes com `useState`, `useEffect`, `useRef`, `motion.*` ou event handlers precisam de `"use client"` no topo. Componentes puramente de renderização de dados podem ser Server Components.
4. **Conflito de animações:** se o projeto já tiver animações CSS em alguma seção, remover antes de adicionar Framer Motion para evitar conflito.
5. **O arquivo `app/page.tsx` será o mais modificado** — fazer backup antes de começar os milestones de seção.

---

*Documento gerado para execução por agente de IA. Cada milestone é autônomo e pode ser executado independentemente.*  
*Luis Otavio Neves Faustino · dev-luisneves.me · março 2025*
