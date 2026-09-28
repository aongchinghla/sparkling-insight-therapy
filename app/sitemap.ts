import type { MetadataRoute } from "next";
import { articles } from "@/data/blog-data";
import { services } from "@/data/services";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteUrl;

    // Use actual last-modified dates so Google can accurately track content freshness.
    // Update these dates whenever you make significant changes to a page.
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            // Use the canonical non-www URL without trailing slash to avoid redirect chains
            url: `${baseUrl}`,
            lastModified: new Date("2026-09-21"),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date("2026-09-21"),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date("2026-09-21"),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/team`,
            lastModified: new Date("2026-09-21"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date("2026-09-21"),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/career`,
            lastModified: new Date("2026-09-21"),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date("2026-09-21"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/premium-videos`,
            lastModified: new Date("2026-09-21"),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    const blogRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date("2026-09-21"),
        changeFrequency: "monthly",
        priority: 0.85,
    }));

    return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
