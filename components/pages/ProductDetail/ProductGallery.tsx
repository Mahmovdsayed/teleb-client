"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import type { ProductImage } from "@/types/Product.types"

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
  isBestSeller?: boolean
  isCustomizable?: boolean
  status: "active" | "inactive"
  isRtl?: boolean
}

const ARROW_CLASS =
  "start-3 top-1/2 bottom-auto end-auto my-0 size-9 -translate-y-1/2 rounded-full bg-background/80 text-foreground backdrop-blur-sm shadow-sm transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-background hover:scale-105"

const NEXT_ARROW_CLASS =
  "end-3 start-auto top-1/2 bottom-auto my-0 size-9 -translate-y-1/2 rounded-full bg-background/80 text-foreground backdrop-blur-sm shadow-sm transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-background hover:scale-105"

function GallerySlide({
  src,
  alt,
  priority,
  ariaLabel,
  onOpen,
}: {
  src?: string
  alt: string
  priority?: boolean
  ariaLabel: string
  onOpen: () => void
}) {
  return (
    <div
      className="relative aspect-square sm:aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted/30 border border-border/40 cursor-zoom-in"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/40">
          <span className="text-5xl opacity-20">🪑</span>
        </div>
      )}
    </div>
  )
}

export function ProductGallery({
  images,
  productName,
  isRtl = false,
}: ProductGalleryProps) {
  const t = useTranslations("productDetail")

  const sortedImages =
    images.length > 0
      ? [...images].sort((a, b) => {
        if (a.isMain && !b.isMain) return -1
        if (!a.isMain && b.isMain) return 1
        return (a.order ?? 0) - (b.order ?? 0)
      })
      : []

  const hasMultiple = sortedImages.length > 1

  const [api, setApi] = useState<CarouselApi>()
  const [index, setIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const activeIndex =
    sortedImages.length > 0 ? Math.min(index, sortedImages.length - 1) : 0
  const activeImage = sortedImages[activeIndex]?.url

  useEffect(() => {
    if (!api) return

    const sync = () => setIndex(api.selectedScrollSnap())
    sync()

    api.on("select", sync)
    api.on("reInit", sync)

    return () => {
      api.off("select", sync)
      api.off("reInit", sync)
    }
  }, [api])

  const scrollTo = useCallback(
    (target: number) => {
      if (api) {
        api.scrollTo(target)
      } else {
        setIndex(target)
      }
    },
    [api]
  )

  const handlePrev = useCallback(() => {
    if (api) {
      api.scrollPrev()
      return
    }
    setIndex((prev) => (prev === 0 ? sortedImages.length - 1 : prev - 1))
  }, [api, sortedImages.length])

  const handleNext = useCallback(() => {
    if (api) {
      api.scrollNext()
      return
    }
    setIndex((prev) => (prev === sortedImages.length - 1 ? 0 : prev + 1))
  }, [api, sortedImages.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false)
      if (!hasMultiple) return
      if (e.key === "ArrowLeft") isRtl ? handleNext() : handlePrev()
      if (e.key === "ArrowRight") isRtl ? handlePrev() : handleNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handlePrev, handleNext, hasMultiple, isRtl])

  return (
    <div className="flex flex-col gap-3">
      {hasMultiple ? (
        <Carousel
          setApi={setApi}
          direction={isRtl ? "rtl" : "ltr"}
          keyboard={false}
          opts={{ loop: true, align: "start", containScroll: "trimSnaps" }}
          className="w-full group"
        >
          <CarouselContent className="ms-0">
            {sortedImages.map((img, idx) => (
              <CarouselItem key={img.id ?? idx} className="basis-full ps-0">
                <GallerySlide
                  src={img.url}
                  alt={`${productName} – ${idx + 1}`}
                  priority={idx === 0}
                  ariaLabel={`${t("inStock")} - ${productName}`}
                  onOpen={() => setIsLightboxOpen(true)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious aria-label="Previous image" className={ARROW_CLASS} />
          <CarouselNext aria-label="Next image" className={NEXT_ARROW_CLASS} />

          <div className="absolute bottom-3.5 start-3.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/30 text-white backdrop-blur-sm">
            {activeIndex + 1} / {sortedImages.length}
          </div>

          <div className="absolute bottom-3.5 end-3.5 p-2 rounded-lg bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <ZoomIn className="size-4" />
          </div>
        </Carousel>
      ) : (
        <GallerySlide
          src={activeImage}
          alt={`${productName} – 1`}
          priority
          ariaLabel={`${t("inStock")} - ${productName}`}
          onOpen={() => activeImage && setIsLightboxOpen(true)}
        />
      )}

      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {sortedImages.map((img, idx) => (
            <button
              key={img.id ?? idx}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative size-16 sm:size-[72px] rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer ${activeIndex === idx
                ? "border-foreground shadow-sm"
                : "border-transparent opacity-55 hover:opacity-85 hover:border-border"
                }`}
            >
              <Image
                src={img.url}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image preview"
          className="fixed inset-0 z-50 bg-black/96 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen"
            className="absolute top-5 end-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
          >
            <X className="size-5" />
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                aria-label="Previous image"
                className="absolute start-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
              >
                <ChevronLeft className={`size-6 ${isRtl ? "rotate-180" : ""}`} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                aria-label="Next image"
                className="absolute end-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
              >
                <ChevronRight className={`size-6 ${isRtl ? "rotate-180" : ""}`} />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt={productName}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {hasMultiple && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {sortedImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    scrollTo(idx)
                  }}
                  aria-label={`Go to image ${idx + 1}`}
                  className={`h-1 rounded-full transition-all duration-200 cursor-pointer ${activeIndex === idx ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
