import { Skeleton } from "@/components/ui/skeleton"

export function BannerSkeleton() {
    return (
        <section className="w-full">
            <div className="container mx-auto px-2 pt-4 pb-1 sm:px-4 sm:pt-6 sm:pb-2 lg:px-6">
                <Skeleton className="w-full aspect-[21/9] md:aspect-[21/7] max-h-[480px] rounded-3xl" />
            </div>
        </section>
    )
}
