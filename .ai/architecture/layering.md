# Layering

> Camadas organizam código por responsabilidade técnica e controlam a direção das dependências.

---

## A regra de ouro

**Dependências fluem para dentro — nunca para fora.**

```
presentation
     ↓
application
     ↓
domain
     ↓
infrastructure
```

Cada camada conhece as camadas abaixo dela. Nenhuma camada conhece as acima.

O domínio não sabe que existe uma API REST.  
A infraestrutura não sabe que existe regra de negócio de desconto.  
A apresentação não sabe como o banco é consultado.

---

## As camadas

### Presentation (ou Interface)

O que é: onde o sistema se comunica com o mundo externo.

Responsabilidades:
- Receber requests (HTTP, CLI, eventos, fila)
- Serializar e deserializar dados
- Validar formato e tipo de entrada
- Delegar para a camada de application
- Formatar e retornar a resposta

O que **não** faz: lógica de negócio, acesso direto ao banco.

```typescript
// controller — presentation layer
async createOrder(req: Request): Promise<Response> {
  const dto = CreateOrderDTO.parse(req.body)           // valida formato
  const result = await this.orderService.create(dto)   // delega para application
  return { status: 201, body: result }                 // formata resposta
}
```

### Application

O que é: orquestração de casos de uso.

Responsabilidades:
- Coordenar o fluxo de uma operação
- Chamar domínio para lógica de negócio
- Chamar infraestrutura para persistência e I/O
- Gerenciar transações
- Disparar efeitos colaterais (emails, eventos, jobs)

O que **não** faz: lógica de negócio pura (vai no domínio), acesso direto a framework.

```typescript
// service — application layer
async createOrder(dto: CreateOrderDTO): Promise<Order> {
  const customer = await this.customerRepo.findById(dto.customerId)
  const order = Order.create(customer, dto.items)      // lógica no domínio
  await this.orderRepo.save(order)
  await this.eventBus.emit('order.created', order)
  return order
}
```

### Domain

O que é: o coração do sistema. Regras de negócio puras.

Responsabilidades:
- Modelar as entidades e seus invariantes
- Implementar as regras de negócio
- Definir as interfaces que infraestrutura deve implementar (inversão de dependência)

O que **não** faz: I/O de qualquer tipo, não depende de framework, não conhece banco.

```typescript
// entity — domain layer
class Order {
  static create(customer: Customer, items: Item[]): Order {
    if (items.length === 0) throw new Error('Order must have items')
    if (!customer.isActive()) throw new Error('Customer is not active')
    return new Order(customer, items)
  }
}
```

### Infrastructure

O que é: implementações concretas de I/O.

Responsabilidades:
- Implementar repositórios (SQL, NoSQL, cache)
- Clientes HTTP para serviços externos
- Envio de emails, SMS, push notifications
- Filas, storage, logging

O que **não** faz: lógica de negócio, orquestração de casos de uso.

---

## Quando não usar camadas formais

Camadas formais têm overhead de estrutura.

Para sistemas Level 1: camadas informais (controllers que chamam serviços que chamam banco) são suficientes.

Para sistemas Level 2+: camadas formais pagam o custo com testabilidade e manutenibilidade.

A regra que sempre vale, mesmo sem camadas formais:
> Lógica de negócio não pode depender de framework ou banco diretamente.

---

## Inversão de dependência na prática

O domínio define interfaces. A infraestrutura implementa.

```typescript
// domain — define a interface
interface OrderRepository {
  save(order: Order): Promise<void>
  findById(id: OrderId): Promise<Order | null>
}

// infrastructure — implementa
class PostgresOrderRepository implements OrderRepository {
  async save(order: Order) { /* SQL aqui */ }
  async findById(id: OrderId) { /* SQL aqui */ }
}
```

Resultado: o domínio pode ser testado sem banco, sem framework, sem I/O. Testes rápidos e confiáveis.
