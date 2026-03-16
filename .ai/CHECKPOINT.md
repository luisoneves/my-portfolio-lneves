# CHECKPOINT — Portfolio
> Estado atual do projeto. Atualizar a cada sessão de trabalho relevante.

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
