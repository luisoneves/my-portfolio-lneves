# PHASE2_MILESTONES.md
> Portfolio dev-luisneves.me — Fase 2: Tema, i18n, A11Y e Analytics
> Branch: `feature/i18n-a11y-analytics`
> Stack: Next.js 15 App Router · TypeScript Strict · Tailwind CSS · next-themes · next-intl
> Autor: Luis Otavio Neves Faustino | Gerado: março 2026

---

## COMANDOS PARA CRIAR A BRANCH

```bash
# Na main, ja com o merge anterior feito:
git checkout main
git pull origin main

# Criar a branch desta fase
git checkout -b feature/i18n-a11y-analytics
```

## CONTEXTO

M0–M10 e Audit FIX 1–7 estão completos na main.
Esta fase cobre 4 frentes independentes que podem ser executadas em paralelo:

| Frente | Milestones | Estimativa |
|--------|-----------|-----------|
| Tema (dark/light fix) | P1 | 20 min |
| i18n PT-BR / EN-US | P2–P4 | 90 min |
| Acessibilidade | P5–P6 | 45 min |
| Analytics | P7–P9 | 45 min |
| Dados (lib/data) | P10 | 30 min |

**Ordem de execução recomendada:**
```
P1 → P2 → P3 → P4 → P5 → P6 → P7 → P8 → P9 → P10
```

---

---

## MILESTONE P1 — Fix: dark/light toggle ignorando preferência do usuário
**Estimativa:** 20 min | **Arquivos modificados:** 2

### Problema
O `className="dark"` hardcoded foi removido no FIX 1, mas o ThemeProvider pode estar com `defaultTheme="dark"` ou sem `enableSystem: true`, o que faz o sistema ignorar o toggle e fixar o tema.

### Diagnóstico — verificar antes de alterar

Abrir `components/providers/ThemeProvider.tsx`. Verificar se está assim (ERRADO):
```tsx
// ERRADO — defaultTheme fixo, sem enableSystem
<NextThemesProvider attribute="class" defaultTheme="dark">
```

Deve estar assim (CORRETO):
```tsx
// CORRETO — respeita sistema E permite override pelo toggle
<NextThemesProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
```

### Arquivos a modificar

**`components/providers/ThemeProvider.tsx`** — corrigir props:
```tsx
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
```

**`components/ThemeToggle.tsx`** — garantir que o toggle lê e escreve o tema corretamente:
```tsx
"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evita hydration mismatch — renderiza apenas no cliente
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" /> // placeholder do mesmo tamanho

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-md
        border border-border hover:bg-muted transition-colors"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Modo claro" : "Modo escuro"}
    >
      {/* Ícone sol (light mode) */}
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        /* Ícone lua (dark mode) */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}
```

### Critério de done
- [ ] Clicar no toggle muda o tema visualmente em tempo real
- [ ] Tema persiste ao recarregar a página (localStorage via next-themes)
- [ ] Se preferência do sistema for dark, abre em dark; se light, abre em light
- [ ] Sem flash de tema errado no carregamento (hydration ok)

---

## MILESTONE P2 — i18n: Setup base (next-intl)
**Estimativa:** 25 min | **Arquivos novos:** 6 | **Arquivos modificados:** 3

**Checkpoint git (obrigatorio, antes do P2):**
```bash
# Depois de instalar next-intl, mas antes de mover app/page.tsx para [locale]
git add . && git commit -m "checkpoint: next-intl instalado, antes de mover rotas"
```

### Decisão de arquitetura
Usar `next-intl` com App Router (middleware + `[locale]` route group).
Locales suportados: `pt` (padrão) e `en`.
Estratégia: URLs com prefixo de locale (`/en/`, `/pt/`) — padrão de mercado, melhor para SEO.

### Instalação
```bash
npm install next-intl
```

### Arquivos a criar

