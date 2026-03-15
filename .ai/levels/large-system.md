# Level 3 — Large System

> Sistema distribuído, múltiplos times, escala real, compliance, alta disponibilidade.

---

## Contexto

Você está aqui quando:

- Múltiplos times precisam de autonomia real de deploy
- A escala tornou problemas concretos (latência, custo, throughput)
- Compliance exige controles formais (SOC2, ISO27001, HIPAA, PCI)
- SLA formal com penalidades financeiras ou contratuais
- Falha afeta um número grande de usuários com impacto imediato

**Não aspire ao Level 3 sem necessidade real. O custo operacional é alto.**

---

## Riscos específicos deste nível

Esses riscos não existem — ou são baratos — nos outros níveis:

| Risco | Por que é diferente aqui |
|-------|--------------------------|
| Complexidade acidental | Abstrações mal colocadas custam times inteiros |
| Latência de rede | Síncrono onde assíncrono seria melhor causa cascata de falha |
| Consistência distribuída | Assumir ACID onde há eventual consistency gera bugs silenciosos |
| Ownership difuso | "Esse problema é do serviço X" sem dono claro = incidente não resolvido |
| Blast radius | Uma mudança errada afeta múltiplos serviços e times |

---

## O que aplicar

### Arquitetura

```
□ Domínios com fronteiras bem definidas (não acoplamento acidental)
□ Contratos explícitos entre serviços (OpenAPI, Protobuf, AsyncAPI)
□ Times com ownership real — um PR não requer aprovação de 3 times
□ Event-driven para desacoplar domínios quando necessário
□ API Gateway para fronteira externa
□ Service mesh ou sidecars para observabilidade de rede (Level 3 avançado)
```

### Resiliência

```
□ Circuit breaker em chamadas externas críticas
□ Retry com backoff exponencial e jitter
□ Timeout definido em toda chamada de rede
□ Graceful degradation — sistema funciona parcialmente com dependência fora
□ Bulkhead — falha em um serviço não drena recursos de outros
□ Health checks por dependência (live e ready separados)
```

### Observabilidade

```
□ Distributed tracing (OpenTelemetry + Jaeger/Tempo/Datadog)
□ SLOs definidos por serviço com error budget
□ Dashboards por domínio
□ Runbooks para cada alerta P1/P2
□ Anomaly detection em métricas críticas
□ Correlation entre logs, métricas e traces
```

### CI/CD

```
□ Deploy por serviço independente
□ Canary ou blue/green por padrão
□ Feature flags gerenciados centralmente
□ DORA metrics monitoradas e visíveis para o time
□ Rollback automático baseado em métricas (não apenas manual)
□ Contract testing entre serviços (Pact ou equivalente)
```

### Segurança

```
□ Threat modeling formal para features de alto risco
□ Penetration testing periódico (anual mínimo)
□ Defence in depth — múltiplas camadas, nenhuma é suficiente sozinha
□ WAF (Web Application Firewall) em fronteira externa
□ Zero trust entre serviços internos (mTLS ou token de serviço)
□ Monitoramento de anomalias (volume incomum, padrões de acesso estranhos)
□ Compliance documentado (SOC2, ISO ou equivalente)
```

### Confiabilidade

```
□ Chaos engineering periódico (GameDay, Chaos Monkey)
□ Load testing antes de features com impacto de escala
□ Capacity planning baseado em dados
□ Runbooks para falhas conhecidas
□ Incident management process definido (on-call, escalação, post-mortem)
□ Disaster recovery testado (não apenas documentado)
```

---

## Métricas de saúde para Level 3

```
Deploy frequency:     múltiplas vezes por dia (por serviço)
Lead time:            < 1 dia
Change failure rate:  < 10%
MTTR:                 < 1 hora
API p99:              < 500ms
Error budget:         respeitado (não esgotado consistentemente)
SLO:                  definido e monitorado por serviço
```

---

## Armadilha comum: complexidade por status

Em sistemas Level 3, existe pressão cultural para adicionar complexidade como sinal de maturidade.

Resistência necessária:
- Novo padrão arquitetural introduzido por um time não se propaga se não há problema real que resolve
- Microserviço criado sem time autônomo e sem necessidade de escala é débito operacional
- Ferramenta nova que o time não sabe operar cria risco, não reduz

**Maturidade em Level 3 é saber quando não adicionar complexidade.**
