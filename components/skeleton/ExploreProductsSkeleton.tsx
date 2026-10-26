import { Skeleton } from "@/components/ui/skeleton"
import { ProductCardSkeleton } from "./ProductCardSkeleton"

export function ExploreProductsSkeleton() {
    return (
        <section className="w-full py-8 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-4 md:mb-6 gap-4">
                    <div className="space-y-1.5">
                        <Skeleton className="h-3 w-28 rounded" />
                        <Skeleton className="h-6 w-44 rounded" />
                    </div>
                    <Skeleton className="h-4 w-20 rounded hidden sm:block" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
