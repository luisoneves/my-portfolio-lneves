/**
 * LangToggle — i18n placeholder
 *
 * Para ativar:
 *   1. npm install next-intl
 *   2. Descomentar todo o conteúdo abaixo
 *   3. Configurar next.config.ts com createNextIntlPlugin
 *   4. Criar app/[locale]/layout.tsx e mensagens em messages/pt.json, messages/en.json
 *   5. Descomentar NextIntlClientProvider em app/layout.tsx
 *   6. Descomentar <LangToggle /> no Navbar
 */

// "use client"
// import { useRouter, usePathname } from "next/navigation"
// import { useLocale } from "next-intl"
//
// export function LangToggle() {
//   const router = useRouter()
//   const pathname = usePathname()
//   const locale = useLocale()
//
//   function toggleLocale() {
//     const nextLocale = locale === "pt" ? "en" : "pt"
//     router.replace(`/${nextLocale}${pathname}`)
//   }
//
//   return (
//     <button
//       onClick={toggleLocale}
//       aria-label="Alternar idioma"
//       className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
//     >
//       {locale === "pt" ? "EN" : "PT"}
//     </button>
//   )
// }
