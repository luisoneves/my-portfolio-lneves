# Glossary

> Vocabulário compartilhado. Termos usados no `.ai` com definição precisa para evitar ambiguidade.

---

## Por que um glossário

Problemas de engenharia frequentemente são problemas de linguagem.

Dois engenheiros usando "módulo" com definições diferentes vão tomar decisões inconsistentes sem perceber. Um glossário não é pedantismo — é fundação para comunicação eficaz.

---

## Termos de arquitetura

**Módulo**  
Unidade de código com responsabilidade coesa, fronteira definida e interface explícita. Um módulo pode ser um arquivo, um diretório, um pacote ou um serviço — o que importa é a coesão e a fronteira, não o tamanho.

**Fronteira (boundary)**  
O ponto onde uma unidade do sistema se comunica com outra. Fronteiras devem ser explícitas, mínimas e estáveis. Cruzar uma fronteira sempre tem custo (latência, serialização, contrato).

**Contrato**  
O acordo explícito entre duas partes do sistema: o que uma expõe e o que a outra pode assumir. Contratos quebrados são a fonte mais comum de bugs em sistemas distribuídos.

**Camada (layer)**  
Agrupamento de código por responsabilidade técnica (presentation, application, domain, infrastructure). Camadas têm direção — dependências fluem para dentro, nunca para fora.

**Domínio**  
A área do problema de negócio que o código resolve. Domínio é sobre o problema, não sobre a tecnologia.

**ADR (Architecture Decision Record)**  
Documento curto que registra uma decisão arquitetural: o contexto, a decisão e as consequências. Não é documentação de como funciona — é registro de por que funciona assim.

---

## Termos de qualidade

**Reversível vs. Irreversível**  
Uma mudança reversível pode ser desfeita com baixo custo (feature flag, configuração, nova versão). Uma mudança irreversível tem custo alto de reversão (schema de banco, contrato público, dados migrados). A distinção determina quanta cerimônia uma decisão merece.

**Débito técnico**  
Custo futuro criado por uma decisão de curto prazo. Existem dois tipos: intencional (atalho consciente com plano de resolver) e acidental (complexidade criada sem perceber). O segundo é sempre mais caro.

**Complexidade essencial**  
Complexidade que vem do domínio do problema. Não pode ser eliminada — só pode ser bem organizada.

**Complexidade acidental**  
Complexidade criada pelas escolhas técnicas, não pelo domínio. É eliminável e deve ser eliminada.

**Flakiness**  
Comportamento não-determinístico em testes ou builds: às vezes passa, às vezes falha, sem mudança no código. Flaky tests são piores que ausência de testes — criam ruído e destroem confiança no pipeline.

---

## Termos de processo

**Engineering Practice**  
Uma forma recorrente de trabalhar que produz resultado técnico melhor. Diferente de ferramenta (que é um software) e de framework (que é uma estrutura de código). Exemplos: test-first, code review, contract-first API, scanning antes de modificar.

**Feature flag**  
Mecanismo que permite ativar ou desativar uma funcionalidade sem deploy. Separa o momento de deploy (código no ar) do momento de release (funcionalidade visível).

**Living documentation**  
Documentação que acompanha o código e é atualizada como parte do processo de mudança. O oposto é documentação estática que envelhece e mente.

**Rollback**  
O processo de reverter uma mudança em produção para um estado anterior. Um bom rollback é documentado, testado e mais rápido do que um novo deploy.

**DORA Metrics**  
Quatro métricas que medem a performance de entrega de software: deployment frequency (frequência de deploy), lead time for changes (tempo do commit ao deploy), change failure rate (taxa de falha de mudança), time to restore service (tempo para recuperar de incidente).

---

## Termos de observabilidade

**Golden Signals**  
Quatro métricas que cobrem a maioria dos incidentes em produção: latency (tempo de resposta), traffic (volume), errors (taxa de erro), saturation (proximidade do limite).

**SLO (Service Level Objective)**  
Meta interna de qualidade de serviço. Exemplo: "99.5% das requisições respondem em menos de 200ms". SLOs definem o error budget.

**Error budget**  
O quanto de degradação é aceitável antes de parar de fazer mudanças e focar em estabilidade. Se o SLO é 99.5%, o error budget é 0.5%.

**Distributed tracing**  
Técnica para acompanhar o caminho de uma requisição através de múltiplos serviços, identificando onde o tempo é gasto e onde os erros ocorrem.

---

## Termos de nível de sistema

**Level 1 / Simple site**  
Sistema de baixa complexidade operacional: site, landing page, MVP, projeto solo. Downtime não tem impacto crítico de negócio.

**Level 2 / Medium SaaS**  
Produto com usuários reais, time pequeno, SLA informal. Downtime tem impacto de negócio mensurável.

**Level 3 / Large system**  
Sistema distribuído, múltiplos times, compliance, escala real. Downtime tem impacto significativo e potencialmente legal.
