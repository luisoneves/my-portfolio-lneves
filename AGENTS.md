# AGENTS.md
> Lido automaticamente por Cursor, Copilot, Windsurf, Claude Code e similares.
> Contém apenas o não-inferível — convenções específicas deste projeto.
> Contexto completo em .ai/ (privado, não sobe pro git).

---

## Projeto

Portfolio pessoal — dev-luisneves.me
Next.js 16 App Router · TypeScript Strict · Tailwind 4 · Framer Motion

---

## Comandos

```bash
npm run dev      # desenvolvimento local
npm run build    # build produção — rodar após TODA mudança
npm run lint     # lint
```

> `npm run build` é obrigatório antes de qualquer commit.
> Build quebrado não vai para a main.

---

## Convenções

- `"use client"` explícito em todo componente com hooks, eventos ou animações
- Imports com alias `@/` (nunca caminhos relativos `../../`)
- Dados em `lib/*.ts` tipados — nunca hardcoded dentro de componentes
- Componentes em `PascalCase`, arquivos em `PascalCase.tsx`
- Commits: `feat:` | `fix:` | `chore:` | `docs:` | `refactor:`
- Nunca trabalhar direto na `main` — criar branch descritiva

---

## Estrutura relevante

```
app/
  layout.tsx        ← providers globais + meta tags (crítico)
  page.tsx          ← composição das seções da home
  globals.css       ← design tokens + @layer base/components
  sitemap.ts        ← sitemap automático
  curriculo/        ← rota /curriculo

components/
  providers/        ← ThemeProvider, PageTransition, SmoothScrollProvider, ClarityProvider
  hero/             ← AnimatedHeading, TypingCycle
  projects/         ← EvolutionTimeline, ProjectCard (tilt 3D)
  sections/         ← todas as seções da home
  CommandPalette    ← ⌘K palette
  ThemeToggle       ← dark/light toggle
  LangToggle        ← i18n placeholder (comentado — não descomentar sem next-intl)

lib/
  notes.ts          ← dados estáticos (padrão para todos os dados)

public/
  og-image.png      ← 1200×630px
  favicon/          ← assets de favicon
```

---

## Regras

```
✗ Não instalar pacotes sem aprovação explícita
✗ Não modificar .ai/ (contexto pessoal do dev)
✗ Não descomentar LangToggle sem next-intl instalado
✗ Não hardcodar dados em componentes — usar lib/
✗ Não commitar com build quebrado
✗ Não fazer merge na main sem PR revisado
```

---

## Decisões já tomadas (não reverter sem ADR)

- Stack: Next.js 16 + Framer Motion (não GSAP, não Astro)
- Dados: estáticos em lib/ (não banco, não Strapi)
- Deploy: Vercel (não Netlify — Netlify é do WaaS)
- Dark mode: next-themes com defaultTheme="system"
- i18n: backlog — estrutura comentada, aguarda next-intl

> ADRs completos em .ai/context/decisions.md
```

---

**Onde estamos e próximos passos:**

```
✅ Refactor M0–M10 completo
✅ Audit SEO/a11y/darkmode executado
✅ FIX 1–7 do audit (dark mode, a11y, canonical, favicon, logo)
✅ Analytics: Search Console + Clarity + OG image
✅ Branch: audit/seo-a11y-darkmode pronta
