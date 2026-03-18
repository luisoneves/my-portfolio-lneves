"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import type { PostMeta } from "@/lib/blog"
import { PostCard } from "./PostCard"

interface BlogListProps {
  posts: PostMeta[]
  tags: string[]
  locale: string
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export function BlogList({ posts, tags, locale }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts
  const isEn = locale === "en"

  return (
    <div>
      <span className="section-label">
        {isEn
          ? "// thinking in public"
          : "// thinking in public — desafios, leituras e descobertas"}
      </span>
      <h1 className="h1 mt-1 mb-8">Blog</h1>

      <div className="flex gap-2 flex-wrap mb-8">
        <button
          className={`tag ${activeTag === null ? "active" : ""}`}
          onClick={() => setActiveTag(null)}
        >
          {isEn ? "all" : "todos"}
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag ${activeTag === tag ? "active" : ""}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <motion.div
        className="grid-1"
        variants={container}
        initial="hidden"
        animate="show"
        key={activeTag ?? "all"}
      >
        {filtered.length === 0 ? (
          <p className="p2">
            {isEn ? "No posts with this tag yet." : "Nenhum post com essa tag ainda."}
          </p>
        ) : (
          filtered.map((post) => (
            <motion.div key={post.slug} variants={item}>
              <PostCard post={post} locale={locale} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  )
}
