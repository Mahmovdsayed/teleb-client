"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbsProps {
  productName: string
  collection?: {
    id: number
    name: string
  } | null
}

export function ProductBreadcrumbs({ productName, collection }: BreadcrumbsProps) {
  const t = useTranslations("productDetail")
  const locale = useLocale()
  const isRtl = locale === "ar"

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("home"),
        item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("products"),
        item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/${locale}/products`,
      },
      ...(collection
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: collection.name,
              item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/${locale}/products?collectionId=${collection.id}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: productName,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: productName,
            },
          ]),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center flex-wrap gap-1.5 text-xs text-muted-foreground"
      >
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <Home className="size-3.5" />
          <span>{t("home")}</span>
        </Link>

        <ChevronRight className={`size-3 text-muted-foreground/50 shrink-0 ${isRtl ? "rotate-180" : ""}`} />

        <Link
          href={`/${locale}/products`}
          className="hover:text-foreground transition-colors"
        >
          {t("products")}
        </Link>

        {collection && (
          <>
            <ChevronRight className={`size-3 text-muted-foreground/50 shrink-0 ${isRtl ? "rotate-180" : ""}`} />
            <Link
              href={`/${locale}/products?collectionId=${collection.id}`}
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
