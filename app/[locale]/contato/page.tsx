import { ContactForm } from "@/components/contact/ContactForm"
import Link from "next/link"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEn = locale === "en"
  return {
    title: isEn ? "Contact — Luis Neves" : "Contato — Luis Neves",
    description: isEn
      ? "Open to internships, freelance projects or just an engineering conversation."
      : "Aberto a estágios, projetos freelance ou uma conversa sobre engenharia e arquitetura.",
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEn = locale === "en"

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <span className="section-label">
        {isEn ? "// get in touch" : "// fale comigo"}
      </span>
      <h1 className="h1 mt-1 mb-2">
        {isEn ? "Contact" : "Contato"}
      </h1>
      <p className="p2 mb-10 max-w-lg">
        {isEn
          ? "Open to internship opportunities, freelance projects or a conversation about engineering and architecture."
          : "Aberto a oportunidades de estágio, projetos freelance ou uma conversa sobre engenharia e arquitetura."}
      </p>

      <div className="grid-main-sidebar items-start">
        <ContactForm locale={locale} />

        <aside className="flex flex-col gap-4">
          <div className="card">
            <p className="section-label mb-3">
              {isEn ? "direct links" : "links diretos"}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:contato@luisneves.dev.br"
                className="p2 hover:text-amber-500 transition-colors"
              >
                contato@luisneves.dev.br
              </a>
              <a
                href="https://github.com/luisoneves"
                target="_blank"
                rel="noopener noreferrer"
                className="p2 hover:text-amber-500 transition-colors"
              >
                github ↗
              </a>
              <a
                href="https://linkedin.com/in/luisneves-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p2 hover:text-amber-500 transition-colors"
              >
                linkedin ↗
              </a>
            </div>
          </div>

          <div className="card-success">
            <p className="section-label mb-2" style={{ color: "#22c55e" }}>
              {isEn ? "availability" : "disponibilidade"}
            </p>
            <p className="p2">
              <span style={{ color: "#22c55e" }}>● </span>
              {isEn ? "available" : "disponível"}
            </p>
            <p className="p3 mt-1">
              {isEn
                ? "Mon–Thu: afternoons · Fri–Sat: open"
                : "Seg–Qui: tarde · Sex–Sáb: ampla"}
            </p>
          </div>

          <div className="card">
            <p className="section-label mb-2">
              {isEn ? "recruiting?" : "está recrutando?"}
            </p>
            <p className="p2 mb-3">
              {isEn ? "Download the full resume" : "Baixe o currículo completo"}
            </p>
            <Link href={`/${locale}/curriculo`} className="btn-secondary">
              {isEn ? "resume ↓" : "currículo ↓"}
            </Link>
          </div>
        </aside>
      </div>
    </main>
  )
}
