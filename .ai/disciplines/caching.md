# Caching

> Cache resolve latência. Não resolve throughput, não resolve bugs, não substitui banco rápido.

---

## Filosofia

Cache é complexidade. Toda vez que você adiciona cache, você adiciona:
- Uma fonte de verdade secundária
- Um problema de invalidação
- Um custo de consistência
- Um ponto adicional de falha

Cache só vale quando o benefício de latência ou custo é mensurável e real.

**Não adicione cache especulativamente.**

---

## Tipos de cache

### In-process (memória do processo)

```typescript
// simples, zero latência extra
const configCache = new Map<string, Config>()
```

**Use para**: dados imutáveis ou de mudança raramente (config, feature flags, dados de referência)  
**Problema**: não compartilhado entre instâncias; cresce com o processo; invalidade em restart

### Distributed cache (Redis, Memcached)

Compartilhado entre instâncias. Sobrevive a restart da aplicação.

**Use para**: sessões, resultados de queries caros, dados quentes em multi-instance  
**Problema**: latência de rede (1–5ms), consistência eventual, operação adicional

### HTTP cache

```
Cache-Control: max-age=3600, stale-while-revalidate=86400
ETag: "abc123"
Last-Modified: Wed, 15 Jan 2024 10:00:00 GMT
```

**Use para**: responses de API que não mudam com frequência, assets estáticos  
**Problema**: invalidação difícil sem CDN

### CDN

Assets estáticos, imagens, responses públicas.

**Use para**: qualquer conteúdo público que pode ser servido mais próximo do usuário  
**Problema**: invalidação tem latência (purge pode demorar minutos)

---

## Estratégias de invalidação

Invalidação é o problema difícil de cache.

### TTL (Time-to-Live)

```typescript
await redis.set('user:123', JSON.stringify(user), 'EX', 300) // expira em 5min
```

**Quando usar**: dados que podem estar levemente desatualizados sem impacto crítico  
**Problema**: janela de inconsistência

### Write-through

```typescript
async updateUser(id: string, data: UserUpdate) {
  const user = await db.users.update(id, data)
  await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 300)
  return user
}
```

**Quando usar**: consistência importante, escrita é ponto único  
**Problema**: escrita fica mais lenta; cache pode divergir em falha

### Cache-aside (lazy loading)

```typescript
async getUser(id: string): Promise<User> {
  const cached = await redis.get(`user:${id}`)
  if (cached) return JSON.parse(cached)
  
  const user = await db.users.findById(id)
  await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 300)
  return user
}
```

**Quando usar**: padrão mais comum; fácil de implementar  
**Problema**: cache miss gera latência alta (DB + cache write)

### Invalidação explícita

```typescript
async deleteUser(id: string) {
  await db.users.delete(id)
  await redis.del(`user:${id}`)
}
```

**Quando usar**: dados críticos onde inconsistência não é aceitável  
**Problema**: você precisa identificar todos os lugares que invalidam o dado

---

## Cache keys

Convenção clara evita conflitos e facilita invalidação por padrão:

```
{service}:{entity}:{id}
user:profile:123
order:summary:456
product:catalog:789

{service}:{entity}:{id}:{variant}
user:permissions:123:v2
product:price:789:BRL
```

Evite keys não determinísticas ou baseadas em parâmetros de query sem normalização.

---

## Cache stampede

Quando muitas requisições chegam para um dado expirado ao mesmo tempo, todas vão ao banco simultaneamente.

Solução: **stale-while-revalidate** + distributed lock para recomputar

```typescript
async getWithLock(key: string, compute: () => Promise<T>): Promise<T> {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)
  
  const lock = await acquireLock(`lock:${key}`)
  if (!lock) {
    await sleep(100)
    return getWithLock(key, compute) // espera e tenta de novo
  }
  
  const value = await compute()
  await redis.set(key, JSON.stringify(value), 'EX', 300)
  await releaseLock(`lock:${key}`)
  return value
}
```

---

## O que nunca cacheiar

```
Dados sensíveis sem criptografia (senha, token, PII)
Resultados de operações de escrita
Dados com consistência crítica (saldo, estoque em compra)
Erros (cache de erro pode mascarar problemas que se resolveram)
```

---

## Por nível de sistema

**Level 1**: sem cache distribuído; HTTP cache para assets; in-process para config  
**Level 2**: Redis para sessões e dados quentes; CDN para assets; estratégia definida  
**Level 3**: cache por camada com invalidação explícita; monitoring de hit/miss rate; alertas de degradação
