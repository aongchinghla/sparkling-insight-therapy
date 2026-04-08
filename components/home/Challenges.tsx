'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

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

const challenges = [
  'Late Speech Development',
  'Difficulty Focusing',
  'Poor Social Interaction',
  'Hyperactivity',
  'Learning Difficulty',
  'Sensory Issues',
];

export default function Challenges() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });

  return (
    <section ref={ref} className="py-14 md:py-20 bg-gray-50/60 border-y border-gray-100 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">

        <motion.div
          variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >

          {/* ── Left: Header ── */}
          <motion.div variants={fadeUp}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> Recognizing the Signs
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-[1.06] mb-5">
              Is Your Child<br />
              <span className="text-primary">Experiencing</span><br />
              These Challenges?
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-sm">
              Early recognition is the first step toward meaningful progress. Our specialists are here to help.
            </p>
            <Link
              href="/#services"
              className="group inline-flex items-center gap-2 bg-gray-950 hover:bg-primary text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
            >
              Explore Our Services
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* ── Right: Checklist ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {challenges.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/8 group-hover:bg-primary/15 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <CheckCircle2 size={15} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-950 transition-colors duration-200 leading-snug">{item}</p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}