**`messages/pt.json`** — conteúdo em português (todas as strings do site):
```json
{
  "nav": {
    "projects": "projetos",
    "architecture": "arquitetura",
    "stack": "stack",
    "notes": "notas",
    "resume": "currículo",
    "contact": "contato"
  },
  "hero": {
    "badge": "Engineering Lead · Software Architect · FATEC ADS",
    "available": "disponível",
    "title1": "Não escrevo features.",
    "phrases": ["Estruturo sistemas.", "Dirijo a IA.", "Entrego produção.", "Penso em arquitetura."],
    "description": "15+ anos de TI e infraestrutura. Fullstack moderno com arquitetura-primeiro.",
    "highlight": "Quem entende o sistema dirige a IA.",
    "subtitle": "Quem só sabe sintaxe concorre com ela.",
    "stats": {
      "yearsLabel": "anos em TI",
      "projectsLabel": "projetos em produção",
      "iterationsLabel": "iterações / sistema",
      "readingLabel": "lendo agora"
    },
    "cta": {
      "projects": "ver projetos ↓",
      "github": "github ↗",
      "contact": "contato ↗"
    }
  },
  "manifesto": {
    "quote": "Não serei o dev que pega a maior feature. Serei quem garante que as features de todos funcionam juntas — dentro do padrão, com qualidade, prontas para produção.",
    "author": "Plano de Contribuição · março 2025"
  },
  "projects": {
    "sectionLabel": "// trilha de projetos — problema → solução → refatoração",
    "title": "Projetos",
    "timeline": {
      "v1": "mockup front-only",
      "v2": "headless Strapi CMS",
      "v3": "Diocese SaaS",
      "v3current": "← agora",
      "v4": "WaaS em dev"
    },
    "status": {
      "production": "produção",
      "inDev": "em dev",
      "beta": "beta",
      "done": "concluído"
    },
    "diocese": {
      "title": "Diocese SaaS Platform",
      "description": "Monorepo Turborepo. RBAC Diocese→Chapel→Editor. Multi-tenancy com RLS e Feature Flags por tenant. Stack própria sem dependência de CMS externo."
    },
    "capelas": {
      "title": "Gestão de Capelas",
      "description": "1 admin + 200 filiais com layouts editáveis. Arquitetura headless Strapi. O limite ao escalar motivou a refatoração completa para stack própria."
    },
    "waas": {
      "title": "Website as a Service",
      "description": "1 deploy + N clientes. Engine config-driven com Registry Pattern, renderer dinâmico e theme engine via CSS variables. Multi-tenant por host."
    },
    "market": {
      "title": "C4ts Market Research",
      "description": "Plataforma para captação de clientes freela e posicionamento local. Forms e blob para receber pedidos de orçamento."
    }
  },
  "architecture": {
    "sectionLabel": "// arquitetura — decisões que permitem trocar tecnologia sem reescrever o sistema",
    "title": "Arquitetura",
    "monorepoTitle": "estrutura monorepo",
    "layersTitle": "camadas (clean architecture)",
    "layers": {
      "transport": "HTTP / WebSocket",
      "application": "use cases",
      "domain": "entities / rules",
      "infrastructure": "Prisma / Redis"
    }
  },
  "cicd": {
    "sectionLabel": "// pipeline ci/cd — \"funciona na minha máquina\" não é critério de done",
    "steps": {
      "pr": "git push",
      "lint": "ESLint · TS",
      "test": "Vitest",
      "build": "Turbo cache",
      "deploy": "Vercel · Railway"
    }
  },
  "stack": {
    "sectionLabel": "// stack em contexto — não uma lista, uma decisão",
    "title": "Stack",
    "groups": {
      "frontend": "frontend",
      "backend": "backend & dados",
      "infra": "infra & devops",
      "architecture": "arquitetura & padrões",
      "ai": "engenharia de ia"
    }
  },
  "notes": {
    "sectionLabel": "// notas de engenharia — thinking in public",
    "title": "Notas de Engenharia",
    "note1": {
      "date": "2025-03",
      "category": "arquitetura",
      "title": "Por que abandonei o Strapi e construí minha própria stack",
      "summary": "Multi-tenancy com RLS, feature flags e a decisão que transformou um sistema headless num SaaS real. O que o Strapi não consegue fazer quando você escala para 200 filiais."
    },
    "note2": {
      "date": "2025-02",
      "category": "ia + engenharia",
      "title": "AGENTS.md e tarefas atômicas — IA como ferramenta, não atalho",
      "summary": "Como estruturo contexto (knowledge base versionada, PRD, AGENTS.md) para que o agente produza arquitetura consistente em vez de código aleatório."
    },
    "note3": {
      "date": "2025-01",
      "category": "clean architecture",
      "title": "Transport → Application → Domain → Infra na prática",
      "summary": "Separação real de camadas num projeto Fastify com exemplos concretos do Diocese SaaS. O que muda no dia a dia quando você respeita as fronteiras."
    }
  },
  "footer": {
    "available": "disponível",
    "contact": "entrar em contato ↗",
    "emailCopied": "email copiado!"
  },
  "resume": {
    "title": "Currículo",
    "download": "download PDF ↓",
    "role": "Desenvolvedor Fullstack · Product Engineer · Arquitetura de Sistemas",
    "about": "Sobre mim",
    "skills": "Competências técnicas",
    "experience": "Experiência",
    "projects": "Projetos em destaque",
    "aiUsage": "Uso de IA no desenvolvimento",
    "education": "Formação",
    "languages": "Idiomas"
  },
  "a11y": {
    "highContrastToggle": "Alto contraste",
    "themeToggleDark": "Ativar modo escuro",
    "themeToggleLight": "Ativar modo claro",
    "langToggle": "Mudar idioma",
    "openMenu": "Abrir menu",
    "closeMenu": "Fechar menu",
    "commandPalette": "Abrir paleta de comandos",
    "externalLink": "Abre em nova aba"
  }
}
```

