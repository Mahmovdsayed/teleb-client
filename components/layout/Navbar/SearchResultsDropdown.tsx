"use client"

import { ArrowRight, Loader2 } from "lucide-react"
import type { SearchResultsProps } from "./types"
import type { Collection } from "@/types/Collection.types"
import type { Product } from "@/types/Product.types"
import { CollectionIcon } from "@/components/ui/CollectionIcon"

function getCollectionName(col: Collection, isAr: boolean): string {
    return isAr ? col.arName : col.enName
}

function getProductName(product: Product, isAr: boolean): string {
    const currentLocale = isAr ? "ar" : "en"
    const translation = product.translations?.find((t) => t.locale === currentLocale)
    if (translation?.name) return translation.name
    if (product.translations?.[0]?.name) return product.translations[0].name
    return product.slug
}

export default function SearchResultsDropdown({
    isSearching,
    hasResults,
    searchQuery,
    products,
    collections,
    isAr,
    onProductClick,
    onCollectionClick,
    onViewMore,
}: SearchResultsProps) {
    return (
        <div
            className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-background shadow-2xl backdrop-blur-md animate-in slide-in-from-top-2 duration-200"
            onMouseDown={(e) => e.stopPropagation()}
        >
            <div className="max-h-80 overflow-y-auto" data-lenis-prevent>
                {isSearching && (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                )}

                {!isSearching && !hasResults && searchQuery.trim().length >= 2 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                        {isAr ? "لا توجد نتائج" : "No results found"}
                    </p>
                )}

                {!isSearching && collections.length > 0 && (
                    <div className="py-2">
                        <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {isAr ? "المجموعات" : "Collections"}
                        </p>
                        {collections.map((col) => {
                            const name = getCollectionName(col, isAr)
                            return (
                                <button
                                    key={col.id}
                                    type="button"
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        onCollectionClick(col)
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-start transition-colors hover:bg-muted/50"
                                >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 text-xs font-bold text-amber-700 dark:from-amber-950/40 dark:to-orange-950/40 dark:text-amber-400">
                                        {col.icon ? (
                                            <CollectionIcon name={col.icon} className="h-4 w-4" />
                                        ) : (
                                            name.charAt(0)
                                        )}
                                    </span>
                                    <span className="truncate text-sm font-medium text-foreground">{name}</span>
                                </button>
                            )
                        })}
                    </div>
                )}

                {!isSearching && products.length > 0 && (
                    <div className="border-t border-border/50 py-2">
                        <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {isAr ? "المنتجات" : "Products"}
                        </p>
                        {products.map((product) => {
                            const name = getProductName(product, isAr)
                            const mainImage = product.images?.find((img) => img.isMain) || product.images?.[0]

                            return (
                                <button
                                    key={product.id}
                                    type="button"
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        onProductClick(product.slug)
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-start transition-colors hover:bg-muted/50"
                                >
                                    {mainImage?.url ? (
                                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                                            <img
                                                src={mainImage.url}
                                                alt={name}
                                                className="object-cover size-full object-center"
                                            />
                                        </div>
                                    ) : (
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                                            N/A
                                        </span>
                                    )}
                                    <span className="truncate text-sm font-medium text-foreground">{name}</span>
                                </button>
                            )
                        })}
                    </div>
                )}

                {!isSearching && hasResults && (
                    <div className="border-t border-border/50 p-2">
                        <button
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                onViewMore()
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                        >
                            <span>{isAr ? "عرض المزيد" : "View More"}</span>
                            <ArrowRight className={`h-4 w-4 ${isAr ? "rotate-180" : ""}`} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
