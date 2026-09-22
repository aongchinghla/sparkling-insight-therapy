import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // Block private/non-public routes from being indexed
                disallow: [
                    "/api/",
                    "/premium-videos/checkout/",
                    "/admin/",
                ],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
