import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export interface PostMeta {
  slug:           string
  title:          string
  titleEn?:       string
  date:           string
  tags:           string[]
  summary:        string
  summaryEn?:     string
  readingTime:    string
  readingTimeEn?: string
  published:      boolean
  coverImage?:    string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""))
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const rt = readingTime(content)
  return {
    slug,
    title:          data.title ?? "",
    titleEn:        data.titleEn,
    date:           data.date ?? "",
    tags:           data.tags ?? [],
    summary:        data.summary ?? "",
    summaryEn:      data.summaryEn,
    readingTime:    `${Math.ceil(rt.minutes)} min`,
    readingTimeEn:  `${Math.ceil(rt.minutes)} min read`,
    published:      data.published !== false,
    coverImage:     data.coverImage,
    content,
  }
}

export function getAllPosts(_locale: "pt" | "en" = "pt"): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((post) => post.tags)
  return [...new Set(tags)].sort()
}
