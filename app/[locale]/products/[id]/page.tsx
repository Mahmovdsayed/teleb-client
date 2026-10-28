import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageTransition } from "@/components/ui/PageTransition"
import { ProductDetailContent } from "@/components/pages/ProductDetail/ProductDetailContent"
import { ProductDetailSkeleton } from "@/components/skeleton"
import { getProductById } from "@/services/product"

interface Props {
  params: Promise<{
    locale: "ar" | "en"
    id: string
  }>
}

export const instant = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params

  try {
    const product = await getProductById(id, locale)
    if (!product) {
      return {
        title: locale === "ar" ? "المنتج غير موجود" : "Product Not Found",
      }
    }

    const translation =
      product.translations?.find((tr) => tr.locale === locale) ||
      product.translations?.[0]

    const title = translation?.metaTitle || `${translation?.name || product.slug}`
    const description =
      translation?.metaDescription ||
      translation?.smallDescription ||
      translation?.description ||
      (locale === "ar" ? "أثاث منزلي عصري فاخر" : "Luxury modern furniture")

    const mainImage =
      product.images?.find((img) => img.isMain)?.url ||
      product.images?.[0]?.url

    return {
      title,
      description,
      keywords: translation?.metaKeywords ?? undefined,
      openGraph: {
        title,
        description,
        type: "article",
        locale: locale === "ar" ? "ar_EG" : "en_US",
        images: mainImage ? [{ url: mainImage, alt: translation?.name }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: mainImage ? [mainImage] : undefined,
      },
    }
  } catch {
    return {
      title: locale === "ar" ? "تفاصيل المنتج" : "Product Details",
    }
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id, locale } = await params

  let product = null
  try {
    product = await getProductById(id, locale)
  } catch {
    product = null
  }

  if (!product) {
    notFound()
  }

  return (
    <PageTransition>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailContent initialProduct={product} productId={id} />
      </Suspense>
    </PageTransition>
  )
}