**`messages/en.json`** — conteúdo em inglês:
```json
{
  "nav": {
    "projects": "projects",
    "architecture": "architecture",
    "stack": "stack",
    "notes": "notes",
    "resume": "resume",
    "contact": "contact"
  },
  "hero": {
    "badge": "Engineering Lead · Software Architect · FATEC ADS",
    "available": "available",
    "title1": "I don't write features.",
    "phrases": ["I architect systems.", "I drive the AI.", "I ship to production.", "I think in architecture."],
    "description": "15+ years in IT and infrastructure. Modern fullstack with architecture-first approach.",
    "highlight": "Those who understand the system drive the AI.",
    "subtitle": "Those who only know syntax compete with it.",
    "stats": {
      "yearsLabel": "years in IT",
      "projectsLabel": "projects in production",
      "iterationsLabel": "iterations / system",
      "readingLabel": "currently reading"
    },
    "cta": {
      "projects": "view projects ↓",
      "github": "github ↗",
      "contact": "contact ↗"
    }
  },
  "manifesto": {
    "quote": "I won't be the dev who grabs the biggest feature. I'll be the one who ensures everyone's features work together — on standard, with quality, production-ready.",
    "author": "Contribution Plan · March 2025"
  },
  "projects": {
    "sectionLabel": "// project trail — problem → solution → refactoring",
    "title": "Projects",
    "timeline": {
      "v1": "frontend mockup only",
      "v2": "headless Strapi CMS",
      "v3": "Diocese SaaS",
      "v3current": "← now",
      "v4": "WaaS in dev"
    },
    "status": {
      "production": "production",
      "inDev": "in dev",
      "beta": "beta",
      "done": "done"
    },
    "diocese": {
      "title": "Diocese SaaS Platform",
      "description": "Turborepo monorepo. RBAC Diocese→Chapel→Editor. Multi-tenancy with RLS and per-tenant Feature Flags. Own stack without external CMS dependency."
    },
    "capelas": {
      "title": "Chapel Management",
      "description": "1 admin + 200 branches with editable layouts. Headless Strapi architecture. Scaling limits motivated a complete refactor to own stack."
    },
    "waas": {
      "title": "Website as a Service",
      "description": "1 deploy + N clients. Config-driven engine with Registry Pattern, dynamic renderer and theme engine via CSS variables. Multi-tenant by host."
    },
    "market": {
      "title": "C4ts Market Research",
      "description": "Platform for freelance client acquisition and local positioning. Forms and blob for quote requests and product briefs."
    }
  },
  "architecture": {
    "sectionLabel": "// architecture — decisions that allow swapping technology without rewriting the system",
    "title": "Architecture",
    "monorepoTitle": "monorepo structure",
    "layersTitle": "layers (clean architecture)",
    "layers": {
      "transport": "HTTP / WebSocket",
      "application": "use cases",
      "domain": "entities / rules",
      "infrastructure": "Prisma / Redis"
    }
  },
  "cicd": {
    "sectionLabel": "// ci/cd pipeline — \"works on my machine\" is not a done criterion",
    "steps": {
      "pr": "git push",
      "lint": "ESLint · TS",
      "test": "Vitest",
      "build": "Turbo cache",
      "deploy": "Vercel · Railway"
    }
  },
  "stack": {
    "sectionLabel": "// stack in context — not a list, a decision",
    "title": "Stack",
    "groups": {
      "frontend": "frontend",
      "backend": "backend & data",
      "infra": "infra & devops",
      "architecture": "architecture & patterns",
      "ai": "ai engineering"
    }
  },
  "notes": {
    "sectionLabel": "// engineering notes — thinking in public",
    "title": "Engineering Notes",
    "note1": {
      "date": "2025-03",
      "category": "architecture",
      "title": "Why I abandoned Strapi and built my own stack",
      "summary": "Multi-tenancy with RLS, feature flags and the decision that transformed a headless system into a real SaaS. What Strapi can't do when you scale to 200 branches."
    },
    "note2": {
      "date": "2025-02",
      "category": "ai + engineering",
      "title": "AGENTS.md and atomic tasks — AI as a tool, not a shortcut",
      "summary": "How I structure context (versioned knowledge base, PRD, AGENTS.md) so the agent produces consistent architecture instead of random code."
    },
    "note3": {
      "date": "2025-01",
      "category": "clean architecture",
      "title": "Transport → Application → Domain → Infra in practice",
      "summary": "Real layer separation in a Fastify project with concrete examples from Diocese SaaS. What changes day-to-day when you respect boundaries."
    }
  },
  "footer": {
    "available": "available",
    "contact": "get in touch ↗",
    "emailCopied": "email copied!"
  },
  "resume": {
    "title": "Resume",
    "download": "download PDF ↓",
    "role": "Fullstack Developer · Product Engineer · Systems Architecture",
    "about": "About me",
    "skills": "Technical skills",
    "experience": "Experience",
    "projects": "Featured projects",
    "aiUsage": "AI usage in development",
    "education": "Education",
    "languages": "Languages"
  },
  "a11y": {
    "highContrastToggle": "High contrast",
    "themeToggleDark": "Enable dark mode",
    "themeToggleLight": "Enable light mode",
    "langToggle": "Change language",
    "openMenu": "Open menu",
    "closeMenu": "Close menu",
    "commandPalette": "Open command palette",
    "externalLink": "Opens in new tab"
  }
}
```

