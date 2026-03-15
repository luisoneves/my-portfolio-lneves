# Modularity

> A arte de dividir o sistema nas partes certas — nem grandes demais, nem pequenas demais.

---

## O que é um bom módulo

Um módulo bem definido tem:

**Alta coesão**: tudo dentro do módulo serve ao mesmo propósito. Se você tivesse que descrever o módulo em uma frase sem usar "e", conseguiria?

**Baixo acoplamento**: o módulo depende de pouca coisa fora de si mesmo. Mudanças em outros módulos raramente forçam mudanças aqui.

**Interface mínima**: o módulo expõe só o necessário — não o que é conveniente, não o que está disponível.

**Fronteira explícita**: fica claro de fora o que entra e o que sai. Não há acesso a detalhes internos por convenção ou comentário — por estrutura.

---

## Como modularizar

### Por domínio (recomendado para sistemas que crescem)

```
src/
├── users/
│   ├── UserService.ts
│   ├── UserRepository.ts
│   ├── user.schema.ts
│   └── users.test.ts
├── billing/
│   ├── BillingService.ts
│   ├── BillingRepository.ts
│   └── billing.test.ts
└── notifications/
    ├── NotificationService.ts
    └── notifications.test.ts
```

Lógica que muda junta, fica junta.  
Times podem ser donos de módulos independentes.

### Por camada (adequado para sistemas simples)

```
src/
├── controllers/
├── services/
├── repositories/
└── models/
```

Mais fácil de começar, mais difícil de escalar — mudanças cruzam várias pastas.

### Híbrido (pragmático)

```
src/
├── modules/
│   ├── users/
│   └── billing/
└── shared/
    ├── validation/
    ├── logging/
    └── database/
```

Domínios com módulos. Infraestrutura compartilhada separada.

---

## Sinais de módulo mal definido

**Módulo grande demais (god module)**:
- Tem muitas razões para mudar
- Ninguém sabe completamente o que faz
- Testes são difíceis de escrever
- "Não mexa nessa parte"

**Módulo pequeno demais (over-splitting)**:
- Mudança simples requer editar 5 módulos
- Nenhum módulo faz algo útil sozinho
- Muita cerimônia para operações simples

**Módulo com fronteira errada**:
- Depende de detalhe interno de outro módulo
- Exporta mais do que deveria para ser "conveniente"
- Conhece o estado de outro módulo diretamente

---

## Shared code

Código compartilhado entre módulos é sempre um custo.

Antes de criar um `shared/` ou `utils/`, pergunte:
1. Isso é infraestrutura (logging, DB, HTTP client)? → vai em `shared/infrastructure/`
2. Isso é lógica de domínio? → pertence a um módulo específico, não é compartilhado
3. Isso é utility genérica? → avalie se uma biblioteca resolve antes de criar

`shared/` que vira depósito de tudo que não tem lugar é o início do fim da modularidade.

---

## Quando extrair um serviço separado

Extrair um módulo em serviço independente (microserviço) só vale quando:

```
□ O domínio é genuinamente independente (não compartilha estado com outros)
□ O time que cuida pode ser autônomo (um PR em um repo, não em três)
□ O volume ou os requisitos de escala justificam isolamento
□ O benefício operacional é real e não especulativo
```

Se qualquer um desses não for verdade: continue no monolito.  
Monolito modular bem estruturado supera microserviços mal definidos em quase todo cenário de escala média.
