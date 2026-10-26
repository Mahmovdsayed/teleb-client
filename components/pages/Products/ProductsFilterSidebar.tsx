"use client"

import { useLocale, useTranslations } from "next-intl"
import { Check, Sparkles, RotateCcw } from "lucide-react"
import type { Collection } from "@/types/Collection.types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductsFilterSidebarProps {
  collections: Collection[]
  selectedCollectionId: number | null
  onSelectCollection: (id: number | null) => void
  bestSeller: boolean
  onToggleBestSeller: () => void
  status: "active" | "all"
  onToggleStatus: () => void
  activeFiltersCount: number
  onResetFilters: () => void
  className?: string
}

export function ProductsFilterSidebar({
  collections,
  selectedCollectionId,
  onSelectCollection,
  bestSeller,
  onToggleBestSeller,
  status,
  onToggleStatus,
  activeFiltersCount,
  onResetFilters,
  className = "",
}: ProductsFilterSidebarProps) {
  const t = useTranslations("productsPage")
  const locale = useLocale()
  const isAr = locale === "ar"

  return (
    <aside
      className={cn(
        "hidden lg:block w-64 shrink-0 space-y-6 rounded-xl border border-border/70 bg-card/60 p-5 backdrop-blur-xs",
        className
      )}
    >
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground tracking-tight">
            {t("filters")}
          </h2>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
              {activeFiltersCount}
            </Badge>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={onResetFilters}
            className="text-muted-foreground hover:text-foreground gap-1 text-[11px]"
          >
            <RotateCcw className="size-3" />
            {t("clearAll")}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("collection")}
        </label>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => onSelectCollection(null)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors text-start cursor-pointer",
              selectedCollectionId === null
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            <span>{t("allCollections")}</span>
            {selectedCollectionId === null && <Check className="size-3.5" />}
          </button>

          {collections.map((col) => {
            const isSelected = selectedCollectionId === col.id
            const name = isAr ? col.arName : col.enName

            return (
              <button
                key={col.id}
                type="button"
                onClick={() => onSelectCollection(isSelected ? null : col.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors text-start cursor-pointer",
                  isSelected
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <span className="truncate">{name}</span>
                {isSelected && <Check className="size-3.5 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-border/60">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("status")}
        </label>
        <div className="space-y-2">
          <button
            type="button"
            onClick={onToggleBestSeller}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-all cursor-pointer",
              bestSeller
                ? "border-primary/50 bg-primary/10 text-primary shadow-xs"
                : "border-border/70 bg-background/50 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
            )}
          >
            <div className="flex items-center gap-2">
              <span>{t("bestSellersOnly")}</span>
            </div>
            {bestSeller && <Check className="size-3.5" />}
          </button>

          <button
            type="button"
            onClick={onToggleStatus}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-all cursor-pointer",
              status === "active"
                ? "border-primary/50 bg-primary/10 text-primary shadow-xs"
                : "border-border/70 bg-background/50 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
            )}
          >
            <span>{t("inStock")}</span>
            {status === "active" && <Check className="size-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  )
}
