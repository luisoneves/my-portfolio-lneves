"use client"
export function ResumeDownloadButton() {
  return (
    <a
      href="/curriculo.pdf"
      download="Luis_Otavio_Neves_Faustino_Curriculo.pdf"
      className="btn-secondary text-sm"
    >
      download PDF ↓
    </a>
  )
}
