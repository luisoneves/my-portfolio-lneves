# Error Handling

> Erros são parte do sistema, não exceções dele. A forma como você trata erros define a confiabilidade do que você entrega.

---

## Filosofia

Erro não tratado não é ausência de problema — é problema invisível.

Um sistema que falha silenciosamente é mais perigoso do que um que falha ruidosamente. Falha silenciosa corrompe dados, confunde usuários e esconde bugs por semanas. Falha ruidosa e bem tratada é diagnóstico.

**O objetivo não é evitar erros. É torná-los visíveis, compreensíveis e recuperáveis.**

---

## Tipos de erro

### Erros operacionais (esperados)

Condições que o sistema antecipa e sabe lidar:
- Recurso não encontrado (404)
- Validação inválida (400)
- Permissão negada (403)
- Timeout de serviço externo
- Banco temporariamente indisponível

Esses erros **não são bugs**. São parte do contrato do sistema. Trate com lógica explícita.

### Erros de programador (inesperados)

Condições que o código não deveria permitir:
- Null pointer em dado que não deveria ser nulo
- Index out of bounds
- Tipo inválido passado para função
- Invariante de domínio violada

Esses erros **são bugs**. Deixe-os falhar alto, logar com contexto completo, e alertar o time.

**Não trate erro de programador como erro operacional** — você vai esconder o bug.

---

## Hierarquia de erros

Defina classes de erro com semântica clara:

```typescript
// base
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number,
    public readonly isOperational: boolean = true,
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

// erros operacionais
class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`, 'NOT_FOUND', 404)
  }
}

class ValidationError extends AppError {
  constructor(message: string, public readonly fields?: Record<string, string>) {
    super(message, 'VALIDATION_ERROR', 400)
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Access denied') {
    super(message, 'FORBIDDEN', 403)
  }
}

class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409)
  }
}

// erro de programador — não é operacional
class InvariantViolationError extends AppError {
  constructor(message: string) {
    super(message, 'INVARIANT_VIOLATION', 500, false) // isOperational = false
  }
}
```

---

## Tratamento centralizado

Não trate erros em 40 lugares. Trate em um lugar.

```typescript
// middleware de erro centralizado (Express/Fastify/etc.)
function errorHandler(error: Error, req: Request, res: Response) {
  // erro operacional conhecido
  if (error instanceof AppError && error.isOperational) {
    logger.warn('Operational error', {
      code: error.code,
      message: error.message,
      path: req.path,
      method: req.method,
      requestId: req.requestId,
    })

    return res.status(error.statusCode).json({
      error: error.code,
      message: error.message,
      ...(error instanceof ValidationError ? { fields: error.fields } : {}),
    })
  }

  // erro inesperado — bug
  logger.error('Unexpected error', {
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    path: req.path,
    method: req.method,
    requestId: req.requestId,
  })

  // nunca exponha stack trace em produção
  return res.status(500).json({
    error: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred',
    requestId: req.requestId, // para correlação com logs
  })
}
```

---

## O que nunca fazer

```typescript
// silenciar erro
try {
  await doSomething()
} catch (e) {
  // nada aqui — o pior que existe
}

// logar e continuar como se não tivesse acontecido
try {
  await doSomething()
} catch (e) {
  console.log(e) // nem é logger estruturado
}

// expor detalhes internos para o usuário
res.status(500).json({
  error: e.message,        // pode vazar info de banco, schema, etc.
  stack: e.stack,          // nunca em produção
})

// catch genérico que engole tipos de erro
try {
  await chargeCustomer(order)
} catch (e) {
  throw new Error('Payment failed') // perdeu o contexto original
}
```

---

## Erros assíncronos

Erros em código assíncrono são mais fáceis de perder.

```typescript
// promise sem catch — erro silencioso
doSomethingAsync()

// correto — sempre trate ou propague
await doSomethingAsync().catch(handleError)

// em event listeners e callbacks — precisa de try/catch explícito
eventBus.on('order.created', async (event) => {
  try {
    await processOrder(event)
  } catch (error) {
    logger.error('Failed to process order event', { error, event })
    // decidir: retentar? mover para DLQ? alertar?
  }
})
```

---

## Mensagens de erro

Para o usuário:
```
✓ "Email already in use"          — específico e acionável
✓ "Password must be 8+ characters" — específico e acionável
✗ "Internal server error"          — inútil para o usuário
✗ "Duplicate key violation"        — vaza detalhe interno
```

Para os logs:
```
✓ Contexto completo: IDs, valores, operação, duração
✓ Stack trace para erros inesperados
✓ Request ID para correlação
✗ Dados sensíveis: senha, token, PII
```

---

## Unhandled rejections e exceptions

Configure tratamento global para o que escapar:

```typescript
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Promise Rejection', { reason, promise })
  // em produção: alertar e considerar restart do processo
})

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception — process will exit', { error })
  process.exit(1) // estado do processo é desconhecido — melhor reiniciar
})
```

`uncaughtException` significa que o processo está em estado desconhecido. Reiniciar é mais seguro que continuar.

---

## Por nível de sistema

**Level 1**: try/catch nos pontos críticos; não silenciar erros; logar com contexto  
**Level 2**: hierarquia de erros; tratamento centralizado; error tracking (Sentry); unhandled rejection configurado  
**Level 3**: circuit breaker para erros de dependência externa; error budget monitorado; runbook por tipo de erro crítico
