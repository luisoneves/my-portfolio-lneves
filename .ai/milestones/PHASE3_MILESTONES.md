# PHASE3_MILESTONES.md
> Portfolio dev-luisneves.me | Branch: `feature/analytics-email-fix`
> Stack: Next.js 15 · TypeScript Strict · Tailwind CSS v4 · next-intl · Resend · Clarity
> Atualizado 18/03/2026 — inclui BUG-01 dark mode fix

---

## BOAS PRÁTICAS — LER ANTES DE EXECUTAR

Estas regras se aplicam a TODAS as phases e branches, não só a esta.

### Branch
- **Sempre criar branch antes de executar qualquer mudança.** Nunca trabalhar direto na `main`.
- Convenção: `feature/`, `fix/`, `chore/` conforme o tipo de mudança.
- Fechar (merge + delete) a branch antes de abrir outra.

### Commits
- **Commitar após cada tarefa testada e aprovada** — não acumular mudanças.
- Se uma tarefa depende de outra (ex: A1 → A2), pode agrupar as duas no mesmo commit, desde que teste as duas juntas antes.
- O commit é o save point: se algo quebrar depois, você tem onde voltar.
- Formato de mensagem:
  ```
  fix: dark mode toggle usando seletor .dark no globals.css
  feat: sendContact usando env vars + .env.example criado
  ```

### Testes
- **Sempre rodar `pnpm dev` antes de commitar** para validar comportamento visual/funcional.
- **Sempre rodar `pnpm build` antes do push** para garantir que o deploy não vai quebrar.
- Se `pnpm build` falhar, não fazer push. Resolver o erro primeiro.

### Sequência padrão por tarefa
```
editar arquivo → pnpm dev → testar → pnpm build → commit → próxima tarefa
```

### Variáveis de ambiente
- `.env.local` **nunca commitar**. Verificar `.gitignore` antes do primeiro commit da branch.
- `.env.example` **sempre commitar** — documenta o que o projeto precisa sem expor valores.
- Replicar as variáveis na Vercel (Settings → Environment Variables) antes de testar em produção.

---

## ESTADO DE ENTRADA

### ✅ Já implementado (não mexer)
- `ClarityProvider` com Project ID `vw2ovtzbwy` — presente E no JSX do layout ✅
- `sendContact.ts` — código correto, usa `process.env.CONTACT_TO_EMAIL` ✅
- `RESEND_API_KEY` referenciado via env var ✅
- Build limpo após merge da `feature/design-system-blog-contact` no main
- Sitemap com rotas de blog e contato
- i18n PT/EN funcionando

### ⚠️ O que este arquivo resolve
- **BUG-01** — Dark mode toggle não funcionava: `globals.css` usava `@media` mas `next-themes` precisa do seletor `.dark` — **fix incluído no arquivo gerado**
- **BUG-01b** — Alto contraste ativava dark mode colateralmente: resolvido automaticamente pelo fix acima
- **EMAIL** — Configurar `.env.local` com chave Resend real e email de destino (temporário: Gmail)
- **A3 opcional** — Mover Project ID Clarity para variável de ambiente

---

## BRANCH

```bash
git checkout main
git pull origin main
git checkout -b feature/analytics-email-fix
```

---

## ORDEM DE EXECUÇÃO

```
BUG-01 FIX → pnpm dev (testar toggles) → pnpm build → commit
EMAIL-FIX (.env.local + .env.example) → pnpm dev (testar formulário) → commit
A1/A2 (verificar Clarity) → registrar resultado
A3 (opcional) → se fizer: pnpm build → commit
push + variáveis na Vercel → testar em produção
```

---

## BUG-01 — Fix dark mode toggle
**Estimativa:** 5 min | **Alta prioridade — bloqueia UX**

### Causa raiz
`next-themes` com `attribute="class"` injeta a classe `.dark` no `<html>` ao clicar no toggle.
O `globals.css` anterior definia as variáveis dark apenas dentro de `@media (prefers-color-scheme: dark)`,
que é ignorada pelo toggle manual. Resultado: a classe `.dark` era adicionada, mas nenhuma variável CSS mudava.

O alto contraste ativava "dark mode colateralmente" porque o `high-contrast.css` forçava
`--background: #ffffff` e `--foreground: #000000` — em um contexto dark pelo sistema, isso
parecia uma troca de tema.

