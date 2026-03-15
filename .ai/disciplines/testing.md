# Testing

> Testes não provam que o código funciona. Provam que ele se comporta como esperado nos cenários que você imaginou.

---

## Filosofia

A métrica certa não é cobertura. É confiança.

**Você confia nos seus testes o suficiente para fazer deploy sem checar manualmente?**

Se a resposta for não, a suíte tem problema — independente da cobertura.

---

## Pirâmide de testes

```
          [E2E]           → poucos, caros, lentos — testam contratos e fluxos críticos
        [Integration]     → médios — testam fronteiras reais
       [Unit]             → muitos, rápidos — testam lógica isolada
```

**Erro 1**: pirâmide invertida (muitos E2E, poucos unit)  
**Erro 2**: testar implementação em vez de comportamento  
**Erro 3**: mocks excessivos que eliminam o valor do teste

---

## Regra fundamental

**Teste imediatamente após implementar — nunca ao final da feature.**

```
implementa função → escreve teste → passa → continua para o próximo
```

Contexto fresco = debugging 10× mais rápido quando o teste falha.

---

## O que testar

### Sempre
```
Regras de negócio críticas (cálculos, validações, decisões)
Edge cases previsíveis (null, zero, vazio, limite máximo)
Contratos de API (request/response shape)
Fluxos críticos de usuário (auth, checkout, dados sensíveis)
Bug corrigido — escreva o teste que falha primeiro
```

### Com critério
```
Lógica de apresentação simples
Código que muda toda semana (testes podem virar peso)
Wrappers finos sobre third-party
```

### Raramente vale
```
Getters/setters triviais
Código de bootstrap/configuração
Third-party libraries (confie no vendor)
```

---

## Anatomia de um bom teste

```typescript
describe('OrderService', () => {
  describe('cancelOrder', () => {
    it('should cancel a pending order and emit event', async () => {
      // Arrange
      const order = OrderFactory.pending()
      orderRepo.findById.mockResolvedValue(order)

      // Act
      await service.cancelOrder(order.id, 'Customer request')

      // Assert
      expect(order.status).toBe('cancelled')
      expect(eventBus.emit).toHaveBeenCalledWith('order.cancelled', expect.objectContaining({
        orderId: order.id,
      }))
    })

    it('should throw when order is already shipped', async () => {
      const order = OrderFactory.shipped()
      orderRepo.findById.mockResolvedValue(order)

      await expect(service.cancelOrder(order.id, '')).rejects.toThrow('CANNOT_CANCEL_SHIPPED')
    })
  })
})
```

Teste que precisa de > 20 linhas de setup está testando a coisa errada, ou o código tem responsabilidades demais.

---

## Integração real > mock perfeito

Para testes de integração, prefira infraestrutura real a mocks:

```typescript
// banco real em memória / container
const db = await createTestDatabase()  // SQLite, Testcontainers, pg-mem

// HTTP server real
const app = await createTestApp()
const response = await request(app).post('/orders').send(payload)
```

O custo de setup compensa o valor de confiança.

---

## TDD — quando faz sentido

Use TDD quando:
- O comportamento esperado é claro antes de implementar
- A lógica de negócio é complexa e bem definida
- Você está corrigindo um bug

Evite TDD quando:
- Você está explorando um domínio novo
- A interface vai mudar muito durante a implementação

---

## Qualidade da suíte

Uma boa suíte:
```
□ Roda em < 3 minutos localmente
□ É 100% determinística (sem flakiness)
□ Falha no lugar certo quando você quebra algo
□ Não quebra ao refatorar sem mudar comportamento
□ Não requer internet, estado externo ou ordem de execução específica
□ Testes independentes entre si
```

Flaky test é pior que ausência de teste — cria ruído e destrói confiança. Resolva ou delete.

---

## Por nível

**Level 1**: testes de lógica crítica; smoke test do fluxo principal  
**Level 2**: pirâmide completa; testes de integração com banco real; CI bloqueante; cobertura de edge cases  
**Level 3**: + contract testing entre serviços; load testing; chaos engineering; mutation testing
