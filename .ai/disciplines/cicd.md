# CI/CD

> O objetivo não é automatizar o deploy. É tornar seguro deployar qualquer hora, sem cerimônia, sem medo.

---

## CI Pipeline

### Ordem (fail fast)

```
1. Lint / formatação     → barato, falha rápido
2. Type checking         → se tipado
3. Testes unitários      → rápidos
4. Testes de integração  → mais lentos
5. Build                 → confirma que compila
6. Security scan         → dependências, SAST, secrets
```

### Princípios

- **Determinístico**: mesmo código = mesmo resultado, sempre
- **Rápido**: > 10 minutos vira gargalo e as pessoas param de esperar
- **Local-first**: tudo que roda em CI deve rodar localmente sem fricção
- **Bloqueante para merge**: PR com pipeline vermelho não entra

---

## Ambientes

```
development → staging → production
```

- **Staging**: espelho mais fiel possível de produção
- **Dados de staging**: anonimizados de produção ou gerados realisticamente
- Nunca teste com usuários reais sem feature flag

---

## Estratégias de deploy

| Estratégia | Quando usar |
|-----------|-------------|
| Rolling | padrão geral |
| Blue/Green | zero downtime, rollback instantâneo |
| Canary | mudanças de alto risco, validação gradual |
| Feature flags | separação de deploy e release |

---

## Feature Flags

Separam **deploy** (código no ar) de **release** (funcionalidade visível).

Vantagens:
- Deploy sem expor feature incompleta
- Rollback sem reverter código
- Rollout gradual para validação

Custo: flags acumulam débito técnico — remova regularmente após stable.

---

## Rollback

**Defina o processo antes do primeiro deploy.**

Rollback deve ser:
- Documentado (não depende de memória em momento de stress)
- Mais rápido que um novo deploy quando possível
- Testado periodicamente

Para mudanças de schema: sempre backward compatible antes de usar o novo campo.

```
Deploy 1: adiciona coluna nullable
Deploy 2: código escreve na nova coluna
Deploy 3: código lê da nova coluna
Deploy 4: (opcional) remove coluna antiga
```

---

## Infraestrutura como código

- Infraestrutura gerenciada manualmente não é reproduzível
- Terraform, Pulumi, CDK ou equivalente
- Infra code passa pelo mesmo processo de revisão que código de produto
- Ambientes criados e destruídos por código, não por cliques

---

## DORA Metrics

| Métrica | Referência saudável |
|---------|---------------------|
| Deployment frequency | diária ou mais |
| Lead time for changes | < 1 dia |
| Change failure rate | < 15% |
| Time to restore (MTTR) | < 1 hora |

Monitore para entender a saúde real da sua capacidade de entrega.

---

## Por nível

**Level 1**: lint + testes básicos no CI; deploy manual com script documentado  
**Level 2**: pipeline completo; staging; deploy automatizado; rollback documentado; secrets no CI  
**Level 3**: canary/blue-green; feature flags; DORA metrics monitoradas; infra como código; rollback automático
