"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowLeft, PackageSearch } from "lucide-react"
import { useAppQuery } from "@/hooks/useAppQuery"
import { getProductById } from "@/services/product"
import { getCollections } from "@/services/collection"
import { ProductBreadcrumbs } from "./ProductBreadcrumbs"
import { ProductGallery } from "./ProductGallery"
import { ProductInfo } from "./ProductInfo"
import { ProductDetailsTabs } from "./ProductDetailsTabs"
import { RelatedProducts } from "./RelatedProducts"
import { ProductDetailSkeleton } from "@/components/skeleton"
import type { Product } from "@/types/Product.types"
import type { Collection } from "@/types/Collection.types"

interface ProductDetailContentProps {
  initialProduct?: Product | null
  productId: string
}

export function ProductDetailContent({
  initialProduct,
  productId,
}: ProductDetailContentProps) {
  const locale = useLocale()
  const isRtl = locale === "ar"
  const t = useTranslations("productDetail")

  const { data: product, isLoading } = useAppQuery<Product | null>({
    queryKey: ["product-detail", productId, locale],
    queryFn: () => getProductById(productId, locale as "ar" | "en"),
    initialData: initialProduct ?? undefined,
  })

  const { data: collections } = useAppQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  })

  if (isLoading && !product) {
    return <ProductDetailSkeleton />
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center gap-6">
        <div className="size-20 rounded-full bg-muted flex items-center justify-center">
          <PackageSearch className="size-9 text-muted-foreground" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h2 className="text-xl font-bold text-foreground">{t("notFoundTitle")}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("notFoundDesc")}
          </p>
        </div>
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2 mt-2 px-6 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className={`size-4 ${isRtl ? "rotate-180" : ""}`} />
          {t("viewAllProducts")}
        </Link>
      </div>
    )
  }

  const translation =
    product.translations?.find((tr) => tr.locale === locale) ||
    product.translations?.[0]

  const matchedCollection = collections?.find((c) => c.id === product.collectionId)
  const collectionData = matchedCollection
    ? {
        id: matchedCollection.id,
        name: isRtl ? matchedCollection.arName : matchedCollection.enName,
      }
    : null

  const productName = translation?.name || product.slug

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: translation?.description || translation?.smallDescription || "",
    image: product.images?.map((img) => img.url) || [],
    sku: `PROD-${product.id}`,
    brand: {
      "@type": "Brand",
      name: locale === "ar" ? "طلب للأثاث" : "Teleb Furniture",
    },
    offers: {
      "@type": "Offer",
      availability:
        product.status === "active"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      priceCurrency: "EGP",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/${locale}/products/${product.id}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-16 space-y-0">
        <div className="pb-6">
          <ProductBreadcrumbs productName={productName} collection={collectionData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <ProductGallery
              images={product.images ?? []}
              productName={productName}
              isBestSeller={product.isBestSeller}
              isCustomizable={product.isCustomizable}
              status={product.status}
              isRtl={isRtl}
            />
          </div>

          <div className="lg:sticky lg:top-24">
            <ProductInfo
              product={product}
              translation={translation}
              collection={collectionData}
            />
          </div>
        </div>

        <ProductDetailsTabs
          product={product}
          translation={translation}
          collectionName={collectionData?.name}
        />

        <RelatedProducts
          currentProductId={product.id}
          collectionId={product.collectionId}
        />
      </div>
    </>
  )
}
