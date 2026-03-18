# PHASE2_MILESTONES.md — COMPLETO ✅
> Portfolio dev-luisneves.me
> Stack: Next.js 16 · TypeScript Strict · Tailwind CSS v4 · next-intl · Framer Motion
> **COMPLETO EM 18/03/2026** — Ver commits em CHECKPOINT.md

---

## ✅ STATUS: COMPLETO (18/03/2026)

Todas as tasks implementadas e mergeadas na main:

| Task | Commit | Status |
|------|--------|--------|
| FIX-01 | 5b459fd | ✅ |
| P0 | d325664 | ✅ |
| FIX-02 | d325664 | ✅ |
| P1 | 532f884 | ✅ |
| P2 | 4208e9a | ✅ |
| P3 | 11211a4 | ✅ |
| P4 | 1636e22 | ✅ |
| P5 | 1636e22 | ✅ |
| P6 | c094062 | ✅ |
| P7 | c094062 | ✅ |
| P8 | c094062 | ✅ |
| fix: goArchitecture | 5813591 | ✅ |

---

## ESTADO REAL DO PROJETO (auditado em março 2026)

### ✅ Já implementado e correto — NÃO MEXER
- `ThemeProvider` com `defaultTheme="system"` + `enableSystem` ✓
- `LangToggle` com abordagem de segmentos (pathname.split) ✓
- `HighContrastToggle` com localStorage + data-high-contrast ✓
- `styles/high-contrast.css` ✓
- `i18n/routing.ts` e `i18n/request.ts` ✓
- `app/[locale]/layout.tsx` com `generateMetadata` dinâmico por locale ✓
- `app/[locale]/page.tsx` com useTranslations, h1 único, aria-live ✓
- `messages/pt.json` e `messages/en.json` com traduções completas ✓
- `lib/data/` com projects.ts, stack.ts, notes.ts, index.ts ✓
- `ClarityProvider` com Project ID real (`vw2ovtzbwy`) ✓
- Metadata OG + Search Console verification no layout ✓

### ⚠️ Arquivos legados — PRECISAM SER CORRIGIDOS (FIX-01 e FIX-02)
| Arquivo | Problema | Ação |
|---------|----------|------|
| `app/layout.tsx` | `className="dark"` hardcoded + Navbar/Footer duplicados sem providers | Substituir por versão mínima |
| `app/page.tsx` | Versão antiga sem i18n, strings hardcoded | Substituir por redirect |
| `app/curriculo/page.tsx` | Duplicata da versão em `[locale]` | Deletar |
| `lib/notes.ts` | Duplicata de `lib/data/notes.ts` | Deletar |

### ❌ Ainda faltando (o que este arquivo resolve)
- `nav.blog` ausente em `messages/pt.json` e `messages/en.json`
- CommandPalette sem itens de blog e contato nas mensagens
- Design system modular (tokens separados, classes reutilizáveis)
- Página `/blog` (lista + filtro)
- Página `/blog/[slug]` (post individual MDX)
- Página `/contato` (formulário + Resend)
- Integração na home (últimos posts + CTA contato)
- Sitemap atualizado com blog e contato

---

## COMANDOS PARA CRIAR A BRANCH

```bash
git checkout main
git pull origin main
git checkout -b feature/design-system-blog-contact
```

---

## ORDEM DE EXECUÇÃO

```
FIX-01 → FIX-02 → P0 → pnpm build ← CHECKPOINT
P1 → P2 → P3 → pnpm build ← CHECKPOINT
P4 → P5 → P6 → P7 → P8 → P9 → pnpm build final
```

---

## FIX-01 — Limpeza de arquivos legados
**Estimativa:** 10 min | **Crítico — fazer antes de tudo**

### Problema central: root layout duplicado

`app/layout.tsx` tem `className="dark"` hardcoded + Navbar/Footer/CommandPalette sem ThemeProvider/NextIntlClientProvider.
`app/[locale]/layout.tsx` (correto) já tem tudo configurado.
Resultado: Navbar e Footer potencialmente duplicados, dark mode fixo na raiz.

### Passo 1 — Substituir `app/layout.tsx` por versão mínima:

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luis Neves",
  description: "Engineering Lead · Software Architect",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
```

> Por quê: o `app/[locale]/layout.tsx` já fornece `<html>`, `<body>`, providers, Navbar e Footer
> para TODAS as rotas (o middleware redireciona tudo para `/[locale]/...`).
> O root layout existe apenas para satisfazer o App Router — sem html/body próprios.

### Passo 2 — Substituir `app/page.tsx` por redirect para locale padrão:

```tsx
import { redirect } from "next/navigation"

export default function RootPage() {
  redirect("/pt")
}
```

### Passo 3 — Deletar arquivos obsoletos:

```bash
# Deletar curriculo antigo (a versão em [locale] é a correta)
rm app/curriculo/page.tsx
rmdir app/curriculo  # só se estiver vazio

# Deletar lib/notes.ts antigo (lib/data/notes.ts é o canônico)
rm lib/notes.ts
```

### Critério de done
- [ ] `pnpm build` sem erros após as 3 mudanças
- [ ] Acessar `dev:3000/` redireciona para `/pt`
- [ ] Navbar aparece UMA vez, não duplicada
- [ ] Dark mode responde ao toggle (não fica fixo)

---

## FIX-02 — Chaves i18n faltando (nav.blog + commandPalette)
**Estimativa:** 5 min | **Fazer antes de P0**

### `messages/pt.json` — adicionar APENAS as chaves ausentes:

> ATENÇÃO AGENTE: NÃO recriar o arquivo. Adicionar dentro dos objetos existentes.

```json
// Dentro de "nav" (já existe), adicionar:
"blog": "blog",
"contact": "contato"
```

> Nota: "contact" já existe em pt.json (`"contact": "contato"`). Verificar antes de adicionar.
> O que está faltando é apenas `"blog": "blog"`.

```json
// Dentro de "commandPalette" > "groups" (já existe), adicionar:
"pages": "Páginas"

// Dentro de "commandPalette" > "items" (já existe), adicionar:
"goBlog": "Ir para Blog",
"goContact": "Ir para Contato",
"openResume": "Ver Currículo"
```

### `messages/en.json` — mesmas adições:

```json
// nav:
"blog": "blog"
// (contact já existe como "contact": "contact")

// commandPalette > groups:
"pages": "Pages"

// commandPalette > items:
"goBlog": "Go to Blog",
"goContact": "Go to Contact",
"openResume": "View Resume"
```

### Critério de done
- [ ] `pnpm build` sem erros de chave i18n faltando
- [ ] `useTranslations("nav")("blog")` retorna "blog"

---

## MILESTONE P0 — Design System modular
**Estimativa:** 35 min | **Fazer após FIX-01 e FIX-02 | Checkpoint após este milestone**

### Objetivo
O `globals.css` atual já tem CSS custom properties (`--background`, `--foreground`, etc.) e botões (`.btn-primary`, `.btn-secondary`).
O P0 **complementa** sem substituir: adiciona tokens de tipografia/espaçamento/borda + classes de componente reutilizáveis.
**Não deletar nem renomear variáveis existentes.**

### Arquivo a criar: `styles/design-tokens.css`

```css
/* ============================================================
   DESIGN TOKENS — dev-luisneves.me
   Alterar aqui atualiza o site inteiro.
   Não duplicar valores: se existe em globals.css, referenciar.
   ============================================================ */

