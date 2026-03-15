# Level 1 — Simple Site

> Site simples, landing page, MVP, projeto solo, prova de conceito.

---

## Contexto

Você está aqui quando:

- O sistema tem propósito claro e escopo limitado
- Downtime não tem impacto crítico de negócio
- O time é você, ou você + 1 pessoa
- Usuários não dependem do sistema para funções críticas
- A prioridade é aprender, validar ou entregar rápido

**Um site institucional pode ficar no Level 1 para sempre. Isso é correto.**

---

## O que aplicar

### Obrigatório

```
□ HTTPS (sem exceção)
□ Secrets em variáveis de ambiente (nunca no código)
□ Dependências atualizadas (Dependabot ou verificação manual mensal)
□ .gitignore cobrindo arquivos de ambiente
□ Deploy documentado (script ou README — não depende de memória)
□ Backup básico de dados (se houver banco)
```

### Recomendado

```
□ Lint e formatação automatizados
□ Testes para lógica crítica (se existir)
□ Uptime monitoring externo (UptimeRobot, Better Uptime — free)
□ Logs básicos estruturados
□ HTML semântico e meta tags básicas (se site público)
□ Performance básica (LCP razoável)
```

---

## O que não fazer ainda

```
✗ Microsserviços
✗ Cache distribuído (Redis)
✗ Filas de mensagem
✗ Rate limiting complexo
✗ Distributed tracing
✗ Kubernetes
✗ Testes E2E elaborados
✗ CI/CD completo com staging environment
✗ SLOs formais
```

Não é que essas práticas sejam ruins — é que o custo de operação não é justificado neste contexto.

---

## Stack típica

```
Frontend: HTML/CSS/JS simples, ou Next.js/Astro para sites com conteúdo
Backend: monolito simples, serverless functions, ou BaaS (Supabase, Firebase)
Banco: SQLite, Postgres gerenciado (Supabase, Railway, Neon)
Hosting: Vercel, Netlify, Railway, Render
CI: lint + build no push (GitHub Actions básico)
```

---

## Arquitetura recomendada

Monolito simples. Sem camadas desnecessárias.

```
request → handler/controller → service (se necessário) → banco
```

Não crie abstração antes de precisar. Repository pattern, DI containers e camadas formais são overhead neste nível.

---

## Critério de subida para Level 2

Reavalie quando:

```
□ Usuários reais dependem do sistema e downtime tem impacto mensurável
□ Time cresce para 2+ pessoas com desenvolvimento simultâneo
□ Dados sensíveis de usuários são coletados (autenticação, pagamento, PII)
□ A feature complexity começou a exigir mais estrutura
□ Você está corrigindo os mesmos tipos de bug repetidamente
```

Subir de nível sem necessidade real é over-engineering.  
Não subir quando há necessidade real é acumular débito.
