import { MetadataRoute } from "next";

const siteUrl = "https://www.teleb-furniture.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/dashboard/", "/auth/login", "/_next/", "/admin/"],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/api/", "/dashboard/", "/auth/login", "/admin/"],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
