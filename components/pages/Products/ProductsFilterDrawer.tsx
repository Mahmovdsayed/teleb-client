"use client"

import { useLocale, useTranslations } from "next-intl"
import { SlidersHorizontal, Check, Sparkles, RotateCcw } from "lucide-react"
import type { Collection } from "@/types/Collection.types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

interface ProductsFilterDrawerProps {
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

export function ProductsFilterDrawer({
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
}: ProductsFilterDrawerProps) {
  const t = useTranslations("productsPage")
  const locale = useLocale()
  const isAr = locale === "ar"

  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="default"
            className={cn("h-9 gap-2 text-xs font-medium cursor-pointer", className)}
          >
            <SlidersHorizontal className="size-3.5" />
            <span>{t("filters")}</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        }
      />

      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-start pb-3 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DrawerTitle className="text-base font-semibold">
                {t("filters")}
              </DrawerTitle>
              <DrawerDescription className="text-xs">
                {t("filterCount", { count: activeFiltersCount })}
              </DrawerDescription>
            </div>

            {activeFiltersCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={onResetFilters}
                className="gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3" />
                {t("clearAll")}
              </Button>
            )}
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto p-4 space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("collection")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onSelectCollection(null)}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-2.5 text-xs font-medium transition-all text-start cursor-pointer",
                  selectedCollectionId === null
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border/70 bg-card text-muted-foreground hover:bg-muted/40"
                )}
              >
                <span className="truncate">{t("allCollections")}</span>
                {selectedCollectionId === null && <Check className="size-3.5 shrink-0" />}
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
                      "flex items-center justify-between rounded-lg border p-2.5 text-xs font-medium transition-all text-start cursor-pointer",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border/70 bg-card text-muted-foreground hover:bg-muted/40"
                    )}
                  >
                    <span className="truncate">{name}</span>
                    {isSelected && <Check className="size-3.5 shrink-0" />}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-border/60">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("status")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onToggleBestSeller}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-2.5 text-xs font-medium transition-all cursor-pointer",
                  bestSeller
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border/70 bg-card text-muted-foreground hover:bg-muted/40"
                )}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="truncate">{t("bestSellersOnly")}</span>
                </div>
                {bestSeller && <Check className="size-3.5 shrink-0" />}
              </button>

              <button
                type="button"
                onClick={onToggleStatus}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-2.5 text-xs font-medium transition-all cursor-pointer",
                  status === "active"
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border/70 bg-card text-muted-foreground hover:bg-muted/40"
                )}
              >
                <span className="truncate">{t("inStock")}</span>
                {status === "active" && <Check className="size-3.5 shrink-0" />}
              </button>
            </div>
          </div>
        </div>

        <DrawerFooter className="border-t border-border/60 p-4">
          <DrawerClose
            render={
              <Button type="button" className="w-full h-9 font-medium cursor-pointer">
                {t("applyFilters")}
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
