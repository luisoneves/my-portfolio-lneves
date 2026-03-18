"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { TypingCycle } from "@/components/hero/TypingCycle"
import { ManifestoBlock } from "@/components/sections/ManifestoBlock"
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
    <main className="max-w-5xl mx-auto px-4">
      <section className="pt-12 pb-20">
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
          className="text-4xl md:text-5xl font-medium leading-tight mb-2"
        >
          {t("title1")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-medium leading-tight mb-6"
          aria-live="polite"
          aria-atomic="true"
        >
          <TypingCycle />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-base text-muted-foreground max-w-xl leading-relaxed mb-8"
        >
          {t("description")}{" "}
          <strong className="text-foreground font-medium">{t("highlight")}</strong>{" "}
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
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
          transition={{ delay: 0.7, duration: 0.5 }}
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
      </section>

      <ManifestoBlock />
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