:root {
  /* --- Tipografia --- */
  --text-h1: 2.5rem;       /* 40px — hero principal */
  --text-h2: 1.75rem;      /* 28px — títulos de seção */
  --text-h3: 1.25rem;      /* 20px — subtítulos de card */
  --text-h4: 1rem;         /* 16px — labels de grupo */
  --text-h5: 0.875rem;     /* 14px — labels secundários */
  --text-p1: 1rem;         /* 16px — corpo principal */
  --text-p2: 0.875rem;     /* 14px — corpo secundário */
  --text-p3: 0.75rem;      /* 12px — captions, meta, font-mono labels */

  --weight-normal: 400;
  --weight-medium: 500;

  --leading-tight:   1.2;
  --leading-normal:  1.5;
  --leading-relaxed: 1.65;

  /* --- Espaçamento --- */
  --space-1: 0.25rem;   /* 4px  */
  --space-2: 0.5rem;    /* 8px  */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */

  /* --- Border radius --- */
  --radius-sm:   4px;      /* chips, tags inline */
  --radius-md:   8px;      /* botões, inputs */
  --radius-lg:   12px;     /* cards padrão */
  --radius-xl:   16px;     /* cards grandes */
  --radius-full: 9999px;   /* pills, badges */

  /* --- Estilos de borda (nomeados por intenção) ---
     Alterar aqui muda TODAS as bordas do tipo no site.     */
  --border-style-1:      0.5px solid var(--border);           /* card padrão */
  --border-style-2:      1px solid var(--border);             /* hover / foco */
  --border-style-3:      1.5px solid rgba(245,158,11,0.6);    /* card destaque (Diocese) */
  --border-style-4:      0.5px solid rgba(59,130,246,0.4);    /* informação */
  --border-style-5:      0.5px solid rgba(34,197,94,0.4);     /* sucesso */
  --border-divider:      0.5px solid var(--border);           /* separador hr */
  --border-accent-left:  2px solid var(--amber-brand);        /* manifesto, blockquotes */

  /* --- Transições --- */
  --transition-fast: all 0.15s ease;
  --transition-base: all 0.2s ease;
  --transition-slow: all 0.35s ease;

  /* --- Layout --- */
  --container-max:    1100px;
  --container-prose:  720px;   /* largura ideal para leitura */

  /* --- Z-index --- */
  --z-sticky:  20;
  --z-overlay: 40;
  --z-modal:   50;
}
```

### Arquivo a modificar: `app/globals.css`

Adicionar no **TOPO** do arquivo (antes de `@import "tailwindcss"`):

```css
@import "../styles/design-tokens.css";
```

Em seguida, adicionar as seguintes layers **ao final do arquivo** (depois de tudo que já existe):

```css
/* ============================================================
   TIPOGRAFIA — usar estas classes, nunca font-size hardcoded
   ============================================================ */

.h1 {
  font-size: var(--text-h1);
  font-weight: var(--weight-medium);
  line-height: var(--leading-tight);
  color: var(--foreground);
}
.h2 {
  font-size: var(--text-h2);
  font-weight: var(--weight-medium);
  line-height: var(--leading-tight);
  color: var(--foreground);
}
.h3 {
  font-size: var(--text-h3);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  color: var(--foreground);
}
.h4 {
  font-size: var(--text-h4);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  color: var(--foreground);
}
.h5 {
  font-size: var(--text-h5);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  color: var(--muted-foreground);
}
.p1 {
  font-size: var(--text-p1);
  font-weight: var(--weight-normal);
  line-height: var(--leading-relaxed);
  color: var(--foreground);
}
.p2 {
  font-size: var(--text-p2);
  font-weight: var(--weight-normal);
  line-height: var(--leading-relaxed);
  color: var(--muted-foreground);
}
.p3 {
  font-size: var(--text-p3);
  font-weight: var(--weight-normal);
  line-height: var(--leading-normal);
  color: var(--muted-foreground);
  font-family: var(--font-mono);
}

/* Label de seção — "// trilha de projetos..." */
.section-label {
  font-size: var(--text-p3);
  font-family: var(--font-mono);
  color: var(--muted-foreground);
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: var(--space-2);
}

/* Prosa de post — aplica em article.prose */
.prose h2 { font-size: var(--text-h2); font-weight: var(--weight-medium); margin: var(--space-8) 0 var(--space-3); }
.prose h3 { font-size: var(--text-h3); font-weight: var(--weight-medium); margin: var(--space-6) 0 var(--space-2); }
.prose p  { font-size: var(--text-p1); line-height: var(--leading-relaxed); margin-bottom: var(--space-4); }
.prose pre {
  border: var(--border-style-1);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin: var(--space-4) 0;
  overflow-x: auto;
  background: var(--muted);
}
.prose code { font-family: var(--font-mono); font-size: var(--text-p2); }
.prose blockquote {
  border-left: var(--border-accent-left);
  padding-left: var(--space-4);
  color: var(--muted-foreground);
  margin: var(--space-6) 0;
}
.prose a { color: var(--amber-brand); text-decoration: underline; text-underline-offset: 3px; }
.prose ul, .prose ol { padding-left: var(--space-5); margin-bottom: var(--space-4); }
.prose li { font-size: var(--text-p1); line-height: var(--leading-relaxed); margin-bottom: var(--space-1); }
.prose hr { border: none; border-top: var(--border-divider); margin: var(--space-8) 0; }
.prose strong { font-weight: var(--weight-medium); color: var(--foreground); }

/* ============================================================
   CARDS — classes reutilizáveis entre todas as páginas
   ============================================================ */

/* card: padrão — todas as páginas */
.card {
  background: var(--card);
  border: var(--border-style-1);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
  transition: var(--transition-base);
}

/* card-interactive: com hover, clicável */
.card-interactive {
  background: var(--card);
  border: var(--border-style-1);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
  cursor: pointer;
  transition: var(--transition-base);
  text-decoration: none;
  display: block;
  color: inherit;
}
.card-interactive:hover {
  border: var(--border-style-2);
  transform: translateY(-2px);
}

/* card-highlight: destaque (Diocese SaaS, card ativo) */
.card-highlight {
  background: var(--card);
  border: var(--border-style-3);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
}

/* card-muted: fundo suave, métricas/stats */
.card-muted {
  background: var(--muted);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

/* card-info: informação/azul */
.card-info {
  background: rgba(59,130,246,0.06);
  border: var(--border-style-4);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
}

/* card-success: sucesso/verde */
.card-success {
  background: rgba(34,197,94,0.06);
  border: var(--border-style-5);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
}

/* ============================================================
   GRIDS
   ============================================================ */
.grid-1 { display: grid; grid-template-columns: 1fr; gap: var(--space-4); }
.grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-4); }
.grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-4); }
.grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--space-4); }
.grid-main-sidebar { display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-8); }
.grid-auto { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); }

