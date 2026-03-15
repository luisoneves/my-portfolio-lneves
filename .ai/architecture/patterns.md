# Patterns

> Padrões são soluções nomeadas para problemas recorrentes. Use quando o problema existe — não antes.

---

## Sobre padrões

Um padrão é uma ferramenta, não um objetivo.

O erro clássico: conhecer um padrão e procurar um problema para aplicá-lo.  
O uso correto: reconhecer um problema e lembrar que existe um padrão que resolve.

---

## Padrões de domínio (DDD)

Esses padrões vêm do Domain-Driven Design. Não exigem que você "faça DDD completo" — são úteis individualmente quando o domínio tem lógica real.

### Value Object

**Problema**: representar um conceito definido pelos seus atributos, não por identidade.

```typescript
class Email {
  private constructor(private readonly value: string) {}

  static create(raw: string): Email {
    if (!raw.includes('@')) throw new Error('Invalid email')
    return new Email(raw.toLowerCase().trim())
  }

  equals(other: Email): boolean { return this.value === other.value }
  toString(): string { return this.value }
}
```

Características:
- **Imutável** — não muda depois de criado
- **Sem identidade própria** — dois com mesmos atributos são iguais
- **Auto-validado** — inválido não pode ser criado

Use para: Email, CPF, Money, PhoneNumber, Quantity, Address.

### Entity

**Problema**: representar um conceito com identidade que persiste ao longo do tempo.

```typescript
class Order {
  private constructor(
    private readonly id: OrderId,
    private items: OrderItem[],
    private status: OrderStatus,
  ) {}

  static create(customerId: CustomerId, items: OrderItem[]): Order {
    if (items.length === 0) throw new Error('Order must have items')
    return new Order(OrderId.generate(), items, 'pending')
  }

  cancel(reason: string): void {
    if (this.status === 'shipped') throw new Error('Cannot cancel shipped order')
    this.status = 'cancelled'
  }
}
```

Características:
- **Identificada por ID** — mesmo ID = mesma entidade
- **Muda de forma controlada** — via métodos que protegem invariantes
- **Dona dos seus invariantes** — garante que seus dados são sempre válidos

### Aggregate

**Problema**: grupo de entidades que devem manter consistência juntas.

O **Aggregate Root** é o único ponto de entrada:

```typescript
// Order é o root — OrderItem é interno, sem repositório próprio
class Order {
  private items: OrderItem[] = []

  addItem(product: Product, quantity: Quantity): void {
    if (this.status !== 'draft') throw new Error('Cannot add items to non-draft order')
    const existing = this.items.find(i => i.productId.equals(product.id))
    existing
      ? existing.increaseQuantity(quantity)
      : this.items.push(OrderItem.create(product, quantity))
  }

  get total(): Money {
    return this.items.reduce((sum, item) => sum.add(item.subtotal), Money.zero())
  }
}
```

Regras:
- Acesse sempre pelo root, nunca direto nas partes internas
- Nunca persista partes internas separadamente (`OrderItemRepository` não existe)
- Transações não cruzam fronteiras de aggregate

### Domain Event

**Problema**: notificar outras partes do sistema sem criar acoplamento direto.

```typescript
class OrderCancelledEvent {
  constructor(
    public readonly orderId: string,
    public readonly customerId: string,
    public readonly occurredAt = new Date(),
  ) {}
}

class Order {
  private domainEvents: DomainEvent[] = []

  cancel(reason: string): void {
    this.status = 'cancelled'
    this.domainEvents.push(new OrderCancelledEvent(this.id, this.customerId))
  }

  pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents]
    this.domainEvents = []
    return events
  }
}

// application service: persiste primeiro, depois despacha eventos
await orderRepo.save(order)
await eventBus.publishAll(order.pullDomainEvents())
```

**Use quando**: múltiplas partes do sistema precisam reagir ao mesmo evento de negócio.

---

## Padrões de aplicação

### Repository

**Problema**: lógica de negócio acoplada à persistência.

```typescript
interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>
  save(order: Order): Promise<void>
}
```

**Use quando**: domínio testável sem banco é necessário.  
**Não use quando**: sistema simples onde a query está em 1 lugar.

### Application Service (Use Case)

**Problema**: onde colocar a orquestração de um caso de uso?

```typescript
class CancelOrderUseCase {
  async execute(orderId: string, reason: string): Promise<void> {
    const order = await this.orderRepo.findById(new OrderId(orderId))
    if (!order) throw new NotFoundError('Order', orderId)
    order.cancel(reason)
    await this.orderRepo.save(order)
    await this.eventBus.publishAll(order.pullDomainEvents())
  }
}
```

Um use case por caso de uso. Nome descritivo: `CancelOrderUseCase`, não `OrderService.cancel`.

### Factory

**Problema**: criação de objetos complexos com variantes e lógica de montagem.

**Use quando**: criação tem variantes ou validações.  
**Não use quando**: `new MyClass(param)` é suficiente.

---

## Padrões de resiliência

### Retry com backoff exponencial

```typescript
async function withRetry<T>(fn: () => Promise<T>, maxAttempts = 3): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt === maxAttempts) throw err
      const delay = 100 * 2 ** attempt + Math.random() * 100
      await sleep(delay)
    }
  }
  throw new Error('unreachable')
}
```

**Use quando**: falhas transitórias em serviços externos.  
**Não use quando**: erro é determinístico (validação, permissão).

### Circuit Breaker

```
closed → (N falhas) → open → (tempo) → half-open → (sucesso) → closed
```

Quando aberto: falha rápido sem chamar o serviço, protegendo do efeito cascata.

**Use quando**: dependências externas críticas em Level 2+.

---

## Padrões raramente justificados

| Padrão | Custo real |
|--------|-----------|
| Event Sourcing | Complexidade operacional alta; só útil em auditoria crítica de negócio |
| Saga | Só necessário em microsserviços com transações distribuídas |
| CQRS + Event Sourcing | Dobra a complexidade dos dois; raro justificar |

Conheça. Aplique com parcimônia extrema.
