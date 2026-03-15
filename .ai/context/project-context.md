# Project Context — Portfolio
> Leitura obrigatória para qualquer agente antes de operar neste projeto.
> Atualizar sempre que stack, estrutura ou estado mudar.

---

## Identificação

```
Nome do projeto: my-portfolio-lneves
Tipo: [x] site simples   (evoluindo para SaaS — ver backlog)
Nível atual: [x] Level 1
Stack principal: Next.js 16 + TypeScript + Tailwind 4 + Framer Motion
URL produção: https://dev-luisneves.me
Repositório: https://github.com/luisoneves/my-portfolio-lneves
Deploy: Vercel (framework preset: Next.js)
```

---

## Dono do projeto

```
Nome: Luis Otavio Neves Faustino
Perfil: Engineering Lead · Software Architect (em formação)
Formação: FATEC ADS — cursando 2024–2026
Localização: Cachoeira Paulista, SP
Contato: contato@luisneves.dev.br | (12) 99248-6884
GitHub: github.com/luisoneves
LinkedIn: linkedin.com/in/luisneves-dev
```

---

## Problema que resolve

Portfolio pessoal com identidade de produto — não de currículo.
Posiciona Luis como Engineering Lead / Software Architect com foco em
arquitetura-primeiro, CI/CD e engenharia de IA. Serve como vitrine
para vagas e como blueprint futuro para o WaaS.

---

## Usuários

```
Quem usa: recrutadores técnicos, tech leads, potenciais clientes do WaaS
Volume estimado: baixo (< 500 visitas/mês no início)
Criticidade: [x] pode ter downtime (portfólio pessoal, não crítico)
```

---

## Stack técnica

```yaml
language: TypeScript (strict)
runtime: Node.js v22
framework: Next.js 16.1.6 (App Router, static export)
database: nenhum — dados estáticos em lib/data/ (ver backlog para migração futura)
cache: Vercel Edge Cache (automático)
queue: nenhuma
auth: nenhuma (site público)
hosting: Vercel (free tier → Pro quando WaaS tiver clientes)
ci-cd: Vercel deploy automático via git push na main
monitoring: Microsoft Clarity (sessões) + Google Search Console (SEO)
animations: Framer Motion 12 + Lenis 1.3 (smooth scroll)
ui: Tailwind CSS 4 + Shadcn/ui (parcial) + Radix UI Dialog
palette: Cmd+K via cmdk 1.1
```

---

## Estrutura de diretórios

```
my-portfolio-lneves/
├── app/
│   ├── curriculo/page.tsx      ← rota /curriculo
│   ├── globals.css             ← design tokens, selection amber, scrollbar
│   ├── layout.tsx              ← providers + meta OG + verification tags
│   ├── page.tsx                ← home — composição das seções
│   └── sitemap.ts              ← sitemap automático (A2)
│
├── components/
│   ├── hero/                   ← AnimatedHeading + TypingCycle
│   ├── projects/               ← EvolutionTimeline + ProjectCard (3D tilt)
│   ├── providers/              ← PageTransition + SmoothScrollProvider
│   ├── resume/                 ← ResumeDownloadButton
│   ├── sections/               ← Manifesto, Projects, Architecture, CICD, Stack, Notes
│   ├── CommandPalette.tsx      ← ⌘K palette
│   ├── CommandPaletteHint.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
│
├── lib/
│   └── notes.ts                ← dados das engineering notes (estático por ora)
│
├── public/
│   └── robots.txt
│
├── _legacy/                    ← projeto vanilla HTML original (não deletar ainda)
│
└── .ai/                        ← base de conhecimento pessoal (não sobe pro GitHub)
    ├── context/                ← este arquivo + decisions + architecture-summary
    ├── milestones/             ← planos de execução
    ├── backlog/                ← features adiadas conscientemente
    └── [framework .ai 2.3]
```

---

## Convenções do projeto

```
Commits: feat: | fix: | chore: | docs: | refactor:
Branches: main (produção direta via Vercel)
Componentes: PascalCase, "use client" explícito quando necessário
Imports: alias @/ para raiz
Dados: arrays tipados em lib/ — NÃO hardcoded dentro de componentes
CSS: Tailwind classes utilitárias + CSS variables em globals.css
```

---

## O que é crítico neste sistema

```
- app/layout.tsx: providers globais + meta tags — erro aqui quebra tudo
- components/providers/: Lenis e PageTransition — scroll e transições
- Vercel Framework Preset: deve estar em Next.js (não Other/Static)
```

---

## O que está fora do escopo (agora)

```
- Banco de dados (aguarda WaaS Nível II)
- Painel admin (aguarda banco)
- Auth de qualquer tipo (site público)
- Blog com MDX (aguarda conteúdo real acumulado)
- Multi-tenant (aguarda WaaS Nível II estável)
```

---

## Dependências externas

```
- Vercel: hosting + deploy automático
- Google Search Console: indexação e cliques orgânicos
- Microsoft Clarity: gravação de sessão + mapa de calor
```

---

## Estado atual

```
[x] Produção com usuários iniciais

Stack: migrada de vanilla HTML para Next.js 16 em março 2025
Refactor: M0–M10 executados por agente de IA (Cursor)
Pendente: Analytics (A1–A3), popular lib/data/, favicon LN amber
Próxima revisão: quando WaaS Nível I estiver completo
```

---

## Projetos relacionados

```
Diocese SaaS (v3): github.com/luisoneves — monorepo Turborepo, em dev
WaaS: github.com/luisoneves — Nível I Etapa 2 em progresso
```

*Última atualização: março 2025*
