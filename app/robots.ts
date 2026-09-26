import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // Block only private or internal routes from being indexed
                disallow: [
                    "/api/",
                    "/admin/",
                ],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
