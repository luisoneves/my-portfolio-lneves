# Architecture Template

> Template para documentar a arquitetura de um sistema ou de uma feature significativa.

---

## Quando usar

- Novo projeto (arquitetura inicial)
- Feature que afeta múltiplos módulos
- Mudança de arquitetura (refactor, migração, nova integração)
- Decisão técnica irreversível

---

## Template: Arquitetura de sistema

```markdown
# Arquitetura: [Nome do Sistema]

**Versão**: 1.0
**Data**: YYYY-MM-DD
**Status**: rascunho | em revisão | aprovado

---

## Contexto

[O que este sistema resolve? Para quem? Qual o volume esperado?]

## Nível do sistema

[ ] Level 1 — Simple site
[ ] Level 2 — Medium SaaS
[ ] Level 3 — Large system

Justificativa: [por que este nível?]

## Componentes principais

| Componente | Responsabilidade | Tecnologia |
|-----------|-----------------|-----------|
| | | |

## Diagrama

```
[diagrama em ASCII ou referência a arquivo]
```

## Fluxos críticos

### [Nome do fluxo]

```
Passo 1: [descrição]
↓
Passo 2: [descrição]
↓
Resultado: [o que o sistema garante ao final]
```

## Decisões técnicas

| Decisão | Alternativa considerada | Razão da escolha |
|---------|------------------------|-----------------|
| | | |

## Dependências externas

| Serviço | Para que | Criticidade | Fallback |
|---------|----------|------------|---------|
| | | | |

## Requisitos não-funcionais

| Requisito | Métrica | Prioridade |
|-----------|---------|-----------|
| Disponibilidade | | |
| Latência | | |
| Throughput | | |
| Segurança | | |

## O que fica fora do escopo

[O que este sistema explicitamente não faz]

## Riscos e mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|:------------:|:-------:|-----------|
| | | | |

## Plano de evolução

[Como este sistema evolui nos próximos 6–12 meses?]
```

---

## Template: Arquitetura de feature

```markdown
# Feature: [Nome]

**Ticket**: [link]
**Data**: YYYY-MM-DD

---

## Problema

[O que está errado ou faltando? Qual o impacto?]

## Solução proposta

[A abordagem em 2–3 parágrafos]

## Módulos afetados

| Módulo | Tipo de mudança | Impacto |
|--------|----------------|---------|
| | adicionar / modificar / remover | baixo / médio / alto |

## Schema changes

```sql
-- se houver mudança de banco
ALTER TABLE ... ADD COLUMN ...;
```

Migration strategy: [backward compatible? Como fazer rollback?]

## API changes

```
# novos endpoints ou mudanças em existentes
POST /api/v1/...
  Request: { ... }
  Response: { ... }
```

Breaking changes: [ ] sim  [ ] não
Se sim: [plano de versionamento]

## Dependências

- [ ] Depende de [feature X] ser concluída
- [ ] Requer configuração de [serviço Y]
- [ ] Requer feature flag

## Testes

| Tipo | O que cobrir |
|------|-------------|
| Unitário | |
| Integração | |
| E2E (se necessário) | |

## Rollout

[ ] Feature flag — nome: `feature_[nome]`
[ ] Deploy direto
[ ] Canary — percentual inicial: _%

## Definição de done

- [ ] Implementado e testado
- [ ] Code review aprovado
- [ ] Validado em staging
- [ ] Documentação atualizada
- [ ] Métricas de sucesso definidas
```

---

## Boas práticas para documentação de arquitetura

1. **Seja honesto sobre trade-offs** — documente o que a decisão torna mais difícil, não apenas o que facilita

2. **Inclua alternativas rejeitadas** — "por que não fizemos X" é tão valioso quanto "por que fizemos Y"

3. **Defina o critério de revisão** — quando este documento deve ser revisitado?

4. **Mantenha atualizado** — documentação desatualizada é pior que ausência

5. **Seja conciso** — um ADR de 1 página lida é melhor que um documento de 10 páginas ignorado
