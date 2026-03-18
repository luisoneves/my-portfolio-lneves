import Link from "next/link"
import type { PostMeta } from "@/lib/blog"

interface PostLayoutProps {
  post: PostMeta
  locale: string
  prevPost: PostMeta | null
  nextPost: PostMeta | null
  children: React.ReactNode
}

export function PostLayout({
  post,
  locale,
  prevPost,
  nextPost,
  children,
}: PostLayoutProps) {
  const isEn  = locale === "en"
  const title = isEn && post.titleEn ? post.titleEn : post.title
  const rt    = isEn && post.readingTimeEn ? post.readingTimeEn : post.readingTime

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex items-center gap-2 mb-8">
        <Link href={`/${locale}/blog`} className="p3 hover:text-amber-500 transition-colors">
          ← blog
        </Link>
        {post.tags[0] && <><span className="p3">·</span><span className="p3">{post.tags[0]}</span></>}
        <span className="p3">·</span>
        <span className="p3">{post.date.slice(0, 7)}</span>
        <span className="p3">·</span>
        <span className="p3">{rt}</span>
      </div>

      <div className="grid-main-sidebar items-start">
        <div>
          <h1 className="h1 mb-4">{title}</h1>
          <div className="flex flex-wrap gap-1.5 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="badge badge-neutral">{tag}</span>
            ))}
          </div>

          {children}

          <hr className="divider" />
          <div className="flex justify-between items-center gap-4">
            {prevPost ? (
              <Link
                href={`/${locale}/blog/${prevPost.slug}`}
                className="btn-secondary text-left max-w-[45%] truncate"
              >
                ← {isEn && prevPost.titleEn ? prevPost.titleEn : prevPost.title}
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link
                href={`/${locale}/blog/${nextPost.slug}`}
                className="btn-secondary text-right max-w-[45%] truncate"
              >
                {isEn && nextPost.titleEn ? nextPost.titleEn : nextPost.title} →
              </Link>
            ) : <div />}
          </div>
        </div>

        <aside className="flex flex-col gap-4" style={{ position: "sticky", top: "6rem" }}>
          <div className="card">
            <p className="section-label mb-3">
              {isEn ? "about the author" : "sobre o autor"}
            </p>
            <p className="p2 font-medium text-foreground mb-1">
              Luis Otavio Neves Faustino
            </p>
            <p className="p3 mb-4">Engineering Lead · FATEC ADS</p>
            <Link
              href={`/${locale}/contato`}
              className="btn-primary w-full justify-center text-center block"
            >
              {isEn ? "get in touch ↗" : "entrar em contato ↗"}
            </Link>
          </div>
          <div className="card">
            <p className="section-label mb-2">{isEn ? "more posts" : "mais posts"}</p>
            <Link
              href={`/${locale}/blog`}
              className="p2 hover:text-amber-500 transition-colors block"
            >
              ← {isEn ? "all posts" : "todos os posts"}
            </Link>
          </div>
        </aside>
      </div>
    </main>
  )
}
