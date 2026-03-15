# Knowledge

> Aprendizados reais, de projetos reais. O único diretório que deve crescer ao longo do tempo.

---

## Estrutura

```
knowledge/
├── system-design/     ← decisões e lições sobre arquitetura
├── reliability/       ← post-mortems e lições de incidentes
├── security/          ← vulnerabilidades encontradas, lições de segurança
├── testing/           ← o que funcionou e o que não funcionou em testes
├── observability/     ← lições de monitoring, alertas, diagnóstico
└── product/           ← aprendizados sobre o domínio e decisões de produto
```

---

## O que vai aqui

- Post-mortems de incidentes
- Decisões que pareciam certas e não foram
- Padrões que funcionaram bem em contextos específicos
- Armadilhas de tecnologias específicas
- Lições de estimativa e planejamento
- Aprendizados de code review e refactor

---

## Template: Post-mortem

```markdown
# [Título — ex: "Timeout em cascade no serviço de pagamento"]

**Data**: YYYY-MM-DD
**Duração**: Xh Ymin
**Impacto**: [quem foi afetado, em que escala]
**Severidade**: P1 / P2 / P3

---

## O que aconteceu

[Linha do tempo, objetiva]

## Causa raiz

[Não o sintoma. A causa. Pergunte "por que?" 5 vezes.]

## O que conteve o impacto

[O que limitou? Se nada — por quê não havia contenção?]

## O que mudamos

[Ações concretas após o incidente]

## O que aprendemos

[O aprendizado que fica além das ações imediatas]
```

---

## Template: Lição

```markdown
# [Lição — ex: "N+1 silencioso em paginação com includes"]

**Contexto**: [projeto, sistema, decisão]
**Data**: YYYY-MM-DD

---

## O que foi feito

[A decisão ou abordagem]

## O que aconteceu

[O resultado real]

## O que faria diferente

[Com o conhecimento de agora]

## Quando aplicar

[Em quais contextos futuros esse aprendizado é relevante]
```

---

## Por que este diretório importa

Documentação técnica fica obsoleta.  
Princípios são genéricos.  
Aprendizados situados são raros e valiosos.

10 minutos após um incidente ou decisão difícil valem mais do que horas de leitura de best practices.

O `.ai` começa como modelo genérico.  
`knowledge/` é o que o torna seu.
