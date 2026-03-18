import Link from "next/link"
import { PostCard } from "@/components/blog/PostCard"
import type { PostMeta } from "@/lib/blog"

interface LatestPostsProps {
  posts: PostMeta[]
  locale: string
}

export function LatestPosts({ posts, locale }: LatestPostsProps) {
  const isEn = locale === "en"
  return (
    <section className="py-16">
      <div className="flex justify-between items-center mb-2">
        <span className="section-label">
          {isEn ? "// latest posts" : "// últimas notas de engenharia"}
        </span>
        <Link
          href={`/${locale}/blog`}
          className="p3 hover:text-amber-500 transition-colors"
        >
          {isEn ? "all posts →" : "ver todos →"}
        </Link>
      </div>
      <div className="grid-3 mt-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </section>
  )
}
