# Trade-offs

> Engenharia não é sobre encontrar a solução certa. É sobre entender o que cada solução troca.

---

## Por que trade-offs são o centro do raciocínio de arquitetura

Qualquer engenheiro pode aprender uma tecnologia.  
O que diferencia um engenheiro sênior não é conhecer mais ferramentas — é saber **o que cada ferramenta custa**.

Toda decisão técnica importante tem a forma:
```
se você quer X, vai abrir mão de Y
```

Quem não reconhece isso toma decisões incompletas.

---

## O framework de raciocínio

Antes de qualquer decisão de arquitetura, passe por esse filtro:

```
1. Qual problema estou resolvendo agora?
2. Quais opções existem?
3. O que cada opção ganha?
4. O que cada opção perde?
5. Qual é o custo de reverter se errar?
6. Qual contexto inclina a balança para um lado?
```

A resposta não precisa ser longa. Precisa ser honesta.

---

## Trade-offs fundamentais em sistemas

### Performance vs. Consistência

Quanto mais rápido você quer que o sistema responda, mais provável que o dado retornado não seja o mais recente.

```
Cache agressivo    → muito rápido, pode estar desatualizado
Sem cache          → sempre fresco, mais lento
Cache com TTL curto → meio-termo consciente
```

### Disponibilidade vs. Consistência (CAP)

Em sistemas distribuídos com falha de rede, você escolhe:
- Sistema para e espera consistência → AP sacrificado
- Sistema continua e aceita inconsistência → CP sacrificado

Nenhuma das duas é errada. Depende do domínio.

### Simplicidade vs. Flexibilidade

Sistemas simples são fáceis de entender e manter.  
Sistemas flexíveis acomodam mudança com menos retrabalho.

Flexibilidade prematura é complexidade acidental.  
Simplicidade rígida cria retrabalho quando o sistema precisa evoluir.

O equilíbrio certo: **simples hoje, extensível nos pontos que provavelmente vão mudar**.

### Latência vs. Throughput

- **Latência**: tempo para uma única operação completar
- **Throughput**: quantas operações por segundo o sistema processa

Otimizar para um frequentemente prejudica o outro.

```
Batch processing   → alto throughput, alta latência por item
Streaming          → baixa latência, throughput moderado
```

### Acoplamento vs. Coesão

- **Acoplamento alto**: módulos dependem muito um do outro → mudança em um quebra o outro
- **Coesão baixa**: módulo faz coisas demais → difícil de entender e testar

O objetivo é **baixo acoplamento** e **alta coesão** — mas aumentar coesão sem aumentar acoplamento exige fronteiras bem pensadas.

---

## Trade-offs de processo

### Velocidade agora vs. Velocidade depois

Atalho técnico entrega mais rápido hoje.  
Débito técnico acumulado desacelera tudo depois.

Não é que atalhos são errados — é que precisam ser **conscientes e pagos**.

### Generalização vs. Especialização

Solução genérica serve muitos casos, mas é mediocre em todos.  
Solução especializada é excelente no caso específico, mas não escala além dele.

Para sistemas internos: especialize quando o domínio é estável.  
Para plataformas: generalize quando o caso de uso é variável.

---

## Como documentar um trade-off

Quando você toma uma decisão que envolve trade-off significativo, registre em `context/decisions.md`:

```markdown
**Decisão**: [o que foi escolhido]
**Ganha**: [o que o sistema ganha com essa escolha]
**Perde**: [o que o sistema abre mão]
**Contexto que justifica**: [por que neste caso o ganho vale a perda]
**Quando reavaliar**: [sob quais condições essa decisão deve ser revisitada]
```

Trade-off não documentado é decisão que vai ser refazer no futuro sem saber por que foi tomada antes.

---

## A armadilha do trade-off perfeito

Existe uma tendência de procurar a solução que "não perde nada".

Ela não existe.

Toda abstração tem custo. Todo padrão tem overhead. Toda otimização tem o que piora.

O objetivo não é encontrar a solução sem custo — é encontrar a solução cujo custo você está disposto a pagar dado o contexto atual.

Aceitar isso é o começo do raciocínio de engenharia maduro.
