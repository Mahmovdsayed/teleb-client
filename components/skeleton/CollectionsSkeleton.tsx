import { Skeleton } from "@/components/ui/skeleton"

export function CollectionsSkeleton() {
    return (
        <section className="w-full pt-4 pb-8 md:pt-6 md:pb-12 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-3 md:mb-4">
                <div className="space-y-1.5">
                    <Skeleton className="h-3 w-28 rounded" />
                    <Skeleton className="h-6 w-44 rounded" />
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="flex gap-3 sm:gap-4 py-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="w-28 h-26 sm:w-36 sm:h-32 md:w-48 md:h-40 shrink-0 rounded-xl"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
