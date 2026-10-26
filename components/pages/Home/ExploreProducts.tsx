"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"

import { useAppQuery } from "@/hooks/useAppQuery"
import { getProducts } from "@/services/product"
import ProductCard from "@/components/ui/ProductCard"
import type { Product } from "@/types/Product.types"
import { ExploreProductsSkeleton } from "@/components/skeleton"

interface ExploreProductsProps {
    initialProducts?: Product[]
}

export default function ExploreProducts({ initialProducts }: ExploreProductsProps) {
    const t = useTranslations("home")
    const locale = useLocale()
    const isRtl = locale === "ar"

    const { data, isLoading } = useAppQuery<{ products: Product[]; total: number }>({
        queryKey: ["products-explore", locale],
        queryFn: () =>
            getProducts({
                bestSeller: false,
                limit: 8,
                lang: locale as "ar" | "en",
            }),
        // enabled: !initialProducts || initialProducts.length === 0,
    })

    const products = (initialProducts && initialProducts.length > 0)
        ? initialProducts
        : data?.products ?? []

    if (isLoading && products.length === 0) {
        return <ExploreProductsSkeleton />
    }

    if (products.length === 0) return null

    return (
        <section className="w-full pb-8 md:pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-4 md:mb-6 gap-4">
                    <div>
                        <span className="text-[11px] md:text-xs font-semibold tracking-tight uppercase text-amber-700 dark:text-amber-400">
                            {t("exploreProductsSubtitle")}
                        </span>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-foreground mt-0.5">
                            {t("exploreProducts")}
                        </h2>
                    </div>

                    <Link
                        href={`/${locale}/products`}
                        className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <span>{t("viewAllProducts")}</span>
                        <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} priority={index < 2} />
                    ))}
                </div>
            </div>
        </section>
    )
}
