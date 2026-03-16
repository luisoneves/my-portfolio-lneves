"use client"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { useTransition } from "react"

export function LangToggle() {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const [isPending, startTransition] = useTransition()

	function switchLocale() {
		const nextLocale = locale === "pt" ? "en" : "pt"
		const segments = pathname.split("/")
		segments[1] = nextLocale
		const newPath = segments.join("/") || "/"
		startTransition(() => {
			router.push(newPath)
		})
	}

	return (
		<button
			onClick={switchLocale}
			aria-label="Mudar idioma"
			title={locale === "pt" ? "Switch to English" : "Trocar para português"}
			disabled={isPending}
			className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
		>
			{locale === "pt" ? "EN" : "PT"}
		</button>
	)
}
