# Level 2 — Medium SaaS

> Produto com usuários reais, time pequeno, SLA informal, crescimento ativo.

---

## Contexto

Você está aqui quando:

- Usuários reais dependem do sistema (pagantes ou não)
- Downtime tem impacto de negócio mensurável
- Time de 2–10 devs trabalhando simultaneamente
- Dados sensíveis de usuários são coletados e processados
- O produto precisa crescer com confiança

**A maioria dos SaaS saudáveis fica no Level 2 por anos. Isso é correto.**

---

## O que aplicar

### Obrigatório

```
□ Autenticação com provedor testado (Auth0, Clerk, NextAuth, Supabase Auth)
□ Autorização verificada no servidor em todo endpoint protegido
□ Input validation em toda entrada externa (Zod, Joi, class-validator)
□ Rate limiting em endpoints públicos e de autenticação
□ Secrets em secret store (não apenas .env local — use CI secrets)
□ CI pipeline completo (lint, types, testes, build, security scan)
□ Staging environment
□ Deploy automatizado
□ Rollback documentado e testado
□ Logs estruturados com correlation IDs
□ Error monitoring (Sentry, Datadog, Bugsnag)
□ Uptime monitoring com alertas
□ Backup de banco com restauração testada
```

### Recomendado

```
□ Testes de integração com banco real (não mocks)
□ Golden signals monitorados (latência, erro rate, traffic)
□ Feature flags para mudanças de risco
□ Background jobs para operações pesadas (filas)
□ Cache para dados quentes (Redis)
□ N+1 queries eliminadas
□ Performance budget definido
□ GDPR/LGPD compliance básico
□ Índices de banco otimizados para queries frequentes
```

---

## Arquitetura recomendada

Monolito modular com fronteiras claras por domínio.

```
src/
├── modules/
│   ├── users/
│   ├── billing/
│   └── notifications/
├── shared/
│   ├── database/
│   ├── logger/
│   └── validation/
└── infrastructure/
    ├── http/
    └── queue/
```

Microsserviços são raros e justificados apenas quando:
- Um domínio específico tem requisitos de escala muito diferentes
- Um time autônomo pode ser responsável por ele

---

## Disciplinas por prioridade

### Tier 1 — Não negocie

| Disciplina | O mínimo para Level 2 |
|-----------|----------------------|
| Auth | provedor testado + authz no servidor |
| Validation | toda entrada externa validada |
| Testing | fluxos críticos cobertos + CI bloqueante |
| Observability | error monitoring + alertas de uptime |
| CI/CD | pipeline + deploy automatizado |

### Tier 2 — Adicione conforme cresce

| Disciplina | Quando adicionar |
|-----------|-----------------|
| Caching | quando queries lentas aparecem em métricas |
| Messaging | quando operações pesadas bloqueiam response |
| Feature flags | quando deploy frequente vira necessidade |
| Analytics | quando decisões de produto precisam de dados |

### Tier 3 — Futuro (Level 3)

Distributed tracing, chaos engineering, SLOs formais, microserviços.

---

## Métricas de saúde para Level 2

```
Deploy frequency:     1–5 vezes por semana
Lead time:            < 2 dias
Change failure rate:  < 20%
MTTR:                 < 4 horas
Error rate:           < 1% das requisições
API p95:              < 500ms
Uptime:               > 99%
```

---

## Critério de subida para Level 3

Reavalie quando:

```
□ Time cresce para 10+ devs com conflitos de ownership claros
□ Escala causa problemas concretos que o monolito não resolve
□ Compliance exige controles formais (SOC2, ISO27001, HIPAA)
□ Domínios distintos precisam de deploy completamente independente
□ MTTR consistentemente alto por falta de isolamento
```