@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4,
  .grid-main-sidebar { grid-template-columns: 1fr; }
}

/* ============================================================
   BADGES, CHIPS, TAGS
   ============================================================ */

/* badge: rótulo pill de status */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-p3);
  font-family: var(--font-mono);
  padding: 3px var(--space-3);
  border-radius: var(--radius-full);
  line-height: 1;
}
.badge-amber   { background: rgba(245,158,11,0.12); color: var(--amber-brand); }
.badge-info    { background: rgba(59,130,246,0.10); color: #3b82f6; }
.badge-success { background: rgba(34,197,94,0.10);  color: #22c55e; }
.badge-neutral {
  background: var(--muted);
  color: var(--muted-foreground);
  border: var(--border-style-1);
}

/* chip: tecnologia/stack (menor que badge) */
.chip {
  display: inline-block;
  font-size: var(--text-p3);
  font-family: var(--font-mono);
  padding: 2px var(--space-2);
  border: var(--border-style-1);
  border-radius: var(--radius-sm);
  color: var(--muted-foreground);
  background: var(--muted);
  transition: var(--transition-fast);
}
.chip-primary {
  border: 1px solid rgba(245,158,11,0.4);
  color: var(--amber-brand);
  background: rgba(245,158,11,0.08);
}
.chip:hover {
  border: 1px solid rgba(245,158,11,0.4);
  color: var(--amber-brand);
}

/* tag: filtro de categoria (blog) */
.tag {
  display: inline-block;
  font-size: var(--text-p3);
  font-family: var(--font-mono);
  padding: 3px 9px;
  border: var(--border-style-1);
  border-radius: var(--radius-sm);
  color: var(--muted-foreground);
  cursor: pointer;
  transition: var(--transition-fast);
}
.tag:hover,
.tag.active {
  border: 1px solid rgba(245,158,11,0.5);
  color: var(--amber-brand);
  background: rgba(245,158,11,0.08);
}

/* ============================================================
   LAYOUT CONTAINERS
   ============================================================ */
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-6);
}
.container-prose {
  max-width: var(--container-prose);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Divider */
.divider {
  border: none;
  border-top: var(--border-divider);
  margin: var(--space-8) 0;
}

/* ============================================================
   FORMULÁRIO
   ============================================================ */
.form-group { margin-bottom: var(--space-4); }
.form-label {
  display: block;
  font-size: var(--text-p3);
  font-family: var(--font-mono);
  color: var(--muted-foreground);
  margin-bottom: var(--space-1);
}
.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: var(--border-style-1);
  border-radius: var(--radius-md);
  background: var(--card);
  color: var(--foreground);
  font-size: var(--text-p2);
  font-family: var(--font-sans);
  transition: var(--transition-fast);
  box-sizing: border-box;
}
.form-input:focus {
  outline: none;
  border: 1px solid rgba(245,158,11,0.5);
  box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
}
.form-input::placeholder { color: var(--muted-foreground); }
```

> Nota: `.btn-primary` e `.btn-secondary` já existem no globals.css — NÃO recriar.

### Critério de done
- [ ] `styles/design-tokens.css` criado
- [ ] `globals.css` importa design-tokens no topo
- [ ] Classes `.card`, `.h1`, `.p2`, `.badge-amber`, `.tag` etc. funcionando
- [ ] `pnpm build` sem erros — **FAZER CHECKPOINT AQUI**

```bash
git add . && git commit -m "checkpoint: design system implementado (P0 + FIX)"
```

### Como usar nos componentes (referência rápida)
```tsx
// Tipografia
<h1 className="h1">Não escrevo features.</h1>
<p className="p2">Subtítulo muted</p>
<span className="section-label">// trilha de projetos</span>

// Cards
<div className="card">card padrão</div>
<div className="card-interactive">card clicável com hover</div>
<div className="card-highlight">card ativo / destaque</div>
<div className="card-muted">stat / métrica</div>

// Grid
<div className="grid-3">três colunas</div>
<div className="grid-main-sidebar">conteúdo + sidebar</div>

// Badges e chips
<span className="badge badge-amber">em dev</span>
<span className="badge badge-success">produção</span>
<span className="chip chip-primary">Next.js 16</span>
<span className="tag active">arquitetura</span>

// Formulário
<div className="form-group">
  <label className="form-label">nome *</label>
  <input className="form-input" type="text" />
</div>
```

---

## MILESTONE P1 — Blog: infraestrutura MDX
**Estimativa:** 20 min | **Arquivos novos:** 3 | **Arquivos modificados:** 1

### Instalação

```bash
npm install next-mdx-remote gray-matter reading-time
npm install @types/mdx
```

> `@next/mdx` e loaders pesados NÃO são necessários com `next-mdx-remote`.
> `next-mdx-remote/rsc` processa MDX em Server Components do App Router.

### Arquivos a criar

**`lib/blog.ts`**

```ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export interface PostMeta {
  slug:           string
  title:          string
  titleEn?:       string
  date:           string        // YYYY-MM-DD
  tags:           string[]
  summary:        string
  summaryEn?:     string
  readingTime:    string
  readingTimeEn?: string
  published:      boolean
  coverImage?:    string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""))
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const rt = readingTime(content)
  return {
    slug,
    title:          data.title ?? "",
    titleEn:        data.titleEn,
    date:           data.date ?? "",
    tags:           data.tags ?? [],
    summary:        data.summary ?? "",
    summaryEn:      data.summaryEn,
    readingTime:    `${Math.ceil(rt.minutes)} min`,
    readingTimeEn:  `${Math.ceil(rt.minutes)} min read`,
    published:      data.published !== false,
    coverImage:     data.coverImage,
    content,
  }
}

export function getAllPosts(locale: "pt" | "en" = "pt"): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((post) => post.tags)
  return [...new Set(tags)].sort()
}
```

**`content/blog/strapi-para-saas.mdx`**

```mdx
---
title: "Por que abandonei o Strapi e construí minha própria stack"
titleEn: "Why I abandoned Strapi and built my own stack"
date: "2025-03-01"
tags: ["arquitetura", "saas", "multi-tenancy"]
summary: "Multi-tenancy com RLS, feature flags e a decisão que transformou um sistema headless num SaaS real. O que o Strapi não consegue fazer quando você escala para 200 filiais."
summaryEn: "Multi-tenancy with RLS, feature flags and the decision that turned a headless system into a real SaaS. What Strapi can't do when you scale to 200 branches."
published: true
---

## O contexto

Comecei o projeto de gestão de capelas com Strapi porque parecia a escolha óbvia: CMS headless maduro, API REST automática, painel admin pronto.

Funcionou bem para 1 filial. Começou a mostrar fricção com 5. Com 50, ficou claro que eu estava usando a ferramenta errada.

## O problema com o Strapi ao escalar

O Strapi v4 é excelente para o que foi feito: gerenciar conteúdo de **um** site. Quando você tenta forçar multi-tenancy real — onde cada filial tem seu próprio conteúdo, roles e permissões — você está lutando contra a arquitetura da ferramenta.

Três limitações específicas que encontrei:

