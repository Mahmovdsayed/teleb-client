import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutPage from "@/components/pages/About/AboutPage";
import { PageTransition } from "@/components/ui/PageTransition";

const siteUrl = "https://www.teleb-furniture.com";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "about" });
    const title = `${t("title")}`;
    const description = t("subtitle");
    const ogLocale = locale === "ar" ? "ar_EG" : "en_US";
    const canonical = locale === "ar" ? `${siteUrl}/ar/about` : `${siteUrl}/about`;

    return {
        title,
        description,
        alternates: {
            canonical,
            languages: {
                en: `${siteUrl}/about`,
                ar: `${siteUrl}/ar/about`,
            },
        },
        openGraph: {
            title,
            description,
            url: canonical,
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
                <AboutPage />
            </PageTransition>
        </>
    );
};

export default page;