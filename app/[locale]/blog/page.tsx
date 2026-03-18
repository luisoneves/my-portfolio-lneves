import { getAllPosts, getAllTags } from "@/lib/blog"
import { BlogList } from "@/components/blog/BlogList"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEn = locale === "en"
  return {
    title: isEn ? "Blog — Luis Neves" : "Blog — Luis Neves",
    description: isEn
      ? "Engineering notes, architecture decisions and reading reflections."
      : "Notas de engenharia, decisões arquiteturais e reflexões de leitura.",
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const posts = getAllPosts(locale as "pt" | "en")
  const tags = getAllTags()

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <BlogList posts={posts} tags={tags} locale={locale} />
    </main>
  )
}
