# Authentication

> Autenticação responde "quem é você?" Autorização responde "o que você pode fazer?". São problemas distintos.

---

## Nunca construa autenticação do zero

Autenticação é um domínio com décadas de vulnerabilidades descobertas.

Use providers estabelecidos (Auth0, Clerk, Supabase Auth, Cognito, NextAuth) para:
- Gerenciamento de sessão
- Hash de senhas
- OAuth / social login
- MFA
- Recuperação de conta

O que você constrói do zero: as regras de autorização específicas do seu negócio.

---

## Conceitos fundamentais

### AuthN (Authentication)

Verificar a identidade do usuário. Sempre delegue para um provedor testado.

Métodos comuns:
- Email/senha com hash seguro (bcrypt/argon2)
- OAuth2 / OIDC (Google, GitHub, etc.)
- Magic link
- Passkey / WebAuthn

### AuthZ (Authorization)

Verificar se o usuário autenticado pode fazer a operação.

Modelos:
- **RBAC** (Role-Based): usuário tem roles, roles têm permissões
- **ABAC** (Attribute-Based): decisão baseada em atributos do usuário e do recurso
- **ReBAC** (Relationship-Based): permissão baseada na relação entre usuário e recurso (ex: "pode editar se for o dono")

Para a maioria dos SaaS: RBAC simples ou ReBAC básico são suficientes.

---

## Tokens

### JWT

```
header.payload.signature
```

**Use para**: autenticação stateless, tokens de curta duração, contexto entre serviços.

**Cuidados**:
- Sempre valide a assinatura — nunca apenas decodifique
- Defina `exp` (expiração) — nunca token eterno
- Não coloque dados sensíveis no payload (é apenas Base64, não criptografado)
- Use `RS256` ou `ES256` em vez de `HS256` para sistemas distribuídos

### Refresh tokens

```
access_token   → curta duração (15min a 1h)
refresh_token  → longa duração (dias a semanas), armazenado seguro
```

- Access token expira → usa refresh token para obter novo access token
- Refresh token só trafega no endpoint `/auth/refresh`
- Rotate o refresh token a cada uso (rotation)
- Invalide todos os refresh tokens no logout e na troca de senha

---

## Armazenamento no cliente

| Opção | XSS | CSRF | Recomendação |
|-------|-----|------|-------------|
| localStorage | vulnerável | seguro | ❌ evite para tokens sensíveis |
| sessionStorage | vulnerável | seguro | ❌ evite para tokens sensíveis |
| Cookie httpOnly | seguro | vulnerável | ✅ com CSRF protection |
| Cookie httpOnly + SameSite=Strict | seguro | seguro | ✅ melhor opção geral |

---

## Autorização no lugar certo

**Sempre no servidor. Nunca apenas no cliente.**

```typescript
// ruim — autorização só na UI
if (user.isAdmin) {
  showAdminPanel()  // usuário pode manipular o DOM
}

// correto — autorização no servidor também
// GET /admin/users
async getAdminUsers(req: Request) {
  if (!req.user.hasRole('admin')) {
    throw new ForbiddenError()
  }
  // ...
}
```

---

## Multi-tenant

Quando um sistema tem múltiplos tenants (organizações), autorização deve incluir verificação de tenant:

```typescript
// ruim — verifica apenas autenticação
const order = await orderRepo.findById(orderId)

// correto — verifica autenticação + ownership de tenant
const order = await orderRepo.findByIdAndTenant(orderId, req.user.tenantId)
if (!order) throw new NotFoundError()  // 404, não 403 — não confirme existência
```

Nunca retorne 403 em recurso de outro tenant — retorne 404 para não revelar existência.

---

## Eventos de segurança a logar

```
login bem-sucedido: userId, IP, user-agent, timestamp
login falho: email tentado, IP, timestamp (não logar senha)
logout: userId, timestamp
troca de senha: userId, IP, timestamp
tentativa de acesso negado: userId, recurso, timestamp
```

Rate limiting em login: máximo de tentativas por IP e por conta antes de bloquear temporariamente.

---

## Checklist de auth para Level 2+

```
□ Provedor de autenticação testado (não custom)
□ Senhas com hash bcrypt/argon2 (se autenticação própria)
□ Tokens com expiração adequada
□ Refresh token rotation implementada
□ Tokens armazenados com segurança no cliente
□ Autorização verificada no servidor em todo endpoint
□ Multi-tenant com isolamento por tenant
□ Eventos de segurança logados
□ Rate limiting em endpoints de auth
□ Logout revoga tokens
□ Troca de senha invalida sessões ativas
```
