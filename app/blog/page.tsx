'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import { ArrowRight, Clock, Search, X } from 'lucide-react';
import Image from 'next/image';
import { articles } from '@/data/blog-data';
import type { Article } from '@/data/blog-data';

const categories = [
  'All', 'Speech Therapy', 'Occupational Therapy',
  'ABA Therapy', 'Physiotherapy', 'Parent Guide', 'Education',
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <motion.a
      variants={fadeUp}
      href={`/blog/${article.slug}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <p className="text-[11px] font-semibold text-primary/80 flex items-center gap-1.5">
          {article.date}
          <span className="text-gray-300">/</span>
          <span className="text-gray-400">{article.category}</span>
        </p>
        <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 group-hover:text-primary transition-colors duration-200 mt-1">
          Read More
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
      </div>
    </motion.a>
  );
}

// ─── Main Blog Page ───────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const isSearching = searchQuery.trim() !== '';
  const featured = articles.find(a => a.featured)!;

  const filtered = isSearching
    ? articles.filter(a =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : articles
      .filter(a => !a.featured)
      .filter(a => activeCategory === 'All' || a.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pt-24 pb-28 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/6 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Page Header ── */}
        <AnimatedSection className="mb-16">
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-primary inline-block" /> Blog &amp; Articles
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-bold text-gray-950 tracking-tight leading-[1.06]"
            >
              Resources for<br />every parent.
            </motion.h1>

            {/* Search */}
            <motion.div variants={fadeUp} className="relative md:w-72">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary/50 transition-colors duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ── Featured Article ── */}
        {!isSearching && (
          <AnimatedSection className="mb-14">
            <motion.a
              variants={fadeUp}
              href={`/blog/${featured.slug}`}
              className="group relative flex flex-col md:flex-row rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/25 transition-all duration-300 cursor-pointer min-h-[320px]"
            >
              {/* Image */}
              <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary z-10" />
                <Image
                  src={featured.thumbnail}
                  alt={featured.title}
                  fill
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50/80 hidden md:block" />
              </div>

              {/* Content */}
              <div className="flex-1 bg-gray-50/60 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-lg bg-primary/15 text-primary border border-primary/20">
                    Featured
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] px-3 py-1 rounded-lg bg-gray-100 text-gray-500 border border-gray-200">
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-950 leading-snug mb-4 group-hover:text-primary/90 transition-colors duration-200">
                  {featured.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-md">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-5 text-[11px] text-gray-400 font-medium mb-6">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} /> {featured.readTime}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-3 transition-all duration-200">
                  Read Article <ArrowRight size={13} />
                </span>
              </div>
            </motion.a>
          </AnimatedSection>
        )}

        {/* ── Category Filter ── */}
        {!isSearching && (
          <AnimatedSection className="mb-10">
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] font-bold uppercase tracking-[0.14em] px-4 py-2 rounded-xl border transition-all duration-200 ${activeCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-primary/30 hover:text-gray-700'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </AnimatedSection>
        )}

        {/* ── Search result label ── */}
        {isSearching && (
          <div className="mb-8 flex items-center gap-3">
            <p className="text-sm text-gray-500">
              <span className="font-bold text-gray-900">{filtered.length}</span>
              {' '}result{filtered.length !== 1 ? 's' : ''} for{' '}
              <span className="font-bold text-primary">&quot;{searchQuery}&quot;</span>
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1"
            >
              <X size={12} /> Clear
            </button>
          </div>
        )}

        {/* ── Articles Grid ── */}
        {filtered.length > 0 ? (
          <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </AnimatedSection>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <p className="text-gray-400 text-sm font-medium">
              No articles found for &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 text-xs font-bold text-primary hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}