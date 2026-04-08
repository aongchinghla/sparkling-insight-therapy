'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'motion/react';
import type { Variants } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Team from '@/components/home/Team';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
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

// ─── Leadership data ──────────────────────────────────────────────────────────
const leaders = [
  {
    name: 'Mainul Hossain',
    role: 'Chairman',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1774073156/mainul-chairman_xkd1cj.png',
    quote: "At Sparkling Insight Therapy Point, we believe every child deserves the opportunity to grow, learn, and thrive. Our goal is to provide compassionate, evidence-based therapy that helps children build independence, confidence, and meaningful life skills. We are committed to supporting families and creating a nurturing environment where every child's potential can shine.",
  },
  {
    name: 'Rakseng Mrong',
    role: 'Managing Director',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1774072686/rakseng_ozarhx.png',
    quote: "Our team works tirelessly to ensure that every child who walks through our doors receives the highest quality of care. We invest in continuous training, evidence-based practices, and a family-first approach because we know that real change happens when therapists and families work together.",
  },
  {
    name: 'Sunny Agnes Areng',
    role: 'Chief Executive Officer',
    image: '',
    quote: "Excellence in therapy means more than clinical outcomes — it means building trust with families, celebrating every milestone no matter how small, and never giving up on a child's potential. That is the standard we hold ourselves to every single day at Sparkling Insight.",
  },
];

function LeadershipSlider() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });

  const go = (idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };
  const prev = () => go(active === 0 ? leaders.length - 1 : active - 1);
  const next = () => go(active === leaders.length - 1 ? 0 : active + 1);

  // Auto-slide every 5 seconds, pause on hover
  const isPaused = useRef(false);
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        setDirection(1);
        setActive(prev => (prev === leaders.length - 1 ? 0 : prev + 1));
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const leader = leaders[active];

  return (
    <section ref={ref} className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> Leadership
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-[1.08]">
              A word from<br />our leaders.
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs font-bold text-gray-300 tabular-nums">
              {String(active + 1).padStart(2, '0')} / {String(leaders.length).padStart(2, '0')}
            </span>
            <button onClick={prev}
              className="w-9 h-9 rounded-xl border border-gray-200 hover:border-gray-950 hover:bg-gray-950 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next}
              className="w-9 h-9 rounded-xl border border-gray-200 hover:border-gray-950 hover:bg-gray-950 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200">
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Card */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { setTimeout(() => { isPaused.current = false; }, 500); }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Primary top bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary z-10" />

              <div className="flex flex-col md:flex-row items-stretch">

                {/* Portrait */}
                <div className="relative w-full md:w-[280px] min-h-[320px] flex-shrink-0 bg-primary/5">
                  {leader.image ? (
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                      <span className="text-7xl font-bold text-primary/30">
                        {leader.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Name overlay on mobile */}
                  <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-950/80 to-transparent">
                    <p className="text-sm font-bold text-white">{leader.name}</p>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-[0.14em]">{leader.role}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-gray-100 flex-shrink-0" />

                {/* Quote content */}
                <div className="flex-1 px-8 md:px-12 py-10 md:py-14 flex flex-col justify-center min-w-0">

                  {/* Name — desktop */}
                  <div className="hidden md:flex items-center gap-3 mb-6">
                    <div className="w-8 h-[2px] bg-primary" />
                    <div>
                      <p className="text-sm font-bold text-gray-950 leading-snug">{leader.name}</p>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-[0.14em] mt-0.5">{leader.role}</p>
                    </div>
                  </div>

                  {/* Quote mark */}
                  <span className="text-[80px] leading-none text-primary/20 font-serif select-none block -mb-6">&ldquo;</span>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed font-light tracking-tight mb-6">
                    {leader.quote}
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-px flex-1 bg-gray-100" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-300 flex-shrink-0">
                      Sparkling Insight
                    </span>
                  </div>

                  {/* Integrated progress bar */}
                  <div className="mt-5 h-[2px] bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      key={active}
                      className="h-full bg-primary rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 8, ease: 'linear' }}
                    />
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {leaders.map((_, i) => (
              <button key={i} onClick={() => go(i)}
                className={`block h-1 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-primary' : 'w-1.5 bg-gray-200 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default function TeamPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="bg-white overflow-hidden pt-[91px]">

      {/* ── Hero — full-bleed dark ────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[65vh] min-h-[500px] flex items-end overflow-hidden">
        {/* Parallax bg */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <Image
            src="https://res.cloudinary.com/dl1rkhdzt/image/upload/v1772867760/20250525_131904_k2ssjq.jpg"
            alt="Our Team"
            fill className="object-cover object-[center_30%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/55 to-gray-950/10" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-20"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-5 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-primary inline-block" /> The People Behind the Care
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.02] tracking-tight max-w-3xl mb-5"
          >
            Meet Our<br />
            <span className="text-primary">Experts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
            className="text-white/50 text-base leading-relaxed max-w-lg"
          >
            A dedicated team of specialists committed to your child&apos;s growth, development, and well-being.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 flex items-center gap-3 text-white/25 text-xs font-medium tracking-widest uppercase"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-px h-8 bg-white/20"
            />
            Meet the team
          </motion.div>
        </motion.div>
      </section>

      {/* ── Intro strip ──────────────────────────────────────────────────── */}
      <section className="bg-gray-950 border-b border-white/5">
        <AnimatedSection className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
          <motion.div variants={fadeUp} className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-primary inline-block" /> Our Philosophy
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              Every member of our team is carefully selected not just for their clinical expertise, but for their empathy, patience, and genuine passion for helping children thrive.
            </p>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ── Leadership Section ──────────────────────────────────────────────── */}
      <LeadershipSlider />


      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> Our Specialists
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-[1.08]">
              The team.
            </h2>
          </motion.div>
        </AnimatedSection>

        <Team variant="grid" />
      </section>

      {/* ── Join CTA ─────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-16 lg:pb-20">
        <AnimatedSection>
          <motion.div
            variants={fadeUp}
            className="relative bg-gray-950 rounded-2xl overflow-hidden px-10 md:px-16 py-16 flex flex-col md:flex-row md:items-center justify-between gap-10"
          >
            {/* Accents */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '80px 100%' }} />
            <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-lg">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
                Join the Team
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
                Want to make a<br />difference with us?
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                We&apos;re always looking for passionate therapists and specialists who want to change lives — one child at a time.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0 flex flex-col sm:flex-row gap-3">
              <a
                href="/career"
                className="group flex items-center gap-2 bg-white text-gray-900 hover:bg-primary hover:text-white text-sm font-bold px-8 py-4 rounded-xl transition-all duration-200"
              >
                View Open Positions
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
              <a
                href="/contact"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-8 py-4 rounded-xl transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

    </div>
  );
}