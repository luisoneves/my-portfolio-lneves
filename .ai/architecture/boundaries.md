# Boundaries

> Fronteiras são o que transforma um conjunto de código em um sistema com estrutura.

---

## O que é uma fronteira

Uma fronteira é o ponto onde uma unidade do sistema se comunica com outra.

Toda fronteira tem um custo: ela exige um contrato, serialização, tratamento de falha do outro lado, e testes que cruzam a fronteira.

O objetivo não é minimizar fronteiras — é colocá-las nos lugares certos.

---

## Tipos de fronteira

### Fronteira de módulo (dentro do processo)

Separação lógica dentro da mesma aplicação.

```typescript
// quem chama não sabe como UserService funciona internamente
import { UserService } from '@/modules/users'

const user = await userService.findById(id)
```

Custo: baixo (chamada de função).  
Benefício: coesão, testabilidade, ownership claro.

### Fronteira de serviço (entre processos)

Comunicação entre serviços distintos via rede.

```
API → BillingService → NotificationService
```

Custo: alto (latência de rede, falhas parciais, distributed tracing, deploy independente).  
Benefício: escala e deploy independentes, isolamento de falha.

Não crie fronteira de serviço sem necessidade real para os benefícios listados.

### Fronteira de dados

Onde o dado é persistido e quem pode acessá-lo diretamente.

Regra: dados têm um dono. Outros módulos ou serviços acessam via interface, nunca direto no banco do outro.

```
# ruim
BillingService faz query direta no banco do UserService

# correto
BillingService chama UserService.getUser(id)
```

---

## Trust boundaries — fronteiras de confiança

Não toda fronteira é técnica. Algumas são de segurança.

Uma trust boundary é onde você para de confiar que o dado é válido e seguro.

```
Internet          → NUNCA confie. Valide, sanitize, autentique.
Serviço interno   → Valide contratos, não assuma bem-intencionado.
Banco de dados    → Dados são tão confiáveis quanto quem os gravou.
Processo interno  → Confie, mas valide tipagem.
```

Toda entrada que cruza uma trust boundary deve ser validada explicitamente.

---

## Contratos

O contrato de uma fronteira define:
- O que pode ser enviado (input: tipos, restrições, formato)
- O que será retornado (output: tipos, possíveis erros)
- O que pode mudar sem quebrar (compatibilidade)

### Tipos de contrato

**Implícito**: inferido do código, não documentado. Barato de criar, caro de manter, fonte de bugs.

**Explícito**: documentado (tipos, schema, OpenAPI). Caro de criar, barato de manter, fonte de confiança.

Para fronteiras internas entre módulos: tipos são suficientes como contrato.  
Para fronteiras entre serviços ou com externos: OpenAPI, Protobuf ou schema explícito.

### Evolução de contrato

Contratos são promessas. Quebrá-los sem aviso é mentira técnica.

Regras:
- Adicionar campo opcional: backward compatible, pode fazer sem versão
- Renomear ou remover campo: breaking change, requer versionamento
- Mudar semântica de campo existente: breaking change, mesmo que o tipo não mude

---

## Anti-patterns de fronteira

**Leaky abstraction**: o detalhe interno vaza através da fronteira.

```typescript
// ruim — o chamador precisa saber sobre a estrutura do banco
getUser(dbRow: DatabaseRow): User

// correto — fronteira limpa
getUser(id: UserId): Promise<User>
```

**God service**: um serviço que outros chamam para tudo — elimina os benefícios de fronteiras.

**Circular dependency**: módulo A depende de B que depende de A. Sinal de fronteira errada.

**Fronteira no lugar errado**: separar lógica que muda junta. O custo de coordenação supera o benefício do isolamento.

---

## Como identificar onde pôr fronteiras

Perguntas:
1. O que muda junto? → fica junto
2. Quem é o dono dos dados? → fronteira na borda do dado
3. O time pode ser autônomo aqui? → fronteira de serviço pode valer
4. Qual o custo de coordenação se isso crescer? → fronteira preventiva pode valer

Heurística: quando a conversa sobre uma mudança envolve dois times consistentemente, é sinal de que a fronteira está no lugar errado.
