"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ChevronRight, Home } from "lucide-react"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildBreadcrumbList, type BreadcrumbItem } from "@/lib/seo/schema"
import { localePath } from "@/lib/seo/site"

interface BreadcrumbsProps {
  productName: string
  productUrl: string
  collection?: {
    id: number
    name: string
  } | null
}

export function ProductBreadcrumbs({ productName, productUrl, collection }: BreadcrumbsProps) {
  const t = useTranslations("productDetail")
  const locale = useLocale()
  const isRtl = locale === "ar"

  const breadcrumbId = `${productUrl}#breadcrumb`

  const items: BreadcrumbItem[] = [
    { name: t("home"), path: localePath(locale) },
    { name: t("products"), path: localePath(locale, "/products") },
    ...(collection
      ? [
        {
          name: collection.name,
          path: localePath(locale, `/products?collectionId=${collection.id}`),
        },
      ]
      : []),
    { name: productName },
  ]

  return (
    <>
      <JsonLd id="product-breadcrumbs" data={buildBreadcrumbList(items, breadcrumbId)} />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center flex-wrap gap-1.5 text-xs text-muted-foreground"
      >
        <Link
          href={`/${locale}`}
          prefetch={true}
          className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <Home className="size-3.5" />
          <span>{t("home")}</span>
        </Link>

        <ChevronRight className={`size-3 text-muted-foreground/50 shrink-0 ${isRtl ? "rotate-180" : ""}`} />

        <Link
          href={`/${locale}/products`}
          prefetch={true}
          className="hover:text-foreground transition-colors"
        >
          {t("products")}
        </Link>

        {collection && (
          <>
            <ChevronRight className={`size-3 text-muted-foreground/50 shrink-0 ${isRtl ? "rotate-180" : ""}`} />
            <Link
              href={`/${locale}/products?collectionId=${collection.id}`}
              prefetch={true}
              className="hover:text-foreground transition-colors"
            >
              {collection.name}
            </Link>
          </>
        )}

        <ChevronRight className={`size-3 text-muted-foreground/50 shrink-0 ${isRtl ? "rotate-180" : ""}`} />

        <span className="font-medium text-foreground truncate max-w-[200px] sm:max-w-xs" aria-current="page">
          {productName}
        </span>
      </nav>
    </>
  )
}
