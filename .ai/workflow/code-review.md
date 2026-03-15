# Code Review

> Code review não é auditoria. É colaboração para elevar a qualidade do que vai para produção.

---

## Objetivos do code review

1. **Correctness** — o código faz o que diz que faz?
2. **Robustness** — e se o input for inesperado?
3. **Maintainability** — daqui 6 meses, isso vai ser compreensível?
4. **Consistency** — está alinhado com os padrões do projeto?
5. **Security** — existe superfície de ataque não óbvia?

O que **não** é objetivo:
- Impor preferências estéticas que o linter não cobre
- Demonstrar conhecimento técnico
- Bloquear por divergência de opinião sem argumento técnico

---

## Responsabilidades de quem cria o PR

### PR description

Uma boa description responde:
```
O que → a mudança em uma frase
Por quê → o problema ou requisito que motivou
Como → a abordagem escolhida (e por que não outra)
Como testar → o que o revisor deve verificar manualmente
Cuidados → partes que merecem atenção especial
```

Template mínimo:
```markdown
## O que
[descrição em 1-2 frases]

## Por quê
[problema ou ticket]

## Notas para o revisor
[algo que merece atenção especial, dúvidas em aberto, decisões conscientes]
```

### Tamanho

- **< 400 linhas difáveis**: ideal
- **400–800 linhas**: aceitável, justifique
- **> 800 linhas**: fragmente ou justifique muito bem

Linhas de teste e linhas de arquivo gerado (migrations, mocks) contam diferente.

### Self-review primeiro

Antes de pedir review, revise seu próprio PR como se fosse outra pessoa. Você vai encontrar 30% dos problemas antes de custar tempo de outra pessoa.

### Respondendo comentários

- Responda todo comentário — não apenas resolva silenciosamente
- Diferencie: concordou e corrigiu / discordou e explicou por quê / pergunta legítima que mudou sua visão
- Para conversas longas: chame para uma conversa, não prolongue thread

---

## Responsabilidades de quem revisa

### Antes de começar

Leia o contexto: o título, a description, o ticket associado. Revisar sem contexto é revisar no escuro.

### O que verificar

**Lógica**
```
□ O código faz o que a description descreve?
□ Os edge cases óbvios estão tratados? (null, empty, concurrent access)
□ Existe algum caminho de erro não tratado?
□ A lógica é fácil de seguir ou requer decifração?
```

**Testes**
```
□ Os testes cobrem os cenários críticos?
□ Os testes falhariam se o código quebrasse? (testes que sempre passam são piores que ausência)
□ Existe cobertura de casos de borda?
□ Os testes são independentes entre si?
```

**Segurança**
```
□ Input do usuário é validado antes de usar?
□ Dados sensíveis não aparecem em logs?
□ Permissões estão verificadas no lugar certo?
□ SQL/NoSQL injection é possível?
```

**Arquitetura**
```
□ A mudança está no lugar certo do sistema?
□ Cria acoplamento desnecessário com outro módulo?
□ Duplica lógica que já existe?
□ Muda um contrato existente sem versionamento?
```

### Como comentar

**Tipos de comentário** — seja explícito sobre o tipo:

```
blocker: [texto] → deve ser resolvido antes do merge
suggestion: [texto] → melhoria desejável, mas não bloqueante
question: [texto] → genuinamente não entendi, preciso de contexto
nit: [texto] → detalhe de estilo, pode ignorar se discordar
praise: [texto] → algo que está particularmente bem feito
```

**Tom**:
- Comente sobre o código, não sobre a pessoa
- "Esse trecho pode causar N+1 quando a lista for grande" > "você criou um N+1 aqui"
- Para blockers: explique por que é um blocker, não apenas que é
- Ofereça alternativa quando possível

### Tempo de resposta

- PR aberto: primeira revisão em até 1 dia útil
- PR com changes requested: novo review em até 1 dia útil após a atualização
- Reviews pendentes > 2 dias úteis: escalação válida

---

## Aprovação e merge

**Aprovar significa**: "estou confortável que isso vai para produção".

Não significa: "eu teria feito igual" ou "não tenho mais nada a dizer".

**Não aprove se**:
- Existe blocker não resolvido
- Você não entendeu suficientemente para ter opinião

**Merge**: quem criou o PR faz o merge após aprovação. Isso mantém a responsabilidade clara.

---

## Review de código gerado por IA

Código gerado por agente de IA passa pelo mesmo processo — sem exceção.

Atenção extra para:
- Lógica que parece correta mas tem edge case sutil
- Padrões inconsistentes com o restante do projeto
- Testes que testam a implementação, não o comportamento
- Dependências adicionadas sem justificativa
- Tratamento de erro genérico demais ("catch all" sem log específico)
