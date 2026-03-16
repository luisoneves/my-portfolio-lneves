"use client"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

const STORAGE_KEY = "high-contrast"

export function HighContrastToggle() {
  const t = useTranslations("a11y")
  const [active, setActive] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY) === "true"
    setActive(stored)
    if (stored) {
      document.documentElement.setAttribute("data-high-contrast", "true")
    }
  }, [])

  function toggle() {
    const next = !active
    setActive(next)
    if (next) {
      document.documentElement.setAttribute("data-high-contrast", "true")
      localStorage.setItem(STORAGE_KEY, "true")
    } else {
      document.documentElement.removeAttribute("data-high-contrast")
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={toggle}
      className={`w-9 h-9 flex items-center justify-center rounded-md border transition-colors
        ${active
          ? "border-foreground bg-foreground text-background"
          : "border-border hover:bg-muted"}
      `}
      aria-label={active ? t("highContrastOff") : t("highContrastOn")}
      aria-pressed={active}
      title={t("highContrastToggle")}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18" strokeWidth="1.5" />
        <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" strokeWidth="0" />
      </svg>
    </button>
  )
}
