"use client"

import { useLocale, useTranslations } from "next-intl"
import type { Collection } from "@/types/Collection.types"
import { cn } from "@/lib/utils"

interface CollectionPillsProps {
  collections: Collection[]
  selectedId: number | null
  onSelect: (id: number | null) => void
  className?: string
}

export function CollectionPills({
  collections,
  selectedId,
  onSelect,
  className = "",
}: CollectionPillsProps) {
  const t = useTranslations("productsPage")
  const locale = useLocale()
  const isAr = locale === "ar"

  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
          selectedId === null
            ? "bg-primary text-primary-foreground shadow-xs"
            : "border border-border/80 bg-background/60 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        {t("allCollections")}
      </button>

      {collections.map((col) => {
        const isSelected = selectedId === col.id
        const name = isAr ? col.arName : col.enName

        return (
          <button
            key={col.id}
            type="button"
            onClick={() => onSelect(isSelected ? null : col.id)}
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
              isSelected
                ? "bg-primary text-primary-foreground shadow-xs"
                : "border border-border/80 bg-background/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {name}
          </button>
        )
      })}
    </div>
  )
}
