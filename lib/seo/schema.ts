import type { Product, ProductTranslation } from "@/types/Product.types"
import { ORGANIZATION_ID, SITE_NAME, WEBSITE_ID, absoluteUrl, languageTag } from "./site"

type JsonLdObject = Record<string, unknown>
const CURRENCY = "EGP"

export interface BreadcrumbItem {
  name: string
  path?: string
}

export function buildBreadcrumbList(items: BreadcrumbItem[], id?: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  }
}

export interface ItemPageParams {
  url: string
  name: string
  description?: string | null
  image?: string | null
  locale: string
  breadcrumbId?: string
  mainEntityId?: string | null
}

export function buildItemPageSchema({ url, name, description, image, locale, breadcrumbId, mainEntityId }: ItemPageParams): JsonLdObject {
  const descriptionText = description?.trim()
  const imageUrl = image ? absoluteUrl(image) : null

  return {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "@id": `${url}#webpage`,
    url,
    name,
    ...(descriptionText ? { description: descriptionText } : {}),
    inLanguage: languageTag(locale),
    isPartOf: { "@id": WEBSITE_ID },
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
    ...(imageUrl ? { primaryImageOfPage: { "@type": "ImageObject", url: imageUrl } } : {}),
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  }
}

export interface ProductSchemaParams {
  product: Product
  translation?: ProductTranslation | null
  locale: string
  url: string
  collectionName?: string | null
}

function toPrice(value: unknown): number | null {
  const parsed = typeof value === "string" ? Number.parseFloat(value) : Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

export function buildProductSchema({ product, translation, url, collectionName }: ProductSchemaParams): JsonLdObject | null {
  const name = translation?.name?.trim() || product.slug?.trim()
  if (!name) return null

  const price = toPrice(product.price)
  if (price === null) return null

  const description = (translation?.description || translation?.smallDescription || "").trim()
  const images = (product.images ?? []).map((image) => (image.url ? absoluteUrl(image.url) : "")).filter(Boolean)
  const materials = (translation?.materials ?? []).map((material) => material.name?.trim()).filter((material): material is string => Boolean(material))

  const availability = product.status === "active" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name,
    ...(description ? { description } : {}),
    ...(images.length ? { image: images } : {}),
    sku: `PROD-${product.id}`,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    brand: { "@type": "Brand", name: SITE_NAME },
    ...(materials.length ? { material: materials } : {}),
    ...(collectionName ? { category: collectionName } : {}),
    offers: {
      "@type": "Offer",
      "@id": `${url}#offer`,
      url,
      price,
      priceCurrency: CURRENCY,
      availability,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORGANIZATION_ID },
    },
  }
}
