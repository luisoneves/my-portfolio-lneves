import Link from "next/link"

interface ContactCTAProps {
  locale: string
}

export function ContactCTA({ locale }: ContactCTAProps) {
  const isEn = locale === "en"
  return (
    <section className="py-12">
      <div className="card-highlight flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="h3 mb-1">
            {isEn ? "Open to opportunities" : "Aberto a oportunidades"}
          </h3>
          <p className="p2">
            {isEn
              ? "Internship, freelance or just a technical conversation."
              : "Estágio, freelance ou só uma conversa técnica."}
          </p>
        </div>
        <div className="flex gap-3 shrink-0 flex-wrap">
          <Link href={`/${locale}/contato`} className="btn-primary">
            {isEn ? "get in touch ↗" : "entrar em contato ↗"}
          </Link>
          <Link href={`/${locale}/curriculo`} className="btn-secondary">
            {isEn ? "resume ↓" : "currículo ↓"}
          </Link>
        </div>
      </div>
    </section>
  )
}
