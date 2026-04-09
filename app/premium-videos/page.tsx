'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import { Play, ArrowRight, Lock, Download, Infinity, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import MyVideosSearch from '@/components/MyVideosSearch';
import VimeoPlayer from '@/components/VimeoPlayer';

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
  const inView = useInView(ref, { once: true, margin: '-64px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

const VIDEOS_DATA = [
  {
    id: 'v1',
    title: 'Anxiety Relief Techniques',
    description: 'Learn powerful breathing exercises and mindfulness techniques to calm your mind and manage anxiety in real-time.',
    price: 499,
    duration: '15 min',
    vimeoVideoUrl: 'https://player.vimeo.com/video/1177194789?badge=0&autopause=0&player_id=0&app_id=58479',
  },
  {
    id: 'v2',
    title: 'Building Emotional Resilience',
    description: 'A deep dive into building emotional strength. Covers practical steps to handle life transitions and challenging emotions.',
    price: 599,
    duration: '22 min',
    vimeoVideoUrl: 'https://player.vimeo.com/video/1177194789?badge=0&autopause=0&player_id=0&app_id=58479',
  },
  {
    id: 'v3',
    title: 'Mind Reset for Productivity',
    description: 'This therapy-based session helps you reset your mental state, clear the fog, and enter a state of deep flow.',
    price: 399,
    duration: '18 min',
    vimeoVideoUrl: '',
  },
];

function VideoCard({ video, idx }: { video: typeof VIDEOS_DATA[0]; idx: number }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full z-10" />

      {/* Video preview */}
      <div className="relative aspect-video bg-gray-950 overflow-hidden">
        <VimeoPlayer
          videoUrl={video.vimeoVideoUrl}
          checkoutUrl={`/therapy-videos/checkout?id=${video.id}`}
        />

        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1">
          <span className="text-[10px] font-bold text-white/70">{video.duration}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-2">
          #{String(idx + 1).padStart(2, '0')}
        </span>
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors duration-200">
          {video.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-5">
          {video.description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
          {[
            { icon: Infinity, label: 'Lifetime Access' },
            { icon: Download, label: 'Downloadable' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400">
              <Icon size={11} className="text-primary" />
              {label}
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-950">৳{video.price}</span>
            <span className="text-xs text-gray-400 ml-1">one-time</span>
          </div>
          <Link
            href={`/therapy-videos/checkout?id=${video.id}`}
            className="group/btn flex items-center gap-2 bg-gray-950 hover:bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors duration-200"
          >
            Buy Now
            <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomeTherapyVideos() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative bg-gray-950 pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '80px 100%' }} />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
        <div className="absolute -left-32 top-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-5 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-primary inline-block" /> Home Therapy Videos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight max-w-3xl mb-5"
          >
            Expert therapy,<br />
            <span className="text-primary">from your home.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
            className="text-white/50 text-base leading-relaxed max-w-xl mb-10"
          >
            Professional therapy videos designed for parents — learn how to apply effective therapy techniques with your child at home.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: Infinity, label: 'Lifetime Access' },
              { icon: Download, label: 'Download & Keep' },
              { icon: Play, label: 'Watch Anytime' },
              { icon: CheckCircle2, label: 'Expert Guided' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2">
                <Icon size={13} className="text-primary" />
                <span className="text-xs font-semibold text-white/60">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Videos Grid ── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-3 flex items-center gap-3">
                <span className="w-6 h-px bg-primary inline-block" /> Available Sessions
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight leading-[1.08]">
                Choose your session.
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.14em]">
                {VIDEOS_DATA.length} Videos Available
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS_DATA.map((video, idx) => (
              <VideoCard key={video.id} video={video} idx={idx} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── My Purchases ── */}
      <section className="bg-gray-50/60 border-y border-gray-100 py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="max-w-2xl mx-auto text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center justify-center gap-3">
                <span className="w-6 h-px bg-primary inline-block" /> Already Purchased?
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight mb-4">
                Access your videos.
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                Enter your purchase email below to access all your purchased therapy videos.
              </p>

              <MyVideosSearch />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Help ── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <AnimatedSection>
          <motion.div
            variants={fadeUp}
            className="relative bg-gray-950 rounded-2xl overflow-hidden px-8 md:px-16 py-12 flex flex-col md:flex-row md:items-center justify-between gap-8"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '80px 100%' }} />

            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3">Need Help?</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                Questions about payment<br />or video access?
              </h3>
              <p className="text-gray-400 text-sm">Our team is happy to assist you.</p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://wa.me/8801902028787"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbb59] text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
              >
                WhatsApp Support
              </a>
              <a
                href="mailto:hello@sparklingtherapybd.com"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

    </div>
  );
}