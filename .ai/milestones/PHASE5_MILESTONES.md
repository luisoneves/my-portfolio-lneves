# PHASE 5 — Layout Refinement + Narrative Alignment

**Data:** 2026-03-19
**Status:** In Progress
**Branch:** `fix/layout-refinement`

---

## 🎯 OBJETIVO

Refinar layout visual, corrigir inconsistências, reintroduzir elementos visuais importantes (timeline),
e alinhar narrativa de projetos com posicionamento de Software Architect.

---

## PROCESSO OBRIGATÓRIO

Para cada etapa:

1. Implementar alteração
2. Testar: `npm run dev`
3. Validar build: `npm run build`
4. Commit: `git commit -m "fix: descrição clara"`

---

## ✅ ETAPA 1 — HERO + TIMELINE (CRÍTICO)

### Parte A — LOGO NO HERO

**Objetivo:** Preencher espaço vazio da coluna direita do Hero

**Implementação:**
```tsx
<div className="hidden md:flex items-center justify-center">
  <img
    src="/logo.svg"
    alt="Logo"
    className="max-w-[300px] opacity-80"
  />
</div>
```

**Dark mode (se existir logo escuro):**
Usar condicional com `next-themes` ou CSS para alternar.

**Resultado esperado:**
- Hero equilibrado
- Espaço direito utilizado
- Identidade visual reforçada

---

### Parte B — RESTAURAR TIMELINE (VERSÃO REFINADA)

**Problema:** Timeline antiga foi removida, causando perda de contexto visual

**Nova estrutura alinhada com narrativa atual:**

```
Portfolio → WaaS → C4TS → Experimentação
```

**Implementação:**
- Reintroduzir timeline na seção de projetos
- Usar nova narrativa: "Trilha de evolução"
- Destacar Portfolio como projeto principal

**Resultado esperado:**
- Elemento visual forte restaurado
- Comunica evolução real
- Alinhado com narrativa de arquiteto

---

## 📏 ETAPA 2 — CORRIGIR SCROLL FANTASMA

**Problema:** Scroll vertical sem conteúdo adicional

**Ações:**
- Remover `min-h` desnecessário
- Ajustar padding (`py-20` → `py-16` ou `py-12`)
- Revisar margins internas

**Resultado esperado:**
- Sem scroll vazio
- Altura proporcional

---

## 🧩 ETAPA 3 — PADRONIZAR CARDS

**Problema:** Cards com alturas inconsistentes

**Implementação:**
Adicionar ao card:
```tsx
className="h-full flex flex-col justify-between"
```

Ou garantir grid uniforme:
```tsx
grid auto-rows-fr
```

**Resultado esperado:**
- Todos cards alinhados
- Layout consistente

---

## 🧠 ETAPA 4 — REORGANIZAR PROJETOS (NARRATIVA FINAL)

### 🔹 EM EVOLUÇÃO

1. **Portfolio** (PRIMEIRO)
   - Status: Em evolução
   - Descrição:
     Portfólio desenvolvido como artefato de posicionamento técnico,
     evoluindo continuamente com melhorias de arquitetura, UX e narrativa.

2. **WaaS** (Website as a Service)
   - Status: Em desenvolvimento
   - Descrição:
     1 deploy + N clientes.
     Engine config-driven com Registry Pattern,
     renderer dinâmico e theme engine com CSS variables.
     Multi-tenant por host.

3. **C4TS Market Research**
   - Status: Em desenvolvimento
   - Descrição:
     Plataforma para captação de clientes e posicionamento local,
     com foco em formulários e armazenamento de dados.

4. **AI Rules System** (NOVO - do apêndice)
   - Status: Em desenvolvimento
   - Descrição:
     Sistema pessoal de princípios e diretrizes para uso consistente de IA no desenvolvimento de software.
     Evolui continuamente com foco em arquitetura e engenharia de software, priorizando decisões que aumentem a adaptabilidade e a longevidade dos sistemas.

### 🔹 EXPERIMENTAÇÃO

- BeautyCare
- Gestão de Capelas

### 🔹 PAUSADOS

- Diocese SaaS
- Static Mockup

**Resultado esperado:**
- Narrativa clara de evolução
- Projetos bem posicionados
- Reforço de maturidade técnica

---

## 🔗 ETAPA 5 — CORRIGIR NAVEGAÇÃO

**Problema:** Links apontando para `/pt/contato#projetos`

**Correção:** Alterar para:
- `/pt#projetos`
- `/pt#arquitetura`
- `/pt#notas`

**Resultado esperado:**
- Navegação funcional
- Comportamento esperado

---

## 🧱 ETAPA 6 — DOCUMENTAÇÃO

### Atualizar:

- [ ] `README.md` — incluir Phase 3, 4 e 5 concluídas
- [ ] `AGENTS.md` — com novas decisões técnicas
- [ ] `docs/roadmap.md` — marcar entregas

### Incluir:
- Phase 3 concluída
- Phase 4 concluída
- Phase 5 concluída
- Refactor de layout
- Nova estrutura de projetos
- Ajustes de navegação

---

## 📌 ETAPA 7 — CHECKPOINT

**Arquivo:** `docs/checkpoints/2026-03-layout-refactor.md`

**Conteúdo:**
- Mudanças realizadas
- Decisões técnicas
- Motivos
- Próximos passos

---

## ✅ RESULTADO FINAL ESPERADO

- Hero equilibrado com elemento visual
- Timeline restaurada com nova narrativa
- Sem bugs visuais (scroll, alinhamento)
- Projetos organizados estrategicamente (incluindo AI Rules System)
- Navegação corrigida
- Documentação atualizada

---

## 📝 COMMITS ESPERADOS

```
fix: add logo to hero right column
fix: restore evolution timeline with new narrative
fix: remove phantom scroll, adjust padding
fix: standardize card heights in projects grid
feat: reorganize projects with AI Rules System
fix: correct navigation links (remove locale prefix from anchors)
docs: update README and AGENTS.md with phase 5
chore: create checkpoint 2026-03-layout-refactor
```

---

## 🔄 PRÓXIMAS FASES (SUGESTÕES)

- **Phase 6:** Testes E2E + Analytics refinamento
- **Phase 7:** Performance optimization
- **Phase 8:** SEO audit final

---

_Last updated: 2026-03-19_
