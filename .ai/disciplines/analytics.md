# Analytics

> Analytics responde: o produto está sendo usado como esperado? O que está funcionando? O que não está?

---

## Filosofia

Analytics não é sobre coletar o máximo de dados possível.  
É sobre ter as perguntas certas e os dados para respondê-las.

Dado não coletado pode ser adicionado depois.  
Dado coletado errado contamina decisões por meses.

**Defina as perguntas antes de implementar o tracking.**

---

## Tipos de analytics

### Product analytics

Entender como usuários interagem com o produto.

Perguntas típicas:
- Onde usuários dropam no onboarding?
- Qual feature é mais usada?
- Usuários que usam X retêm melhor que os que não usam?
- Qual o tempo médio até primeira ação de valor?

Ferramentas: Mixpanel, Amplitude, PostHog (self-hosted), Segment

### Business analytics

Métricas de negócio agregadas.

Perguntas típicas:
- Qual o MRR? Crescimento MoM?
- Qual o churn rate por plano?
- Qual o LTV por segmento de cliente?
- Qual a taxa de conversão trial→pago?

Ferramentas: Metabase, Looker, Tableau, SQL direto no data warehouse

### Web analytics

Tráfego, fontes, comportamento de visitante.

Perguntas típicas:
- De onde vem o tráfego?
- Qual a bounce rate por página?
- Quais páginas têm melhor engajamento?

Ferramentas: GA4, Plausible (privacy-first), Fathom

---

## Event tracking

### Anatomia de um evento

```typescript
analytics.track('Order Completed', {
  // quem
  userId: user.id,
  
  // o que
  event: 'Order Completed',
  
  // contexto
  orderId: order.id,
  orderValue: order.total,
  itemCount: order.items.length,
  paymentMethod: order.paymentMethod,
  
  // meta
  timestamp: new Date().toISOString(),
  sessionId: session.id,
})
```

### Convenção de nomenclatura

Use `Objeto Ação` em PascalCase:

```
User Signed Up
Order Completed
Payment Failed
Feature Enabled
Onboarding Step Completed
```

Consistência em nomenclatura é mais importante do que a convenção específica.

### Eventos essenciais para SaaS

```
User Signed Up         → início do funil
User Activated         → primeira ação de valor
Trial Started
Subscription Created
Subscription Cancelled → churn
Feature [Nome] Used    → adoção
Onboarding Step [N] Completed
```

---

## Privacidade e compliance

- **LGPD / GDPR**: colete apenas o necessário; informe o usuário; permita opt-out
- **Cookie consent**: analytics de terceiros requer consentimento na UE e Brasil
- **Dados de PII**: nunca envie nome, email, CPF como propriedade de evento sem necessidade
- **Privacy-first alternatives**: PostHog, Plausible, Fathom não requerem cookie consent em muitos cenários

---

## Data warehouse para Level 2+

Quando product analytics e business analytics precisam ser cruzados, considere um data warehouse simples:

```
Produto (eventos) → Segment/Fivetran → BigQuery/Snowflake → Metabase
Banco (dados)     →                 ↗
Pagamentos        →                 ↗
```

Não construa isso antes de precisar — mas saiba quando você vai precisar.

---

## Métricas que mais importam (SaaS)

| Métrica | O que mede |
|---------|-----------|
| Activation rate | % de usuários que chegam à primeira ação de valor |
| Retention (D1, D7, D30) | usuários que voltam após 1, 7, 30 dias |
| NPS | satisfação e probabilidade de indicação |
| Churn rate | % de receita/usuários perdidos no período |
| Feature adoption | % de usuários ativos que usaram a feature |

Meça esses antes de qualquer outra coisa.
