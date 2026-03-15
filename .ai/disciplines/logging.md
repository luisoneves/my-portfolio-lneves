# Logging

> Logs são a primeira linha de diagnóstico. Um sistema sem logs adequados é uma caixa preta em produção.

---

## Filosofia

Logs não são para você durante o desenvolvimento.  
Logs são para você às 2h da manhã quando algo quebrou em produção e você tem 30 minutos para entender o que aconteceu.

Escreva logs para essa situação.

---

## Estrutura obrigatória

Use logs estruturados (JSON) desde o início. Logs em texto livre não são consultáveis em escala.

```json
{
  "timestamp": "2024-01-15T10:30:00.123Z",
  "level": "error",
  "service": "billing",
  "environment": "production",
  "trace_id": "abc123def456",
  "request_id": "req_xyz789",
  "user_id": "usr_12345",
  "message": "Payment processing failed",
  "error": {
    "code": "PAYMENT_GATEWAY_TIMEOUT",
    "message": "Stripe API timeout after 5000ms"
  },
  "context": {
    "orderId": "ord_99999",
    "amount": 4999,
    "currency": "BRL",
    "attempt": 2
  },
  "duration_ms": 5002
}
```

Campos mínimos: `timestamp`, `level`, `service`, `message`.  
Campos de correlação: `trace_id`, `request_id`, `user_id` sempre que disponível.

---

## Níveis de log

| Nível | Quando usar | Em produção |
|-------|------------|-------------|
| ERROR | Algo falhou, requer atenção humana | Sempre |
| WARN | Inesperado, sistema se recuperou | Sempre |
| INFO | Eventos normais de negócio relevantes | Sempre |
| DEBUG | Diagnóstico interno | Nunca por padrão |
| TRACE | Fluxo linha a linha | Nunca em produção |

**Regra**: em produção, `INFO` é o nível mínimo. `DEBUG` pode ser habilitado temporariamente por feature flag.

---

## O que logar

### Sempre logue

```
Início e fim de operações críticas (com duração)
Eventos de negócio relevantes (pedido criado, pagamento processado, usuário cadastrado)
Erros com contexto suficiente para reproduzir
Decisões importantes do sistema (feature flag ativado, fallback usado, retry executado)
Chamadas a serviços externos (com duração e status)
Eventos de segurança (login, logout, acesso negado, mudança de permissão)
```

### Nunca logue

```
Senhas, tokens, chaves de API
CPF, cartão de crédito, dados bancários
Informações de saúde, dados sensíveis de usuário
Stack traces completos de erros esperados (404, validação)
Eventos de alta frequência sem valor diagnóstico (ex: cada requisição de health check)
```

---

## Contexto é tudo

Um log sem contexto é quase inútil.

```typescript
// inútil
logger.error('Payment failed')

// útil
logger.error('Payment failed', {
  orderId: order.id,
  customerId: order.customerId,
  amount: order.total,
  gateway: 'stripe',
  errorCode: error.code,
  attempt: retryCount,
  duration_ms: elapsed,
})
```

A diferença entre resolver o incidente em 5 minutos ou em 1 hora.

---

## Correlação de requests

Em todo request, gere um `request_id` único e propague em:
- Todos os logs desse request
- Headers de chamadas a serviços externos (`X-Request-Id`)
- Respostas de erro (para correlação com o usuário)
- Mensagens de fila

```typescript
// middleware — gera ou propaga request_id
app.use((req, res, next) => {
  req.requestId = req.headers['x-request-id'] || generateId()
  res.setHeader('X-Request-Id', req.requestId)
  next()
})
```

---

## Log de performance

Para operações críticas, sempre logue duração:

```typescript
const start = Date.now()
try {
  const result = await paymentGateway.charge(order)
  logger.info('Payment processed', {
    orderId: order.id,
    duration_ms: Date.now() - start,
    gateway: 'stripe',
  })
  return result
} catch (error) {
  logger.error('Payment failed', {
    orderId: order.id,
    duration_ms: Date.now() - start,
    error: error.message,
  })
  throw error
}
```

---

## Retenção e volume

- **Produção**: reter por 30–90 dias (compliance pode exigir mais)
- **Staging**: reter por 7–14 dias
- **Development**: sem retenção longa necessária

Volume alto de logs = custo alto. Filtre logs de saúde, paginação e leituras triviais do nível INFO.

---

## Ferramentas por nível

**Level 1**: logs no stdout + serviço de coleta simples (Papertrail, Logtail)  
**Level 2**: Datadog, Grafana Loki, CloudWatch Logs com alertas  
**Level 3**: stack completa com correlação de traces, retenção por compliance, anomaly detection
