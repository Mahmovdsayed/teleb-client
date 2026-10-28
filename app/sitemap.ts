import { MetadataRoute } from "next"
import { cacheLife } from "next/cache"
import type { Product } from "@/types/Product.types"
import { getProducts } from "@/services/product"

const siteUrl = "https://www.teleb-furniture.com"
const PAGE_SIZE = 100
const MAX_PAGES = 50

const locales = ["en", "ar"] as const

const staticPages = [
  { path: "", priority: 1.0, changeFrequency: "daily" as const },
  { path: "/products", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
]

const localizedUrl = (path: string, locale: "en" | "ar") => `${siteUrl}${locale === "en" ? path : `/ar${path}`}`

const alternatesFor = (path: string) => ({
  languages: {
    en: localizedUrl(path, "en"),
    ar: localizedUrl(path, "ar"),
  },
})

async function getAllActiveProducts(): Promise<Product[]> {
  const all: Product[] = []

  for (let page = 1; page <= MAX_PAGES; page++) {
    const { products, total } = await getProducts({
      page,
      limit: PAGE_SIZE,
      status: "active",
    })

    all.push(...products)

    if (products.length < PAGE_SIZE || all.length >= total) break
  }

  return all
}

async function getStaticEntries(): Promise<MetadataRoute.Sitemap> {
  "use cache"
  cacheLife("days")

  const now = new Date()

  return staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: localizedUrl(page.path, locale),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: alternatesFor(page.path),
    }))
  )
}

async function getProductEntries(): Promise<MetadataRoute.Sitemap> {
  "use cache"
  cacheLife("hours")

  const now = new Date()
  const products = await getAllActiveProducts()

  return products
    .filter((p) => Boolean(p.slug))
    .flatMap((product) => {
      const path = `/products/${product.slug}`
      const lastModified = product.updatedAt ? new Date(product.updatedAt) : now

      return locales.map((locale) => ({
        url: localizedUrl(path, locale),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: alternatesFor(path),
      }))
    })
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = await getStaticEntries()

  try {
    const productEntries = await getProductEntries()
    return [...staticEntries, ...productEntries]
  } catch (error) {
    console.error("Sitemap product fetch failed:", error)
    return staticEntries
  }
}