**`i18n/routing.ts`**
```ts
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "always",
})
```

**`i18n/request.ts`**
```ts
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as "pt" | "en")) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

**`middleware.ts`** — criar na raiz do projeto (ao lado de package.json):
```ts
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Rotas sem underscore ou dot
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
}
```

### Arquivos a modificar

**`next.config.ts`** — adicionar next-intl plugin:
```ts
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const nextConfig: NextConfig = {
  // suas configurações existentes aqui
}

export default withNextIntl(nextConfig)
```

### Estrutura de rotas — IMPORTANTE
Após instalar next-intl com `localePrefix: "always"`, o App Router precisa de um route group `[locale]`.

**Mover as rotas para dentro de `app/[locale]/`:**
```
app/
├── [locale]/
│   ├── layout.tsx    ← mover o layout atual para cá (com ajustes)
│   ├── page.tsx      ← mover app/page.tsx para cá
│   └── curriculo/
│       └── page.tsx  ← mover app/curriculo/page.tsx para cá
├── globals.css       ← permanece na raiz
└── favicon.ico       ← permanece na raiz
```

**`app/[locale]/layout.tsx`** — layout adaptado:
```tsx
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
// ... seus outros imports (ThemeProvider, providers, etc.)

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Valida locale
  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {/* seus outros providers */}
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

### Critério de done
- [ ] `pnpm build` sem erros após instalar next-intl e mover rotas
- [ ] `/pt` redireciona para home em português
- [ ] `/en` redireciona para home em inglês
- [ ] Sem 404 em nenhuma rota existente

---

## MILESTONE P3 — i18n: Conectar strings nos componentes
**Estimativa:** 35 min | **Arquivos modificados:** 8–10

### Objetivo
Substituir strings hardcoded nos componentes por chamadas `useTranslations()`.

### Padrão de uso — aplicar em TODOS os componentes afetados:
```tsx
"use client" // ou Server Component, ambos funcionam
import { useTranslations } from "next-intl" // Client Component
// OU
import { getTranslations } from "next-intl/server" // Server Component

// Client Component:
export function HeroSection() {
  const t = useTranslations("hero")
  return (
    <h1>{t("title1")}</h1>  // "Não escrevo features." / "I don't write features."
  )
}

// Server Component:
export default async function Page() {
  const t = await getTranslations("projects")
  return <h2>{t("title")}</h2>
}
```

### Componentes a atualizar (em ordem de prioridade):

1. **`components/Navbar.tsx`** — `t("nav.projects")`, `t("nav.resume")` etc.
2. **`components/hero/TypingCycle.tsx`** — frases do array via `t.raw("hero.phrases")` (retorna array)
3. **`components/hero/HeroSection.tsx`** (ou `app/[locale]/page.tsx`) — badge, título, parágrafo, CTAs
4. **`components/sections/ManifestoBlock.tsx`** — quote e autor
5. **`components/sections/ProjectsSection.tsx`** — label, título, status, descrições
6. **`components/projects/EvolutionTimeline.tsx`** — labels v1–v4
7. **`components/sections/ArchitectureSection.tsx`** — labels e títulos
8. **`components/sections/CICDSection.tsx`** — label e steps
9. **`components/sections/StackSection.tsx`** — label, título, grupos
10. **`components/sections/NotesSection.tsx`** — label, título, cards
11. **`components/CommandPalette.tsx`** — labels dos itens de navegação
12. **`app/[locale]/curriculo/page.tsx`** — títulos e rótulos

### Critério de done
- [ ] Mudar URL de `/pt` para `/en` troca todas as strings do site
- [ ] Sem strings hardcoded visíveis nos componentes listados

---

## MILESTONE P4 — i18n: LangToggle funcional na Navbar
**Estimativa:** 20 min | **Arquivos novos:** 1 | **Arquivos modificados:** 1

### Objetivo
Implementar o toggle PT-BR 🇧🇷 / EN 🇺🇸 já previsto no `LangToggle.tsx` (que estava comentado no FIX 2).

### Arquivo a criar/substituir

**`components/LangToggle.tsx`** — substituir o placeholder existente:
```tsx
"use client"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { useTransition } from "react"

export function LangToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchLocale() {
    const nextLocale = locale === "pt" ? "en" : "pt"
    // Segmenta o pathname e substitui apenas o índice 1 (locale prefix)
    // pathname.replace() quebraria em URLs onde o locale aparece em outro segmento
    // ex: /pt/artigo-sobre-pt → replace errado, segments → sempre correto
    const segments = pathname.split("/")
    segments[1] = nextLocale
    const newPath = segments.join("/") || "/"
    startTransition(() => {
      router.push(newPath)
    })
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="flex items-center gap-1.5 text-xs font-mono
        px-2.5 py-1.5 rounded-md border border-border
        hover:bg-muted transition-colors disabled:opacity-50"
      aria-label={locale === "pt" ? "Switch to English" : "Mudar para Português"}
      title={locale === "pt" ? "Switch to English" : "Mudar para Português"}
    >
      {/* Bandeira + código */}
      <span className="text-sm leading-none" aria-hidden="true">
        {locale === "pt" ? "🇧🇷" : "🇺🇸"}
      </span>
      <span className="hidden sm:inline text-muted-foreground">
        {locale === "pt" ? "PT" : "EN"}
      </span>
    </button>
  )
}
```

