'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/data/services';

// ─── Animation variants ───────────────────────────────────────────────────────
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

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, idx }: { service: any; idx: number }) {
  return (
    <motion.div variants={fadeUp} custom={idx} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/services/${service.slug}`} className="group block h-full">
        <div className="relative h-full bg-white border border-gray-200 rounded-2xl p-6 flex flex-col overflow-hidden hover:border-gray-950 hover:bg-gray-950 transition-all duration-300">

          {/* Top accent line on hover */}
          <div className="absolute top-0 left-6 right-6 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />

          {/* Index number — top right */}
          <span className="absolute top-4 right-5 text-[11px] font-bold text-gray-200 group-hover:text-white/20 transition-colors duration-300 select-none">
            {String(idx + 1).padStart(2, '0')}
          </span>

          {/* Icon — consistent primary style */}
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0 ${service.color} group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-200`}>
            <service.icon size={20} />
          </div>

          {/* Text */}
          <div className="flex-grow">
            <h3 className="text-base font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-200 leading-snug">
              {service.name}
            </h3>
            <p className="text-xs text-gray-500 group-hover:text-white/50 leading-relaxed line-clamp-3 transition-colors duration-200">
              {service.desc}
            </p>
          </div>

          {/* Learn more — always visible, arrow animates */}
          <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-gray-400 group-hover:text-primary transition-colors duration-200">
            Learn More
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Services() {
  const topServices = services.filter((s: any) => !s.centered);
  const bottomServices = services.filter((s: any) => s.centered);

  return (
    <section className="py-16 lg:py-20 bg-gray-50/60 border-y border-gray-100" id="services">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div variants={fadeUp} className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-[1.08]">
              Comprehensive care<br />for every child.
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4 max-w-sm">
            <p className="text-sm text-gray-500 leading-relaxed">
              Expert-led programs designed to help every child reach their unique developmental milestones through specialized therapy and compassionate support.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <LayoutGrid size={13} />
              <span className="text-xs font-semibold">{services.length} services available</span>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Top row — 4 cards */}
        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {topServices.map((service: any, idx: number) => (
            <ServiceCard key={service.slug} service={service} idx={idx} />
          ))}
        </AnimatedSection>

        {/* Bottom row — 3 cards centered */}
        <AnimatedSection className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-3/4">
            {bottomServices.map((service: any, idx: number) => (
              <ServiceCard key={service.slug} service={service} idx={idx + topServices.length} />
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}