1. **RBAC limitado**: as permissões são globais no Strapi, não por tenant
2. **RLS impossível**: o ORM interno não expõe Row-Level Security do PostgreSQL
3. **Feature Flags por tenant**: sem suporte nativo, qualquer solução é um hack

## A decisão arquitetural

Em vez de continuar remendando o Strapi, decidi construir a stack do zero no Diocese SaaS v3:

- **Fastify** como servidor de API (Transport layer)
- **Prisma + PostgreSQL** com RLS habilitado por row
- **Turborepo** organizando monorepo em camadas
- **RBAC hierárquico** próprio: Diocese → Chapel → Editor

## O que construí no lugar

A arquitetura ficou em 4 camadas explícitas:

```
Transport   → HTTP handlers, auth middleware
Application → Use cases, regras de negócio
Domain      → Entities, invariants
Infra       → Prisma, Redis, external services
```

Feature Flags por tenant: cada tenant tem uma coluna `features JSONB` no banco. O middleware valida na borda antes de qualquer processamento.

## O que faria diferente

Hoje, começaria com um protótipo de 1 tenant para validar o modelo antes de construir toda a infraestrutura multi-tenant. O Strapi foi um passo necessário — me mostrou exatamente o que eu precisava construir do zero.
```

**`content/blog/agents-tarefas-atomicas.mdx`**

```mdx
---
title: "AGENTS.md e tarefas atômicas — IA como ferramenta, não atalho"
titleEn: "AGENTS.md and atomic tasks — AI as a tool, not a shortcut"
date: "2025-02-15"
tags: ["ia + eng", "workflow", "arquitetura"]
summary: "Como estruturo contexto (knowledge base versionada, PRD, AGENTS.md) para que o agente produza arquitetura consistente em vez de código aleatório."
summaryEn: "How I structure context (versioned knowledge base, PRD, AGENTS.md) so the agent produces consistent architecture instead of random code."
published: true
---

## O problema com IA sem contexto

Quando você abre o Cursor e digita "cria um sistema de autenticação", o agente não sabe:

- Qual framework você está usando
- Qual padrão de erro você adotou
- Se você quer JWT ou sessions
- Se há um padrão de pastas estabelecido

O resultado é código que funciona mas não conversa com o resto do projeto.

## A solução: AGENTS.md

O arquivo `.ai/workflow/agents.md` define as regras antes de qualquer sessão. Ele não é um prompt — é uma **constituição do projeto**.

Estrutura que uso:

```markdown
# AGENTS.md

## Contexto do projeto
[arquitetura, stack, decisões já tomadas]

## Regras de código
[padrões de importação, nomenclatura, tratamento de erros]

## O que NÃO fazer
[lista explícita de decisões já rejeitadas e por quê]
```

## Tarefas atômicas

Uma tarefa atômica tem:

1. **Contexto mínimo** — só o que o agente precisa para essa tarefa
2. **Um único objetivo** — sem "e também faça X"
3. **Critério de done explícito** — como validar que está pronto

Exemplo ruim: *"Implementa autenticação com JWT e também cria o reset de senha e adiciona rate limiting"*

Exemplo bom: *"Implementa o middleware de auth JWT em `transport/auth.middleware.ts`. Siga o padrão de erro em `core/errors.ts`. Done quando `GET /api/me` retornar 401 sem token e 200 com token válido."*

## Por que isso importa

Com tarefas atômicas + AGENTS.md, o agente produz código que:
- Segue os padrões do projeto
- É revisável em 1 PR pequeno
- Tem critério de done verificável
- Não inventa soluções que vão contra decisões já tomadas
```

### Arquivo a modificar: `next.config.ts`

> ⚠️ ATENÇÃO: O `withNextIntl` JÁ EXISTE. Adicionar withMDX composto POR CIMA, não substituir.

```ts
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
import createMDX from "@next/mdx"

// ATENÇÃO AGENTE: next-mdx-remote NÃO precisa de createMDX no next.config.
// Este bloco só é necessário se usar @next/mdx diretamente.
// Como usamos next-mdx-remote/rsc, o next.config NÃO precisa de alteração.
// Manter exatamente como está:

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const nextConfig: NextConfig = {
  /* config options here */
}

export default withNextIntl(nextConfig)
```

> `next-mdx-remote` processa MDX em runtime no servidor — não precisa de plugin no next.config.
> O `next.config.ts` NÃO precisa ser alterado neste milestone.

### Critério de done
- [ ] `lib/blog.ts` criado sem erros de TypeScript
- [ ] `content/blog/` com 2 posts `.mdx`
- [ ] `getAllPosts()` retorna os posts (testar: `npx tsx -e "import('./lib/blog').then(m => console.log(m.getAllPosts()))"`)
- [ ] `pnpm build` sem erros

---

## MILESTONE P2 — Blog: página de listagem (`/[locale]/blog`)
**Estimativa:** 30 min | **Arquivos novos:** 3

### Arquivos a criar

**`app/[locale]/blog/page.tsx`**

```tsx
import { getAllPosts, getAllTags } from "@/lib/blog"
import { BlogList } from "@/components/blog/BlogList"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEn = locale === "en"
  return {
    title: isEn ? "Blog — Luis Neves" : "Blog — Luis Neves",
    description: isEn
      ? "Engineering notes, architecture decisions and reading reflections."
      : "Notas de engenharia, decisões arquiteturais e reflexões de leitura.",
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const posts = getAllPosts(locale as "pt" | "en")
  const tags = getAllTags()

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <BlogList posts={posts} tags={tags} locale={locale} />
    </main>
  )
}
```

**`components/blog/BlogList.tsx`**

```tsx
"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import type { PostMeta } from "@/lib/blog"
import { PostCard } from "./PostCard"

