"use client"

import { useTranslations } from "next-intl"
import { SearchX, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import type { Product } from "@/types/Product.types"
import ProductCard from "@/components/ui/ProductCard"
import { ProductCardSkeleton } from "@/components/skeleton"
import { Button } from "@/components/ui/button"

interface ProductsGridProps {
  products: Product[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onResetFilters: () => void
  isRtl?: boolean
}

export function ProductsGrid({
  products,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters,
  isRtl = false,
}: ProductsGridProps) {
  const t = useTranslations("productsPage")

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-12 text-center my-8 bg-card/30">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted/60 text-muted-foreground mb-4">
          <SearchX className="size-7" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {t("noProductsFound")}
        </h3>
        <p className="mt-1.5 max-w-sm text-xs text-muted-foreground">
          {t("noProductsDesc")}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          className="mt-5 gap-1.5 cursor-pointer text-xs"
        >
          <RotateCcw className="size-3.5" />
          <span>{t("resetFilters")}</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">
            {t("page")} {currentPage} {t("of")} {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="gap-1 text-xs cursor-pointer disabled:cursor-not-allowed"
            >
              {isRtl ? (
                <ChevronRight className="size-3.5" />
              ) : (
                <ChevronLeft className="size-3.5" />
              )}
              <span>{t("previous")}</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="gap-1 text-xs cursor-pointer disabled:cursor-not-allowed"
            >
              <span>{t("next")}</span>
              {isRtl ? (
                <ChevronLeft className="size-3.5" />
              ) : (
                <ChevronRight className="size-3.5" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