### Arquivo a modificar

**`components/Navbar.tsx`** — descomentar/adicionar `<LangToggle />` ao lado do `<ThemeToggle />`:
```tsx
import { LangToggle } from "@/components/LangToggle"
import { ThemeToggle } from "@/components/ThemeToggle"

// Na navbar, ao lado direito:
<div className="flex items-center gap-2">
  <LangToggle />
  <ThemeToggle />
  {/* CommandPaletteHint já existente */}
</div>
```

### Critério de done
- [ ] Toggle PT/EN visível na navbar ao lado do toggle de tema
- [ ] Clicar muda o idioma de toda a página instantaneamente
- [ ] URL muda de `/pt/...` para `/en/...` (e vice-versa)
- [ ] Sem reload de página — transição suave via router.push
- [ ] Bandeira correta exibida para cada idioma

---

## MILESTONE P5 — Acessibilidade: Alto contraste
**Estimativa:** 25 min | **Arquivos novos:** 2 | **Arquivos modificados:** 2

### Objetivo
Adicionar modo de alto contraste acessível via toggle na navbar. Segue WCAG 2.1 AA — razão de contraste mínima de 4.5:1 para texto normal, 3:1 para texto grande.

### Estratégia
Usar `data-high-contrast` no `<html>` + overrides CSS via `:root[data-high-contrast]`.

### Arquivo a criar

**`components/HighContrastToggle.tsx`**
```tsx
"use client"
import { useEffect, useState } from "react"

const STORAGE_KEY = "high-contrast"

export function HighContrastToggle() {
  const [active, setActive] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY) === "true"
    setActive(stored)
    if (stored) document.documentElement.setAttribute("data-high-contrast", "true")
  }, [])

  function toggle() {
    const next = !active
    setActive(next)
    if (next) {
      document.documentElement.setAttribute("data-high-contrast", "true")
      localStorage.setItem(STORAGE_KEY, "true")
    } else {
      document.documentElement.removeAttribute("data-high-contrast")
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={toggle}
      className={`w-9 h-9 flex items-center justify-center rounded-md border transition-colors
        ${active
          ? "border-foreground bg-foreground text-background"
          : "border-border hover:bg-muted"}
      `}
      aria-label={active ? "Desativar alto contraste" : "Ativar alto contraste"}
      aria-pressed={active}
      title="Alto contraste"
    >
      {/* Ícone de círculo meio cheio */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 3v18" strokeWidth="1.5"/>
        <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" strokeWidth="0"/>
      </svg>
    </button>
  )
}
```

**`styles/high-contrast.css`** — criar e importar em `globals.css`:
```css
/* Alto contraste — overrides quando data-high-contrast="true" */
:root[data-high-contrast] {
  /* Texto */
  --foreground: 0 0% 0%;
  --background: 0 0% 100%;
  --muted-foreground: 0 0% 20%;

  /* Bordas mais visíveis */
  --border: 0 0% 0%;

  /* Amber mais escuro para contraste */
  --amber-primary: 35 100% 30%;
}

:root[data-high-contrast].dark {
  --foreground: 0 0% 100%;
  --background: 0 0% 0%;
  --muted-foreground: 0 0% 80%;
  --border: 0 0% 100%;
  --amber-primary: 45 100% 65%;
}

/* Links sublineados em alto contraste */
:root[data-high-contrast] a:not(.no-underline) {
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Bordas dos cards mais visíveis */
:root[data-high-contrast] .border {
  border-width: 2px;
}

/* Focus ring mais visível */
:root[data-high-contrast] *:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}

/* Chips com contraste garantido */
:root[data-high-contrast] [class*="chip"],
:root[data-high-contrast] [class*="badge"] {
  border-width: 2px;
  font-weight: 600;
}
```

### Arquivos a modificar

**`app/globals.css`** — importar o arquivo de alto contraste:
```css
@import "./high-contrast.css"; /* ou @import "../styles/high-contrast.css" dependendo da localização */
```

**`components/Navbar.tsx`** — adicionar `<HighContrastToggle />`:
```tsx
import { HighContrastToggle } from "@/components/HighContrastToggle"

// Na área de controles da navbar:
<div className="flex items-center gap-2">
  <LangToggle />
  <HighContrastToggle />
  <ThemeToggle />
</div>
```

### Critério de done
- [ ] Toggle de alto contraste visível na navbar
- [ ] Ativar aumenta contraste de texto, bordas e foco visivelmente
- [ ] Estado persiste ao recarregar (localStorage)
- [ ] Funciona em dark mode E light mode
- [ ] `aria-pressed` correto para screen readers

