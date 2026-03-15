# Project Template

> Ponto de partida para um novo projeto. Copie, adapte, remova o que não se aplica.

---

## Como usar

1. Copie este arquivo para o repositório do projeto
2. Preencha as seções com contexto real
3. Remova as seções que não se aplicam
4. Atualize conforme o projeto evolui

---

## README do projeto

```markdown
# [Nome do Projeto]

> [Uma frase que descreve o que o projeto faz e para quem]

## O que é

[2–3 frases sobre o propósito do projeto]

## Quick start

```bash
# instalar dependências
[comando]

# variáveis de ambiente
cp .env.example .env
# edite .env com seus valores

# iniciar em desenvolvimento
[comando]

# rodar testes
[comando]
```

## Estrutura

```
[estrutura de diretórios relevante]
```

## Como contribuir

[fluxo de trabalho: branch, PR, review, merge]

## Decisões de arquitetura

Ver `.ai/context/decisions.md`
```

---

## .env.example

```bash
# Banco de dados
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Autenticação
AUTH_SECRET=your-secret-here
AUTH_PROVIDER_CLIENT_ID=
AUTH_PROVIDER_CLIENT_SECRET=

# Serviços externos
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
SENDGRID_API_KEY=

# Observabilidade
SENTRY_DSN=
LOG_LEVEL=info

# Feature flags
FEATURE_NEW_DASHBOARD=false

# Ambiente
NODE_ENV=development
PORT=3000
```

---

## Checklist de setup de projeto novo

### Repositório

```
□ .gitignore adequado para a stack
□ .env.example com todas as variáveis necessárias (sem valores reais)
□ README com quick start funcional
□ License definida
```

### CI/CD

```
□ GitHub Actions (ou equivalente) configurado
□ Lint + testes rodando em PR
□ Deploy automatizado para staging (se Level 2+)
□ Secrets configurados no CI (não em arquivos commitados)
```

### Qualidade

```
□ Linter configurado (ESLint, Ruff, etc.)
□ Formatter configurado (Prettier, Black, etc.)
□ Pre-commit hooks (Husky, pre-commit)
□ TypeScript strict (se JS/TS)
```

### Segurança

```
□ Dependabot ou Renovate ativado
□ git-secrets ou gitleaks no pre-commit
□ HTTPS configurado desde o início
□ Variáveis sensíveis nunca em código
```

### Observabilidade

```
□ Logger configurado (structured JSON)
□ Error tracking configurado (Sentry ou equivalente)
□ Uptime monitoring configurado (Level 2+)
```

### Contexto

```
□ .ai/context/project-context.md preenchido
□ .ai/context/architecture-summary.md preenchido (esboço inicial)
□ Nível do sistema identificado (Level 1 / 2 / 3)
```

---

## Estrutura de commits (conventional commits)

```
feat:     nova funcionalidade
fix:      correção de bug
refactor: refatoração sem mudança de comportamento
test:     adição ou correção de testes
docs:     documentação
chore:    manutenção, atualização de dependência
perf:     melhoria de performance
ci:       mudança em CI/CD
```

Exemplos:

```
feat: add email verification on signup
fix: prevent race condition in payment retry
refactor: extract EmailService from UserController
test: add edge cases for discount calculation
docs: document API authentication flow
chore: upgrade Node.js to 20 LTS
```

---

## Estrutura de PR description

```markdown
## O que
[Uma frase descrevendo a mudança]

## Por quê
Fixes #[número da issue] / [contexto se não há issue]

## Como testar
1. [passo]
2. [passo]

## Notas para o revisor
[Decisões conscientes, dúvidas em aberto, partes que merecem atenção especial]

## Checklist
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada (se necessário)
- [ ] Sem breaking changes (ou breaking change documentado)
```
