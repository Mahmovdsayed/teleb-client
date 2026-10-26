import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`space-y-2.5 ${className}`}>
            <Skeleton className="aspect-4/3 w-full rounded-lg" />
            <div className="space-y-1.5 pt-1">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
            </div>
        </div>
    )
}
