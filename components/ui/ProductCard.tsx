"use client"

import Link from "next/link"
import Image from "next/image"
import { useLocale } from "next-intl"
import type { Product } from "@/types/Product.types"

export interface ProductCardData {
    id: number | string
    name?: {
        ar?: string
        en?: string
    }
    description?: {
        ar?: string | null
        en?: string | null
    }
    image?: string | null
    translations?: Product["translations"]
    images?: Product["images"]
    slug?: string
}

export interface ProductCardProps {
    product: ProductCardData | Product
    className?: string
    priority?: boolean
}

export default function ProductCard({
    product,
    className = "",
    priority = false,
}: ProductCardProps) {
    const locale = useLocale()
    const isRtl = locale === "ar"

    const directName = "name" in product ? product.name : undefined
    const directDesc = "description" in product ? product.description : undefined
    const directImage = "image" in product ? product.image : undefined

    const name =
        (isRtl ? directName?.ar : directName?.en) ||
        product.translations?.find((t) => t.locale === (isRtl ? "ar" : "en"))?.name ||
        product.translations?.[0]?.name ||
        ""

    const description =
        (isRtl ? directDesc?.ar : directDesc?.en) ||
        product.translations?.find((t) => t.locale === (isRtl ? "ar" : "en"))?.smallDescription ||
        product.translations?.find((t) => t.locale === (isRtl ? "ar" : "en"))?.description ||
        product.translations?.[0]?.smallDescription ||
        product.translations?.[0]?.description ||
        ""

    const imageUrl =
        directImage ||
        product.images?.find((img) => img.isMain)?.url ||
        product.images?.[0]?.url

    return (
        <Link
            href={`/${locale}/products/${product.id}`}
            className={`group block select-none ${className}`}
        >
            <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        priority={priority}
                        loading={priority ? "eager" : undefined}
                        className="object-cover rounded-lg object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 480px) 66vw, (max-width: 640px) 40vw, (max-width: 768px) 30vw, (max-width: 1024px) 25vw, 20vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <span className="text-3xl opacity-30">🪑</span>
                    </div>
                )}
            </div>

            <div className="mt-2.5">
                <h3 className="text-xs md:text-sm font-medium text-foreground line-clamp-1 transition-colors duration-200 group-hover:text-primary">
                    {name}
                </h3>
                {description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {description}
                    </p>
                )}
            </div>
        </Link>
    )
}
