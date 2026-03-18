import { MetadataRoute } from "next"
import { getAllPostSlugs } from "@/lib/blog"

const BASE_URL = "https://dev-luisneves.me"

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["pt", "en"]
  const staticRoutes = ["/", "/curriculo", "/blog", "/contato"]
  const slugs = getAllPostSlugs()

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${BASE_URL}/${locale}${route === "/" ? "" : route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : route === "/blog" ? 0.9 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l === "pt" ? "pt-BR" : "en-US",
            `${BASE_URL}/${l}${route === "/" ? "" : route}`,
          ])
        ),
      },
    }))
  )

  const postEntries = locales.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    }))
  )

  return [...staticEntries, ...postEntries]
}