---

## MILESTONE P6 — Acessibilidade: Fixes do audit (FIX A1–A4)
**Estimativa:** 20 min | **Arquivos modificados:** 4

### FIX A1 — Semântica do Hero (h1 único)
O audit apontou dois `<h1>` consecutivos. O segundo deve ser `<p>` ou `<div>`, não `<h1>`.

**`app/[locale]/page.tsx`** ou componente Hero:
```tsx
// ERRADO (dois h1):
<motion.h1>Não escrevo features.</motion.h1>
<motion.h1><TypingCycle /></motion.h1>

// CORRETO (um h1, o segundo vira p com mesma estilização):
<h1 className="text-4xl md:text-5xl font-medium leading-tight mb-2">
  Não escrevo features.
</h1>
<p className="text-4xl md:text-5xl font-medium leading-tight mb-6"
   aria-live="polite" aria-atomic="true">
  <TypingCycle />
</p>
```

> `aria-live="polite"` + `aria-atomic="true"` anuncia as trocas de frase para screen readers.

### FIX A2 — ProjectCard acessível por teclado
O `ProjectCard` usa `motion.div` com `onClick` sem suporte a teclado.

**`components/projects/ProjectCard.tsx`**:
```tsx
// Substituir motion.div externo por motion.article:
<motion.article
  role="article"
  tabIndex={0}
  onKeyDown={(e) => {
    if ((e.key === "Enter" || e.key === " ") && project.href) {
      e.preventDefault()
      window.open(project.href, "_blank")
    }
  }}
  aria-label={`${project.title} — ${project.status}`}
  // ... resto das props
>
```

### FIX A3 — CommandPaletteHint com aria-label
**`components/CommandPaletteHint.tsx`**:
```tsx
<button
  aria-label="Abrir paleta de comandos (Ctrl+K)"
  aria-keyshortcuts="Control+k Meta+k"
  // ... resto
>
```

### FIX A4 — Links externos com aria-label
Em todos os componentes com links externos (`target="_blank"`):
```tsx
// Adicionar rel e aria-label em TODOS os <a target="_blank">:
<a
  href="https://github.com/luisoneves"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub (abre em nova aba)"
>
  github ↗
</a>
```

Criar um componente helper para reusar:
```tsx
// components/ui/ExternalLink.tsx
export function ExternalLink({ href, children, label }: {
  href: string
  children: React.ReactNode
  label?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `${label} (abre em nova aba)` : undefined}
    >
      {children}
    </a>
  )
}
```

### Critério de done
- [ ] Apenas um `<h1>` por página
- [ ] TypingCycle anuncia trocas via `aria-live`
- [ ] ProjectCard ativável por Enter/Space
- [ ] CommandPaletteHint com `aria-label` e `aria-keyshortcuts`
- [ ] Links externos com `rel="noopener noreferrer"`

---

## MILESTONE P7 — Analytics: Sitemap e Search Console
**Estimativa:** 15 min | **Arquivos modificados:** 1

### Verificar sitemap após next-intl
Após adicionar `[locale]`, o sitemap precisa incluir as variantes de idioma.

**`app/sitemap.ts`** — atualizar para incluir ambos os locales:
```ts
import { MetadataRoute } from "next"

const BASE_URL = "https://dev-luisneves.me"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/curriculo"]
  const locales = ["pt", "en"]

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${BASE_URL}/${locale}${route === "/" ? "" : route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${route === "/" ? "" : route}`])
        ),
      },
    }))
  )
}
```

### Google Search Console
1. Acessa: `search.google.com/search-console`
2. Adiciona propriedade: `dev-luisneves.me` → verificação por **meta tag**
3. Pega o código e adiciona em `app/[locale]/layout.tsx`:
```tsx
export const metadata = {
  // ... metadata existente
  verification: {
    google: "SEU_CODIGO_AQUI",
  },
}
```
4. Após verificar → submete: `https://dev-luisneves.me/sitemap.xml`

### Critério de done
- [ ] `/sitemap.xml` acessível com 4 URLs (pt/, en/, pt/curriculo, en/curriculo)
- [ ] Domínio verificado no Search Console
- [ ] Sitemap submetido

---

## MILESTONE P8 — Analytics: Microsoft Clarity
**Estimativa:** 15 min | **Arquivos modificados:** 1

### Verificar ClarityProvider
O `ClarityProvider.tsx` já existe no projeto. Verificar se está funcionando após a migração de rotas.

**`components/providers/ClarityProvider.tsx`** — garantir que está assim:
```tsx
"use client"
import { useEffect } from "react"

export function ClarityProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return
    const s = document.createElement("script")
    s.type = "text/javascript"
    s.async = true
    s.src = `https://www.clarity.ms/tag/SEU_PROJECT_ID`
    document.head.appendChild(s)
  }, [])
  return null
}
```

Adicionar no `app/[locale]/layout.tsx` dentro do `<body>`:
```tsx
import { ClarityProvider } from "@/components/providers/ClarityProvider"
// ...
<body>
  <ClarityProvider />
  {/* resto do layout */}
