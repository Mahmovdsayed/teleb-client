const FALLBACK_SITE_URL = "https://www.teleb-furniture.com"

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL).replace(/\/+$/, "")

export const SITE_NAME = "Teleb Furniture"
export const SITE_NAME_AR = "طلب للأثاث"

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const LOCALES = ["en", "ar"] as const
export type SiteLocale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: SiteLocale = "en"

export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function localePath(locale: string, path = ""): string {
  const normalized = path === "/" || path === "" ? "" : path.startsWith("/") ? path : `/${path}`
  return `/${locale}${normalized}`
}

export function productPath(product: { id: number; slug?: string | null }): string {
  const slug = product.slug?.trim()
  return `/products/${slug ? encodeURIComponent(slug) : product.id}`
}

export function languageTag(locale: string): string {
  return locale === "ar" ? "ar-EG" : "en-US"
}
