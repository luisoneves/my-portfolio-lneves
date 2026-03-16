# AUDIT REPORT — SEO · A11Y · DARK MODE

Data: 15/03/2026
Branch: audit/seo-a11y-darkmode
Escopo: auditoria apenas, sem correcoes de codigo

## Como o audit foi feito

1. Leitura dos arquivos de contexto e runtime:
   - .ai/context/project-context.md
   - .ai/context/decisions.md
   - .ai/CHECKPOINT.md
2. Leitura dos arquivos principais do app:
   - app/layout.tsx
   - app/page.tsx
   - app/globals.css
   - package.json
3. Leitura das rotas e componentes relevantes para SEO/a11y/performance:
   - app/curriculo/page.tsx
   - app/sitemap.ts
   - public/robots.txt
   - components/**/* (Navbar, Footer, CommandPalette, sections, cards)
4. Verificacao de padroes com busca de codigo:
   - imagens e atributos alt
   - hierarquia de headings
   - aria-label / tabIndex / eventos de teclado
   - dark mode hardcoded e prefers-color-scheme
5. Build de producao executado para coleta de evidencias de performance:
   - comando: npm run build
   - resultado: build concluido com sucesso e rotas estaticas geradas (/ e /curriculo)

---

## 1) SEO

- Todas as paginas tem title e description unicos? -> ⚠️ ATENCAO
  - `/` usa metadata global do layout
  - `/curriculo` define metadata propria
  - risco: falta estrategia explicita para metadados por rota futura

- sitemap.xml acessivel em /sitemap.xml? -> ✅ OK
  - Implementado em app/sitemap.ts
  - Confirmado no build como rota estatica /sitemap.xml

- robots.txt presente e correto em public/? -> ✅ OK
  - public/robots.txt presente com `User-agent`, `Allow` e `Sitemap`

- canonical URL configurada? -> ❌ PROBLEMA
  - Nao ha `alternates.canonical` no metadata

- metadataBase presente no layout.tsx? -> ✅ OK
  - Definido em app/layout.tsx

---

## 2) Meta Tags / Open Graph

- og:title, og:description, og:image, og:url presentes? -> ✅ OK
  - Configurados em `metadata.openGraph` no layout

- twitter:card configurado? -> ✅ OK
  - `summary_large_image` configurado

- og-image.png existe em public/? -> ✅ OK
  - Arquivo presente em public/og-image.png

- Verificacao manual opengraph.xyz -> ⚠️ ATENCAO
  - Necessario validar snapshot/preview publico apos deploy

Observacao:
- `og:url` esta fixo para home no layout global; se houver estrategia por rota, revisar para URLs canonicas especificas.

---

## 3) Acessibilidade (a11y)

- Todas as imagens tem atributo alt? -> ✅ OK
  - Imagens com `next/image` no Navbar possuem `alt`

- Headings em ordem correta (h1 -> h2 -> h3)? -> ❌ PROBLEMA
  - Home possui dois `<h1>` consecutivos em app/page.tsx
  - Recomendado manter apenas um h1 por pagina

- Botoes e links tem aria-label quando necessario? -> ❌ PROBLEMA
  - `CommandPaletteHint` usa botao iconico sem `aria-label`
  - `ProjectCard` usa `div` clicavel com `onClick` (sem foco/teclado nativos)

- Contraste de cores adequado (WCAG AA)? -> ⚠️ ATENCAO
  - Base parece consistente, mas tons amber em texto pequeno exigem validacao com ferramenta

- Focus ring visivel (globals.css)? -> ✅ OK
  - `*:focus-visible` definido com outline visivel

- CommandPalette acessivel via teclado? -> ⚠️ ATENCAO
  - Atalho Ctrl/Cmd+K funciona
  - Falta revisar semantica/modal a11y completa (foco inicial, anuncio e navegacao assistiva)

---

## 4) Dark / Light Mode

- O <html> tem className="dark" hardcoded? -> ❌ PROBLEMA
  - Sim, em app/layout.tsx

- prefers-color-scheme esta funcionando ou ignorado? -> ❌ PROBLEMA
  - Parcialmente ignorado por causa do dark hardcoded no html
  - Elementos com classes `dark:*` ficam sempre em modo escuro

- next-themes esta instalado? -> ⚠️ ATENCAO
  - Nao encontrado em package.json
  - Registrar fix pendente para toggle de tema real

---

## 5) i18n (pt-BR / en)

- Site atual sem bilingue comparado ao original -> ⚠️ ATENCAO
- Decisao recomendada: NAO implementar agora
- Encaminhamento: backlog com ADR especifica e gatilho por demanda real

Resumo da recomendacao:
- Agora: manter pt-BR apenas para reduzir complexidade
- Backlog: preparar estrutura i18n quando houver necessidade concreta de publico en

---

## 6) Performance

- Imagens usando next/image com width/height? -> ✅ OK
  - Navbar usa next/image com dimensoes explicitas

- Fontes com display: swap? -> ✅ OK
  - Fontes carregadas via `next/font` (comportamento otimizado padrao)

- Bundle size (saida do next build ja executado) -> ⚠️ ATENCAO
  - Build executado com sucesso, mas sem breakdown de KB por rota no output atual do Turbopack
  - Necessario complementar com analise dedicada de bundle (manual/tooling)

- Lighthouse localhost (manual) -> ⚠️ ATENCAO
  - Necessario rodar avaliacao manual (Performance, SEO, A11Y, Best Practices)

---

## Pendencias adicionais lembradas no escopo

- Logo novo da pagina ainda nao aplicado -> ⚠️ ATENCAO
  - Arquivo novo existe: public/logo-LN_darkmode-new.png
  - Navbar ainda referencia `logo-LN_darkmode.png` e `logo-LN_ligthmode.png`

- Favicon ausente na pagina (configuracao incompleta) -> ❌ PROBLEMA
  - Existem arquivos em public/favicon/, mas falta estrategia ativa de favicon no app router (ex.: app/favicon.ico ou metadata.icons)

---

## Prioridade sugerida de fixes (proxima sessao)

1. Corrigir dark mode hardcoded + implementar toggle de tema
2. Corrigir semantica a11y (h1 unico, card clicavel acessivel, aria-labels)
3. Configurar canonical por rota
4. Aplicar logo novo e configurar favicon corretamente
5. Definir plano i18n (backlog) sem implementacao imediata
6. Rodar validacoes manuais: opengraph.xyz + Lighthouse

---

## Evidencia de build

- Comando executado: `npm run build`
- Resultado: sucesso
- Rotas estaticas geradas:
  - /
  - /curriculo
  - /sitemap.xml
