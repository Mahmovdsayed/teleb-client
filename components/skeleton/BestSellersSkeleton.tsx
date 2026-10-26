import { Skeleton } from "@/components/ui/skeleton"
import { ProductCardSkeleton } from "./ProductCardSkeleton"

export function BestSellersSkeleton() {
    return (
        <section className="w-full py-8 md:py-12 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-4 md:mb-6 gap-4">
                    <div className="space-y-1.5">
                        <Skeleton className="h-3 w-28 rounded" />
                        <Skeleton className="h-6 w-40 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <Skeleton className="h-9 w-9 rounded-full" />
                    </div>
                </div>
                <div className="flex gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
                        >
                            <ProductCardSkeleton />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
