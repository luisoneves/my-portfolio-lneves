# AGENTS.md
> Lido automaticamente por Cursor, Copilot, Windsurf, Claude Code e similares.
> Contém apenas o não-inferível — convenções específicas deste projeto.
> Contexto completo em .ai/ (privado, não sobe pro git).

---

## Projeto

Portfolio pessoal — dev-luisneves.me
Next.js 16 App Router · TypeScript Strict · Tailwind 4 · Framer Motion · next-intl

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
  [locale]/
    layout.tsx      ← providers globais + meta tags (crítico)
    page.tsx        ← Server Component → HomeClient
    blog/           ← blog list + [slug] post
    contato/        ← contact page + form
    curriculo/      ← resume page
  globals.css       ← design tokens + @layer base/components
  sitemap.ts        ← sitemap com blog
  actions/         ← server actions (sendContact)

components/
  providers/        ← ThemeProvider, PageTransition, SmoothScrollProvider, ClarityProvider
  hero/             ← AnimatedHeading, TypingCycle
  projects/         ← EvolutionTimeline, ProjectCard (tilt 3D)
  sections/         ← Manifesto, Projects, Architecture, CICD, Stack, Notes, LatestPosts, ContactCTA
  blog/             ← BlogList, PostCard, PostLayout
  contact/          ← ContactForm
  home/             ← HomeClient
  CommandPalette    ← ⌘K palette
  ThemeToggle       ← dark/light toggle
  LangToggle        ← i18n toggle (ativo)

lib/
  blog.ts           ← blog data fetching (MDX)
  data/             ← projects, stack, notes

i18n/
  routing.ts        ← next-intl routing config
  request.ts        ← next-intl request config

messages/
  pt.json           ← traduções português
  en.json           ← traduções inglês

styles/
  design-tokens.css ← CSS custom properties (tipografia, espaçamento)
```

---

## Regras

```
✗ Não instalar pacotes sem aprovação explícita
✗ Não modificar .ai/ (contexto pessoal do dev)
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
- i18n: next-intl ativo com locale prefix (pt/en)

> ADRs completos em .ai/context/decisions.md

---

## Onde estamos — 18/03/2026

```
✅ PHASE1: M0–M10 completo (refactor vanilla → Next.js)
✅ PHASE2: design system + blog MDX + contato com Resend
✅ Analytics: Search Console + Clarity + OG image
✅ Deploy: dev-luisneves.me em produção
```

### Próximos passos (ver CHECKPOINT.md):
- Analytics A1–A3 pendente
- Conteúdo adicional para blog
- Considerar: testes E2E

---

*Última atualização: 18/03/2026*
