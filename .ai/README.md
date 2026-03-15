# .ai 2.3

> Modelo de raciocínio para engenharia de software.
> Agnóstico de framework. Orientado a princípios. Calibrado por nível de sistema.

---

## O que mudou da 2.2 para 2.3

Dois ajustes cirúrgicos. Estrutura intacta.

| Mudança | Razão |
|---------|-------|
| `workflow/agents.md` → novo | Metodologia agnóstica para qualquer agente de IA que usa o `.ai` |
| `knowledge/architecture/` → novo | Decisões arquiteturais aprendidas na prática precisam de um lugar para morar |

---

## Estrutura

```
.ai/
├── README.md
│
├── core/
│   ├── philosophy.md
│   ├── principles.md
│   ├── tradeoffs.md
│   └── glossary.md
│
├── workflow/
│   ├── development.md
│   ├── feature-planning.md
│   ├── code-review.md
│   ├── security-check.md
│   └── agents.md              ← novo — como qualquer agente usa o .ai
│
├── architecture/
│   ├── modularity.md
│   ├── boundaries.md
│   ├── layering.md
│   ├── patterns.md
│   └── scaling.md
│
├── context/
│   ├── project-context.md
│   ├── architecture-summary.md
│   └── decisions.md
│
├── disciplines/
│   ├── validation.md
│   ├── security.md
│   ├── testing.md
│   ├── observability.md
│   ├── logging.md
│   ├── error-handling.md
│   ├── cicd.md
│   ├── performance.md
│   ├── analytics.md
│   ├── seo.md
│   ├── authentication.md
│   ├── caching.md
│   └── messaging.md
│
├── levels/
│   ├── simple-site.md
│   ├── medium-saas.md
│   └── large-system.md
│
├── knowledge/
│   ├── README.md
│   ├── architecture/          ← novo — decisões arquiteturais aprendidas na prática
│   ├── system-design/
│   ├── reliability/
│   ├── security/
│   ├── testing/
│   ├── observability/
│   └── product/
│
└── templates/
    ├── project-template.md
    └── architecture-template.md
```

---

## Regra central

> Aplique a disciplina certa no nível certo do sistema.

---

## Filosofia de versão

**2.x** = mesma estrutura, conteúdo mais profundo.  
**3.0** = quando a estrutura em si precisar mudar.

A estrutura da 2.3 está madura. O que cresce agora é `knowledge/` — com experiência real.
