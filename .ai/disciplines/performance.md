# Performance

> Otimize o que é lento. Não o que parece lento. Meça primeiro — sempre.

---

## Regra de ouro

**Sem medição, você otimiza a coisa errada.**

Sem medição:
- Você não sabe o que é o gargalo real
- Você não sabe se a otimização funcionou
- Você introduz complexidade sem benefício verificável

---

## Onde o tempo realmente vai

Em aplicações web típicas:

```
1. Queries de banco de dados     ← mais comum
2. Chamadas a APIs externas
3. Renderização (SSR pesado)
4. Serialização / deserialização
5. CPU                           ← raro, mas quando acontece é intenso
```

Merifique a categoria antes de otimizar.

---

## Banco de dados

**Problema mais frequente. Investigue primeiro.**

### N+1

```typescript
// N+1 — 1 query por item na lista
for (const user of users) {
  const orders = await db.orders.where({ userId: user.id })
}

// correto — uma query com join/include
const users = await db.users.findAll({ include: 'orders' })
```

Detecte com query logging em desenvolvimento. Nunca aceite N+1 em produção.

### Índices

- Crie para colunas em `WHERE`, `JOIN`, `ORDER BY` em queries frequentes
- Analise com `EXPLAIN ANALYZE` antes de criar
- Índice desnecessário tem custo em escrita

### Connection pooling

Nunca abra nova conexão por request. Pool com tamanho calibrado para o workload.

---

## Performance Budget

Defina antes de construir:

```
API response p95:  < 200ms
Page load (LCP):   < 2.5s
Bundle inicial:    < 200kb gzipped
DB query max:      < 100ms
```

Trate violações como bugs.

---

## Frontend

- Bundle size importa — analise antes de adicionar dependência
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Lazy loading para rotas e imagens abaixo do fold
- Prefetch de recursos críticos
- Evite waterfalls de request (paralelize)
- Images: formatos modernos (WebP, AVIF), dimensões corretas, lazy load

---

## Cache como otimização

Cache não é premature optimization quando:
- O dado é caro de calcular ou buscar
- O dado muda raramente
- A leitura acontece muito mais frequentemente que a escrita

Ver `disciplines/caching.md` para implementação.

---

## Load testing

Teste carga antes que o usuário teste por você.

```
□ Identifique o ponto de saturação
□ Teste com dados realistas
□ Inclua cenários de burst (pico repentino)
□ Teste o caminho crítico, não apenas o happy path
```

Ferramentas: k6, Artillery, Gatling.

---

## Por nível

**Level 1**: não otimize prematuramente; monitore tempo de resposta básico  
**Level 2**: N+1 eliminado, índices corretos, performance budget definido, métricas de p95/p99  
**Level 3**: profiling contínuo, SLOs de latência, load testing regular, otimização baseada em dados
