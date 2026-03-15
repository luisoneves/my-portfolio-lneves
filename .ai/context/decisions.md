# Decisions

> Registro de decisões arquiteturais do projeto. O "porquê" que o código não consegue explicar.

---

## Por que registrar decisões

Código mostra *o que* o sistema faz.  
Decisões registradas mostram *por que* está assim — e por que não está de outra forma.

Sem esse registro:
- O time refaz o mesmo debate meses depois
- Alguém novo "melhora" algo que foi uma escolha deliberada
- A decisão original é perdida quando quem decidiu sai do time

---

## Template ADR

```markdown
## ADR-[número]: [título curto]

**Data**: YYYY-MM-DD
**Status**: proposto | aceito | obsoleto | substituído por ADR-XXX
**Autores**: [nomes]

### Contexto

[O problema ou situação que forçou uma decisão.
O que estava acontecendo? Quais as restrições?]

### Decisão

[A decisão tomada, em uma frase direta.
"Decidimos usar X" ou "Decidimos não fazer Y".]

### Alternativas consideradas

- **Alternativa A**: [descrição] — rejeitada porque [razão]
- **Alternativa B**: [descrição] — rejeitada porque [razão]

### Consequências

**Positivas**:
- [o que fica mais fácil]

**Negativas / trade-offs**:
- [o que fica mais difícil ou o custo pago]

### Revisão

[Quando e sob quais condições essa decisão deve ser reavaliada?]
```

---

## Decisões do projeto

*Adicione ADRs abaixo conforme o projeto evolui.*

---

<!-- exemplo (remova ou adapte)

## ADR-001: Monolito modular em vez de microserviços

**Data**: YYYY-MM-DD
**Status**: aceito

### Contexto
Time de 2 devs, produto ainda em validação, domínios não completamente definidos.
Microserviços exigiriam overhead operacional e de coordenação desproporcional ao estágio.

### Decisão
Começar com monolito modular. Fronteiras de domínio claras dentro do mesmo processo.

### Alternativas consideradas
- **Microserviços desde o início**: rejeitado — overhead de infra e coordenação não justificado com 2 devs
- **Monolito sem modularização**: rejeitado — dificulta extração futura e ownership

### Consequências
Positivas: deploy simples, sem latência de rede, refactor cross-módulo mais fácil.
Negativas: escala horizontal limitada por módulo; extração futura tem custo de migração.

### Revisão
Reavaliar quando time > 5 devs ou quando módulos específicos tiverem requisitos de escala divergentes.

-->
