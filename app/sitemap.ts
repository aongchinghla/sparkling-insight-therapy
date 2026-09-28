import type { MetadataRoute } from "next";
import { articles } from "@/data/blog-data";
import { services } from "@/data/services";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteUrl;
    const today = new Date("2026-09-29");

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/team`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/career`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/premium-videos`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    const blogRoutes: MetadataRoute.Sitemap = articles
        .filter((article) => article?.slug)
        .map((article) => ({
            url: `${baseUrl}/blog/${article.slug}`,
            lastModified: new Date(article.date),
            changeFrequency: "monthly",
            priority: 0.7,
        }));

    const serviceRoutes: MetadataRoute.Sitemap = services
        .filter((service) => service?.slug)
        .map((service) => ({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.85,
        }));

    return [...new Set([...staticRoutes, ...serviceRoutes, ...blogRoutes].map((route) => route.url))]
        .map((url) => {
            const match = [...staticRoutes, ...serviceRoutes, ...blogRoutes].find((route) => route.url === url);
            return match ?? { url, lastModified: today };
        });
}
