"use client"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { CommandPaletteHint } from "@/components/CommandPaletteHint"
import { HighContrastToggle } from "@/components/HighContrastToggle"
import { LangToggle } from "@/components/LangToggle"
import { ThemeToggle } from "@/components/ThemeToggle"

const navItems = [
  { key: "projects", href: "#projetos" },
  { key: "architecture", href: "#arquitetura" },
  { key: "stack", href: "#stack" },
  { key: "notes", href: "#notas" },
  { key: "contact", href: "/contato" },
  { key: "blog", href: "/blog" },
  { key: "resume", href: "/curriculo" },
]

export function Navbar() {
  const t = useTranslations("nav")
  const a11y = useTranslations("a11y")
  const locale = useLocale()

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-lg font-bold text-foreground hover:text-amber-500 transition-colors select-none">
            ~LN
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const resolvedHref = item.href.startsWith("#")
              ? item.href
              : item.key === "contact"
                ? `/${locale}/contato`
                : `/${locale}${item.href}`
            return (
              <Link
                key={item.key}
                href={resolvedHref}
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(item.key)}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle />
          <HighContrastToggle />
          <ThemeToggle />
          <CommandPaletteHint />
          <a
            href="https://github.com/luisoneves"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub (${a11y("externalLink")})`}
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            github ↗
          </a>
        </div>
      </div>
    </header>
  )
}
