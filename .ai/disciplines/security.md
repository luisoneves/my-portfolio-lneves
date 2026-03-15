# Security

> Segurança não é uma feature. É uma propriedade que você preserva em cada decisão.

---

## Filosofia

Segurança por checklist é melhor que nada.  
Segurança por design é o que funciona.

O objetivo: defesa proporcional ao risco real. Modelada por ameaça, não por compliance.

---

## Threat modeling básico

Antes de implementar controles, responda:

1. **O que estou protegendo?** — dados de usuário, segredos, disponibilidade, reputação
2. **De quem?** — atacante externo, bot automatizado, insider, acidente interno
3. **Qual o impacto real de comprometimento?** — financeiro, legal, reputacional
4. **Qual a probabilidade?** — dado o perfil do sistema e a atratividade do alvo

Controles devem ser proporcionais a `impacto × probabilidade`.

---

## Checklist por camada

### Entrada
```
□ Toda entrada externa é validada (tipo, formato, tamanho, valor)
□ Validação acontece no servidor, independente do cliente
□ Queries usam ORM / prepared statements — sem concatenação
□ Uploads têm limite de tamanho e validação de tipo real (não só extensão)
```

### Autenticação e Autorização
```
□ Provedor de auth testado (não implementação própria do zero)
□ Autorização verificada no servidor em todo endpoint
□ Principle of least privilege — acesso mínimo necessário
□ Tokens têm expiração; refresh tokens têm rotação
□ Rate limiting em endpoints de auth (login, reset, OTP)
```

### Dados sensíveis
```
□ Nenhum dado sensível em logs (senha, token, CPF, cartão, chave de API)
□ Todo tráfego sob TLS (HTTPS obrigatório com HSTS)
□ Dados em repouso criptografados quando necessário
□ Secrets em variáveis de ambiente ou secret store — nunca no repositório
□ git-secrets ou gitleaks no pre-commit e CI
```

### Headers e configuração
```
□ CORS restritivo — whitelist, não * em produção
□ CSP configurado para mitigar XSS
□ Mensagens de erro não expõem detalhes internos
□ Stack traces desabilitados em produção
```

### Dependências
```
□ Dependências auditadas regularmente (npm audit, pip-audit)
□ Atualizações automatizadas (Dependabot, Renovate)
□ Verificação de CVE antes de adicionar pacotes novos
```

---

## Resposta a incidentes

Defina antes que aconteça:

```
Detecção  → alertas, anomalias, report externo
Contenção → revogar tokens, feature flag, desabilitar endpoint
Análise   → logs, evidências, causa raiz
Comunicação → usuários afetados, autoridades (LGPD/GDPR se aplicável)
Aprendizado → post-mortem em knowledge/security/
```

---

## Por nível

**Level 1**: HTTPS, sem secrets no repo, dependências atualizadas, input validation básica  
**Level 2**: + auth robusto, rate limiting, CORS/CSP, audit logs, security scan no CI  
**Level 3**: + threat modeling formal, pen testing periódico, SOC2/ISO27001, WAF, monitoramento de anomalias
