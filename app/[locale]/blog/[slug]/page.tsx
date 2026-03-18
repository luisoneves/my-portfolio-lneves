import { notFound } from "next/navigation"
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"
import { PostLayout } from "@/components/blog/PostLayout"

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  const locales = ["pt", "en"]
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const isEn = locale === "en"
  return {
    title: `${isEn && post.titleEn ? post.titleEn : post.title} | Luis Neves`,
    description: isEn && post.summaryEn ? post.summaryEn : post.summary,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug)
  if (!post || !post.published) notFound()

  const allPosts   = getAllPosts(locale as "pt" | "en")
  const idx        = allPosts.findIndex((p) => p.slug === slug)
  const prevPost   = idx < allPosts.length - 1 ? allPosts[idx + 1] : null
  const nextPost   = idx > 0 ? allPosts[idx - 1] : null

  return (
    <PostLayout post={post} locale={locale} prevPost={prevPost} nextPost={nextPost}>
      <article className="prose">
        <MDXRemote source={post.content} />
      </article>
    </PostLayout>
  )
}
