import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { PageTransition } from "@/components/ui/PageTransition"
import { ProductDetailContent } from "@/components/pages/ProductDetail/ProductDetailContent"
import { ProductDetailSkeleton } from "@/components/skeleton"
import { getProductById, getProductBySlug } from "@/services/product"
import { absoluteUrl, productPath } from "@/lib/seo/site"

interface Props {
  params: Promise<{
    locale: "ar" | "en"
    id: string
  }>
}

export const instant = false

const NUMERIC_ID = /^\d+$/

async function resolveProduct(segment: string, locale: "ar" | "en") {
  if (NUMERIC_ID.test(segment)) return getProductById(segment, locale)
  return getProductBySlug(decodeURIComponent(segment), locale)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params

  try {
    const product = await resolveProduct(id, locale)
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

    const path = productPath(product)
    const canonical = absoluteUrl(`/${locale}${path}`)
    const alternates = {
      canonical,
      languages: {
        en: absoluteUrl(`/en${path}`),
        ar: absoluteUrl(`/ar${path}`),
        "x-default": absoluteUrl(`/en${path}`),
      },
    }

    return {
      title,
      description,
      keywords: translation?.metaKeywords ?? undefined,
      alternates,
      openGraph: {
        title,
        description,
        type: "article",
        url: canonical,
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
    product = await resolveProduct(id, locale)
  } catch {
    product = null
  }

  if (!product) {
    notFound()
  }

  const canonicalPath = `/${locale}${productPath(product)}`
  if (canonicalPath !== `/${locale}/products/${id}`) {
    permanentRedirect(canonicalPath)
  }

  return (
    <PageTransition>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailContent initialProduct={product} productId={id} />
      </Suspense>
    </PageTransition>
  )
}