interface BlogListProps {
  posts: PostMeta[]
  tags: string[]
  locale: string
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export function BlogList({ posts, tags, locale }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts
  const isEn = locale === "en"

  return (
    <div>
      <span className="section-label">
        {isEn
          ? "// thinking in public"
          : "// thinking in public — desafios, leituras e descobertas"}
      </span>
      <h1 className="h1 mt-1 mb-8">Blog</h1>

      <div className="flex gap-2 flex-wrap mb-8">
        <button
          className={`tag ${activeTag === null ? "active" : ""}`}
          onClick={() => setActiveTag(null)}
        >
          {isEn ? "all" : "todos"}
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag ${activeTag === tag ? "active" : ""}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <motion.div
        className="grid-1"
        variants={container}
        initial="hidden"
        animate="show"
        key={activeTag ?? "all"}
      >
        {filtered.length === 0 ? (
          <p className="p2">
            {isEn ? "No posts with this tag yet." : "Nenhum post com essa tag ainda."}
          </p>
        ) : (
          filtered.map((post) => (
            <motion.div key={post.slug} variants={item}>
              <PostCard post={post} locale={locale} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  )
}
```

**`components/blog/PostCard.tsx`**

```tsx
"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import type { PostMeta } from "@/lib/blog"

interface PostCardProps {
  post: PostMeta
  locale: string
}

export function PostCard({ post, locale }: PostCardProps) {
  const isEn = locale === "en"
  const title   = isEn && post.titleEn   ? post.titleEn   : post.title
  const summary = isEn && post.summaryEn ? post.summaryEn : post.summary
  const rt      = isEn && post.readingTimeEn ? post.readingTimeEn : post.readingTime

  return (
    <motion.div
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 20 } }}
    >
      <Link href={`/${locale}/blog/${post.slug}`} className="card-interactive group">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="badge badge-neutral">{tag}</span>
            ))}
          </div>
          <span className="p3 shrink-0 ml-3">
            {post.date.slice(0, 7)} · {rt}
          </span>
        </div>
        <h3 className="h4 mb-2 group-hover:text-amber-500 transition-colors">{title}</h3>
        <p className="p2 line-clamp-2">{summary}</p>
      </Link>
    </motion.div>
  )
}
```

### Critério de done
- [ ] `/pt/blog` acessível, mostrando lista de posts
- [ ] `/en/blog` mostrando títulos em inglês
- [ ] Filtro por tag funcionando sem reload
- [ ] Animação stagger ao carregar

---

## MILESTONE P3 — Blog: post individual (`/[locale]/blog/[slug]`)
**Estimativa:** 35 min | **Arquivos novos:** 2

### Arquivos a criar

**`app/[locale]/blog/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"
import { PostLayout } from "@/components/blog/PostLayout"

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  const locales = ["pt", "en"]
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const isEn = locale === "en"
  return {
    title: `${isEn && post.titleEn ? post.titleEn : post.title} | Luis Neves`,
    description: isEn && post.summaryEn ? post.summaryEn : post.summary,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug)
  if (!post || !post.published) notFound()

  const allPosts   = getAllPosts(locale as "pt" | "en")
  const idx        = allPosts.findIndex((p) => p.slug === slug)
  const prevPost   = idx < allPosts.length - 1 ? allPosts[idx + 1] : null
  const nextPost   = idx > 0 ? allPosts[idx - 1] : null

  return (
    <PostLayout post={post} locale={locale} prevPost={prevPost} nextPost={nextPost}>
      <article className="prose">
        <MDXRemote source={post.content} />
      </article>
    </PostLayout>
  )
}
```

**`components/blog/PostLayout.tsx`**

```tsx
import Link from "next/link"
import type { PostMeta } from "@/lib/blog"

interface PostLayoutProps {
  post: PostMeta
  locale: string
  prevPost: PostMeta | null
  nextPost: PostMeta | null
  children: React.ReactNode
}

export function PostLayout({
  post,
  locale,
  prevPost,
  nextPost,
  children,
}: PostLayoutProps) {
  const isEn  = locale === "en"
  const title = isEn && post.titleEn ? post.titleEn : post.title
  const rt    = isEn && post.readingTimeEn ? post.readingTimeEn : post.readingTime

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex items-center gap-2 mb-8">
        <Link href={`/${locale}/blog`} className="p3 hover:text-amber-500 transition-colors">
          ← blog
        </Link>
        {post.tags[0] && <><span className="p3">·</span><span className="p3">{post.tags[0]}</span></>}
        <span className="p3">·</span>
        <span className="p3">{post.date.slice(0, 7)}</span>
        <span className="p3">·</span>
        <span className="p3">{rt}</span>
      </div>

      <div className="grid-main-sidebar items-start">
        <div>
          <h1 className="h1 mb-4">{title}</h1>
          <div className="flex flex-wrap gap-1.5 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="badge badge-neutral">{tag}</span>
            ))}
          </div>

          {children}

          <hr className="divider" />
          <div className="flex justify-between items-center gap-4">
            {prevPost ? (
              <Link
                href={`/${locale}/blog/${prevPost.slug}`}
                className="btn-secondary text-left max-w-[45%] truncate"
              >
                ← {isEn && prevPost.titleEn ? prevPost.titleEn : prevPost.title}
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link
                href={`/${locale}/blog/${nextPost.slug}`}
                className="btn-secondary text-right max-w-[45%] truncate"
              >
                {isEn && nextPost.titleEn ? nextPost.titleEn : nextPost.title} →
              </Link>
            ) : <div />}
          </div>
        </div>

        <aside className="flex flex-col gap-4" style={{ position: "sticky", top: "6rem" }}>
          <div className="card">
            <p className="section-label mb-3">
              {isEn ? "about the author" : "sobre o autor"}
            </p>
            <p className="p2 font-medium text-foreground mb-1">
              Luis Otavio Neves Faustino
            </p>
            <p className="p3 mb-4">Engineering Lead · FATEC ADS</p>
            <Link
              href={`/${locale}/contato`}
              className="btn-primary w-full justify-center text-center block"
            >
              {isEn ? "get in touch ↗" : "entrar em contato ↗"}
            </Link>
          </div>
          <div className="card">
            <p className="section-label mb-2">{isEn ? "more posts" : "mais posts"}</p>
            <Link
              href={`/${locale}/blog`}
              className="p2 hover:text-amber-500 transition-colors block"
            >
              ← {isEn ? "all posts" : "todos os posts"}
            </Link>
          </div>
        </aside>
      </div>
    </main>
  )
}
```

### Critério de done
- [ ] `/pt/blog/strapi-para-saas` renderiza o post com MDX
- [ ] Headings, parágrafos, code blocks com estilos `.prose`
- [ ] Sidebar com "sobre o autor" + link para contato
- [ ] Navegação prev/next funcionando
- [ ] `generateStaticParams` gerando rotas estáticas (verificar no `pnpm build`)

---

## MILESTONE P4 — Contato: página e formulário
**Estimativa:** 25 min | **Arquivos novos:** 2

### Arquivos a criar

**`app/[locale]/contato/page.tsx`**

```tsx
import { ContactForm } from "@/components/contact/ContactForm"
import Link from "next/link"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEn = locale === "en"
  return {
    title: isEn ? "Contact — Luis Neves" : "Contato — Luis Neves",
    description: isEn
      ? "Open to internships, freelance projects or just an engineering conversation."
      : "Aberto a estágios, projetos freelance ou uma conversa sobre engenharia.",
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEn = locale === "en"

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <span className="section-label">
        {isEn ? "// get in touch" : "// fale comigo"}
      </span>
      <h1 className="h1 mt-1 mb-2">
        {isEn ? "Contact" : "Contato"}
      </h1>
      <p className="p2 mb-10 max-w-lg">
        {isEn
          ? "Open to internship opportunities, freelance projects or a conversation about engineering and architecture."
          : "Aberto a oportunidades de estágio, projetos freelance ou uma conversa sobre engenharia e arquitetura."}
      </p>

      <div className="grid-main-sidebar items-start">
        <ContactForm locale={locale} />

        <aside className="flex flex-col gap-4">
          <div className="card">
            <p className="section-label mb-3">
              {isEn ? "direct links" : "links diretos"}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:contato@luisneves.dev.br"
                className="p2 hover:text-amber-500 transition-colors"
              >
                contato@luisneves.dev.br
              </a>
              <a
                href="https://github.com/luisoneves"
                target="_blank"
                rel="noopener noreferrer"
                className="p2 hover:text-amber-500 transition-colors"
              >
                github ↗
              </a>
              <a
                href="https://linkedin.com/in/luisneves-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p2 hover:text-amber-500 transition-colors"
              >
                linkedin ↗
              </a>
            </div>
          </div>

          <div className="card-success">
            <p className="section-label mb-2" style={{ color: "#22c55e" }}>
              {isEn ? "availability" : "disponibilidade"}
            </p>
            <p className="p2">
              <span style={{ color: "#22c55e" }}>● </span>
              {isEn ? "available" : "disponível"}
            </p>
            <p className="p3 mt-1">
              {isEn
                ? "Mon–Thu: afternoons · Fri–Sat: open"
                : "Seg–Qui: tarde · Sex–Sáb: ampla"}
            </p>
          </div>

          <div className="card">
            <p className="section-label mb-2">
              {isEn ? "recruiting?" : "está recrutando?"}
            </p>
            <p className="p2 mb-3">
              {isEn ? "Download the full resume" : "Baixe o currículo completo"}
            </p>
            <Link href={`/${locale}/curriculo`} className="btn-secondary">
              {isEn ? "resume ↓" : "currículo ↓"}
            </Link>
          </div>
        </aside>
      </div>
    </main>
  )
}
```

**`components/contact/ContactForm.tsx`**

```tsx
"use client"
import { useState } from "react"
import { toast } from "sonner"
import { sendContactEmail } from "@/app/actions/sendContact"

