"use client"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { Command } from "cmdk"
import { useTranslations } from "next-intl"

export function CommandPalette() {
  const t = useTranslations("commandPalette")
  const locale = useLocale()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const commands = [
    { group: t("groups.navigation"), items: [
      { label: t("items.goProjects"),    action: () => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" }) },
      { label: t("items.goStack"),       action: () => document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" }) },
      { label: t("items.goNotes"),       action: () => document.getElementById("notas")?.scrollIntoView({ behavior: "smooth" }) },
      { label: t("items.goArchitecture"), action: () => document.getElementById("arquitetura")?.scrollIntoView({ behavior: "smooth" }) },
      { label: t("items.goBlog"),        action: () => router.push(`/${locale}/blog`) },
      { label: t("items.goContact"),     action: () => router.push(`/${locale}/contato`) },
    ]},
    { group: t("groups.links"), items: [
      { label: t("items.openGithub"),    action: () => window.open("https://github.com/luisoneves", "_blank") },
      { label: t("items.openDiocese"), action: () => window.open("https://github.com/luisoneves", "_blank") },
      { label: t("items.openCapelas"), action: () => window.open("https://gestao-capelas.vercel.app", "_blank") },
      { label: t("items.sendEmail"),    action: () => window.open("mailto:contato@luisneves.dev.br") },
      { label: t("items.openLinkedIn"),        action: () => window.open("https://linkedin.com/in/luisneves-dev", "_blank") },
      { label: t("items.openResume"),    action: () => router.push(`/${locale}/curriculo`) },
    ]},
  ]

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if ((e.key === "k" && (e.metaKey || e.ctrlKey))) {
      e.preventDefault()
      setOpen((o) => !o)
    }
    if (e.key === "Escape") setOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
    return () => document.removeEventListener("keydown", handleKeydown)
  }, [handleKeydown])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <span className="text-muted-foreground text-sm">⌘</span>
            <Command.Input
              placeholder={t("searchPlaceholder")}
              value={search}
              onValueChange={setSearch}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <kbd className="font-mono text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">ESC</kbd>
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="text-center text-sm text-muted-foreground py-8">
              {t("empty")}
            </Command.Empty>
            {commands.map((group) => (
              <Command.Group
                key={group.group}
                heading={group.group}
                className="[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
              >
                {group.items.map((cmd) => (
                  <Command.Item
                    key={cmd.label}
                    onSelect={() => { cmd.action(); setOpen(false) }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground
                      cursor-pointer aria-selected:bg-amber-500/10 aria-selected:text-amber-600
                      dark:aria-selected:text-amber-400 transition-colors"
                  >
                    {cmd.label}
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
