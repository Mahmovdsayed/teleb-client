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

const SPEED_MOBILE = 45
const SPEED_DESKTOP = 60

export default function CollectionsCarousel({ collections: initialCollections }: CollectionsCarouselProps) {
    const t = useTranslations("home")
    const locale = useLocale()
    const isAr = locale === "ar"

    const [hoveredId, setHoveredId] = useState<string | number | null>(null)
    const [copies, setCopies] = useState(2) // computed from real widths below
    const trackRef = useRef<HTMLDivElement>(null)
    const tweenRef = useRef<gsap.core.Tween | null>(null)

    const { data: fetchedCollections = [], isLoading } = useAppQuery<Collection[]>({
        queryKey: ["collections"],
        queryFn: getCollections,
        enabled: !initialCollections || initialCollections.length === 0,
    })

    const collections = (initialCollections && initialCollections.length > 0)
        ? initialCollections
        : fetchedCollections

    const displayCollections: CarouselItem[] = useMemo(() => {
        return collections.map((col) => ({
            id: col.id,
            iconName: col.icon || "box",
            title: isAr ? col.arName : col.enName,
            productCount: undefined,
        }))
    }, [collections, isAr])

    useEffect(() => {
        const track = trackRef.current
        const firstGroup = track?.firstElementChild as HTMLElement | null
        const viewportEl = track?.parentElement
        if (!track || !firstGroup || !viewportEl || displayCollections.length === 0) return

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const isDesktop = () => window.matchMedia("(min-width: 768px)").matches
        let raf = 0

        const build = () => {
            const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0
            const distance = firstGroup.offsetWidth + gap
            if (distance <= 0) return

            const needed = Math.max(2, Math.ceil(viewportEl.offsetWidth / distance) + 1)
            setCopies((prev) => (prev === needed ? prev : needed))

            const old = tweenRef.current
            const progress = old?.progress() ?? 0
            const wasPaused = old?.paused() ?? false
            old?.kill()
            gsap.set(track, { x: 0 })

            const speed = isDesktop() ? SPEED_DESKTOP : SPEED_MOBILE
            const tween = gsap.fromTo(
                track,
                { x: 0 },
                {
                    x: -distance,
                    repeat: -1,
                    duration: distance / speed,
                    ease: "none",
                    force3D: true,
                }
            )
            tween.progress(progress)
            if (wasPaused || reduceMotion) tween.pause()
            tweenRef.current = tween
        }

        const scheduleBuild = () => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(build)
        }

        build()

        const ro = new ResizeObserver(scheduleBuild)
        ro.observe(firstGroup)
        ro.observe(viewportEl)

        const pause = () => tweenRef.current?.pause()
        const play = () => { if (!reduceMotion) tweenRef.current?.play() }

        const onPointerEnter = (e: PointerEvent) => { if (e.pointerType === "mouse") pause() }
        const onPointerLeave = (e: PointerEvent) => { if (e.pointerType === "mouse") play() }

        track.addEventListener("pointerenter", onPointerEnter)
        track.addEventListener("pointerleave", onPointerLeave)
        track.addEventListener("touchstart", pause, { passive: true })
        track.addEventListener("touchend", play, { passive: true })
        track.addEventListener("touchcancel", play, { passive: true })

        return () => {
            cancelAnimationFrame(raf)
            tweenRef.current?.kill()
            tweenRef.current = null
            ro.disconnect()
            track.removeEventListener("pointerenter", onPointerEnter)
            track.removeEventListener("pointerleave", onPointerLeave)
            track.removeEventListener("touchstart", pause)
            track.removeEventListener("touchend", play)
            track.removeEventListener("touchcancel", play)
        }
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
                    className="flex w-max flex-nowrap gap-3 sm:gap-4 py-4 will-change-transform"
                >
                    {Array.from({ length: copies }).map((_, i) => (
                        <CardGroup
                            key={i}
                            items={displayCollections}
                            hoveredId={hoveredId}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}