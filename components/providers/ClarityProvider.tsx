"use client"
import { useEffect } from "react"

export function ClarityProvider() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
    if (!projectId) return

    const s = document.createElement("script")
    s.type = "text/javascript"
    s.async = true
    s.src = `https://www.clarity.ms/tag/${projectId}`
    document.head.appendChild(s)
  }, [])
  return null
}