// app/not-found.tsx

import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Sparkling Insight Therapy Point',
};
import Link from 'next/link';
import { ArrowRight, Home, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative min-h-screen pt-[91px] pb-10 flex items-center justify-center overflow-hidden bg-white">
      {/* Primary top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary z-20" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-[-5%] w-96 h-96 bg-primary/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">

        {/* 404 number */}
        <div className="relative inline-block mb-8">
          <p className="text-[10rem] md:text-[14rem] font-bold leading-none text-gray-950 select-none"
            style={{ opacity: 0.04 }}>
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gray-950 rounded-2xl px-6 py-3 border border-white/5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary flex items-center gap-2">
                <span className="w-4 h-px bg-primary inline-block" />
                Page Not Found
                <span className="w-4 h-px bg-primary inline-block" />
              </p>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-[1.08] mb-5">
          Oops! This page<br />
          <span className="text-primary">doesn&apos;t exist.</span>
        </h1>

        <p className="text-sm text-gray-500 leading-relaxed mb-10 max-w-md mx-auto">
          The page you&apos;re looking for may have been moved or removed. Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-950 hover:bg-primary text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
          >
            <Home size={15} />
            Back to Home
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
          >
            <Phone size={15} />
            Contact Us
          </Link>
        </div>



      </div>
    </section>
  );
}