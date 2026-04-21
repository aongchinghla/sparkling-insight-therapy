'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import { Play, ArrowRight, Youtube } from 'lucide-react';
import Image from 'next/image';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const videos = [
  { id: 'guWo1GHVrKs' },
  { id: 'uLWM4idGxAo' },
  { id: 'DzZwsOlkZBg' },
];

const glows = [
  { size: 500, x: '-8%', y: '-10%', delay: 0, duration: 10, color: 'rgba(15,168,138,0.18)' },
  { size: 400, x: '65%', y: '50%', delay: 2, duration: 13, color: 'rgba(15,168,138,0.12)' },
  { size: 280, x: '40%', y: '-5%', delay: 1, duration: 9, color: 'rgba(6,201,160,0.10)' },
];
const glowDots = [
  { size: 6, x: '18%', y: '22%', delay: 0, duration: 6 },
  { size: 4, x: '72%', y: '18%', delay: 1.4, duration: 8 },
  { size: 8, x: '85%', y: '60%', delay: 0.6, duration: 7 },
  { size: 5, x: '35%', y: '78%', delay: 2.2, duration: 9 },
  { size: 4, x: '58%', y: '42%', delay: 3, duration: 6 },
  { size: 6, x: '10%', y: '65%', delay: 1.8, duration: 10 },
  { size: 3, x: '92%', y: '35%', delay: 0.4, duration: 7 },
];

function getThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
function getEmbedUrl(id: string) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&vq=hd1080&hd=1`;
}

function VideoCard({
  id, large = false, playing, onPlay,
}: {
  id: string;
  large?: boolean;
  playing: boolean;
  onPlay: () => void;
}) {
  const [thumbnail, setThumbnail] = useState(getThumbnail(id));

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black ring-1 ring-white/10 w-full h-full">
      {playing ? (
        <iframe
          src={getEmbedUrl(id)}
          title="Therapy video"
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={thumbnail}
            alt="Therapy video thumbnail"
            fill
            sizes={large ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 35vw, 100vw'}
            onError={() => setThumbnail(`https://img.youtube.com/vi/${id}/hqdefault.jpg`)}
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20" />
          <button onClick={onPlay} className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/40 ${large ? 'w-12 h-12 md:w-16 md:h-16' : 'w-9 h-9'}`}
            >
              <Play size={large ? 18 : 12} className="text-white ml-0.5" fill="currentColor" />
            </motion.div>
          </button>
        </>
      )}
    </div>
  );
}

export default function FeaturedVideos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative bg-gray-950 py-16 lg:py-20 overflow-hidden">

      {/* Glows */}
      {glows.map((g, i) => (
        <motion.div key={`glow-${i}`} className="absolute rounded-full pointer-events-none"
          style={{ width: g.size, height: g.size, left: g.x, top: g.y, background: `radial-gradient(circle, ${g.color} 0%, transparent 68%)`, filter: 'blur(60px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: g.duration, delay: g.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Dots */}
      {glowDots.map((d, i) => (
        <motion.div key={`gdot-${i}`} className="absolute pointer-events-none" style={{ left: d.x, top: d.y }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div style={{ width: d.size, height: d.size, borderRadius: '50%', background: '#0fa88a', boxShadow: `0 0 ${d.size * 3}px ${d.size}px rgba(15,168,138,0.6), 0 0 ${d.size * 6}px ${d.size * 2}px rgba(15,168,138,0.25)` }} />
        </motion.div>
      ))}

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className="mb-8">
          <motion.div variants={fadeUp}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> Featured Videos
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.08]">
              Watch &amp; learn.
            </h2>
          </motion.div>
        </motion.div>

        {/* ── Unified Responsive Grid ── */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-[1fr_0.55fr] gap-4 lg:gap-3 items-start"
        >
          {/* Main Video */}
          <motion.div variants={fadeUp} className="w-full aspect-video lg:aspect-auto lg:h-[480px]">
            <div className="w-full h-full">
              <VideoCard
                id={videos[0].id}
                large
                playing={playingIdx === 0}
                onPlay={() => setPlayingIdx(0)}
              />
            </div>
          </motion.div>

          {/* Secondary Videos */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-4 lg:h-[480px]">
            <div className="w-full aspect-video lg:aspect-auto lg:h-[233px] lg:min-h-[233px] lg:max-h-[233px]">
              <VideoCard
                id={videos[1].id}
                playing={playingIdx === 1}
                onPlay={() => setPlayingIdx(1)}
              />
            </div>
            <div className="w-full aspect-video lg:aspect-auto lg:h-[233px] lg:min-h-[233px] lg:max-h-[233px]">
              <VideoCard
                id={videos[2].id}
                playing={playingIdx === 2}
                onPlay={() => setPlayingIdx(2)}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* See all */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} className="mt-8 flex justify-center">
          <a
            href="https://www.youtube.com/channel/UCS81ctdUNTss-ddihVl-y4w"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 border border-white/10 hover:border-primary/40 hover:bg-primary/5 rounded-xl px-6 py-3 text-xs font-bold text-white/40 hover:text-primary transition-all duration-200"
          >
            <Youtube size={14} className="text-red-600" />
            See More Videos
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
