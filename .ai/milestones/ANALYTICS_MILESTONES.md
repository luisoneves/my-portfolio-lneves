# Analytics — Milestones de Implementação
> Portfolio dev-luisneves.me | Criado: março 2025
> Estimativa total: ~45 min | 1 deploy no final

---

## MILESTONE A2 — Sitemap Automático (FAZER PRIMEIRO — 10 min)

**`app/sitemap.ts`** — criar este arquivo:
```ts
import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dev-luisneves.me",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://dev-luisneves.me/curriculo",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
```

**Critério de done:**
- [ ] `dev-luisneves.me/sitemap.xml` acessível no browser após deploy
- [ ] Submetido no Search Console (passo A1)

---

## MILESTONE A1 — Base de Dados (20 min)

### Google Search Console
1. Acessa: search.google.com/search-console
2. Adiciona propriedade: `dev-luisneves.me` → verificação por **meta tag**
3. Pega o código gerado e adiciona no `app/layout.tsx`:

```tsx
export const metadata = {
  // ... metadata existente — adicionar dentro:
  verification: {
    google: "SEU_CODIGO_AQUI",
  },
}
```

4. Após verificar → submete sitemap: `https://dev-luisneves.me/sitemap.xml`

**Critério de done:**
- [ ] Domínio verificado
- [ ] Sitemap submetido
- [ ] Primeiros dados em 48–72h

---

### Microsoft Clarity
1. Acessa: clarity.microsoft.com → cria projeto → pega o `Project ID`

2. Cria **`components/providers/ClarityProvider.tsx`**:
```tsx
"use client"
import { useEffect } from "react"

export function ClarityProvider() {
  useEffect(() => {
    const s = document.createElement("script")
    s.type = "text/javascript"
    s.async = true
    s.src = `https://www.clarity.ms/tag/SEU_PROJECT_ID`
    document.head.appendChild(s)
  }, [])
  return null
}
```

3. Adiciona no `app/layout.tsx` dentro do `<body>`:
```tsx
import { ClarityProvider } from "@/components/providers/ClarityProvider"
// ...
<ClarityProvider />
```

**Critério de done:**
- [ ] Script instalado e deployado
- [ ] Sessões aparecendo no painel Clarity em ~1h
- [ ] Confirmar que ⌘K aparece nos cliques registrados

---

## MILESTONE A3 — Open Graph (15 min)

1. Verifica como está agora: cola URL em **opengraph.xyz**
2. Cria `public/og-image.png` — 1200×630px com nome + cargo + cor amber
3. Atualiza `app/layout.tsx`:

```tsx
openGraph: {
  title: "Luis Neves — Engineering Lead · Software Architect",
  description: "Não escrevo features. Estruturo sistemas.",
  url: "https://dev-luisneves.me",
  images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "Luis Neves — Engineering Lead",
  description: "Não escrevo features. Estruturo sistemas.",
  images: ["/og-image.png"],
},
```

**Critério de done:**
- [ ] Preview correto no opengraph.xyz
- [ ] Testar compartilhando no WhatsApp/LinkedIn

---

## Ordem de execução

```
A2 (sitemap)  →  A1 (Search Console + Clarity)  →  A3 (OG image)
   10 min              20 min                           15 min
                                                  ↓
                                          1 deploy único no final
```

*Última atualização: março 2025*
