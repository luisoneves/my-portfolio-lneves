"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import type { PostMeta } from "@/lib/blog"

interface PostCardProps {
  post: PostMeta
  locale: string
}

export function PostCard({ post, locale }: PostCardProps) {
  const isEn = locale === "en"
  const title   = isEn && post.titleEn   ? post.titleEn   : post.title
  const summary = isEn && post.summaryEn ? post.summaryEn : post.summary
  const rt      = isEn && post.readingTimeEn ? post.readingTimeEn : post.readingTime

  return (
    <motion.div
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 20 } }}
    >
      <Link href={`/${locale}/blog/${post.slug}`} className="card-interactive group">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="badge badge-neutral">{tag}</span>
            ))}
          </div>
          <span className="p3 shrink-0 ml-3">
            {post.date.slice(0, 7)} · {rt}
          </span>
        </div>
        <h3 className="h4 mb-2 group-hover:text-amber-500 transition-colors">{title}</h3>
        <p className="p2 line-clamp-2">{summary}</p>
      </Link>
    </motion.div>
  )
}
