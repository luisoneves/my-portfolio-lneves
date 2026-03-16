"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Alternar tema"
      className="text-base text-muted-foreground hover:text-foreground transition-colors p-1 leading-none"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  )
}