interface ContactFormProps {
  locale: string
}

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactForm({ locale }: ContactFormProps) {
  const isEn = locale === "en"
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "work",
    message: "",
  })

  const subjects = isEn
    ? [
        { value: "work",      label: "Work opportunity" },
        { value: "freelance", label: "Freelance project" },
        { value: "tech",      label: "Tech conversation" },
        { value: "other",     label: "Other" },
      ]
    : [
        { value: "work",      label: "Oportunidade de trabalho" },
        { value: "freelance", label: "Projeto freelance" },
        { value: "tech",      label: "Conversa técnica" },
        { value: "other",     label: "Outro" },
      ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error(
        isEn
          ? "Please fill all required fields."
          : "Preencha todos os campos obrigatórios."
      )
      return
    }
    setLoading(true)
    const result = await sendContactEmail(form)
    setLoading(false)
    if (result.success) {
      toast.success(
        isEn
          ? "Message sent! I'll reply within 48h."
          : "Mensagem enviada! Respondo em até 48h."
      )
      setForm({ name: "", email: "", subject: "work", message: "" })
    } else {
      toast.error(
        isEn
          ? "Something went wrong. Try again."
          : "Algo deu errado. Tente novamente."
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-highlight">
      <p className="section-label mb-4" style={{ color: "var(--amber-brand)" }}>
        {isEn
          ? "// send a message"
          : "// envie uma mensagem — respondo por email"}
      </p>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">{isEn ? "name *" : "nome *"}</label>
          <input
            type="text"
            className="form-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={isEn ? "Your name" : "Seu nome"}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">email *</label>
          <input
            type="email"
            className="form-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="seu@email.com"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">{isEn ? "subject" : "assunto"}</label>
        <select
          className="form-input"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        >
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">{isEn ? "message *" : "mensagem *"}</label>
        <textarea
          className="form-input"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={
            isEn
              ? "Tell me about your project or opportunity..."
              : "Me conta sobre o projeto ou oportunidade..."
          }
          required
          style={{ resize: "vertical" }}
        />
      </div>

      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="_honey"
        style={{ display: "none" }}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="flex justify-between items-center mt-2 flex-wrap gap-3">
        <span className="p3">
          {isEn ? "No spam · Reply within 48h" : "Sem spam · Respondo em até 48h"}
        </span>
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading
            ? isEn ? "Sending..." : "Enviando..."
            : isEn ? "Send message ↗" : "Enviar mensagem ↗"}
        </button>
      </div>
    </form>
  )
}
```

### Critério de done
- [ ] `/pt/contato` e `/en/contato` acessíveis sem 404
- [ ] Formulário renderizando com todos os campos
- [ ] Honeypot presente (oculto)
- [ ] Validação de campos obrigatórios com toast de erro

---

## MILESTONE P5 — Contato: Server Action + Resend
**Estimativa:** 20 min | **Arquivo novo:** 1 | **Instalação:** 1 pacote

### Instalação

```bash
npm install resend
```

### Variáveis de ambiente — adicionar em `.env.local`:

```bash
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXX
CONTACT_TO_EMAIL=contato@luisneves.dev.br
```

> Verificar que `.env.local` está no `.gitignore`. Adicionar `RESEND_API_KEY=` (sem valor) ao `.env.example`.

### Arquivo a criar: `app/actions/sendContact.ts`

```ts
"use server"
import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  subject: z.enum(["work", "freelance", "tech", "other"]),
  message: z.string().min(10).max(2000),
})

const subjectLabels: Record<string, string> = {
  work:      "Oportunidade de trabalho",
  freelance: "Projeto freelance",
  tech:      "Conversa técnica",
  other:     "Outro",
}

