'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { ArrowRight, Play, Heart, ShieldCheck, Star } from 'lucide-react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';

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

// ─── Circular Rotating Sticker ────────────────────────────────────────────────
function CircularSticker() {
  const text = 'YOUR SMILE IS OUR REWARD ✦ YOUR SMILE IS OUR REWARD ✦ ';
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="w-[148px] h-[148px] relative flex items-center justify-center">
      <div className="absolute inset-1 rounded-full bg-white shadow-sm border border-gray-100" />
      <motion.svg
        viewBox="0 0 148 148"
        width="148" height="148"
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path
            id="sticker-path"
            d={`M 74,74 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          fill="#111827"
          style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', fontFamily: 'inherit' }}
        >
          <textPath href="#sticker-path" textLength={circumference} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <div className="relative z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md">
        <span style={{ fontSize: '20px', lineHeight: 1, color: 'white' }}>✦</span>
      </div>
    </div>
  );
}


export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#f7faf5]">
      {/* Primary top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary z-20" />

      {/* Soft radial glow — center left */}
      <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[120px] pointer-events-none" />
      {/* Soft radial glow — top right */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 w-full py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* ── Left Content ── */}
          <motion.div variants={stagger} initial="hidden" animate="show">

            {/* Badge */}
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-950 rounded-xl mb-8 border border-white/5"
            >
              <Star className="text-primary" size={13} fill="currentColor" />
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.18em]">
                Trusted by 500+ Parents in Dhaka
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-gray-950 leading-[1.04] tracking-tight mb-5"
            >
              Nurturing Every{' '}
              <span className="text-primary">Child&apos;s Potential</span>{' '}
              Through Expert Therapy
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={fadeUp}
              className="text-base text-gray-500 mb-8 max-w-xl leading-relaxed"
            >
              Expert Speech, Occupational, ABA, and Physiotherapy services in Dhaka,
              providing a caring and playful environment where children can grow with confidence.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={openModal}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-950 hover:bg-primary text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
              >
                Book Appointment
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
              <a href="/about" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 border border-gray-200">
                Learn More
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-6 items-center">
              {[
                { icon: Heart, label: 'Compassionate Care' },
                { icon: ShieldCheck, label: 'Expert Therapists' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 group">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-200">
                    <Icon size={17} />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right Content ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-[580px] lg:max-w-[520px] mx-auto">

              {/* Image card */}
              <motion.div
                className="absolute inset-0 bg-white shadow-2xl overflow-hidden"
              >
                <Image
                  src="https://res.cloudinary.com/dl1rkhdzt/image/upload/v1773653831/Child_Therapy_Session3_wzfjl0.jpg"
                  alt="Child Therapy Session"
                  fill
                  className="object-cover object-top"
                  referrerPolicy="no-referrer"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/25 to-transparent" />
              </motion.div>

              {/* ── Circular Sticker — bottom left ── */}
              <div className="absolute -bottom-10 -left-18 z-30">
                <CircularSticker />
              </div>

              {/* Floating YouTube card */}
              {/* <motion.a
                href="https://www.youtube.com/@SparklingInsightTherapyPoint"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 bg-gray-950 p-3.5 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-white/8 hover:border-primary/40 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">Watch Session</p>
                  <p className="text-xs font-bold text-white">How We Help</p>
                </div>
              </motion.a> */}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}