"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { useTranslations, useLocale } from "next-intl"
import gsap from "gsap"

import { useAppQuery } from "@/hooks/useAppQuery"
import { getCollections } from "@/services/collection"
import type { Collection } from "@/types/Collection.types"
import { CollectionsSkeleton } from "@/components/skeleton"
import CardGroup from "./CollectionsCarousel/CardGroup"
import type { CarouselItem } from "./CollectionsCarousel/types"

interface CollectionsCarouselProps {
    collections?: Collection[]
}

export default function CollectionsCarousel({ collections: initialCollections }: CollectionsCarouselProps) {
    const t = useTranslations("home")
    const locale = useLocale()
    const isAr = locale === "ar"

    const [hoveredId, setHoveredId] = useState<string | number | null>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const tweenRef = useRef<gsap.core.Tween | null>(null)

    const { data: fetchedCollections = [], isLoading } = useAppQuery<Collection[]>({
        queryKey: ["collections"],
        queryFn: getCollections,
        // enabled: !initialCollections || initialCollections.length === 0,
    })

    const collections = (initialCollections && initialCollections.length > 0)
        ? initialCollections
        : fetchedCollections

    const displayCollections: CarouselItem[] = useMemo(() => {
        return collections.map((col) => {
            return {
                id: col.id,
                iconName: col.icon || "box",
                title: isAr ? col.arName : col.enName,
                productCount: undefined,
            }
        })
    }, [collections, isAr])

    useEffect(() => {
        const track = trackRef.current
        if (!track || displayCollections.length === 0) return

        gsap.ticker.lagSmoothing(0)

        const ctx = gsap.context(() => {
            const tween = gsap.to(track, {
                xPercent: -50,
                repeat: -1,
                duration: Math.max(25, displayCollections.length * 3),
                ease: "none",
                force3D: true,
            })
            tweenRef.current = tween

            const onEnter = () => tween.pause()
            const onLeave = () => tween.play()

            track.addEventListener("mouseenter", onEnter)
            track.addEventListener("mouseleave", onLeave)
            track.addEventListener("touchstart", onEnter, { passive: true })
            track.addEventListener("touchend", onLeave, { passive: true })

            return () => {
                track.removeEventListener("mouseenter", onEnter)
                track.removeEventListener("mouseleave", onLeave)
                track.removeEventListener("touchstart", onEnter)
                track.removeEventListener("touchend", onLeave)
                tween.kill()
            }
        })

        return () => ctx.revert()
    }, [displayCollections.length])

    if (isLoading && displayCollections.length === 0) {
        return <CollectionsSkeleton />
    }

    if (displayCollections.length === 0) return null

    return (
        <section className="w-full pt-4 pb-8 md:pt-6 md:pb-12 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-3 md:mb-4">
                <div>
                    <span className="text-[11px] md:text-xs font-semibold tracking-tight uppercase text-amber-700 dark:text-amber-400">
                        {t("featuredSubtitle")}
                    </span>
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-foreground mt-0.5">
                        {t("featuredCollections")}
                    </h2>
                </div>
            </div>

            <div className="relative container mx-auto w-full overflow-hidden" dir="ltr">
                <div className="absolute inset-y-0 left-0 w-16 md:w-36 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 md:w-36 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

                <div
                    ref={trackRef}
                    className="flex w-max flex-nowrap gap-3 sm:gap-4 py-4 [will-change:transform] [transform:translate3d(0,0,0)] [backface-visibility:hidden]"
                    style={{ transform: "translate3d(0,0,0)", WebkitBackfaceVisibility: "hidden" }}
                >
                    <CardGroup
                        items={displayCollections}
                        hoveredId={hoveredId}
                        onHover={setHoveredId}
                    />
                    <CardGroup
                        items={displayCollections}
                        hoveredId={hoveredId}
                        onHover={setHoveredId}
                    />
                </div>
            </div>
        </section>
    )
}
