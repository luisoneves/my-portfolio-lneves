"use client"
import Link from "next/link"
import Image from "next/image"
import { CommandPaletteHint } from "@/components/CommandPaletteHint"
import { ThemeToggle } from "@/components/ThemeToggle"

const navItems = [
  { label: "projetos", href: "#projetos" },
  { label: "arquitetura", href: "#arquitetura" },
  { label: "stack", href: "#stack" },
  { label: "notas", href: "#notas" },
  { label: "currículo", href: "/curriculo" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-LN_darkmode-new.png"
            alt="LN"
            width={32}
            height={32}
            className="hidden dark:block"
          />
          <Image
            src="/logo-LN_ligthmode.png"
            alt="LN"
            width={32}
            height={32}
            className="dark:hidden"
          />
          <span className="font-medium text-sm text-foreground">luis neves</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* i18n: descomentar quando next-intl estiver instalado
              <LangToggle />
          */}
          <ThemeToggle />
          <CommandPaletteHint />
          <a
            href="https://github.com/luisoneves"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            github ↗
          </a>
        </div>
      </div>
    </header>
  )
}
