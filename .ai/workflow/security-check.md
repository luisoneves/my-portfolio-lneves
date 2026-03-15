# Security Check

> Segurança não é uma fase do desenvolvimento — é uma verificação contínua ao longo do ciclo.

---

## Quando executar

| Momento | Verificação |
|---------|-------------|
| Antes de implementar | threat modeling básico para features com dados sensíveis |
| Durante o desenvolvimento | checklist por categoria conforme o código é escrito |
| No code review | checklist de revisão de segurança |
| No pipeline CI | scan automático de dependências e SAST |
| Antes de launch | revisão completa para sistemas Level 2+ |

---

## Checklist: desenvolvimento

### Inputs e validação
```
□ Todo input externo (HTTP, form, queue, event) é validado antes de usar
□ Validação acontece no servidor, não apenas no cliente
□ Tipos estão corretos — não apenas "string não vazia"
□ Tamanhos máximos definidos (campos de texto, uploads, arrays)
□ Queries usam ORM ou prepared statements — nunca concatenação
```

### Autenticação e autorização
```
□ Endpoint requer autenticação? Está verificando?
□ Permissão está sendo checada no nível correto (não apenas na UI)
□ Token tem expiração adequada?
□ Refresh token tem rotação?
□ Mudanças sensíveis (senha, email, permissão) têm autenticação reforçada?
```

### Dados sensíveis
```
□ Nenhum dado sensível em logs (senha, token, CPF, cartão, chave de API)
□ Dados em trânsito estão sob TLS
□ Dados em repouso estão criptografados se necessário
□ Secrets estão em variáveis de ambiente ou secret store — nunca no código
□ .gitignore cobre arquivos de ambiente
```

### Tratamento de erros
```
□ Mensagens de erro para o usuário não expõem detalhes internos
□ Stack traces não são retornados em produção
□ Erros estão sendo logados no servidor com contexto suficiente
□ Existe limite de tentativas para operações sensíveis (login, OTP, reset)
```

---

## Checklist: code review de segurança

```
□ Input de usuário é tratado como hostil em todo ponto de entrada?
□ Autorização está no servidor — cliente não decide o que pode ver/fazer?
□ Novos endpoints têm rate limiting adequado?
□ Novos campos armazenados não incluem dados sensíveis desnecessários?
□ Dependências novas: qual a reputação do pacote? Tem CVE conhecido?
□ Variáveis de ambiente novas estão documentadas (sem valor, apenas nome)?
```

---

## Checklist: CI pipeline

Automações que devem rodar em todo push:

```yaml
security-checks:
  - dependency-audit      # npm audit, pip-audit, etc.
  - secret-scan           # gitleaks, git-secrets
  - sast                  # CodeQL, Semgrep, SonarQube
  - license-check         # dependências com licença incompatível
```

Falha em qualquer um: bloqueia o merge.

---

## Tratamento de incidente de segurança

### Detecção
- Alerta de anomalia (tentativas de login, volume incomum, erro rate)
- Report de usuário ou pesquisador externo
- Scan de CI encontra vulnerabilidade crítica

### Resposta imediata (primeiros 30 minutos)

```
1. Confirmar o escopo — o que foi comprometido?
2. Isolar — revogar tokens, desabilitar endpoint, feature flag
3. Notificar internamente — não aguarde certeza total para notificar o time
4. Preservar evidência — logs, timestamps, contexto
```

### Comunicação

- Usuários afetados: notificar com o que sabe, quando sabe
- Autoridades: conforme regulação aplicável (LGPD, GDPR)
- Nunca: silenciar, minimizar ou atrasar a comunicação para "confirmar tudo primeiro"

### Post-mortem

Após contenção, registrar em `knowledge/security/`:
- O que aconteceu
- Como foi detectado
- Qual o impacto real
- Causa raiz
- O que mudou

---

## Responsabilidade compartilhada

Segurança não é responsabilidade exclusiva de quem trabalha em "área de segurança".

Todo engenheiro é responsável pela segurança do código que escreve.  
Code review é um ponto de verificação, não a linha de defesa principal.  
A linha de defesa principal é o hábito de cada dev ao escrever cada linha.