</body>
```

### Critério de done
- [ ] Script do Clarity sendo carregado (verificar no DevTools → Network → clarity.ms)
- [ ] Sessões aparecendo no painel Clarity em ~1h após deploy

---

## MILESTONE P9 — Analytics: Open Graph image
**Estimativa:** 15 min | **Arquivos modificados:** 1

### Verificar og-image.png existente
O arquivo `public/og-image.png` já existe. Verificar se está correto via `opengraph.xyz`.

**`app/[locale]/layout.tsx`** — metadata OG com canonical DINÂMICO por locale.

> ⚠️ CORREÇÃO CRÍTICA: canonical fixo em `/pt` faz o Google ignorar `/en` para indexação em inglês.
> A solução é usar `generateMetadata` (função assíncrona) em vez de `export const metadata` (objeto estático).
> `export const metadata` não tem acesso ao `locale` da URL — por isso não serve aqui.

```tsx
// REMOVER o export const metadata estático se existir no layout
// SUBSTITUIR por generateMetadata dinâmico:

const BASE_URL = "https://dev-luisneves.me"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEn = locale === "en"

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: "Luis Neves — Engineering Lead · Software Architect",
      template: "%s | Luis Neves",
    },
    description: isEn
      ? "Architecture-first fullstack. 15+ years in IT. Diocese SaaS, multi-tenancy, monorepo. FATEC ADS."
      : "Fullstack com arquitetura-primeiro. 15+ anos de TI. Diocese SaaS, multi-tenancy, monorepo. FATEC ADS.",
    // Canonical aponta para o locale atual — não para pt fixo
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "pt-BR": `${BASE_URL}/pt`,
        "en-US": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: "Luis Neves — Engineering Lead · Software Architect",
      description: isEn
        ? "I don't write features. I architect systems."
        : "Não escrevo features. Estruturo sistemas.",
      url: `${BASE_URL}/${locale}`,
      siteName: "Luis Neves",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Luis Neves — Engineering Lead",
        },
      ],
      locale: isEn ? "en_US" : "pt_BR",
      alternateLocale: isEn ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Luis Neves — Engineering Lead",
      description: isEn
        ? "I don't write features. I architect systems."
        : "Não escrevo features. Estruturo sistemas.",
      images: ["/og-image.png"],
    },
  }
}
```

### Critério de done
- [ ] Preview correto no `opengraph.xyz`
- [ ] Testar compartilhando no WhatsApp/LinkedIn
- [ ] Imagem e título corretos nos dois testes

---

## MILESTONE P10 — Separação de dados (lib/data/)
**Estimativa:** 30 min | **Arquivos novos:** 4 | **Arquivos modificados:** 4

### Objetivo
Mover dados hardcoded dos componentes para `lib/data/` — facilita manutenção, prepara para CMS futuro e elimina duplicação entre PT e EN (os dados estruturais como chips de stack não precisam de tradução).

### Arquivos a criar

**`lib/data/projects.ts`** — dados estruturais dos projetos (versão, chips, URLs):
```ts
export interface ProjectData {
  id: string
  version: string
  status: "production" | "inDev" | "beta" | "done"
  chips: string[]
  href?: string
  highlight?: boolean
}

export const projectsData: ProjectData[] = [
  {
    id: "diocese",
    version: "v3",
    status: "inDev",
    chips: ["Fastify", "Next.js 16", "Prisma", "Turborepo", "RBAC", "Multi-tenancy"],
    href: "https://github.com/luisoneves",
    highlight: true,
  },
  {
    id: "capelas",
    version: "v2",
    status: "production",
    chips: ["Next.js 15", "Strapi v4", "PostgreSQL", "Docker", "RLS"],
    href: "https://gestao-capelas.vercel.app",
  },
  {
    id: "waas",
    version: "WaaS",
    status: "inDev",
    chips: ["Next.js 15", "Tailwind 4", "Zod", "Registry Pattern", "Config-driven"],
    href: "https://github.com/luisoneves",
  },
  {
    id: "market",
    version: "beta",
    status: "beta",
    chips: ["Next.js 16", "TypeScript", "Git Flow"],
    href: "https://c4ts-project-market-research.vercel.app",
  },
]
```

**`lib/data/stack.ts`** — stack groups com chips (sem tradução — nomes de tecnologia são universais):
```ts
export interface StackGroup {
  id: string
  chips: Array<{ name: string; highlight: boolean }>
  wide?: boolean
}

