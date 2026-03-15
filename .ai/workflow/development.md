# Development

> O ciclo fundamental de trabalho: do problema ao código em produção.

---

## O loop de desenvolvimento

```
scan → plan → implement → test → review → ship → observe
```

Cada fase tem um produto esperado e um critério de saída.  
Pular uma fase não elimina o trabalho — empurra para uma fase mais cara.

---

## 1. Scan

**Antes de qualquer modificação, entenda o que existe.**

```
□ Qual parte do sistema será afetada?
□ Existem módulos adjacentes que podem ser impactados?
□ Há testes existentes cobrindo essa área?
□ Existe código similar que pode ser reutilizado ou que conflita?
□ Qual o estado atual do branch / main?
```

Demorar 10 minutos em scan economiza horas de regressão.

Para agentes de IA: o scan é obrigatório antes de qualquer modificação. Sem scan, o agente opera com modelo mental incompleto.

---

## 2. Plan

**Externalizar o raciocínio antes de escrever código.**

Para mudanças pequenas (1 arquivo, < 30 linhas): raciocínio mental é suficiente.  
Para mudanças médias (múltiplos arquivos, 1 módulo): comentário na issue ou PR description.  
Para mudanças grandes (múltiplos módulos, schema, API): RFC ou ADR antes de implementar.

O plano deve responder:
```
□ Qual o escopo mínimo que resolve o problema?
□ Quais módulos são afetados?
□ Existe risco de regressão? Onde?
□ Como será testado?
□ Existe dependência de outra mudança?
```

---

## 3. Implement

**Implementar em incrementos pequenos, cada um testável.**

### Commits atômicos

Cada commit: uma mudança coerente e completa.

```bash
# bom
feat: add email validation on registration
fix: prevent double-charge on retry
refactor: extract PaymentService from controller
test: add edge cases for tax rounding

# ruim
WIP
fix stuff
updates
```

Commits atômicos facilitam: bisect para bugs, code review, rollback seletivo, changelog.

### Tamanho de PR

- Ideal: < 400 linhas difáveis
- Aceitável: < 800 linhas difáveis
- Acima disso: fragmente em PRs sequenciais ou use feature flag

### Branches

- Nomeação descritiva: `feat/payment-retry`, `fix/auth-timeout`, `chore/upgrade-deps`
- Vida curta: < 2 dias em geral
- Uma responsabilidade por branch

---

## 4. Test immediately

**A cada unidade implementada, o teste vem antes de continuar.**

Não ao final da feature. Não depois do PR aberto.

```
implementa função → escreve teste → função passa → continua
```

Por quê:
- O contexto do bug ainda está fresco — debugging é 10× mais rápido
- Testes escritos depois tendem a ser testes de implementação, não de comportamento
- O teste força você a pensar na interface antes de travar em um design

Para lógica de negócio crítica: TDD (teste antes da implementação) quando o comportamento esperado é claro.

---

## 5. Review

Antes de abrir PR, self-review:

```
□ O código faz o que o ticket/issue descreve?
□ Os edge cases óbvios estão cobertos?
□ Existe código que eu não entenderia em 3 meses?
□ Tem algo que parece "funcionou, não sei por quê"?
□ Os testes realmente falhariam se o código quebrasse?
□ A documentação relevante foi atualizada?
```

---

## 6. Ship

Deploy não é o fim do trabalho — é o início da observação.

```
□ Pipeline passou?
□ Staging validado?
□ Rollback planejado?
□ Feature flag configurado se necessário?
```

Nos primeiros 15–30 minutos após deploy:
- Verifique error rate
- Verifique latência
- Verifique logs de erro

---

## 7. Observe

Após confirmar que está estável:

- O que foi entregue resolve o problema original?
- Alguma métrica de produto mudou conforme esperado?
- O que faria diferente na próxima vez?

Para bugs sérios e incidentes: post-mortem em `knowledge/reliability/`.

---

## Gestão de foco

**Trabalho profundo** (código, arquitetura): blocos de 90–120 min sem interrupção.  
**Trabalho comunicativo** (review, slack, reunião): batche em horários definidos.

Quando travado por mais de 20–30 min sem progresso:
1. Explique o problema em voz alta ou em texto (rubber duck)
2. Reduza ao caso mínimo reproduzível
3. Verifique suas assumptions — o que você acha verdade mas não confirmou?
4. Peça ajuda — travar sozinho por horas é o custo mais alto do ego