### Fix
Adicionar o seletor `.dark` no `globals.css` (arquivo gerado nesta sessão já contém o fix):

```css
/* Runtime: next-themes adiciona .dark no <html> ao clicar no toggle */
.dark {
  --background: #0c0a09;
  --foreground: #fafaf9;
  --card: #1c1917;
  --card-foreground: #fafaf9;
  --muted: #292524;
  --muted-foreground: #a8a29e;
  --border: #292524;
}

/* SSR fallback: aplica dark antes do JS hidratar (evita flash no carregamento inicial) */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --background: #0c0a09;
    /* ... mesmos valores ... */
  }
}
```

> O `high-contrast.css` já tem `:root[data-high-contrast].dark { ... }` — vai funcionar
> corretamente após este fix sem nenhuma alteração no `HighContrastToggle`.

### Arquivo
Substituir `app/globals.css` pelo arquivo `globals.css` gerado nesta sessão.

### Teste
```bash
pnpm dev
# 1. Clicar no toggle dark/light — página deve alternar entre claro e escuro
# 2. Ativar alto contraste com tema claro — fundo branco intenso, texto preto
# 3. Ativar alto contraste com tema escuro — fundo preto intenso, texto branco
# 4. Os dois toggles devem ser independentes entre si
```

### Commit após validar
```bash
git add app/globals.css
git commit -m "fix: dark mode toggle — adiciona seletor .dark no globals.css

Causa: next-themes usa attribute='class' e injeta .dark no <html>.
O CSS anterior usava apenas @media prefers-color-scheme, ignorado pelo toggle.
Fix: adiciona seletor .dark com as variáveis dark + mantém @media como SSR fallback
com :root:not(.light) para evitar conflito após hidratação.

Efeito colateral corrigido: alto contraste não ativa mais dark mode indevidamente."
```

### Critério de done
- [ ] Toggle dark/light alterna visualmente entre os temas
- [ ] Alto contraste funciona independente do tema (dark contrast / light contrast)
- [ ] `pnpm build` sem erros

---

## MILESTONE EMAIL-FIX — Formulário de contato funcional
**Estimativa:** 15 min | **Independente do BUG-01**

### Contexto
- `app/actions/sendContact.ts` — código já correto, não precisa alterar
- `from: "onboarding@resend.dev"` — obrigatório no free tier sem domínio verificado
- `to:` usa `process.env.CONTACT_TO_EMAIL` — só precisa configurar a variável

### Passo 1 — Copiar `.env.local` gerado nesta sessão

```bash
# Conteúdo do .env.local gerado:
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx   # ← substituir pela chave real do resend.com
CONTACT_TO_EMAIL=1991lotavio@gmail.com  # ← temporário para testes
NEXT_PUBLIC_CLARITY_PROJECT_ID=vw2ovtzbwy
```

> Obter a `RESEND_API_KEY` em: resend.com → API Keys → Create API Key

### Passo 2 — Verificar `.gitignore`

```bash
grep ".env.local" .gitignore
# Deve retornar: .env.local
# Se não retornar, adicionar antes de qualquer commit
```

### Passo 3 — Copiar `.env.example` gerado nesta sessão

O arquivo documenta as variáveis necessárias sem valores reais. Commitar junto com o fix.

### Passo 4 — Teste local

```bash
pnpm dev
# Acessar localhost:3000/pt/contato
# Preencher formulário e enviar
# Confirmar email chegando em 1991lotavio@gmail.com
# Confirmar email de confirmação chegando no email que você preencheu no formulário
```

### Passo 5 — Commit após validar

```bash
git add .env.example
# NÃO adicionar .env.local — apenas .env.example
git commit -m "feat: contact email fix — env vars + .env.example

sendContact.ts já usava process.env.CONTACT_TO_EMAIL (sem alteração de código).
CONTACT_TO_EMAIL configurado para Gmail temporário (1991lotavio@gmail.com).
.env.example criado documentando RESEND_API_KEY, CONTACT_TO_EMAIL, CLARITY_PROJECT_ID."
```

### Passo 6 — Configurar variáveis na Vercel

Acessar: `vercel.com/dashboard` → projeto → Settings → Environment Variables

