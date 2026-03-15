# Observability

> Observabilidade é o sistema te contando o que está acontecendo. Sem ela, você gerencia no escuro.

---

## Os três pilares

```
Logs     → o que aconteceu (eventos discretos)
Metrics  → o quanto aconteceu (valores agregados no tempo)
Traces   → como aconteceu (caminho de uma requisição)
```

Não são substitutos — são complementares.

Fluxo típico de incidente:
```
alerta via métrica → diagnóstico via log → root cause via trace
```

---

## Métricas — Golden Signals

Os quatro sinais que cobrem a maioria dos incidentes (Google SRE):

```
Latency    → quanto tempo as requisições demoram
Traffic    → volume de requisições por unidade de tempo
Errors     → taxa de erros (5xx, timeouts, erros de negócio)
Saturation → quão próximo do limite o sistema está (CPU, memória, fila, conexões)
```

**Use p95 e p99, nunca média.** Média esconde cauda longa — os 5% de usuários com experiência ruim somem na média.

RED Method (para serviços individuais): Rate, Errors, Duration.

USE Method (para infraestrutura): Utilization, Saturation, Errors.

---

## SLI, SLO, SLA — a diferença importa

**SLI (Service Level Indicator)**  
A métrica real que você mede.  
Exemplo: "% de requisições com latência < 200ms nas últimas 24h"

**SLO (Service Level Objective)**  
A meta interna que você se compromete a atingir.  
Exemplo: "99.5% das requisições devem ter latência < 200ms"

**SLA (Service Level Agreement)**  
O contrato externo com consequências (financeiras, legais) se violado.  
Exemplo: "garantimos 99.9% de uptime; abaixo disso geramos crédito"

```
SLA (contrato externo)
  └─ deve ser mais folgado que →
     SLO (meta interna)
       └─ medido por →
          SLI (a métrica real)
```

Nunca defina SLA mais apertado que o SLO — você vai quebrar o contrato antes de quebrar a meta interna.

---

## Error Budget

O error budget é o quanto de degradação você pode ter antes de parar de fazer mudanças.

```
SLO de 99.5% em 30 dias
= 0.5% de erro aceitável
= ~216 minutos de indisponibilidade por mês
```

Quando o error budget acaba:
- Para de fazer deploys de feature
- Foca 100% em estabilidade
- Só retoma mudanças quando o budget se recuperar

O error budget é o mecanismo que alinha velocidade e confiabilidade. Sem ele, é sempre "deploya mais rápido" ou "never touch a running system" — sem meio-termo inteligente.

---

## Alertas — o que poucos acertam

### Alerte em sintoma, não em causa

```
# ruim — causa
CPU > 80%

# bom — sintoma (usuário impactado)
Error rate > 1% nas últimas 5 minutos
p99 latência > 2s nas últimas 10 minutos
```

CPU alta pode não estar impactando ninguém. Error rate alta sempre está.

### Cada alerta precisa de ação

Se você não sabe o que fazer quando o alerta dispara, não crie o alerta.

Alerta sem ação clara vira ruído. Ruído leva a alerta fadiga. Alerta fadiga leva a incidentes reais ignorados.

### Runbook por alerta

Para cada alerta P1/P2, deve existir um runbook:

```markdown
## Alerta: High Error Rate

**Quando dispara**: error rate > 1% por 5+ minutos

**Primeiros passos**:
1. Verificar qual endpoint está com erro: [link dashboard]
2. Verificar logs de erro: [link query]
3. Verificar último deploy: [link CI]

**Possíveis causas e ações**:
- Deploy recente com bug → rollback: [comando]
- Dependência externa fora → verificar status: [link]
- Pico de tráfego → escalar: [procedimento]

**Escalação**: se não resolvido em 15min, chamar [pessoa/canal]
```

---

## Health Checks

```
GET /health/live   → está vivo? (para restart automático pelo orquestrador)
GET /health/ready  → está pronto para tráfego? (verifica dependências)
```

`/health/ready` deve verificar:
- Conexão com banco (query simples)
- Conexão com cache (se crítico)
- Dependências obrigatórias

```typescript
// /health/ready
async function readinessCheck(): Promise<HealthStatus> {
  const checks = await Promise.allSettled([
    db.query('SELECT 1'),
    redis.ping(),
  ])

  const healthy = checks.every(c => c.status === 'fulfilled')
  return {
    status: healthy ? 'ok' : 'degraded',
    checks: {
      database: checks[0].status === 'fulfilled' ? 'ok' : 'down',
      cache: checks[1].status === 'fulfilled' ? 'ok' : 'down',
    }
  }
}
```

---

## Distributed Tracing (Level 3)

Necessário quando múltiplos serviços participam de uma operação.

Propague `trace_id` em todo ponto de comunicação:
- HTTP: header `traceparent` (W3C standard) ou `X-Trace-Id`
- Filas: campo no envelope da mensagem
- Jobs: passado como argumento ou contexto

```
Request → Service A (trace_id: abc) → Service B (trace_id: abc) → Service C (trace_id: abc)
```

Com o mesmo `trace_id`, você vê o caminho completo em qualquer ferramenta de tracing.

OpenTelemetry é o padrão emergente — agnóstico de vendor, instrumenta uma vez, exporta para qualquer ferramenta.

---

## Por nível de sistema

**Level 1**: uptime monitoring externo (UptimeRobot), logs básicos estruturados  
**Level 2**: golden signals, alertas com runbook, error tracking (Sentry), health checks, SLO informal  
**Level 3**: distributed tracing (OpenTelemetry), SLOs formais com error budget, anomaly detection, runbook por alerta P1/P2
