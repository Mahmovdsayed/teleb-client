"use client"

import { useId } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Navigation, FreeMode } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/free-mode"

import { useAppQuery } from "@/hooks/useAppQuery"
import { getProducts } from "@/services/product"
import ProductCard from "@/components/ui/ProductCard"
import type { Product } from "@/types/Product.types"
import { BestSellersSkeleton } from "@/components/skeleton"

interface BestSellersProps {
    initialProducts?: Product[]
}

export default function BestSellers({ initialProducts }: BestSellersProps) {
    const t = useTranslations("home")
    const locale = useLocale()
    const isRtl = locale === "ar"
    const rawId = useId()
    const sectionId = `bestsellers-${rawId.replace(/:/g, "")}`

    const { data, isLoading } = useAppQuery<{ products: Product[]; total: number }>({
        queryKey: ["products-bestsellers", locale],
        queryFn: () =>
            getProducts({
                bestSeller: true,
                limit: 10,
                lang: locale as "ar" | "en",
            }),
        // enabled: !initialProducts || initialProducts.length === 0,
    })

    const products = (initialProducts && initialProducts.length > 0)
        ? initialProducts
        : data?.products ?? []

    if (isLoading && products.length === 0) {
        return <BestSellersSkeleton />
    }

    if (products.length === 0) return null

    return (
        <section className="w-full pb-8 md:pb-12 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-4 md:mb-6 gap-4">
                    <div>
                        <span className="text-[11px] md:text-xs font-semibold tracking-tight uppercase text-amber-700 dark:text-amber-400">
                            {t("bestSellersSubtitle")}
                        </span>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-foreground mt-0.5">
                            {t("bestSellers")}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={`/${locale}/products?bestSeller=true`}
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors me-2"
                        >
                            <span>{t("viewAllProducts")}</span>
                            <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                        </Link>

                        <button
                            type="button"
                            aria-label="Previous slide"
                            className={`prev-${sectionId} flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-xs`}
                        >
                            {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        </button>

                        <button
                            type="button"
                            aria-label="Next slide"
                            className={`next-${sectionId} flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-xs`}
                        >
                            {isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <Swiper
                        key={locale}
                        dir={isRtl ? "rtl" : "ltr"}
                        modules={[Navigation, FreeMode]}
                        spaceBetween={16}
                        slidesPerView={1.5}
                        slidesPerGroup={1}
                        freeMode={true}
                        loop
                        navigation={{
                            prevEl: `.prev-${sectionId}`,
                            nextEl: `.next-${sectionId}`,
                        }}
                        onBeforeInit={(swiper) => {
                            if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
                                swiper.params.navigation.prevEl = `.prev-${sectionId}`
                                swiper.params.navigation.nextEl = `.next-${sectionId}`
                            }
                        }}
                        breakpoints={{
                            480: { slidesPerView: 2.2, slidesPerGroup: 1 },
                            640: { slidesPerView: 2.5, slidesPerGroup: 1 },
                            768: { slidesPerView: 3.2, slidesPerGroup: 1 },
                            1024: { slidesPerView: 4, slidesPerGroup: 1 },
                            1280: { slidesPerView: 4.5, slidesPerGroup: 1 },
                        }}
                        className="w-full py-1"
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={product.id}>
                                <ProductCard product={product} priority={index < 2} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}