Adicionar:
```
RESEND_API_KEY          = re_xxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL        = 1991lotavio@gmail.com
NEXT_PUBLIC_CLARITY_PROJECT_ID = vw2ovtzbwy
```

### Critério de done
- [ ] `.env.local` configurado com chave Resend real e Gmail destino
- [ ] `.env.example` commitado
- [ ] Teste local: email recebido em 1991lotavio@gmail.com
- [ ] Variáveis configuradas na Vercel
- [ ] Teste em produção: email recebido após envio em `dev-luisneves.me/pt/contato`

---

## MILESTONE A1 — Verificar ClarityProvider no layout
**Estimativa:** 5 min | **Provavelmente já done — apenas confirmar**

### Situação atual (confirmado na análise)
- `ClarityProvider` está importado E no JSX do `app/[locale]/layout.tsx` ✅
- Componente usa `useEffect` para injetar o script ✅
- Project ID `vw2ovtzbwy` hardcoded no componente (aceitável por ora)

### Verificação
```bash
# Abrir localhost:3000 no browser
# DevTools → Network → filtrar por "clarity"
# Confirmar request para https://www.clarity.ms/tag/vw2ovtzbwy
```

> Se aparecer no Network: A1 + A2 done. Registrar como done no checklist.

---

## MILESTONE A2 — Confirmar Clarity em produção
**Estimativa:** 5 min | **Depende de A1**

### Passos
1. Acessar `dev-luisneves.me` no browser
2. DevTools → Network → filtrar por "clarity"
3. Confirmar request para `https://www.clarity.ms/tag/vw2ovtzbwy`
4. Verificar `clarity.microsoft.com` — Sessions devem aparecer em até 2h

### Critério de done
- [ ] Request do Clarity visível em produção no Network tab
- [ ] Dashboard em `clarity.microsoft.com` mostrando sessões ativas

---

## MILESTONE A3 — Mover Project ID para variável de ambiente (opcional)
**Estimativa:** 10 min | **Pode ser deferido — não bloqueia nada**

### Quando fazer
Somente se quiser limpar o código antes do merge. Não é urgente.

### `components/providers/ClarityProvider.tsx` — substituir:
```tsx
// De:
s.src = `https://www.clarity.ms/tag/vw2ovtzbwy`

// Para:
const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
if (!projectId) return
s.src = `https://www.clarity.ms/tag/${projectId}`
```

> `.env.local` e Vercel já têm `NEXT_PUBLIC_CLARITY_PROJECT_ID=vw2ovtzbwy` se você seguiu os passos acima.

### Commit se fizer
```bash
git add components/providers/ClarityProvider.tsx
git commit -m "chore: Clarity Project ID movido para NEXT_PUBLIC_CLARITY_PROJECT_ID"
```

---

## CHECKLIST DE FECHAMENTO

```bash
# Build final antes do merge
pnpm build

# Se OK — push e merge
git push origin feature/analytics-email-fix

git checkout main
git pull origin main
git merge feature/analytics-email-fix --no-ff \
  -m "merge: analytics-email-fix → main

- fix: dark mode toggle (seletor .dark no globals.css)
- fix: alto contraste independente do tema
- feat: variáveis de ambiente para email + .env.example
- chore: Clarity Project ID em env var (se A3 foi feito)"

git push origin main

# Deletar branch após merge
git branch -d feature/analytics-email-fix
git push origin --delete feature/analytics-email-fix
```

---

## NOTAS PARA O AGENTE

1. **Ler antes de agir.** Confirmar estado atual de cada arquivo antes de reescrever.

2. **NÃO commitar `.env.local`** em hipótese alguma. `git status` antes de `git add .`.

3. **`from: "onboarding@resend.dev"`** é obrigatório no free tier sem domínio verificado. Não alterar.

4. **BUG-01 e EMAIL-FIX são independentes.** Podem ser feitos em qualquer ordem, mas testar cada um separadamente antes de commitar.

5. **Se `pnpm build` falhar**, não fazer push. Resolver o erro, rodar build de novo, aí sim commitar e fazer push.

6. **Próxima phase** (PHASE3-PARTE2) só iniciar após merge desta branch na main.

---

*Luis Otavio Neves Faustino · dev-luisneves.me · feature/analytics-email-fix · março 2026*
