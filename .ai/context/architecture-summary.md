# Architecture Summary

> Visão concisa da arquitetura atual do projeto. Atualizada a cada mudança estrutural significativa.

---

## Para que serve

Este arquivo serve como ponto de entrada para qualquer pessoa (ou agente) que precisa entender o sistema rapidamente.

Não é documentação detalhada — é o mapa de alto nível.  
O detalhe está no código. Este arquivo diz onde procurar.

---

## Visão geral

```
[Descreva o sistema em 3–5 frases: o que é, como funciona em alto nível, quais as partes principais]
```

---

## Diagrama de alto nível

```
[Diagrama em texto, ASCII ou referência a arquivo de imagem]

Exemplo:
┌─────────┐     ┌─────────────┐     ┌──────────┐
│ Client  │────▶│   API       │────▶│ Database │
└─────────┘     │  (Node.js)  │     └──────────┘
                └─────────────┘
                      │
                      ▼
               ┌─────────────┐
               │  Queue      │
               │  (Redis)    │
               └─────────────┘
```

---

## Módulos principais

| Módulo | Responsabilidade | Localização |
|--------|-----------------|-------------|
| | | |
| | | |

---

## Fluxos críticos

### [Nome do fluxo 1]

```
[Descreva o caminho de uma operação crítica: quais módulos passa, o que cada um faz]
```

### [Nome do fluxo 2]

```
[...]
```

---

## Decisões arquiteturais ativas

| Decisão | Alternativa rejeitada | Razão |
|---------|----------------------|-------|
| | | |

*Para decisões com histórico completo, ver `decisions.md`.*

---

## Fronteiras externas

| Sistema externo | Como se conecta | Criticidade |
|----------------|----------------|-------------|
| | | |

---

## O que não é óbvio

```
[Qualquer coisa que alguém novo no projeto provavelmente vai errar entender
 ou que requer contexto para fazer sentido]
```

---

## Última atualização

```
Data: _______________
Quem atualizou: _______________
O que mudou: _______________
```