export async function sendContactEmail(data: unknown) {
  const parsed = ContactSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos." }
  }

  const { name, email, subject, message } = parsed.data
  const subjectLabel = subjectLabels[subject] ?? subject
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "contato@luisneves.dev.br"

  try {
    // Notificação para Luis
    await resend.emails.send({
      from:    "Portfolio <onboarding@resend.dev>",
      to:      [toEmail],
      replyTo: email,
      subject: `[Portfolio] ${subjectLabel} — ${name}`,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#1a1a1a;margin-bottom:16px">Nova mensagem via portfolio</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
            <tr><td style="padding:6px 0;color:#666;width:100px">Nome</td><td style="padding:6px 0">${name}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#666">Assunto</td><td style="padding:6px 0">${subjectLabel}</td></tr>
          </table>
          <div style="background:#faeeda;border-radius:8px;padding:16px;border-left:3px solid #d97706">
            <p style="margin:0;white-space:pre-wrap;color:#333">${message}</p>
          </div>
          <p style="color:#999;font-size:12px;margin-top:16px">Enviado via dev-luisneves.me</p>
        </div>
      `,
    })

    // Confirmação para o remetente
    await resend.emails.send({
      from:    "Luis Neves <onboarding@resend.dev>",
      to:      [email],
      subject: "Recebi sua mensagem!",
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#1a1a1a">Olá, ${name}!</h2>
          <p style="color:#444;line-height:1.6">Recebi sua mensagem e responderei em até 48 horas.</p>
          <div style="background:#faeeda;border-radius:8px;padding:16px;margin:16px 0;border-left:3px solid #d97706">
            <p style="margin:0;color:#854f0b;font-size:14px;font-style:italic">"${message.slice(0, 150)}${message.length > 150 ? "..." : ""}"</p>
          </div>
          <p style="color:#444">Até logo,<br><strong>Luis Neves</strong></p>
          <p style="color:#999;font-size:12px">dev-luisneves.me</p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("[sendContactEmail]", error)
    return { success: false, error: "Erro ao enviar email." }
  }
}
```

> **Nota produção:** O `from: "onboarding@resend.dev"` só funciona para testes no free tier.
> Para produção: verificar domínio `luisneves.dev.br` no painel Resend e trocar para `contato@luisneves.dev.br`.

### Critério de done
- [ ] `RESEND_API_KEY` no `.env.local`
- [ ] Preencher formulário e receber email em `contato@luisneves.dev.br`
- [ ] Remetente recebe email de confirmação
- [ ] Erro de validação Zod retorna `{ success: false }` sem quebrar

---

## MILESTONE P6 — Integração na Home
**Estimativa:** 20 min | **Arquivos novos:** 2 | **Arquivos modificados:** 1

### Objetivo
Adicionar os 3 últimos posts do blog e um banner CTA de contato na home.
`getAllPosts()` usa `fs` — funciona em Server Components. A home é Client Component (`"use client"`).
**Solução:** converter apenas o que precisa de dados do blog para Server Component, ou buscar os posts no nível da página.

> O `app/[locale]/page.tsx` atual é `"use client"` por causa do `useTranslations`.
> Para buscar posts no servidor, criar um Server Component wrapper.

### Arquivo a modificar: `app/[locale]/page.tsx`

Transformar para Server Component que passa dados para Client Components:

```tsx
// REMOVER "use client" do topo
// Adicionar import de getAllPosts
import { getAllPosts } from "@/lib/blog"
import { HomeClient } from "@/components/home/HomeClient"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const latestPosts = getAllPosts(locale as "pt" | "en").slice(0, 3)

  return <HomeClient locale={locale} latestPosts={latestPosts} />
}
```

### Arquivo a criar: `components/home/HomeClient.tsx`

Mover TODO o conteúdo atual de `app/[locale]/page.tsx` para este Client Component,
acrescentando `LatestPosts` e `ContactCTA` ao final:

```tsx
"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { TypingCycle } from "@/components/hero/TypingCycle"
import { ManifestoBlock } from "@/components/sections/ManifestoBlock"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { ArchitectureSection } from "@/components/sections/ArchitectureSection"
import { CICDSection } from "@/components/sections/CICDSection"
import { StackSection } from "@/components/sections/StackSection"
import { NotesSection } from "@/components/sections/NotesSection"
import { LatestPosts } from "@/components/sections/LatestPosts"
import { ContactCTA } from "@/components/sections/ContactCTA"
import type { PostMeta } from "@/lib/blog"

interface HomeClientProps {
  locale: string
  latestPosts: PostMeta[]
}

export function HomeClient({ locale, latestPosts }: HomeClientProps) {
  const t    = useTranslations("hero")
  const a11y = useTranslations("a11y")

  return (
    <main className="max-w-5xl mx-auto px-4">
      {/* ── HERO ── */}
      <section className="pt-12 pb-20">
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
            {t("badge")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-medium leading-tight mb-2"
        >
          {t("title1")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-medium leading-tight mb-6"
          aria-live="polite"
          aria-atomic="true"
        >
          <TypingCycle />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-base text-muted-foreground max-w-xl leading-relaxed mb-8"
        >
          {t("description")}{" "}
          <strong className="text-foreground font-medium">{t("highlight")}</strong>{" "}
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex gap-8 mb-8 text-sm"
        >
          <div>
            <span className="font-mono text-2xl font-medium text-foreground">15+</span>
            <p className="text-muted-foreground text-xs mt-0.5">{t("stats.yearsLabel")}</p>
          </div>
          <div>
            <span className="font-mono text-2xl font-medium text-foreground">4</span>
            <p className="text-muted-foreground text-xs mt-0.5">{t("stats.projectsLabel")}</p>
          </div>
          <div>
            <span className="font-mono text-lg font-medium text-amber-500">v1→v3</span>
            <p className="text-muted-foreground text-xs mt-0.5">{t("stats.iterationsLabel")}</p>
          </div>
          <div>
            <span className="font-mono text-sm font-medium text-foreground leading-tight">
              Pragmatic<br />Programmer
            </span>
            <p className="text-muted-foreground text-xs mt-0.5">{t("stats.readingLabel")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex gap-3 flex-wrap"
        >
          <a href="#projetos" className="btn-primary">{t("cta.projects")}</a>
          <a
            href="https://github.com/luisoneves"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub (${a11y("externalLink")})`}
            className="btn-secondary"
          >
            {t("cta.github")}
          </a>
          <a href={`/${locale}/contato`} className="btn-secondary">
            {t("cta.contact")}
          </a>
        </motion.div>
      </section>

      <ManifestoBlock />
      <ProjectsSection />
      <ArchitectureSection />
      <CICDSection />
      <StackSection />
      <NotesSection />

      {/* ── ÚLTIMOS POSTS ── */}
      {latestPosts.length > 0 && (
        <LatestPosts posts={latestPosts} locale={locale} />
      )}

      {/* ── CTA CONTATO ── */}
      <ContactCTA locale={locale} />
    </main>
  )
}
```

### Arquivo a criar: `components/sections/LatestPosts.tsx`

```tsx
import Link from "next/link"
import { PostCard } from "@/components/blog/PostCard"
import type { PostMeta } from "@/lib/blog"

interface LatestPostsProps {
  posts: PostMeta[]
  locale: string
}

export function LatestPosts({ posts, locale }: LatestPostsProps) {
  const isEn = locale === "en"
  return (
    <section className="py-16">
      <div className="flex justify-between items-center mb-2">
        <span className="section-label">
          {isEn ? "// latest posts" : "// últimas notas de engenharia"}
        </span>
        <Link
          href={`/${locale}/blog`}
          className="p3 hover:text-amber-500 transition-colors"
        >
          {isEn ? "all posts →" : "ver todos →"}
        </Link>
      </div>
      <div className="grid-3 mt-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </section>
  )
}
```

### Arquivo a criar: `components/sections/ContactCTA.tsx`

```tsx
import Link from "next/link"

interface ContactCTAProps {
  locale: string
}

export function ContactCTA({ locale }: ContactCTAProps) {
  const isEn = locale === "en"
  return (
    <section className="py-12">
      <div className="card-highlight flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="h3 mb-1">
            {isEn ? "Open to opportunities" : "Aberto a oportunidades"}
          </h3>
          <p className="p2">
            {isEn
              ? "Internship, freelance or just a technical conversation."
              : "Estágio, freelance ou só uma conversa técnica."}
          </p>
        </div>
        <div className="flex gap-3 shrink-0 flex-wrap">
          <Link href={`/${locale}/contato`} className="btn-primary">
            {isEn ? "get in touch ↗" : "entrar em contato ↗"}
          </Link>
          <Link href={`/${locale}/curriculo`} className="btn-secondary">
            {isEn ? "resume ↓" : "currículo ↓"}
          </Link>
        </div>
      </div>
    </section>
  )
}
```

### Critério de done
- [ ] Home mostrando os 3 últimos posts
- [ ] Banner "Aberto a oportunidades" visível antes do footer
- [ ] Link "ver todos →" vai para `/[locale]/blog`
- [ ] CTA "entrar em contato" vai para `/[locale]/contato`

---

## MILESTONE P7 — Navbar e CommandPalette com novas rotas
**Estimativa:** 15 min | **Arquivos modificados:** 2

### Arquivo a modificar: `components/Navbar.tsx`

Adicionar `blog` e `contact` ao array `navItems`:

```tsx
const navItems = [
  { key: "projects",     href: "#projetos" },
  { key: "architecture", href: "#arquitetura" },
  { key: "stack",        href: "#stack" },
  { key: "notes",        href: "#notas" },
  { key: "blog",         href: "/blog" },     // ← novo (usar locale prefix via Link)
  { key: "resume",       href: "/curriculo" },
]
```

> ATENÇÃO: `href: "/blog"` funcionará se usar `<Link href={`/${locale}${item.href}`}>`.
> Verificar como o Navbar resolve o locale para os hrefs relativos. Se necessário, usar
> `useLocale()` do next-intl para construir o href completo: `/${locale}/blog`.

Adaptar o `<Link>` do Navbar para itens com paths:

```tsx
// Lógica para href: se começa com # é âncora local, se começa com / é rota com locale
const resolvedHref = item.href.startsWith("#")
  ? item.href
  : `/${locale}${item.href}`

