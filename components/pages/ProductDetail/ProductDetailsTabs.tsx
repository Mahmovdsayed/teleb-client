"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { CheckCircle2 } from "lucide-react"
import type { Product, ProductTranslation } from "@/types/Product.types"

interface ProductDetailsTabsProps {
  product: Product
  translation?: ProductTranslation
  collectionName?: string
}

export function ProductDetailsTabs({
  product,
  translation,
  collectionName,
}: ProductDetailsTabsProps) {
  const t = useTranslations("productDetail")
  const locale = useLocale()
  const isRtl = locale === "ar"

  const materials = translation?.materials ?? []
  const features = translation?.features ?? []
  const description = translation?.description || translation?.smallDescription

  const hasMaterials = materials.length > 0
  const hasFeatures = features.length > 0
  const hasSpecs = Boolean(
    translation?.width ||
    translation?.height ||
    product.weight ||
    (product.warranty && product.warranty > 0) ||
    product.variants?.length
  )

  const tabs = [
    ...(description ? [{ id: "description", label: t("description") }] : []),
    ...(hasMaterials ? [{ id: "materials", label: t("materials") }] : []),
    ...(hasFeatures ? [{ id: "features", label: t("features") }] : []),
    ...(hasSpecs ? [{ id: "specs", label: t("specifications") }] : []),
  ]

  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || "description")
  if (tabs.length === 0) return null
  const hasValue = (value: unknown) =>
    value !== null && value !== undefined && value !== "";

  return (
    <div className="mt-14 pt-10 border-t border-border/50">
      <div className="flex items-center gap-0 overflow-x-auto scrollbar-none border-b border-border/50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-3 text-xs md:text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-t-sm ${isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-foreground rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      <div className="py-8 max-w-3xl">
        {activeTab === "description" && description && (
          <div className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {description}
          </div>
        )}

        {activeTab === "materials" && hasMaterials && (
          <ul className="space-y-2">
            {materials.map((mat, i) => (
              <li key={i} className="flex items-center gap-3 text-xs md:text-sm text-foreground">
                <span className="size-1.5 rounded-full bg-amber-600 dark:bg-amber-400 shrink-0" />
                {mat.name}
              </li>
            ))}
          </ul>
        )}

        {activeTab === "features" && hasFeatures && (
          <ul className="space-y-3">
            {features.map((feat, i) => (
              <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-foreground">
                <CheckCircle2 className="size-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                {feat.name}
              </li>
            ))}
          </ul>
        )}

        {activeTab === "specs" && (
          <table className="w-full text-xs md:text-sm border-collapse">
            <tbody>
              {collectionName && (
                <tr className="border-b border-border/40">
                  <td className="py-2 md:py-3 pe-6 text-muted-foreground font-medium w-1/3 align-top">
                    {t("products")}
                  </td>
                  <td className="py-2 md:py-3 text-foreground font-medium">{collectionName}</td>
                </tr>
              )}
              {hasValue(translation?.width) && (
                <tr className="border-b border-border/40">
                  <td className="py-2 md:py-3 pe-6 text-muted-foreground font-medium align-top">
                    {t("width")}
                  </td>
                  <td className="py-2 md:py-3 text-foreground font-medium">
                    {translation?.width} {t("cm")}
                  </td>
                </tr>
              )}
              {hasValue(translation?.height) && (
                <tr className="border-b border-border/40">
                  <td className="py-2 md:py-3 pe-6 text-muted-foreground font-medium align-top">
                    {t("height")}
                  </td>
                  <td className="py-2 md:py-3 text-foreground font-medium">
                    {translation?.height} {t("cm")}
                  </td>
                </tr>
              )}
              {hasValue(product.weight) && (
                <tr className="border-b border-border/40">
                  <td className="py-2 md:py-3 pe-6 text-muted-foreground font-medium align-top">
                    {t("weight")}
                  </td>
                  <td className="py-2 md:py-3 text-foreground font-medium">
                    {product.weight} {t("kg")}
                  </td>
                </tr>
              )}
              {hasValue(product.warranty) && Number(product.warranty) > 0 && (
                <tr className="border-b border-border/40">
                  <td className="py-2 md:py-3 pe-6 text-muted-foreground font-medium align-top">
                    {isRtl ? "فترة الضمان" : "Warranty Period"}
                  </td>
                  <td className="py-2 md:py-3 text-foreground font-medium">
                    {t("warranty", { count: product.warranty! })}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
