import { getAllPosts } from "@/lib/blog"
import { HomeClient } from "@/components/home/HomeClient"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const latestPosts = getAllPosts(locale as "pt" | "en").slice(0, 3)

  return <HomeClient locale={locale} latestPosts={latestPosts} />
}