<Link key={item.key} href={resolvedHref} ...>
  {t(item.key)}
</Link>
```

### Arquivo a modificar: `components/CommandPalette.tsx`

Dentro de `commands`, no grupo de navegação, adicionar os novos items.
O CommandPalette usa `useTranslations("commandPalette")` e as chaves já foram adicionadas no FIX-02:

```tsx
// No array items do grupo "Navegação", adicionar:
{
  label: t("items.goBlog"),
  action: () => router.push(`/${locale}/blog`)
},
{
  label: t("items.goContact"),
  action: () => router.push(`/${locale}/contato`)
},
```

> O CommandPalette precisa de `useLocale()` e `useRouter()` do next-intl para navegar com locale.
> Verificar se já importa esses hooks. Se não, adicionar:
> ```tsx
> import { useLocale } from "next-intl"
> import { useRouter } from "next/navigation"
> const locale = useLocale()
> const router = useRouter()
> ```

### Critério de done
- [ ] Link "blog" e "contato" visíveis na navbar
- [ ] `⌘K` → buscar "blog" → navega para `/pt/blog`
- [ ] Active state correto no link da página atual

---

## MILESTONE P8 — Sitemap e Toaster global
**Estimativa:** 10 min | **Arquivos modificados:** 2**

### Arquivo a modificar: `app/sitemap.ts`

> Substituição total segura — esta versão é superset da anterior.

```ts
import type { MetadataRoute } from "next"
import { getAllPostSlugs } from "@/lib/blog"

const BASE_URL = "https://dev-luisneves.me"

export default function sitemap(): MetadataRoute.Sitemap {
  const locales      = ["pt", "en"]
  const staticRoutes = ["/", "/curriculo", "/blog", "/contato"]
  const slugs        = getAllPostSlugs()

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url:              `${BASE_URL}/${locale}${route === "/" ? "" : route}`,
      lastModified:     new Date(),
      changeFrequency:  "monthly" as const,
      priority:         route === "/" ? 1 : route === "/blog" ? 0.9 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l === "pt" ? "pt-BR" : "en-US",
            `${BASE_URL}/${l}${route === "/" ? "" : route}`,
          ])
        ),
      },
    }))
  )

  const postEntries = locales.flatMap((locale) =>
    slugs.map((slug) => ({
      url:             `${BASE_URL}/${locale}/blog/${slug}`,
      lastModified:    new Date(),
      changeFrequency: "yearly" as const,
      priority:        0.7,
    }))
  )

  return [...staticEntries, ...postEntries]
}
```

### Arquivo a modificar: `app/[locale]/layout.tsx`

O `<Toaster />` do sonner precisa estar no layout para funcionar em todas as páginas
(formulário de contato usa `toast.success`):

```tsx
// Adicionar import no topo:
import { Toaster } from "sonner"

// Adicionar dentro do <body>, após </PageTransition> e antes de </SmoothScrollProvider>:
<Toaster position="bottom-right" />
```

### Critério de done
- [ ] `/sitemap.xml` listando todas as rotas incluindo blog e contato
- [ ] Posts de blog aparecendo no sitemap
- [ ] Toast de sucesso aparece ao enviar o formulário de contato

---

## CHECKLIST DE FECHAMENTO DA BRANCH

```bash
# Build final
pnpm build

# Se OK:
git add .
git commit -m "feat: design system + blog MDX + contato Resend

FIX-01: root layout mínimo + redirect root page + deletar arquivos legados
FIX-02: nav.blog + commandPalette items em pt.json e en.json
P0:  styles/design-tokens.css + layers typography/components em globals.css
P1:  lib/blog.ts + content/blog/ com 2 posts MDX
P2:  /blog listagem com filtro por tag + stagger animations
P3:  /blog/[slug] post individual + sidebar + navegação prev/next
P4:  /contato página + ContactForm com honeypot
P5:  app/actions/sendContact.ts + Resend API
P6:  Home refatorada (Server + Client split) + LatestPosts + ContactCTA
P7:  Navbar + CommandPalette com blog e contato
P8:  sitemap com blog + Toaster no layout"

git push origin feature/design-system-blog-contact

git checkout main
git merge feature/design-system-blog-contact --no-ff \
  -m "merge: design-system-blog-contact → main"

git push origin main
```

---

## NOTAS PARA O AGENTE

1. **FIX-01 PRIMEIRO, sempre.** O root layout com `className="dark"` e Navbar/Footer duplicados é o problema mais crítico. Não começar P0 sem FIX-01 feito.

2. **NÃO recriar mensagens/pt.json ou en.json.** Esses arquivos existem com todas as traduções. No FIX-02, usar merge de JSON ou editar diretamente — nunca substituir o arquivo inteiro.

3. **`next.config.ts` NÃO precisa ser alterado** neste milestone. `next-mdx-remote` processa MDX em runtime sem plugin.

4. **`lib/blog.ts` usa `fs`** (Node.js). Só pode ser importado em Server Components ou em funções `generate*`. Nunca importar diretamente em Client Components.

5. **`app/[locale]/page.tsx` vira Server Component** no P6. O conteúdo atual (hero, sections) vai para `components/home/HomeClient.tsx` como Client Component. Não esquecer de mover o `"use client"` e todos os imports.

6. **Checkpoint após P0** é obrigatório antes de P1. Se o design system quebrar o build, melhor descobrir antes de criar 8 novos arquivos.

7. **`app/curriculo/page.tsx`** (sem locale) deve ser deletado no FIX-01. A versão correta está em `app/[locale]/curriculo/page.tsx`.

8. **`lib/notes.ts`** (raiz) deve ser deletado no FIX-01. A versão canônica está em `lib/data/notes.ts`.

9. **Resend free tier:** `from` deve ser `onboarding@resend.dev` para testes. Para produção, verificar o domínio `luisneves.dev.br` em `resend.com/domains`.

10. **Variáveis de ambiente:** `RESEND_API_KEY` e `CONTACT_TO_EMAIL` só existem em `.env.local`. Adicionar ao `.env.example` sem o valor real, para documentar as variáveis necessárias.

---

*Luis Otavio Neves Faustino · dev-luisneves.me · feature/design-system-blog-contact · março 2026*