export const stackGroups: StackGroup[] = [
  {
    id: "frontend",
    chips: [
      { name: "Next.js 16", highlight: true },
      { name: "React 19", highlight: true },
      { name: "TypeScript Strict", highlight: false },
      { name: "Tailwind CSS", highlight: false },
      { name: "Shadcn/ui", highlight: false },
      { name: "Framer Motion", highlight: false },
      { name: "Astro", highlight: false },
    ],
  },
  {
    id: "backend",
    chips: [
      { name: "Fastify", highlight: true },
      { name: "Node.js", highlight: true },
      { name: "NestJS", highlight: false },
      { name: "Prisma ORM", highlight: false },
      { name: "PostgreSQL", highlight: false },
      { name: "Redis", highlight: false },
      { name: "Zod", highlight: false },
    ],
  },
  {
    id: "infra",
    chips: [
      { name: "Docker", highlight: true },
      { name: "Turborepo", highlight: true },
      { name: "Git Flow", highlight: false },
      { name: "Vercel", highlight: false },
      { name: "Railway", highlight: false },
      { name: "nvm / Volta", highlight: false },
    ],
  },
  {
    id: "architecture",
    wide: true,
    chips: [
      { name: "Monorepo", highlight: true },
      { name: "Multi-tenancy", highlight: true },
      { name: "Clean Architecture", highlight: true },
      { name: "RBAC", highlight: false },
      { name: "RLS", highlight: false },
      { name: "Feature Flags", highlight: false },
      { name: "Registry Pattern", highlight: false },
      { name: "Config-driven", highlight: false },
      { name: "SOLID", highlight: false },
    ],
  },
  {
    id: "ai",
    chips: [
      { name: "AGENTS.md", highlight: false },
      { name: "knowledge base", highlight: false },
      { name: "Cursor / Windsurf", highlight: false },
      { name: "Ollama", highlight: false },
      { name: "structured prompts", highlight: false },
    ],
  },
]
```

**`lib/data/notes.ts`** — mover de `lib/notes.ts` existente (atualizar imports depois):
```ts
// NOTA: os textos em PT e EN estão nos arquivos messages/pt.json e messages/en.json
// Este arquivo contém apenas os dados estruturais (slug, hrefs futuros)
export interface NoteData {
  slug: string
  href?: string
}

export const notesData: NoteData[] = [
  { slug: "strapi-para-saas", href: "#" },
  { slug: "agents-tarefas-atomicas", href: "#" },
  { slug: "clean-arch-fastify", href: "#" },
]
```

**`lib/data/index.ts`** — barrel export:
```ts
export { projectsData } from "./projects"
export { stackGroups } from "./stack"
export { notesData } from "./notes"
```

### Arquivos a modificar
Atualizar os componentes que tinham dados inline para importar de `lib/data/`:
- `components/sections/ProjectsSection.tsx` → `import { projectsData } from "@/lib/data"`
- `components/sections/StackSection.tsx` → `import { stackGroups } from "@/lib/data"`
- `components/sections/NotesSection.tsx` → `import { notesData } from "@/lib/data"`

### Critério de done
- [ ] Nenhum dado hardcoded em componentes de seção
- [ ] `lib/data/` com 3 arquivos + barrel export
- [ ] `pnpm build` sem erros após refactor

---

## CHECKLIST DE FECHAMENTO DA BRANCH

```bash
# Após todos os milestones:
pnpm build

# Se build OK:
git add .
git commit -m "feat: tema, i18n PT-BR/EN, a11y alto contraste e analytics

- P1: fix ThemeToggle — defaultTheme=system + enableSystem
- P2-P4: next-intl com route [locale], messages pt/en, LangToggle
- P5: HighContrastToggle com data-high-contrast + CSS overrides
- P6: a11y — h1 único, ProjectCard teclado, aria-labels
- P7: sitemap com locales, Search Console
- P8: ClarityProvider verificado
- P9: metadata OG com alternates de locale
- P10: lib/data separação de dados dos componentes"

git push origin feature/i18n-a11y-analytics

git checkout main
git merge feature/i18n-a11y-analytics --no-ff \
  -m "merge: i18n-a11y-analytics → main"

git push origin main
```

---

## NOTAS PARA O AGENTE

1. **P1 DEVE rodar antes de P2** — o ThemeToggle precisa estar funcionando antes de testar a troca de locale (que re-renderiza o layout).

2. **Migração de rotas para `[locale]` é a operação mais arriscada** — fazer backup de `app/page.tsx` e `app/curriculo/page.tsx` antes de mover.

3. **Verificar `pnpm build` após P2** antes de continuar — se a estrutura de rotas estiver errada, os outros milestones vão falhar em cascata.

4. **O `LangToggle.tsx` já existe no projeto** (estava comentado no FIX 2). Substituir o conteúdo, não criar um novo arquivo.

5. **`lib/notes.ts` já existe** — o P10 deve mover/refatorar esse arquivo, não duplicar.

6. **Emojis de bandeira** (🇧🇷 🇺🇸) são renderizados nativamente em todos os browsers modernos. Não substituir por imagens.

7. **Alto contraste não substitui dark/light mode** — são controles independentes. O toggle de alto contraste deve funcionar em ambos os temas.

---

*Luis Otavio Neves Faustino · dev-luisneves.me · feature/i18n-a11y-analytics · março 2026*
