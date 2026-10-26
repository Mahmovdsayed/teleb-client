"use client"

import Link from "next/link"
import { useLocale } from "next-intl"

import { Icon } from "@/components/ui/Icon"
import type { CarouselItem } from "./types"

interface CollectionCardProps {
    item: CarouselItem
    isDimmed?: boolean
    onHover?: (id: string | number | null) => void
}

export default function CollectionCard({ item, isDimmed = false, onHover }: CollectionCardProps) {
    const locale = useLocale()
    const isAr = locale === "ar"

    return (
        <Link
            href={`/${locale}/collections/${item.id}`}
            onMouseEnter={() => onHover?.(item.id)}
            onMouseLeave={() => onHover?.(null)}
            className={`group block shrink-0 w-28 sm:w-34 md:w-44 select-none transition-all duration-300 ease-out ${
                isDimmed ? "opacity-35 blur-[2px] scale-[0.96]" : "opacity-100 blur-none scale-100"
            }`}
        >
            <div
                className="relative h-26 sm:h-30 md:h-40 p-3 sm:p-4 md:p-6 rounded-3xl md:rounded-4xl overflow-hidden flex flex-col items-center justify-center
                    bg-[#FDF6EF] group-hover:bg-[#511F0E]
                    dark:bg-card dark:group-hover:bg-[#3a1609]
                    shadow-none transition-colors duration-200 transition-transform duration-200 transform-gpu group-hover:scale-[1.03]"
            >
                <div className="text-[#511F0E]/70 group-hover:text-[#FE8300] dark:text-white/80 dark:group-hover:text-[#FE8300] group-hover:scale-110 transition-colors duration-200 transition-transform duration-200 mb-1.5 md:mb-2">
                    <Icon name={item.iconName} className="w-6 h-6 md:w-8 md:h-8" />
                </div>

                <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-[#511F0E] group-hover:text-[#FE8300] dark:text-white dark:group-hover:text-[#FE8300] text-center transition-colors duration-300 line-clamp-2 leading-tight">
                    {item.title}
                </h3>

                {item.productCount !== undefined && (
                    <p className="text-[9px] md:text-xs text-[#511F0E]/60 group-hover:text-[#FE8300]/80 dark:text-white/60 dark:group-hover:text-[#FE8300]/80 mt-1 transition-colors duration-300">
                        {item.productCount} {isAr ? "منتج" : "products"}
                    </p>
                )}
            </div>
        </Link>
    )
}
