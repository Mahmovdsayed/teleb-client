import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactPage from "@/components/pages/Contact/ContactPage";
import { PageTransition } from "@/components/ui/PageTransition";

const siteUrl = "https://www.teleb-furniture.com";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "contact" });
    const brand = locale === "ar" ? "طلب للأثاث" : "Teleb Furniture";
    const title = `${t("title")} | ${brand}`;
    const description = t("description");
    const ogLocale = locale === "ar" ? "ar_EG" : "en_US";
    const canonical = locale === "ar" ? `${siteUrl}/ar/contact` : `${siteUrl}/contact`;

    return {
        title,
        description,
        alternates: {
            canonical,
            languages: {
                en: `${siteUrl}/contact`,
                ar: `${siteUrl}/ar/contact`,
            },
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: brand,
            locale: ogLocale,
            type: "website",
            images: [
                {
                    url: `${siteUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${siteUrl}/og-image.png`],
        },
    };
}

const page = () => {
    return (
        <>
            <PageTransition>
                <ContactPage />
            </PageTransition>
        </>
    );
};

export default page;