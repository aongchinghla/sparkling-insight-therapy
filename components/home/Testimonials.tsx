'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import { User } from 'lucide-react';

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

const testimonials = [
  {
    text: "Sparkling Insight changed our lives. Ayaan was non-verbal, and after 6 months of SLT, he is now starting to form sentences.",
    name: 'Mrs. Rahat',
    role: 'Parent of Ayaan',
  },
  {
    text: "The OT sessions here are so engaging. Sara looks forward to coming every week. Her motor skills have improved significantly.",
    name: 'Mr. Karim',
    role: 'Parent of Sara',
  },
  {
    text: "From the very first assessment, we felt heard and supported. The therapists truly understand each child's individual needs.",
    name: 'Mrs. Sultana',
    role: 'Parent of Rafi',
  },
  {
    text: "Our son Zayan has made remarkable progress with ABA therapy. The team is professional, caring, and always keeps us updated.",
    name: 'Mr. Hasan',
    role: 'Parent of Zayan',
  },
  {
    text: "The speech therapist identified issues we hadn't noticed before. Within 3 months, our daughter was communicating so much better.",
    name: 'Mrs. Islam',
    role: 'Parent of Nadia',
  },
  {
    text: "We tried many centers before finding Sparkling Insight. The difference in approach and results has been night and day for our family.",
    name: 'Mr. Chowdhury',
    role: 'Parent of Arif',
  },
  {
    text: "The sensory integration sessions have been a game changer for our child. He is calmer, more focused, and happier every single day.",
    name: 'Mrs. Begum',
    role: 'Parent of Tahmid',
  },
  {
    text: "Incredible team and environment. My daughter actually enjoys therapy now. The progress in just 4 months has been truly amazing.",
    name: 'Mr. Rahman',
    role: 'Parent of Mim',
  },
];

const col1 = testimonials.slice(0, 4);
const col2 = testimonials.slice(4, 8);

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between gap-6 relative overflow-hidden shrink-0">
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />

      {/* Name and role (appears first on mobile) */}
      <div className="lg:border-t lg:border-gray-100 lg:pt-4 lg:mt-auto order-first lg:order-last">
        <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">{t.name}</p>
        <p className="text-xs text-gray-400 font-medium mt-0.5">{t.role}</p>
      </div>

      {/* Quote text (appears second on mobile) */}
      <p className="text-sm text-gray-600 leading-relaxed order-last lg:order-first">&ldquo;{t.text}&rdquo;</p>
    </div>
  );
}

function ScrollColumn({ items, direction }: { items: typeof testimonials; direction: 'up' | 'down' }) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative" style={{ height: 480 }}>
      {/* fade top */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50/60 to-transparent z-10 pointer-events-none" />
      {/* fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50/60 to-transparent z-10 pointer-events-none" />

      <div
        className={direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function SuccessStories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });

  return (
    <section className="py-16 lg:py-20 bg-gray-50/60 border-y border-gray-100" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-center">

          {/* ── Left: Header ── */}
          <motion.div
            variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          >
            <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> What Parents&apos; Say
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl font-bold text-gray-950 tracking-tight leading-[1.08] mb-6">
              Trusted by families<br />across Dhaka.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Hundreds of families have seen real, lasting results. Here&apos;s what some of them have to say about their journey with us.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-gray-950">500+</p>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400 mt-1">Families Helped</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <p className="text-3xl font-bold text-gray-950">98%</p>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400 mt-1">Satisfaction Rate</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Scrolling columns ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <ScrollColumn items={col1} direction="up" />
            <ScrollColumn items={col2} direction="down" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}