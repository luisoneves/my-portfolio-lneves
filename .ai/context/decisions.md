# Decisions — Portfolio
> ADRs: o "porquê" que o código não consegue explicar.
> Registrar toda decisão que custou tempo ou que alguém poderia querer reverter.

---

## ADR-001: Migração de vanilla HTML para Next.js 16

**Data:** 2025-03
**Status:** aceito

### Contexto
Portfolio original era vanilla HTML + CSS nativo + JS ES6 Modules sem build tool.
Objetivo de adicionar Framer Motion, Lenis, cmdk e Command Palette exigia React.
Além disso, o portfolio deve evoluir para blueprint do WaaS — precisa da mesma stack.

### Decisão
Migrar completamente para Next.js 16 App Router + TypeScript Strict + Tailwind 4.
Projeto vanilla movido para `_legacy/` (não deletado — referência histórica).

### Alternativas consideradas
- **Manter vanilla + adicionar animações CSS**: rejeitado — perderia 3D tilt, cmdk, Lenis
- **Astro**: considerado — bom para sites estáticos, mas diverge do WaaS (Next.js)
- **Remix**: rejeitado — sem vantagem real sobre Next.js para este caso

### Consequências
Positivas: mesma stack do WaaS, Framer Motion, cmdk, deploy igual.
Negativas: `npm run build` necessário, não abre mais com `index.html` direto.

### Revisão
Reavaliar somente se Next.js introduzir breaking change grave. Improvável.

---

## ADR-002: Dados estáticos em lib/ (sem banco por ora)

**Data:** 2025-03
**Status:** aceito — revisão programada

### Contexto
Portfolio precisa exibir projetos, stack, notas de engenharia.
Opções: hardcoded nos componentes, arquivos lib/*.ts, ou PostgreSQL.

### Decisão
Dados em arrays tipados em `lib/` — separados dos componentes, sem banco.

### Alternativas consideradas
- **Hardcoded nos componentes**: rejeitado — mistura dados com markup
- **PostgreSQL agora**: rejeitado — WaaS ainda não tem banco; duplicar esforço
- **Headless CMS (Strapi, Contentful)**: rejeitado — Diocese SaaS v2 provou que Strapi não escala para multi-tenant; Contentful tem custo

### Consequências
Positivas: zero complexidade, zero custo, deploy estático.
Negativas: editar conteúdo exige PR + deploy.

### Revisão
Migrar para PostgreSQL quando WaaS Nível II estiver estável.
Portfolio entra como primeiro tenant. Ver PORTFOLIO_BACKLOG.md.

---

## ADR-003: Framer Motion como biblioteca de animações (não GSAP)

**Data:** 2025-03
**Status:** aceito

### Contexto
Portfolio precisa de: page transitions, stagger reveal, 3D tilt em cards, smooth scroll.

### Decisão
Framer Motion para todas as animações de componente. Lenis para smooth scroll.
GSAP descartado para este projeto.

### Alternativas consideradas
- **GSAP + ScrollTrigger**: rejeitado para portfolio — overhead desnecessário; GSAP faz sentido no WaaS para templates com animações cinematográficas de cliente
- **CSS animations puro**: rejeitado — não cobre 3D tilt com física de spring nem gesture-driven animations
- **Motion (ex Popmotion)**: mesmo mantenedor do Framer Motion, sem vantagem aqui

### Consequências
Positivas: spring physics, layout animations, whileInView — tudo no mesmo pacote.
Negativas: bundle ~45kb gzip. Aceitável para portfolio.

### Revisão
Reavaliar se bundle size virar problema. Improvável dado o tipo de site.

---

## ADR-004: Deploy na Vercel (não Netlify)

**Data:** 2025-03
**Status:** aceito

### Contexto
Portfolio Next.js precisa de hosting. WaaS usa Netlify (gratuito, multi-domínio).

### Decisão
Portfolio fica na Vercel. WaaS fica na Netlify.
Separação consciente: cada produto no hosting mais adequado.

### Alternativas consideradas
- **Netlify para os dois**: possível — mas Vercel tem integração nativa melhor com Next.js (ISR, Edge Functions, Analytics)
- **Railway**: rejeitado para portfolio estático — custo sem benefício

### Consequências
Positivas: preview deployments automáticos por PR, zero config para Next.js.
Negativas: dois painéis de hosting para gerenciar.

### Revisão
Consolidar quando WaaS Nível II precisar de Railway (backend). Avaliar custo vs conveniência.

---

## ADR-005: Pasta .ai como base de conhecimento pessoal

**Data:** 2025-03
**Status:** aceito

### Contexto
Projetos acumulam decisões, contextos e aprendizados que se perdem entre sessões.
Agentes de IA precisam de contexto estruturado para não tomar decisões inconsistentes.

### Decisão
Pasta `.ai/` no projeto com framework de raciocínio v2.3.
Arquivos ignorados pelo `.gitignore` — contexto pessoal, não vai para o repo público.
Estrutura: core/, workflow/, architecture/, context/, disciplines/, levels/, knowledge/, templates/.

### Consequências
Positivas: agente lê contexto antes de operar, decisões ficam documentadas, aprendizados acumulam em knowledge/.
Negativas: requer disciplina para manter atualizado.

### Revisão
Estrutura madura (v2.3). Cresce via knowledge/ com experiência real.

---

## ADR-006: i18n pt-BR/en vai para backlog (sem implementacao agora)

**Data:** 2026-03-15
**Status:** aceito

### Contexto
O portfolio original tinha trilha bilingue (pt/en), mas a versao atual em Next.js esta 100% em pt-BR.
No momento, o foco imediato e consolidar base tecnica (SEO, a11y, dark mode real, favicon/logo) sem ampliar complexidade de manutencao de conteudo.

### Decisao
Nao implementar i18n agora.
Registrar i18n (pt-BR/en) no backlog para fase posterior, com gatilho por demanda real de publico internacional/recrutadores.

### Alternativas consideradas
- **Implementar i18n agora (next-intl/roteamento por locale)**: rejeitado por prioridade; aumentaria escopo e custo de manutencao neste ciclo.
- **Duplicar paginas manualmente em /en**: rejeitado por risco de divergencia de conteudo.
- **Manter apenas pt-BR por ora**: aceito como trade-off consciente.

### Consequências
Positivas: foco em correcoes de maior impacto imediato e menor risco de regressao.
Negativas: experiencia em ingles fica pendente para usuarios internacionais.

### Revisão
Reavaliar apos fechar pendencias de UX/SEO/a11y e quando houver evidencia de demanda internacional.

---

*Última atualização: março 2026*
