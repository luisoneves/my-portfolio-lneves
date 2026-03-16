import { MetadataRoute } from "next"

const BASE_URL = "https://dev-luisneves.me"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/curriculo"]
  const locales = ["pt", "en"]

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${BASE_URL}/${locale}${route === "/" ? "" : route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${route === "/" ? "" : route}`])
        ),
      },
    }))
  )
}
