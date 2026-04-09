import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/premium-videos/checkout/", "/admin"],
            },
        ],
        sitemap: "https://sparklingtherapybd.com/sitemap.xml",
        host: "https://sparklingtherapybd.com",
    };
}