"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import TypewriterLoop from "@/components/TypewriterLoop"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { ArchitectureSection } from "@/components/sections/ArchitectureSection"
import { CICDSection } from "@/components/sections/CICDSection"
import { StackSection } from "@/components/sections/StackSection"
import { NotesSection } from "@/components/sections/NotesSection"
import { LatestPosts } from "@/components/sections/LatestPosts"
import { ContactCTA } from "@/components/sections/ContactCTA"
import type { PostMeta } from "@/lib/blog"

interface HomeClientProps {
  locale: string
  latestPosts: PostMeta[]
}

export function HomeClient({ locale, latestPosts }: HomeClientProps) {
  const t    = useTranslations("hero")
  const a11y = useTranslations("a11y")

  return (
    <main className="flex flex-col min-h-screen">
      <section className="min-h-[80vh] flex items-center pt-12">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* COLUNA ESQUERDA - Texto */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 text-xs font-mono
                px-3 py-1.5 rounded-full border border-amber-500/30
                bg-amber-500/8 text-amber-600 dark:text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-medium leading-tight mb-4 max-w-[600px]"
            >
              {t("title1")}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="space-y-4 mb-6"
            >
              <p className="text-base text-foreground leading-relaxed max-w-[500px]">
                {t("highlight")}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[500px]">
                {t("description")}
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl md:text-2xl font-medium text-amber-500 dark:text-amber-400 mb-8 max-w-[500px]"
            >
              <TypewriterLoop
                texts={[
                  "Estruturo sistemas.",
                  "Projeto arquiteturas escaláveis.",
                  "Construo software que evolui.",
                ]}
                typingSpeed={40}
                deletingSpeed={25}
                pauseTime={1000}
              />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-sm text-amber-600 dark:text-amber-400 italic mb-8"
            >
              {t("aiNote")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex gap-8 mb-8 text-sm"
            >
              <div>
                <span className="font-mono text-2xl font-medium text-foreground">15+</span>
                <p className="text-muted-foreground text-xs mt-0.5">{t("stats.yearsLabel")}</p>
              </div>
              <div>
                <span className="font-mono text-2xl font-medium text-foreground">4</span>
                <p className="text-muted-foreground text-xs mt-0.5">{t("stats.projectsLabel")}</p>
              </div>
              <div>
                <span className="font-mono text-lg font-medium text-amber-500">v1→v3</span>
                <p className="text-muted-foreground text-xs mt-0.5">{t("stats.iterationsLabel")}</p>
              </div>
              <div>
                <span className="font-mono text-sm font-medium text-foreground leading-tight">
                  Pragmatic<br />Programmer
                </span>
                <p className="text-muted-foreground text-xs mt-0.5">{t("stats.readingLabel")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex gap-3 flex-wrap"
            >
              <a href="#projetos" className="btn-primary">{t("cta.projects")}</a>
              <a
                href="https://github.com/luisoneves"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub (${a11y("externalLink")})`}
                className="btn-secondary"
              >
                {t("cta.github")}
              </a>
              <a href={`/${locale}/contato`} className="btn-secondary">
                {t("cta.contact")}
              </a>
            </motion.div>
          </div>

          {/* COLUNA DIREITA - Logo */}
          <div className="hidden md:flex items-center justify-center min-h-[400px]">
            <div className="relative">
              <img
                src="/logo.svg"
                alt="Logo Luís Neves"
                className="w-[280px] h-auto opacity-80 dark:hidden"
              />
              <img
                src="/logo-darkmode.svg"
                alt="Logo Luís Neves"
                className="w-[280px] h-auto opacity-80 hidden dark:block"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            </div>
          </div>

          </div>
        </div>
      </section>

      <ProjectsSection />
      <ArchitectureSection />
      <CICDSection />
      <StackSection />
      <NotesSection />

      {latestPosts.length > 0 && (
        <LatestPosts posts={latestPosts} locale={locale} />
      )}

      <ContactCTA locale={locale} />
    </main>
  )
}
