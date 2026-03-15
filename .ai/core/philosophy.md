# Philosophy

> A base de raciocínio que orienta todas as outras decisões do modelo.

---

## Por que filosofia antes de princípios

Princípios são regras. Filosofia é o porquê das regras.

Quando um princípio entra em conflito com outro — e vai entrar — a filosofia é o que resolve o empate. Sem ela, você tem uma lista de boas práticas desconexas. Com ela, você tem um modelo coerente.

---

## A ideia central

**Engenharia de software é a arte de tomar decisões reversíveis com custo proporcional à importância delas.**

Tudo decorre disso:
- Decisões reversíveis merecem pouca cerimônia
- Decisões irreversíveis merecem cuidado desproporcional
- Complexidade desnecessária converte reversível em irreversível
- Velocidade sustentável vem de manter as decisões reversíveis por mais tempo

---

## Sobre complexidade

Complexidade é o inimigo principal — não o bug, não a lentidão, não a falta de feature.

Bugs são sintomas. Lentidão é sintoma. Features ausentes são produto.  
Complexidade é a causa raiz de quase todo problema de longo prazo em sistemas de software.

Ela se manifesta de três formas:

**Complexidade essencial**: vem do domínio. Não tem como eliminar. O domínio de pagamentos é complexo — essa complexidade tem que estar em algum lugar.

**Complexidade acidental**: vem das escolhas técnicas. É eliminável. Um ORM mal usado que exige 400 linhas de config para fazer uma query simples é complexidade acidental.

**Complexidade especulativa**: vem do "e se precisar no futuro". É a mais cara. Você paga o custo agora por um benefício que talvez nunca chegue.

A filosofia do `.ai` é: elimine a acidental, minimize a especulativa, honre a essencial.

---

## Sobre velocidade

Velocidade real não é quanto código você produz por dia.  
É quanto valor você entrega por unidade de confiança no que entregou.

Um time que deploya três vezes por semana com confiança é mais rápido do que um time que deploya uma vez por mês com medo — mesmo que o segundo escreva mais código.

Velocidade sustentável vem de:
- Testes que dão confiança real
- Deploys pequenos e reversíveis
- Código que o time inteiro entende
- Decisões documentadas (para não refazer o raciocínio depois)

---

## Sobre pragmatismo

Purismo técnico é caro. Pragmatismo irresponsável é perigoso.

O ponto de equilíbrio: **adote a prática mais simples que atende o requisito real, com margem suficiente para evoluir quando necessário**.

"Suficiente" é a palavra mais importante nessa frase. Não máximo, não mínimo — suficiente para o contexto atual.

---

## Sobre o papel da IA no desenvolvimento

O `.ai` foi projetado para funcionar tanto para humanos quanto como instrução para agentes de IA.

Quando um agente usa esse modelo, os princípios se aplicam com ainda mais rigor:
- Planejar antes de implementar evita erros arquiteturais caros
- Testar imediatamente após implementar detecta bugs no contexto correto
- Scanning do codebase antes de modificar evita quebrar o que já funciona
- Documentação viva garante que o agente e o humano compartilham o mesmo modelo mental

A IA não muda os princípios — amplifica o custo de não segui-los.

---

## O que o `.ai` não é

- Não é um boilerplate
- Não é um conjunto de regras de linting
- Não é um framework
- Não é uma checklist para seguir cegamente

É um **modelo mental** — uma forma de estruturar o raciocínio sobre engenharia de software que produz decisões mais consistentes ao longo do tempo.
