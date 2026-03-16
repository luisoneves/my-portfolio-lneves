import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { ResumeDownloadButton } from "@/components/resume/ResumeDownloadButton"

export const metadata: Metadata = {
  title: "Currículo — Luis Otavio Neves Faustino",
  description: "Desenvolvedor Fullstack · Engineering Lead · Software Architect",
  alternates: {
    canonical: "https://dev-luisneves.me/curriculo",
  },
}

const experiencia = [
  {
    cargo: "Desenvolvedor Fullstack · Product Engineer",
    empresa: "Freelancer / Projetos Próprios",
    periodo: "2023 – presente",
    items: [
      "Arquitetura e desenvolvimento do Diocese SaaS: monorepo Turborepo, Fastify API, Next.js 16, Prisma, RBAC hierárquico, multi-tenancy com RLS e Feature Flags por tenant.",
      "WaaS (Website as a Service): engine config-driven para freelancers — 1 deploy atende N clientes com Registry Pattern e theme engine via CSS variables.",
      "Gestão de Capelas v2: sistema headless com Strapi v4 + Next.js 15. 1 admin + 200 filiais. Multi-tenancy com RLS.",
    ],
  },
  {
    cargo: "Analista de Suporte / Infraestrutura",
    empresa: "15+ anos em TI corporativa",
    periodo: "2008 – 2023",
    items: [
      "Infraestrutura de redes, servidores e suporte a sistemas corporativos.",
      "Migração para desenvolvimento fullstack com foco em arquitetura de sistemas.",
      "Base sólida em troubleshooting, documentação técnica e operação de ambientes de produção.",
    ],
  },
]

const competencias = [
  { grupo: "Frontend", items: ["Next.js 15/16", "React 19", "TypeScript Strict", "Tailwind CSS", "Framer Motion", "Shadcn/ui"] },
  { grupo: "Backend", items: ["Fastify", "Node.js", "Prisma ORM", "PostgreSQL", "Redis", "Zod"] },
  { grupo: "Infra & DevOps", items: ["Docker", "Turborepo", "Git Flow", "Vercel", "Railway"] },
  { grupo: "Arquitetura", items: ["Monorepo", "Multi-tenancy", "Clean Architecture", "RBAC", "RLS", "Feature Flags", "SOLID"] },
]

const trilha = [
  { versao: "v1", nome: "Mockup front-only", status: "Concluído" },
  { versao: "v2", nome: "Headless CMS (Strapi)", status: "Em produção" },
  { versao: "v3", nome: "Diocese SaaS Platform", status: "Em desenvolvimento" },
  { versao: "WaaS", nome: "Website as a Service", status: "Em desenvolvimento" },
]

export default async function CurriculoPage() {
  const t = await getTranslations("resume")

  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-2xl font-medium text-foreground">Luis Otavio Neves Faustino</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("role")}
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-0.5">
            Cachoeira Paulista, SP · contato@luisneves.dev.br
          </p>
        </div>
        <ResumeDownloadButton />
      </div>

      {/* Sobre */}
      <section className="mb-10">
        <h2 className="font-mono text-xs text-muted-foreground tracking-wider mb-3 uppercase">{t("about")}</h2>
        <p className="text-sm text-foreground leading-relaxed">
          Profissional com 15+ anos em TI e infraestrutura, em transição para desenvolvimento fullstack moderno.
          Foco em arquitetura-primeiro: construo sistemas com separação de camadas, multi-tenancy, monorepo e
          padrões que permitem trocar tecnologia sem reescrever o sistema. Quem entende o sistema dirige a IA —
          quem só sabe sintaxe concorre com ela.
        </p>
      </section>

      {/* Competências */}
      <section className="mb-10">
        <h2 className="font-mono text-xs text-muted-foreground tracking-wider mb-3 uppercase">{t("skills")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {competencias.map((g) => (
            <div key={g.grupo} className="rounded-lg border border-border p-3">
              <p className="font-mono text-xs text-muted-foreground mb-2">{g.grupo}</p>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span key={item} className="font-mono text-[11px] px-2 py-0.5 rounded border border-border text-muted-foreground bg-muted/40">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experiência */}
      <section className="mb-10">
        <h2 className="font-mono text-xs text-muted-foreground tracking-wider mb-3 uppercase">{t("experience")}</h2>
        <div className="flex flex-col gap-8">
          {experiencia.map((exp) => (
            <div key={exp.cargo}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-sm text-foreground">{exp.cargo}</h3>
                  <p className="text-xs text-muted-foreground">{exp.empresa}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground shrink-0">{exp.periodo}</span>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {exp.items.map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Trilha de Projetos */}
      <section className="mb-10">
        <h2 className="font-mono text-xs text-muted-foreground tracking-wider mb-3 uppercase">{t("projects")}</h2>
        <div className="flex flex-col gap-2">
          {trilha.map((t) => (
            <div key={t.versao} className="flex items-center gap-3 px-3 py-2 rounded-md border border-border bg-muted/40">
              <span className="font-mono text-xs font-medium text-amber-500 min-w-[40px]">{t.versao}</span>
              <span className="text-xs text-foreground flex-1">{t.nome}</span>
              <span className="font-mono text-[11px] text-muted-foreground">{t.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Uso de IA */}
      <section className="mb-10">
        <h2 className="font-mono text-xs text-muted-foreground tracking-wider mb-3 uppercase">{t("aiUsage")}</h2>
        <p className="text-sm text-foreground leading-relaxed mb-3">
          Utilizo agentes de IA como ferramentas de produtividade, não como atalho.
          Estruturo contexto (knowledge base versionada, PRD, AGENTS.md) para que o agente
          produza arquitetura consistente em vez de código aleatório.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["AGENTS.md", "knowledge base", "Cursor / Windsurf", "Ollama", "structured prompts"].map((item) => (
            <span key={item} className="font-mono text-[11px] px-2 py-0.5 rounded border border-border text-muted-foreground bg-muted/40">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Formação */}
      <section className="mb-10">
        <h2 className="font-mono text-xs text-muted-foreground tracking-wider mb-3 uppercase">{t("education")}</h2>
        <div>
          <h3 className="font-medium text-sm text-foreground">Análise e Desenvolvimento de Sistemas</h3>
          <p className="text-xs text-muted-foreground">FATEC · Em andamento</p>
        </div>
      </section>
    </main>
  )
}
