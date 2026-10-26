"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { FaWhatsapp } from "react-icons/fa"
import { Share2, Check, ChevronRight } from "lucide-react"
import type { Product, ProductTranslation, ProductVariant } from "@/types/Product.types"

const PHONE_WA = "201006255355"

interface ProductInfoProps {
  product: Product
  translation?: ProductTranslation
  collection?: {
    id: number
    name: string
  } | null
}

export function ProductInfo({ product, translation, collection }: ProductInfoProps) {
  const t = useTranslations("productDetail")
  const locale = useLocale()
  const isRtl = locale === "ar"

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  )
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const name = translation?.name || product.slug
  const smallDesc = translation?.smallDescription || ""
  const height = translation?.height
  const width = translation?.width
  const weight = selectedVariant?.weight ?? product.weight
  const warranty = product.warranty

  const handleCopyLink = async () => {
    try {
      const urlToCopy = currentUrl || (typeof window !== "undefined" ? window.location.href : "")
      if (urlToCopy) {
        await navigator.clipboard.writeText(urlToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch { }
  }

  const getFullUrl = () => {
    if (currentUrl) return currentUrl
    if (typeof window !== "undefined" && window.location.href) return window.location.href
    return ""
  }

  const buildWhatsAppMessage = (url: string) => {
    return encodeURIComponent(
      isRtl
        ? `مرحباً، أود الاستفسار عن منتج: "${name}"${url ? `\nالرابط: ${url}` : ""}`
        : `Hello, I'm inquiring about the product: "${name}"${url ? `\nLink: ${url}` : ""}`
    )
  }

  const whatsappUrl = `https://wa.me/${PHONE_WA}?text=${buildWhatsAppMessage("")}`;

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const liveUrl = typeof window !== "undefined" ? window.location.href : currentUrl
    e.currentTarget.href = `https://wa.me/${PHONE_WA}?text=${buildWhatsAppMessage(liveUrl)}`
  }

  const specs = [
    ...(width || height
      ? [{ label: t("dimensions"), value: `${width ?? ""}${width && height ? " × " : ""}${height ?? ""} ${t("cm")}` }]
      : []),
    ...(weight ? [{ label: t("weight"), value: `${weight} ${t("kg")}` }] : []),
    ...(warranty && warranty > 0
      ? [{ label: isRtl ? "الضمان" : "Warranty", value: t("warranty", { count: warranty }) }]
      : []),
  ]

  const isActive = product.status === "active"

  return (
    <div className="flex flex-col gap-7">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${isActive
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                : "border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
              }`}
          >
            <span
              className={`size-1.5 shrink-0 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-500"
                }`}
            />
            {isActive ? t("inStock") : t("outOfStock")}
          </span>

          {product.isBestSeller && (
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400">
              {t("bestSeller")}
            </span>
          )}

          {product.isCustomizable && (
            <span className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900/60 dark:text-stone-400">
              {t("customizable")}
            </span>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-tight">
          {name}
        </h1>

        {collection && (
          <Link
            href={`/${locale}/products?collectionId=${collection.id}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-amber-700 dark:hover:text-amber-400 transition-colors group"
          >
            <span>{collection.name}</span>
            <ChevronRight className={`size-3.5 transition-transform group-hover:translate-x-0.5 ${isRtl ? "rotate-180" : ""}`} />
          </Link>
        )}

        {smallDesc && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
            {smallDesc}
          </p>
        )}
      </div>

      <div className="h-px bg-border/50" />
      {specs.length > 0 && (
        <dl className="flex flex-wrap gap-x-6 gap-y-3">
          {specs.map((spec, i) => (
            <div key={i} className="flex flex-col min-w-[80px]">
              <dt className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                {spec.label}
              </dt>
              <dd className="text-sm font-semibold text-foreground">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {product.variants && product.variants.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t("variants")}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v, i) => {
              const isSelected = selectedVariant?.id === v.id || (!selectedVariant && i === 0)
              return (
                <button
                  key={v.id ?? i}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150 cursor-pointer ${isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-transparent text-foreground hover:border-foreground/40"
                    }`}
                >
                  {v.size || `${t("selectVariant")} ${i + 1}`}
                  {v.weight && (
                    <span className="text-[11px] opacity-60 ms-1.5">
                      · {v.weight} {t("kg")}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
      <div className="space-y-2 pt-1">
        <a
          href={whatsappUrl}
          onClick={handleWhatsAppClick}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-600/15 transition-colors hover:bg-emerald-700 active:bg-emerald-800 sm:py-3"
        >
          <FaWhatsapp className="size-4 shrink-0" />
          <span>{t("contactWhatsApp")}</span>
        </a>

        <button
          type="button"
          onClick={handleCopyLink}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
        >
          {copied ? (
            <>
              <Check className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400">
                {t("copied")}
              </span>
            </>
          ) : (
            <>
              <Share2 className="size-3.5 shrink-0 text-muted-foreground" />
              <span>{t("copyLink")}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
