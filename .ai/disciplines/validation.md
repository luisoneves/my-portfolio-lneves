# Validation

> Toda entrada no sistema é hostil até ser validada. Validação não é opcional.

---

## Filosofia

Validação não é paranoia — é respeito pela realidade.

O mundo externo não respeita seus tipos. Usuários cometem erros. Integrações enviam formato inesperado. Bots atacam. Sistemas mudam sem avisar.

Validar na entrada é mais barato do que tratar corrupção de dados depois.

---

## Onde validar

### Regra fundamental

**Valide em toda trust boundary.**

```
Internet → seu sistema          SEMPRE valide
Fila/evento → seu sistema       SEMPRE valide
Serviço interno → seu sistema   Valide contratos
Banco → seu sistema             Confie, mas tipe corretamente
```

### Camadas de validação

| Camada | Tipo | Responsabilidade |
|--------|------|-----------------|
| Presentation | Schema/formato | "É um JSON válido? Os campos obrigatórios estão presentes?" |
| Application | Regra de negócio | "O usuário pode fazer essa operação? Os valores fazem sentido?" |
| Domain | Invariante | "Esse objeto pode existir com esses valores?" |

Não misture as camadas. Regra de negócio no schema e invariante de domínio no controller são code smells.

---

## O que validar

### Estrutura (presentation layer)

```typescript
// com Zod (exemplo)
const CreateOrderSchema = z.object({
  customerId: z.string().uuid(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive().max(100),
    })
  ).min(1).max(50),
  notes: z.string().max(500).optional(),
})
```

Verifique:
- Tipos corretos
- Campos obrigatórios presentes
- Tamanhos máximos (prevenção de payload attacks)
- Formatos (UUID, email, data, enum)

### Semântica (application layer)

```typescript
// regras de negócio sobre os valores
if (!customer.isActive()) throw new BusinessError('CUSTOMER_INACTIVE')
if (order.totalValue() > customer.creditLimit) throw new BusinessError('CREDIT_EXCEEDED')
```

### Invariantes (domain layer)

```typescript
class Order {
  addItem(item: Item) {
    if (this.status !== 'draft') throw new Error('Cannot add items to non-draft order')
    if (this.items.length >= 50) throw new Error('Order item limit reached')
    this.items.push(item)
  }
}
```

---

## Erros de validação

### Retornar erros úteis

```typescript
// ruim — não ajuda o chamador
throw new Error('Invalid input')

// correto — específico e acionável
{
  "error": "VALIDATION_ERROR",
  "fields": {
    "email": "Invalid email format",
    "quantity": "Must be between 1 and 100"
  }
}
```

### Não vazar informação

```typescript
// ruim — revela estrutura interna
"Column 'user_id' cannot be null"

// correto — mensagem de usuário
"Required field: userId"
```

---

## Boundary validation

Qualquer coisa que cruza uma fronteira de sistema:

```
HTTP request body
Query parameters
Headers
Webhook payload
Queue message
File upload
Environment variables (na inicialização)
Config externa
```

Todos são inputs não confiáveis.

---

## Validação vs. Sanitização

**Validação**: "isso é válido?" → aceitar ou rejeitar

**Sanitização**: "deixar isso seguro para usar" → transformar

Prefira validação a sanitização. Sanitizar input HTML para prevenir XSS é frágil — é melhor usar encoding correto no output.

Sanitização tem lugar: normalização de espaços, trim, normalização de case para comparação. Não para segurança.

---

## Living validation

Schemas de validação são documentação viva do contrato de entrada.

Mantenha-os próximos do código que os usa.  
Atualize quando o contrato muda.  
Teste os casos de borda dos schemas — não apenas o happy path.
