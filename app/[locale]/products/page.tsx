import { Suspense } from "react"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { PageTransition } from "@/components/ui/PageTransition"
import { ProductsContent } from "@/components/pages/Products/ProductsContent"

interface Props {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "productsPage" })

  return {
    title: `${t("title")}`,
    description: t("subtitle"),
    openGraph: {
      title: `${t("title")}`,
      description: t("subtitle"),
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("title")}`,
      description: t("subtitle"),
    },
  }
}

export default function ProductsPage() {
  return (
    <PageTransition>
      <Suspense fallback={null}>
        <ProductsContent />
      </Suspense>
    </PageTransition>
  )
}