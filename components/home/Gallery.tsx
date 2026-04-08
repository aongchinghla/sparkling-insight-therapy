'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import type { Variants } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const galleryItems = [
  { src: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1772896897/Gallery_6_vphsz8.jpg' },
  { src: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1774712609/sparkling_team_ckvrcz.jpg' },
  { src: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1772896894/Gallery_4_b6dw5z.jpg' },
  { src: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1773653830/Child_Therapy_Session_mos02a.jpg' },
  { src: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1774712657/therapist_anxoqi.jpg' },
  { src: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1774712703/therapy-training_zwixdw.jpg' },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev! + 1) % galleryItems.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev! + 1) % galleryItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section className="py-16 lg:py-20 bg-gray-50/60 border-y border-gray-100" id="gallery">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
        >
          <motion.div variants={fadeUp}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> Our Environment
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-[1.08]">
              A safe space<br />to grow.
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-sm text-gray-500 leading-relaxed max-w-sm md:text-right">
            Our center is designed to be warm, welcoming, and child-friendly — a place where children feel comfortable and inspired.
          </motion.p>
        </motion.div>

        {/* ── Gallery Grid ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="relative overflow-hidden aspect-[3/2] group cursor-pointer"
              onClick={() => setSelectedIndex(idx)}
            >
              <Image
                src={item.src}
                alt={`Sparkling Insight Therapy Center gallery ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 md:group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gray-950/0 md:group-hover:bg-gray-950/25 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/90 backdrop-blur-md p-4 md:p-12"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 z-[110]"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 z-[110]"
            >
              <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 z-[110]"
            >
              <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
            </button>

            <motion.div
              key={selectedIndex} /* Forces re-animation when index changes */
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="relative w-full max-w-6xl aspect-[4/3] md:aspect-video rounded-none shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryItems[selectedIndex].src}
                alt="Expanded gallery view"
                fill
                className="object-contain bg-black/20"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Pagination Dots indicating position */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[110]">
              {galleryItems.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === selectedIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}