import { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo/site"

const siteUrl = SITE_URL

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
  }
}
