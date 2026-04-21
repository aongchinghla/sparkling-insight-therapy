import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { articles } from '@/data/blog-data';
import type { BlogContent } from '@/data/blog-data';
import BlogBottomCTA from '@/components/ui/BlogBottomCTA';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/site';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: [
      article.title,
      article.category,
      'Sparkling Insight Therapy Point',
      'child therapy blog',
      'parent resources',
      'child development articles',
    ],
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.sparklingtherapybd.com/blog/${article.slug}`,
      type: 'article',
      publishedTime: new Date(article.date).toISOString(),
      images: [
        {
          url: article.thumbnail,
          alt: article.title,
        },
      ],
      siteName: 'Sparkling Insight Therapy Point',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.thumbnail],
    },
  };
}

// ─── Content renderer ──────────────────────────────────────────────────────────
function RenderBlock({ block }: { block: BlogContent }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-gray-600 leading-relaxed text-base mb-6">
          {block.text}
        </p>
      );
    case 'heading':
      return (
        <h2 className="text-xl font-bold text-gray-950 mt-10 mb-4 tracking-tight">
          {block.text}
        </h2>
      );
    case 'subheading':
      return (
        <h3 className="text-base font-bold text-gray-800 mt-6 mb-3">
          {block.text}
        </h3>
      );
    case 'list':
      return (
        <ul className="mb-6 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'tip':
      return (
        <div className="my-8 border-l-4 border-primary bg-primary/4 rounded-r-xl px-6 py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-2">Tip</p>
          <p className="text-sm text-gray-700 leading-relaxed">{block.text}</p>
        </div>
      );
    case 'quote':
      return (
        <blockquote className="my-8 relative bg-gray-950 rounded-2xl px-8 py-7 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
          <p className="text-white/80 text-base leading-relaxed italic mb-3">&quot;{block.text}&quot;</p>
          {block.author && (
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/70">
              — {block.author}
            </p>
          )}
        </blockquote>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-24 pb-28 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: article.title, path: `/blog/${article.slug}` },
            ]),
          ),
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16">
          <article>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gray-400 hover:text-gray-900 transition-colors duration-200 mb-10"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/15">
                {article.category}
              </span>
              <span className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <Clock size={11} /> {article.readTime}
              </span>
              <span className="text-[11px] text-gray-400">{article.date}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-950 leading-tight tracking-tight mb-8">
              {article.title}
            </h1>

            <div className="relative aspect-[16/7] rounded-2xl overflow-hidden mb-10">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary z-10" />
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                priority
              />
            </div>

            <div>
              {article.content.map((block, i) => (
                <RenderBlock key={i} block={block} />
              ))}
            </div>

            <BlogBottomCTA />
          </article>

          <aside className="self-start sticky top-28 space-y-6">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-4 flex items-center gap-2">
                <span className="w-3 h-px bg-primary" /> Written by
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">SI</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Sparkling Insight</p>
                  <p className="text-[11px] text-gray-400">{article.category} Team</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our clinical team shares evidence-based guidance to help families support their children at every stage.
              </p>
            </div>

            {related.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-5 flex items-center gap-2">
                  <Tag size={10} /> Related Articles
                </p>
                <div className="space-y-4">
                  {related.map((r) => (
                    <a
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group flex gap-3 items-start hover:opacity-80 transition-opacity duration-200"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={r.thumbnail} alt={r.title} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors duration-200 leading-snug">
                          {r.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">{r.date}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/blog"
              className="group flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-primary/30 rounded-xl py-3 text-xs font-bold text-gray-500 hover:text-primary transition-all duration-200"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              All Articles
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
