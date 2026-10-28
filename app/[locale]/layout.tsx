import type { Metadata, Viewport } from "next"
import { Cairo, Montserrat } from "next/font/google"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import Provider from "@/provider/Provider"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import "../globals.css"
import { Analytics } from '@vercel/analytics/next';

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat-family",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo-family",
  display: "swap",
})

const siteUrl = "https://www.teleb-furniture.com"
const siteName = "Teleb Furniture"

const seo = {
  en: {
    title: "Teleb Furniture - Premium Furniture in Egypt | طلب للأثاث",
    description:
      "Teleb Furniture is one of very few companies in Egypt who are designing and producing knocked down furniture. Using modern machinery has allowed Teleb Furniture to produce products with the highest quality at competitive prices, while the highly skilled craftsmen have contributed to high level of differentiation by adding the ethnic hand-made touch to different furniture items.",
    ogLocale: "en_US",
    ogAlternate: ["ar_EG"],
    ogAlt: "Teleb Furniture - Premium Furniture in Egypt",
  },
  ar: {
    title: "طلب للأثاث - أثاث فاخر في مصر | Teleb Furniture",
    description:
      "طلب للأثاث من الشركات القليلة في مصر المتخصصة في تصميم وإنتاج الأثاث القابل للفك والتركيب. بفضل الماكينات الحديثة نقدم منتجات بأعلى جودة وبأسعار تنافسية، مع لمسة يدوية مصرية مميزة يضيفها حرفيون مهرة على قطع الأثاث المختلفة.",
    ogLocale: "ar_EG",
    ogAlternate: ["en_US"],
    ogAlt: "طلب للأثاث - أثاث فاخر في مصر",
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = seo[locale === "ar" ? "ar" : "en"]

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t.title,
      template: `%s | ${siteName}`,
    },
    description: t.description,
    keywords: [
      "furniture", "أثاث", "bedroom furniture", "غرف نوم",
      "living room furniture", "غرف معيشة", "chairs", "كراسي",
      "tables", "طاولات", "Egyptian furniture", "أثاث مصري",
      "طلب للاثاث", "teleb furniture", "teleb", "furniture Egypt",
      "أثاث مصر", "modern furniture", "أثاث عصري",
    ],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "Furniture",
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      alternateLocale: [...t.ogAlternate],
      siteName,
      title: t.title,
      description: t.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t.ogAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ["/og-image.png"],
      creator: "@teleb",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon-32x32.png",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    verification: {
      google: "uSLoj4o-7L4q041L7h8dEgrQCBz7ap6t_Uoxs-XdLf4",
    },
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFBEB" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const messages = await getMessages()
  const direction = locale === "ar" ? "rtl" : "ltr"
  const t = seo[locale === "ar" ? "ar" : "en"]

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: "طلب للأثاث",
    description: t.description,
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    telephone: "+201006255355",
    priceRange: "EGP 4,000 - EGP 200,000",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },
    sameAs: [
      "https://www.facebook.com/teleb.furniture.egy",
      "https://www.instagram.com/teleb_furniture",
      "https://www.tiktok.com/@telebfurniture0",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
      postalCode: "11435",
      addressLocality: "Cairo",
      addressRegion: "Cairo Governorate",
      streetAddress: "Block no. 65, Zahraa Al-Maadi, Industrial Zone",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "29.9600",
      longitude: "31.2800",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    alternateName: ["Teleb", "طلب للأثاث", "Teleb Furniture Egypt"],
    url: siteUrl,
    inLanguage: locale === "ar" ? "ar-EG" : "en-US",
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}${locale === "ar" ? "/ar" : ""}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={cn("antialiased", montserrat.variable, cairo.variable)}
    >
      <body className="overflow-x-hidden">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider>
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            <main className="min-h-dvh">{children}</main>
            <Footer />
            <Analytics mode="production" />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}