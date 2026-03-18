# CHECKPOINT — Portfolio
> Estado atual do projeto. Atualizar a cada sessão de trabalho relevante.

---

## Estado em 18/03/2026 - ATUALIZADO

```
[x] PHASE2 completo — design system + blog MDX + contato com Resend
[x] PHASE3 completo — dark mode fix + email env vars + Clarity env var
[x] Deploy production validado
```

### PHASE3 executado em 18/03/2026:

#### BUG-01: Dark mode toggle fix
- `app/globals.css` — seletor `.dark` adicionado para next-themes runtime
- `@media (prefers-color-scheme: dark)` mantido como SSR fallback
- Alto contraste agora independente do tema

#### EMAIL-FIX: Variáveis de ambiente
- `.env.example` criado com template de variáveis
- `.gitignore` atualizado para ignorar `.env.local` mas permitir `.env.example`
- `RESEND_API_KEY` e `CONTACT_TO_EMAIL` configuráveis via env

#### A3: Clarity em variável de ambiente
- `ClarityProvider.tsx` agora usa `process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID`
- Project ID `vw2ovtzbwy` movido para .env.local

#### Commits:
```
aa6a6a4 - chore: update globals.css with dark mode fix
c7e9e3a - feat: add .env.example for documentation + update .gitignore
c70710f - chore: Clarity Project ID moved to NEXT_PUBLIC_CLARITY_PROJECT_ID env var
36a5a6e - merge: analytics-email-fix → main
```

### O que foi feito em 18/03/2026:

#### FIX-01: root page redirect
- `app/page.tsx` criado com redirect para `/pt`

#### P0: Design System
- `styles/design-tokens.css` (tokens de tipografia, espaçamento, bordas)
- `app/globals.css` atualizado com layers typography/components

#### FIX-02: i18n updates
- `nav.blog` e `nav.contact` adicionados
- `commandPalette.groups.pages` adicionado
- `commandPalette.items` com blog/contato/resume

#### P1: Blog MDX Infrastructure
- `lib/blog.ts` (getAllPosts, getPostBySlug, getAllTags)
- `content/blog/strapi-para-saas.mdx`
- `content/blog/agents-tarefas-atomicas.mdx`
- Dependências: next-mdx-remote, gray-matter, reading-time

#### P2: Blog List Page
- `app/[locale]/blog/page.tsx`
- `components/blog/BlogList.tsx` (client, filtro por tag, stagger animations)
- `components/blog/PostCard.tsx` (3D hover)

#### P3: Blog Post Page
- `app/[locale]/blog/[slug]/page.tsx` (generateStaticParams)
- `components/blog/PostLayout.tsx` (sidebar + prev/next navigation)

#### P4: Contact Page
- `app/[locale]/contato/page.tsx`
- `components/contact/ContactForm.tsx` (honeypot, validação, toast)

#### P5: Resend Integration
- `app/actions/sendContact.ts` (server action, Zod validation)
- Dependência: resend

#### P6: Home Integration
- `app/[locale]/page.tsx` vira Server Component
- `components/home/HomeClient.tsx` (Client Component com animations)
- `components/sections/LatestPosts.tsx` (3 últimos posts)
- `components/sections/ContactCTA.tsx` (banner "Aberto a oportunidades")

#### P7: Navbar + CommandPalette
- Navbar com links blog/contato com locale
- CommandPalette com router para blog/contato

#### P8: Sitemap + Toaster
- `app/sitemap.ts` com blog/posts
- `app/[locale]/layout.tsx` com `<Toaster position="bottom-right" />`

#### fix: goArchitecture i18n
- Adicionado `goArchitecture` em pt.json e en.json

### Commits em main (18/03/2026):
```
37755da - merge: design-system-blog-contact → main (FIX-01, P0, FIX-02)
db074af  - merge: blog-mdx → main (P1)
4208e9a  - feat: blog list page (P2)
1596c5d  - merge: blog-mdx → main (P3)
e134a5c  - merge: contact-form → main (P4+P5)
7b0e094  - merge: home-integration → main (P6+P7+P8)
5813591  - fix: goArchitecture i18n
```

### Rotas disponíveis:
- `/pt` e `/en` — home com blog posts + CTA contato
- `/pt/blog` e `/en/blog` — listagem com filtro por tags
- `/pt/blog/[slug]` e `/en/blog/[slug]` — posts MDX
- `/pt/contato` e `/en/contato` — formulário com Resend
- `/pt/curriculo` e `/en/curriculo` — currículo

### Pendências identificadas:
- Analytics A1–A3 ainda pendente (ver .ai/milestones/ANALYTICS_MILESTONES.md)

---

## Estado em 15/03/2026

```
[x] Produção: dev-luisneves.me no ar
[x] Refactor M0–M10 completo
[x] Audit SEO/A11Y/Dark Mode executado (.ai/milestones/AUDIT_REPORT.md)
[x] Fixes do audit implementados (FIX 1–7, branch audit/seo-a11y-darkmode)
[ ] Analytics A1–A3 pendente (~45 min)
[ ] lib/data/ — separar dados dos componentes
[x] Logo novo aplicado no Navbar (logo-LN_darkmode-new.png)
[x] Favicon configurado no App Router (app/favicon.ico + metadata.icons)
```

---

## O que foi feito nesta semana

- Migração completa de vanilla HTML → Next.js 16 App Router
- M0: Providers (Lenis smooth scroll + PageTransition blur)
- M1: Hero com TypingCycle + AnimatedHeading + stats
- M2: ManifestoBlock com slide-in
- M3: EvolutionTimeline v1→v4 + ProjectCard 3D tilt + stagger
- M4: ArchitectureSection (monorepo + clean arch layers)
- M5: CICDSection (pipeline visual animado)
- M6: StackSection (chips por contexto de uso)
- M7: NotesSection (engineering notes cards)
- M8: CommandPalette ⌘K com navegação e links
- M9: /curriculo com ResumeDownloadButton
- M10: polish (selection amber, scrollbar, meta OG, robots.txt)
- Audit tecnico executado (SEO, Meta/OG, A11Y, Dark/Light, i18n, Performance)
- Relatorio gerado em .ai/milestones/AUDIT_REPORT.md com classificacao por item (OK/ATENCAO/PROBLEMA)
- Registro de decisao ADR-006 (i18n em backlog, sem implementacao agora)
- FIX 1: dark mode com next-themes — ThemeProvider + ThemeToggle no Navbar; removido className="dark" hardcoded
- FIX 2: i18n placeholder comentado (LangToggle.tsx + comentários em layout e Navbar)
- FIX 3: dois h1 corrigidos — segundo motion.h1 na hero virou motion.p
- FIX 4: a11y — aria-label no CommandPaletteHint; ProjectCard virou article com tabIndex + onKeyDown
- FIX 5: canonical URL adicionado por rota (/ e /curriculo)
- FIX 6: favicon configurado no App Router (app/favicon.ico + metadata.icons)
- FIX 7: logo novo dark mode aplicado no Navbar (logo-LN_darkmode-new.png)
- README.md atualizado para Next.js
- Vercel Framework Preset corrigido para Next.js (estava em Other)
- Pasta .ai populada com project-context, decisions, backlog, milestones

---

## Próximo passo imediato

```
Analytics A2 → A1 → A3  (~45 min, 1 deploy)
```

Ver: `.ai/milestones/ANALYTICS_MILESTONES.md`

---

## Próxima revisão sugerida

Quando WaaS Nível I estiver completo (template terapeuta + 2º template + deploy Netlify).
