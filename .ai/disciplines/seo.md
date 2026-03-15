# SEO

> SEO não é truque. É tornar o conteúdo do seu sistema acessível e compreensível para mecanismos de busca e usuários.

---

## Filosofia

O melhor SEO é um produto que responde perguntas reais de usuários reais — de forma rápida, acessível e bem estruturada.

Técnicas de SEO sem conteúdo de valor não funcionam no longo prazo.  
Conteúdo de valor sem técnica básica desperdiça potencial.

---

## Fundamentos técnicos

### Performance é SEO

Core Web Vitals são fator de ranqueamento direto:

| Métrica | Referência ideal | O que mede |
|---------|-----------------|-----------|
| LCP (Largest Contentful Paint) | < 2.5s | velocidade percebida de carregamento |
| FID / INP (Interaction to Next Paint) | < 200ms | responsividade a interações |
| CLS (Cumulative Layout Shift) | < 0.1 | estabilidade visual durante carregamento |

Meça em: Google Search Console, PageSpeed Insights, Lighthouse.

### Renderização

| Método | SEO | Performance | Quando usar |
|--------|-----|------------|-------------|
| SSR (Server-Side Rendering) | ✅ excelente | bom | páginas com conteúdo dinâmico crítico para SEO |
| SSG (Static Site Generation) | ✅ excelente | excelente | conteúdo que muda raramente |
| ISR (Incremental Static Regeneration) | ✅ excelente | excelente | conteúdo que muda periodicamente |
| CSR puro (Client-Side Only) | ⚠️ problemático | depende | apps autenticados sem conteúdo público indexável |

Para páginas públicas que precisam de ranqueamento: SSR ou SSG, nunca CSR puro.

---

## HTML semântico

Mecanismos de busca leem HTML como estrutura de significado.

```html
<!-- ruim — sem semântica -->
<div class="title">Como usar React</div>
<div class="content">React é uma biblioteca...</div>

<!-- correto — estrutura semântica -->
<h1>Como usar React</h1>
<article>
  <p>React é uma biblioteca...</p>
</article>
```

### Hierarquia de headings

```
H1 → apenas um por página, o tópico principal
H2 → seções principais
H3 → subseções
```

Não pule níveis por motivos visuais — use CSS para estilo, HTML para estrutura.

---

## Meta tags essenciais

```html
<head>
  <!-- básico -->
  <title>Título da página | Nome do site</title>
  <meta name="description" content="Descrição clara em 150–160 caracteres que resume o conteúdo da página">
  <link rel="canonical" href="https://seusite.com/pagina-atual">
  
  <!-- Open Graph (compartilhamento social) -->
  <meta property="og:title" content="Título da página">
  <meta property="og:description" content="Descrição para compartilhamento">
  <meta property="og:image" content="https://seusite.com/og-image.jpg">
  <meta property="og:url" content="https://seusite.com/pagina-atual">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Título da página">
  <meta name="twitter:description" content="Descrição para Twitter">
  <meta name="twitter:image" content="https://seusite.com/og-image.jpg">
</head>
```

---

## URLs

```
✓ https://seusite.com/blog/como-usar-react
✗ https://seusite.com/p?id=123
✗ https://seusite.com/blog/Como_Usar_React
```

Boas URLs:
- Descritivas e legíveis por humanos
- Com hífens para separar palavras (não underscore)
- Lowercase
- Sem parâmetros de query para conteúdo indexável
- Estáveis — mudar URL perde o histórico de ranqueamento

---

## Sitemap e robots.txt

```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seusite.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

```
# robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://seusite.com/sitemap.xml
```

---

## Dados estruturados (Schema.org)

Aumentam a chance de rich snippets nos resultados de busca.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Como usar React",
  "author": { "@type": "Person", "name": "Nome do Autor" },
  "datePublished": "2024-01-15",
  "description": "Guia prático para começar com React"
}
</script>
```

Tipos comuns: `Article`, `Product`, `Organization`, `FAQ`, `BreadcrumbList`, `WebSite`.

---

## Links internos

Links internos distribuem autoridade e ajudam mecanismos de busca a entender a estrutura do site.

```
□ Páginas importantes têm links de outras páginas do site
□ Anchor text é descritivo (não "clique aqui")
□ Não há páginas órfãs (sem link de entrada)
□ Hierarquia de navegação reflete a hierarquia de conteúdo
```

---

## Checklist por nível

**Level 1 (site simples)**:
```
□ Title e meta description únicos por página
□ HTML semântico com H1 correto
□ HTTPS
□ Performance básica (LCP < 4s)
□ robots.txt e sitemap.xml
```

**Level 2 (SaaS/produto)**:
```
□ SSR/SSG para páginas públicas
□ Core Web Vitals dentro do range ideal
□ Canonical tags para evitar conteúdo duplicado
□ Open Graph para todas as páginas indexáveis
□ Dados estruturados onde relevante
□ Google Search Console configurado
```
