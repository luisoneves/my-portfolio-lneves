# Principles

> Regras de operação derivadas da filosofia. Aplicam-se a qualquer projeto, linguagem ou escala.

---

## Como ler este documento

Cada princípio tem:
- Uma afirmação central
- O raciocínio por trás dela
- Como viola-la se parece (para reconhecer quando está acontecendo)

---

## 1. Clareza antes de elegância

Código que qualquer dev lê em 30 segundos supera código que impressiona em 5 minutos.

Elegância real é um subproduto de clareza bem aplicada — quando o código é tão claro que parece simples. Elegância performática é complexidade com boa aparência.

**Como a violação parece**: "esse código é mais sofisticado" / abstrações que exigem contexto para serem entendidas / metaprogramação onde código direto serviria.

---

## 2. Decisões reversíveis recebem pouca cerimônia; decisões irreversíveis recebem muita

Classifique toda decisão relevante:

- **Reversível**: nome de variável, estrutura de pasta, biblioteca utilitária → decida rápido
- **Irreversível**: schema de banco, contrato de API pública, modelo de autenticação → documente, discuta, decida devagar

Gastar energia igual nos dois grupos é um dos maiores desperdícios em engenharia.

**Como a violação parece**: horas de debate sobre nome de arquivo / schema de banco migrado sem ADR / quebra de contrato de API sem versionamento.

---

## 3. Complexidade é débito, não investimento

Toda abstração, camada, padrão introduzido tem custo permanente de manutenção.

Esse custo só vale quando o benefício é tangível agora ou previsível no curto prazo.

**Como a violação parece**: "vamos abstrair isso porque pode precisar depois" / interfaces com uma única implementação / factory para objetos simples.

---

## 4. Testar imediatamente após implementar

A cada unidade de funcionalidade implementada, o teste vem antes de continuar.

Não ao final. Não depois do PR. Imediatamente.

Razão: bugs encontrados no contexto onde foram criados são 10× mais baratos de corrigir do que bugs encontrados depois.

**Como a violação parece**: implementar uma feature inteira e testar no final / "vou adicionar testes depois" / PR sem testes para "código simples".

---

## 5. Escanear antes de modificar

Antes de alterar qualquer parte do sistema, entenda o que existe.

Isso evita: duplicação, quebra de contrato implícito, arquitetura inconsistente, regressão.

Fluxo:
```
scan dependências → scan módulo afetado → scan testes existentes → planejar → modificar
```

**Como a violação parece**: "achei que estava isolado" / duplicar lógica que já existia / quebrar módulo adjacente por desconhecimento.

---

## 6. Planejar antes de implementar

Para qualquer mudança que afete mais de um módulo: escreva o plano antes de escrever o código.

O plano não precisa ser formal — pode ser um comentário de 5 linhas na issue. O importante é externalizar o raciocínio antes de commitá-lo em código.

**Como a violação parece**: refactor que começa sem direção e cresce → PR de 800 linhas / feature que muda de shape no meio da implementação.

---

## 7. O sistema deve ser explicável

Se você não consegue descrever um módulo em 3 frases, ele está complexo demais.

Explicabilidade não é documentação — é sinal de que a estrutura faz sentido internamente.

**Como a violação parece**: "melhor olhar o código porque é difícil de explicar" / módulo que faz 4 coisas sem nome que represente nenhuma.

---

## 8. Acople no que não muda

Dependa de abstrações estáveis, não de implementações voláteis.

Regra prática: quanto mais provável algo mudar, mais você deve se isolar dele.

**Como a violação parece**: lógica de negócio dentro de controller de framework / chamada direta a SDK de terceiro em 40 lugares / testes que dependem de detalhe de implementação.

---

## 9. Observabilidade é parte do produto, não adição posterior

Um sistema que você não consegue monitorar em produção está incompleto.

Logs, métricas e traces não são infraestrutura de operações — são parte da entrega de produto.

**Como a violação parece**: "a gente adiciona monitoring depois que lançar" / erro silencioso em produção que ninguém sabe que existe / debugar produção via `console.log` adicionado na hora.

---

## 10. Documentação viva ou documentação morta

Documentação que não acompanha o código é pior do que ausência de documentação — ela engana.

A única documentação sustentável é aquela que fica próxima do código que descreve e que faz parte do processo de mudança.

**Como a violação parece**: README que descreve uma arquitetura que não existe mais / comentário que contradiz o código / ADR que ninguém atualiza.

---

## 11. O time é parte do sistema

Decisões técnicas que o time não entende não se sustentam.

Arquitetura que só uma pessoa consegue manter é um ponto único de falha humano — tão crítico quanto um ponto único de falha técnico.

**Como a violação parece**: "só o fulano mexe nessa parte" / PR aprovado sem entendimento real / padrão introduzido sem discussão que ninguém mais usa corretamente.

---

## 12. Pragma supera purismo — com consciência

Quando uma regra produz o efeito oposto ao seu objetivo no contexto atual, questione a regra.

Não a ignore silenciosamente — questione explicitamente e registre o desvio consciente.

**Como a violação parece (dos dois lados)**: purismo: seguir padrão que claramente não serve o contexto / pragmatismo irresponsável: desviar sem registro, criando inconsistência invisível.
