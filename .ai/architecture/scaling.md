# Scaling

> Escala é a arte de fazer o sistema continuar funcionando bem conforme o volume cresce.
> Toda decisão de escala é um trade-off — não existe solução universal.

---

## A pergunta certa antes de qualquer coisa

**Qual é o gargalo real agora?**

Sistemas não escalam mal de forma uniforme. Eles têm um gargalo específico em um momento específico. Otimizar o lugar errado é custo sem benefício.

Meça antes de escalar. Sempre.

---

## Vertical vs. Horizontal

**Vertical scaling (scale up)**: máquina maior, mais CPU, mais RAM.

```
Vantagens:
- simples — sem mudança na aplicação
- sem latência de rede entre componentes
- transações ACID continuam funcionando naturalmente

Limites:
- tem teto de hardware
- ponto único de falha
- custo cresce de forma não linear
```

**Horizontal scaling (scale out)**: mais instâncias da mesma coisa.

```
Vantagens:
- sem teto teórico
- tolerância a falha (uma instância cai, as outras continuam)
- custo mais linear

Limites:
- estado compartilhado precisa sair da instância (sessão, cache)
- consistência distribuída é complexa
- debugging mais difícil
```

**Regra prática**: comece vertical (simples), migre para horizontal quando o teto aparecer ou quando disponibilidade exigir.

---

## CAP Theorem

Todo sistema distribuído precisa escolher dois de três:

```
Consistency  → todo nó vê os mesmos dados ao mesmo tempo
Availability → o sistema sempre responde
Partition tolerance → o sistema funciona mesmo com falha de rede
```

Partição de rede é inevitável em sistemas distribuídos. Então a escolha real é:

**CP (Consistency + Partition tolerance)**
- Pode ficar indisponível durante falha de rede
- Dados sempre consistentes quando disponível
- Exemplos: bancos relacionais tradicionais, HBase, Zookeeper

**AP (Availability + Partition tolerance)**
- Sempre responde, mesmo durante falha
- Dados podem estar temporariamente inconsistentes (eventual consistency)
- Exemplos: DynamoDB, Cassandra, CouchDB

**Qual escolher?** Depende do domínio:
- Saldo bancário, estoque em compra → CP (consistência é crítica)
- Feed de redes sociais, contagem de views → AP (disponibilidade vale mais que precisão imediata)

---

## Load Balancing

Distribui tráfego entre múltiplas instâncias.

**Algoritmos comuns:**

```
Round Robin          → distribui igualmente em sequência
Least Connections    → manda para a instância com menos conexões ativas
IP Hash              → mesmo cliente sempre vai para a mesma instância
Weighted             → instâncias mais potentes recebem mais tráfego
```

**Níveis:**
- L4 (TCP): mais rápido, menos inteligente
- L7 (HTTP): roteamento por path, headers, cookies — mais flexível

**Health checks**: load balancer precisa saber quais instâncias estão saudáveis. Configure `/health/ready` corretamente (ver `disciplines/observability.md`).

---

## Database Scaling

### Read replicas

```
Primary (escrita) → Replica 1 (leitura)
                 → Replica 2 (leitura)
                 → Replica 3 (leitura)
```

A maioria dos sistemas tem muito mais leitura que escrita. Replicas resolvem esse problema sem sharding.

**Cuidado**: replica lag — dado escrito no primary pode não estar na replica imediatamente. Para operações críticas (ler o que acabou de escrever), leia do primary.

### Sharding (particionamento horizontal)

Divide os dados entre múltiplos bancos baseado em uma chave.

```
shard_key = user_id % 4

user 100 → shard 0
user 101 → shard 1
user 102 → shard 2
user 103 → shard 3
```

**Quando considerar**: quando um único banco não aguenta o volume de escrita, mesmo com hardware máximo.

**Custos**:
- Queries que cruzam shards são complexas e lentas
- Joins entre dados de shards diferentes são caros
- Rebalancear shards depois é difícil

**Não sharde prematuramente**. A maioria dos sistemas nunca chega lá.

### Connection pooling

Sempre. Nunca conexão por request.

Pool com tamanho calibrado:
```
muito pequeno → requests esperando conexão → latência alta
muito grande  → banco sobrecarregado com conexões → degradação
```

---

## Consistência eventual na prática

Sistemas AP aceitam que dados podem estar inconsistentes por um curto período.

O que isso significa no código:

```
Usuário publica post → gravado no primary
Usuário vê o feed   → lido da replica (pode não ter o post ainda)
```

Design para isso:
- Mostre o dado local imediatamente (optimistic UI)
- Reconheça que o dado vai propagar
- Não tome decisões críticas com dado de replica sem verificar o primary

---

## Trade-offs que mais aparecem

| Escolha | Ganha | Perde |
|---------|-------|-------|
| Cache agressivo | latência, throughput | consistência |
| Async processing | throughput, desacoplamento | latência, complexidade |
| Read replicas | throughput de leitura | consistência eventual |
| Sharding | throughput de escrita | complexidade de query |
| Microserviços | autonomia de time, escala independente | latência de rede, distributed tracing, complexidade operacional |
| Eventual consistency | disponibilidade | complexidade de raciocínio |

**Não existe trade-off errado em abstrato — só trade-off fora de contexto.**

---

## Por nível de sistema

**Level 1**: vertical scaling é suficiente; não pense em sharding  
**Level 2**: read replicas quando métricas mostrarem gargalo; horizontal com load balancer quando SLA exigir  
**Level 3**: sharding quando necessário; eventual consistency com design consciente; capacity planning baseado em dados
