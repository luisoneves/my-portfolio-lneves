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
