# Feature Planning

> Como transformar um problema em um plano de implementação confiável.

---

## Por que planejar

Feature mal planejada gera:
- Scope creep no meio da implementação
- PR de 1200 linhas impossível de revisar
- Regressões em módulos adjacentes
- Retrabalho porque o design mudou depois que o código foi escrito

Feature bem planejada gera:
- PRs pequenos e focados
- Estimativas mais precisas
- Menos surpresas para o time
- Documentação que escreve a si mesma

---

## Quando fazer planejamento formal

| Escopo | Planejamento |
|--------|-------------|
| Mudança trivial (< 1 hora) | Mental, sem registro |
| Mudança simples (1 módulo, 1 dia) | Comentário na issue |
| Feature média (múltiplos módulos, alguns dias) | Checklist + definição de done |
| Feature grande (semanas, múltiplos devs) | RFC ou documento de design |
| Mudança de arquitetura (irreversível) | ADR obrigatório |

---

## Template: Feature Planning

```markdown
## Feature: [nome]

### Problema
O que está errado ou faltando? Quem é impactado?

### Solução proposta
A mudança mínima que resolve o problema.

### Escopo
O que está IN:
- ...

O que está OUT (explicitamente):
- ...

### Módulos afetados
- módulo A → o que muda
- módulo B → o que muda

### Dependências
- [ ] depende de X estar concluído
- [ ] requer migration de schema
- [ ] requer config de feature flag

### Definição de done
- [ ] implementado
- [ ] testado (unitário + integração)
- [ ] documentação atualizada
- [ ] validado em staging
- [ ] feature flag configurado (se aplicável)

### Riscos
- risco 1 → mitigação
- risco 2 → mitigação
```

---

## Fluxo de planejamento

### 1. Entender o problema real

```
sintoma ≠ causa ≠ solução
```

Perguntas:
- Quem reportou? O usuário? O sistema? O produto?
- Qual o impacto mensurável?
- Está acontecendo sempre ou intermitentemente?
- Isso já aconteceu antes? O que foi feito?

**Não comece a planejar a solução antes de entender o problema.**

### 2. Definir o escopo mínimo

O escopo mínimo é a menor mudança que resolve o problema de forma adequada.

Não é a menor mudança que resolve superficialmente.  
Não é a solução ideal para todos os casos futuros.  
É o ponto de equilíbrio entre qualidade e pragmatismo.

Pergunte: "O que precisa ser verdade para considerar isso resolvido?"

### 3. Identificar módulos afetados

Antes de estimar, saiba o que vai tocar.

```
□ Qual módulo contém a lógica principal?
□ Quais módulos dependem desse?
□ Existe schema de banco envolvido?
□ Existe contrato de API envolvido?
□ Existe lógica de frontend e backend?
```

### 4. Decompor em tarefas

Cada tarefa deve ser:
- Completável em no máximo 1 dia
- Testável independentemente quando possível
- Claramente descrita (resultado esperado, não apenas ação)

```
# bom
✓ Adicionar campo `cancelled_at` na tabela `orders` com migration
✓ Implementar OrderCancellationService com regras de negócio
✓ Expor endpoint POST /orders/:id/cancel com validações
✓ Adicionar testes de integração para fluxo de cancelamento

# ruim
✓ Backend do cancelamento
✓ Testes
```

### 5. Estimar com honestidade

Estimativas ruins têm duas fontes:

**Otimismo técnico**: você estima o caminho feliz, esquece dos edge cases, da migration, dos testes, do code review e dos bugs que surgem.

**Desconhecimento de contexto**: você não sabe o que vai encontrar no código existente antes de abrir.

Regra prática: estime o que você entende, adicione 30-50% para o que não sabe, e comunique a incerteza explicitamente.

---

## Planejamento para agentes de IA

Quando um agente de IA vai implementar a feature:

O plano deve ser mais explícito do que para um humano — o agente não tem contexto implícito.

```
□ Descreva o comportamento esperado em termos de input/output
□ Liste explicitamente o que NÃO deve ser modificado
□ Especifique o padrão de código a seguir (com exemplo se possível)
□ Defina os critérios de teste
□ Indique os arquivos de referência para estilo e padrão
```

Um plano vago para um humano gera retrabalho.  
Um plano vago para um agente gera arquitetura errada.
