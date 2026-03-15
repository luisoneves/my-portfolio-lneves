# Messaging

> Filas e mensageria desacoplam produtores de consumidores. O custo é consistência eventual e complexidade operacional.

---

## Quando usar mensageria

Use quando:
- A operação pode ser processada de forma assíncrona sem impactar o usuário
- O consumidor pode estar temporariamente indisponível
- Você precisa de rate limiting natural no processamento
- Múltiplos consumidores precisam reagir ao mesmo evento
- Você quer desacoplar o produtor dos efeitos colaterais

Não use quando:
- Você precisa do resultado da operação para responder ao usuário
- A operação é simples e o overhead não compensa
- O time não está preparado para operar sistemas assíncronos

---

## Conceitos

### Queue (fila)

```
Producer → [Queue] → Consumer
```

- Cada mensagem é processada por **um** consumidor
- Ordem FIFO (em geral)
- Dead letter queue para mensagens que falharam repetidamente

Casos de uso: processamento de pagamento, envio de email, geração de relatório, processamento de arquivo.

### Pub/Sub (tópico)

```
Producer → [Topic] → Consumer A
                   → Consumer B
                   → Consumer C
```

- Cada mensagem é entregue a **todos** os consumidores inscritos
- Consumidores independentes entre si

Casos de uso: notificações de evento de negócio, propagação de mudança de estado, event-driven architecture.

---

## Garantias de entrega

| Garantia | Significado | Implicação |
|----------|------------|-----------|
| At most once | entregue no máximo uma vez (pode perder) | sem retry; perda aceitável |
| At least once | entregue pelo menos uma vez (pode duplicar) | precisa de idempotência no consumidor |
| Exactly once | entregue exatamente uma vez | caro, poucos sistemas garantem de verdade |

**Padrão para a maioria dos casos**: at-least-once + consumidor idempotente.

---

## Idempotência

O consumidor deve ser idempotente: processar a mesma mensagem múltiplas vezes produz o mesmo resultado.

```typescript
// idempotente — verifica antes de processar
async processPayment(message: PaymentMessage) {
  const existing = await paymentRepo.findByIdempotencyKey(message.idempotencyKey)
  if (existing) {
    logger.info('Payment already processed', { key: message.idempotencyKey })
    return existing
  }
  
  const payment = await gateway.charge(message)
  await paymentRepo.saveWithKey(payment, message.idempotencyKey)
  return payment
}
```

Estratégias:
- **Idempotency key**: identificador único na mensagem, guarda resultado na primeira vez
- **Check-then-act**: verifica estado atual antes de agir
- **Natural idempotência**: algumas operações são naturalmente idempotentes (SET em vez de INCREMENT)

---

## Dead Letter Queue (DLQ)

Mensagens que falham repetidamente não devem bloquear a fila.

Depois de N tentativas com retry e backoff, mova para DLQ.

```
Queue → [processamento falha] → retry (1x) → retry (2x) → retry (3x) → DLQ
```

DLQ deve ter:
- Alerta quando mensagens chegam
- Processo definido para investigar e reprocessar
- Retenção suficiente para diagnóstico

---

## Retry e backoff

```typescript
const retryPolicy = {
  maxAttempts: 3,
  backoff: {
    type: 'exponential',
    initial: 1000,    // 1s
    multiplier: 2,    // 1s → 2s → 4s
    jitter: true,     // adiciona aleatoriedade para evitar thundering herd
    maxDelay: 30000,  // máximo 30s
  }
}
```

Erros que não devem fazer retry (erros determinísticos):
- Validação de schema (a mensagem está malformada — retry não resolve)
- Permissão negada
- Recurso não encontrado (o dado pode não existir — dependendo do caso)

Mova esses para DLQ imediatamente, sem retry.

---

## Observabilidade em mensageria

Métricas essenciais:
```
queue depth          → mensagens aguardando processamento
processing rate      → mensagens processadas por segundo
error rate           → falhas de processamento
DLQ depth            → mensagens com falha acumulada
lag                  → atraso entre produção e consumo
processing time      → duração média de processamento
```

Alertas:
- Queue depth crescendo consistentemente (consumidor está lento)
- DLQ recebendo mensagens (há erros sistemáticos)
- Lag aumentando (capacidade insuficiente)

---

## Ordering

Filas distribuídas geralmente não garantem ordem estrita.

Se ordem é crítica:
- Use partition key consistente (todas as mensagens do mesmo usuário vão para o mesmo partition)
- Projete o consumidor para ser tolerante a out-of-order (com sequence number e estado)
- Avalie se ordem realmente é necessária (frequentemente não é)

---

## Ferramentas por nível

**Level 1**: sem mensageria; background jobs síncronos ou cron simples  
**Level 2**: Redis (Bull/BullMQ), SQS, ou RabbitMQ com DLQ configurada  
**Level 3**: Kafka para alto volume e event streaming; SQS/SNS para AWS; Pub/Sub para GCP
