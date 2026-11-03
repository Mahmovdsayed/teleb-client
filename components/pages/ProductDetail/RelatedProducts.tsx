"use client"

import { useLocale, useTranslations } from "next-intl"
import { useAppQuery } from "@/hooks/useAppQuery"
import { getProducts } from "@/services/product"
import ProductCard from "@/components/ui/ProductCard"
import type { Product } from "@/types/Product.types"
import { ProductCardSkeleton } from "@/components/skeleton"

interface RelatedProductsProps {
  currentProductId: number
  collectionId?: number | string
}

export function RelatedProducts({
  currentProductId,
  collectionId,
}: RelatedProductsProps) {
  const t = useTranslations("productDetail")
  const locale = useLocale()

  const numericCollectionId =
    collectionId != null && !isNaN(Number(collectionId))
      ? Number(collectionId)
      : undefined

  const { data, isLoading } = useAppQuery<{ products: Product[]; total: number }>({
    queryKey: ["related-products", numericCollectionId, locale],
    queryFn: () =>
      getProducts({
        collectionId: numericCollectionId,
        limit: 6,
        lang: locale as "ar" | "en",
        status: "active",
      }),
    enabled: Boolean(numericCollectionId),
  })

  const relatedProducts = (data?.products ?? [])
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4)

  if (!numericCollectionId) return null
  if (!isLoading && relatedProducts.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-border/50">
      <div className="mb-8">
        <h2 className="text-base sm:text-2xl font-semibold tracking-tight text-foreground">
          {t("relatedProducts")}
        </h2>
        <p className="mt-1 text-xs md:text-sm tracking-tight text-muted-foreground">
          {t("relatedSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : relatedProducts.map((p, idx) => (
            <ProductCard key={p.id} product={p} priority={idx < 2} />
          ))}
      </div>
    </section>
  )
}
