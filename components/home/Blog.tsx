'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { articles } from '@/data/blog-data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const previewArticles = articles.slice(0, 4);
const featured = previewArticles[0];
const rest = previewArticles.slice(1, 4);

export default function Blog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });

  return (
    <section ref={ref} className="py-14 bg-gray-950 relative overflow-hidden">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div>
            <motion.p variants={fadeUp}
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> Blog &amp; Articles
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="text-5xl font-bold text-white tracking-tight leading-tight">
              Resources for every parent.
            </motion.h2>
          </div>

          {/* Right: count + CTA */}
          <motion.div variants={fadeUp} className="flex items-center gap-5 self-end pb-1">
            <span className="text-[11px] font-medium text-white/25">
              {articles.length} articles
            </span>
            <Link href="/blog"
              className="group inline-flex items-center gap-2 bg-white/6 hover:bg-primary border border-white/10 hover:border-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-200">
              View All
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Cards Grid ── */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 items-stretch"
        >
          {/* ── Left: Featured — image fills card, text overlaid ── */}
          {featured && (
            <motion.a
              variants={fadeUp}
              href={`/blog/${featured.slug}`}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer min-h-[360px] flex flex-col justify-end"
            >
              {/* Full-bleed image */}
              <Image
                src={featured.thumbnail}
                alt={featured.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/40 to-transparent" />
              {/* Primary top bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Text content over image */}
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-lg bg-primary/20 text-primary border border-primary/25">
                    {featured.category}
                  </span>
                  <span className="text-[10px] text-white/40 flex items-center gap-1">
                    <Clock size={9} /> {featured.readTime}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug group-hover:text-primary/90 transition-colors duration-200 mb-2">
                  {featured.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed line-clamp-2 mb-4">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/30">{featured.date}</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all duration-200">
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.a>
          )}

          {/* ── Right: 3 stacked cards ── */}
          <div className="flex flex-col gap-3">
            {rest.map((article) => (
              <motion.a
                key={article.slug}
                variants={fadeUp}
                href={`/blog/${article.slug}`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.18 }}
                className="group flex bg-white/4 border border-white/8 rounded-xl overflow-hidden hover:border-primary/35 hover:bg-white/7 transition-all duration-200 cursor-pointer flex-1"
              >
                {/* Thumbnail */}
                <div className="relative w-[130px] flex-shrink-0 overflow-hidden">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-950/20" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-4 py-3.5 gap-1.5 min-w-0 border-l border-white/5">
                  <p className="text-[10px] font-semibold text-primary/70 flex items-center gap-1.5 truncate">
                    <span className="text-white/30">{article.category}</span>
                    <span className="text-white/15">·</span>
                    <Clock size={9} className="text-white/25 flex-shrink-0" />
                    <span className="text-white/25">{article.readTime}</span>
                  </p>
                  <h3 className="text-xs font-bold text-white/90 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-white/30 group-hover:text-primary transition-colors duration-200 mt-auto">
                    Read More
                    <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
