# Agents

> Como qualquer agente de IA deve se comportar ao trabalhar com este sistema.
> Agnóstico de ferramenta, de modelo, de linguagem.

---

## Princípio

Um agente que usa o `.ai` não substitui o engenheiro — executa o que o engenheiro modelou.

O `.ai` é o raciocínio. O agente é a execução.

Isso significa que o agente deve seguir a mesma disciplina que um engenheiro humano seguiria — sem atalhos porque "é mais rápido", sem decisões arquiteturais não planejadas, sem mudanças fora do escopo definido.

---

## O loop de um agente

```
ler contexto
↓
escanear o sistema
↓
entender o nível atual
↓
planejar a mudança
↓
implementar em incrementos
↓
testar imediatamente
↓
verificar qualidade
↓
atualizar documentação
```

Cada etapa tem critério de saída. O agente não avança sem completar a anterior.

---

## 1. Ler contexto

Antes de qualquer ação, o agente lê:

```
context/project-context.md       → o que é o sistema, qual a stack, qual o nível
context/architecture-summary.md  → como o sistema está organizado
context/decisions.md             → decisões já tomadas e por quê
```

**Por que importa**: agente sem contexto opera com modelo mental incompleto. Decisões sem contexto geram arquitetura inconsistente.

---

## 2. Escanear o sistema

Antes de modificar qualquer parte:

```
□ Quais módulos são afetados?
□ Existem dependências que podem quebrar?
□ Há testes cobrindo a área a ser modificada?
□ Existe padrão estabelecido para o tipo de mudança?
□ O que já existe que pode ser reutilizado?
```

Scan é obrigatório. Pular scan é a causa mais comum de regressão introduzida por agente.

---

## 3. Entender o nível do sistema

O agente consulta `levels/` e aplica somente o que é adequado ao nível atual.

```
Level 1 → não adiciona cache distribuído, não cria microserviço
Level 2 → não adiciona distributed tracing, não implementa CQRS
Level 3 → pode aplicar o conjunto completo de disciplinas
```

Complexidade fora do nível não é qualidade — é ruído.

---

## 4. Planejar antes de implementar

Para qualquer mudança que afete mais de um arquivo:

```
□ Qual o escopo mínimo que resolve o problema?
□ Quais arquivos serão criados, modificados, removidos?
□ Existe risco de quebrar algo existente?
□ Como será testado?
```

O plano deve ser externalizado — comentário, documento, mensagem — antes de escrever código.

Plano vago para agente gera arquitetura errada. O custo é maior que para humano porque o agente executa rápido e vai fundo antes de perceber que errou.

---

## 5. Implementar em incrementos

Cada incremento deve ser:

- Pequeno o suficiente para ser verificado
- Coerente por si só (não deixa o sistema quebrado no meio)
- Testável antes de continuar

O agente não implementa tudo de uma vez e testa no final.

---

## 6. Testar imediatamente

A cada unidade implementada, o teste vem antes de continuar.

```
implementa função → escreve ou executa teste → passa → continua
```

Para código gerado por agente especialmente: testes que sempre passam são piores que ausência de testes. O agente deve verificar que o teste falha quando o código quebra — não apenas que passa quando o código funciona.

---

## 7. Verificar qualidade

Antes de considerar a tarefa concluída:

```
□ O código está consistente com os padrões do projeto?
□ Existe tratamento de erro adequado?
□ Dados sensíveis não aparecem em logs?
□ A mudança está no nível correto de abstração?
□ Algo foi adicionado fora do escopo planejado?
```

Escopo creep silencioso é comum em agentes — implementar "já que estou aqui" sem planejamento.

---

## 8. Atualizar documentação

Se a mudança afeta arquitetura ou decisões:

```
context/architecture-summary.md  → atualizar se a estrutura mudou
context/decisions.md             → registrar se foi tomada decisão relevante
knowledge/                       → registrar aprendizado se houve algo não óbvio
```

Documentação viva não é responsabilidade só do humano.

---

## O que o agente não decide sozinho

```
✗ Mudar o nível do sistema (Level 1 → Level 2)
✗ Introduzir padrão arquitetural não planejado
✗ Adicionar dependência externa nova
✗ Modificar contrato de API existente
✗ Alterar schema de banco sem migration planejada
✗ Expandir escopo além do que foi definido
```

Essas decisões exigem revisão humana. O agente para, documenta a dúvida e aguarda.

---

## Compatibilidade

Este arquivo descreve comportamento esperado de qualquer agente — independente de:

- Qual modelo de linguagem está sendo usado
- Qual ferramenta (Cursor, Claude, Copilot, qualquer outra)
- Qual linguagem de programação do projeto
- Qual framework ou stack

O `.ai` é o coringa. O agente é quem joga a carta.
