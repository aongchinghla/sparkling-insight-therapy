'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, animate } from 'motion/react';
import type { Variants } from 'motion/react';
import { Target, Heart, CheckCircle2, ArrowRight, Quote } from 'lucide-react';
import Image from 'next/image';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-72px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

function ParallaxImage({ src, alt, imgClassName = "object-cover" }: { src: string; alt: string; imgClassName?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-60px]">
        <Image src={src} alt={alt} fill className={imgClassName} referrerPolicy="no-referrer" />
      </motion.div>
    </div>
  );
}

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(textRef, { once: true });

  const numValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (inView) {
      const controls = animate(0, numValue, {
        duration: 2,
        delay: index * 0.12 + 0.3,
        ease: 'easeOut',
        onUpdate(v) {
          if (textRef.current) {
            textRef.current.textContent = Math.round(v) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, numValue, suffix, index]);

  return (
    <motion.div variants={fadeUp} className="relative border-l-2 border-primary pl-6 py-2">
      <motion.p
        ref={textRef}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.12,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        className="text-4xl md:text-5xl font-bold text-white tracking-tight"
      >
        0{suffix}
      </motion.p>
      <p className="text-sm text-gray-400 font-medium mt-1">{label}</p>
    </motion.div>
  );
}

function ValueCard({ icon: Icon, title, description }: {
  icon: React.ElementType; title: string; description: React.ReactNode; index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.25 }}
      className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full"
    >
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
      <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors duration-300 flex-shrink-0">
        <Icon size={22} className="text-primary" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <div className="text-gray-500 text-sm leading-relaxed flex-grow">{description}</div>
    </motion.div>
  );
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: (
        <div className="space-y-4">
          <p>
            At <strong className="font-semibold text-gray-700">Sparkling Insight Therapy Point</strong>, our mission is to empower children with neurodevelopmental and behavioral challenges to reach their fullest potential through personalized, evidence-based, and multidisciplinary care.
          </p>
          <p>We are committed to:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Delivering individualized interventions that support communication, behavior, sensory, and developmental growth</li>
            <li>Providing family-centered guidance and support, ensuring caregivers are active partners in every child&apos;s journey</li>
            <li>Promoting independence, confidence, and meaningful life skills through real-world, functional learning</li>
            <li>Using data-driven and research-based approaches to ensure effective and measurable progress</li>
          </ol>
          <p>
            Through a nurturing, inclusive, and collaborative environment, we strive to build a strong community where every child feels valued, supported, and empowered to live a fulfilling and independent life.
          </p>
        </div>
      ),
    },
    {
      icon: Heart,
      title: 'Our Vision',
      description: (
        <div className="space-y-4">
          <p>
            At <strong className="font-semibold text-gray-700">Sparkling Insight Therapy Point</strong>, our vision is to become a leading child development center in Bangladesh, recognized for setting the standard in innovative, compassionate, and evidence-based care. We aspire to create a future where every child, regardless of their developmental challenges, has access to high-quality, personalized support that enables them to thrive, grow, and contribute meaningfully to society.
          </p>
          <p>
            We envision building inclusive communities where children and their families feel supported, connected, and empowered throughout their journey. Through continuous innovation, multidisciplinary collaboration, and a commitment to excellence, we aim to expand access to effective therapies and inspire hope, confidence, and transformation. Our goal is to foster a nurturing environment that promotes joy, development, and independence, while becoming a trusted center of excellence in child development and neurodiversity-affirming care.
          </p>
        </div>
      ),
    },
  ];

  const stats = [
    { value: '500+', label: 'Children Supported' },
    { value: '15+', label: 'Expert Therapists' },
    { value: '9+', label: 'Years of Experience' },
    { value: '98%', label: 'Success Rate' },
  ];

  return (
    <div className="bg-white overflow-hidden pt-[91px]">

      <section ref={heroRef} className="relative h-[65vh] min-h-[500px] flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <Image
            src="https://res.cloudinary.com/dl1rkhdzt/image/upload/v1775463115/about_hero_zmwrum.jpg"
            alt="About Us" fill className="object-cover object-[center_50%]" referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/10" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-5 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-primary inline-block" /> Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.02] tracking-tight max-w-3xl mb-6"
          >
            About<br />
            <span className="text-primary">Sparkling</span> Insight
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="text-white/60 text-base leading-relaxed max-w-xl"
          >
            Nurturing every child&apos;s potential through expert therapy and compassionate care — one milestone at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 flex items-center gap-3 text-white/30 text-xs font-medium tracking-widest uppercase"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-px h-8 bg-white/20"
            />
            Scroll to explore
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-gray-950 border-b border-white/5">
        <AnimatedSection className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} />
          ))}
        </AnimatedSection>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <AnimatedSection>
            <motion.div variants={fadeUp} className="relative">
              <div className="relative h-[520px] rounded-2xl overflow-hidden shadow-2xl">
                <ParallaxImage
                  src="https://res.cloudinary.com/dl1rkhdzt/image/upload/v1772867760/20250525_131904_k2ssjq.jpg"
                  alt="Therapy Session"
                  imgClassName="object-cover object-top"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="absolute -bottom-8 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-[240px] border border-gray-100"
              >
                <Quote size={20} className="text-primary mb-3 opacity-60" />
                <p className="text-xs text-gray-600 leading-relaxed font-medium italic">
                  &quot;Every child deserves a chance to shine in their own unique way.&quot;
                </p>
                <p className="text-[10px] text-gray-400 mt-3 font-bold uppercase tracking-wider">— Founding Team</p>
              </motion.div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/8 rounded-2xl -z-10" />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="lg:pl-4">
            <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> Who We Are
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-[1.08] mb-8">
              Expert care for<br />
              <span className="text-primary">every child.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-5 text-sm">
              Sparkling Insight Therapy Point was founded with a simple yet profound goal: to create a space where children with diverse developmental needs could find the support, tools, and encouragement they need to thrive.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-10 text-sm">
              We bring together a multidisciplinary team of certified therapists under one roof — offering Occupational Therapy, Speech &amp; Language Therapy, ABA Therapy, and child counseling. Every program is personalized, purposeful, and progress-driven, with families as active partners every step of the way.
            </motion.p>

            <motion.div variants={stagger} className="space-y-3">
              {['Evidence-based, child-centered therapy', 'Certified & multidisciplinary therapists', 'Sensory-friendly, interactive environment', 'Culturally sensitive care for Bangladeshi families', 'Structured yet flexible therapy programs', 'Ongoing family guidance & support'].map((item) => (
                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 size={12} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="/services/occupational-therapy"
              className="group inline-flex items-center gap-2 mt-10 bg-gray-950 hover:bg-primary text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
            >
              Explore Our Services
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> Our Process
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-[1.08]">
              How we work.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 relative">

            <div className="hidden md:block absolute top-[40px] left-[calc(10%+32px)] right-[calc(10%+32px)] h-[2px] bg-gray-100 z-0" />

            <motion.div
              className="hidden md:block absolute top-[40px] left-[calc(10%+32px)] h-[2px] bg-primary z-0 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ right: 'calc(10% + 32px)' }}
            />

            {[
              { step: '01', title: 'Screening & Assessment', desc: 'Detailed screening followed by standardized assessments and initial pairing sessions to build rapport.' },
              { step: '02', title: 'Therapy Implementation', desc: 'We start across ABA, OT, and SLT — completing 40 hours to observe and guide initial progress.' },
              { step: '03', title: 'Goal Setting', desc: 'Guardian meetings to set intervention goals. Parents join sessions and siblings may join for joint therapy.' },
              { step: '04', title: 'Ongoing Tracking', desc: 'Session videos and notes shared with families throughout for clarity and consistency in intervention.' },
              { step: '05', title: 'Progress Review', desc: 'Formal progress report every 3 months with review meetings to update the therapy plan and continue the cycle.' },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center px-4 md:px-3 py-8"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-primary/20 hover:border-primary flex flex-col items-center justify-center mb-6 shadow-md hover:shadow-primary/20 hover:shadow-xl transition-all duration-300 group"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4, ease: 'easeInOut' }}
                  />
                  <span className="text-2xl font-medium text-primary leading-none">{step}</span>
                </motion.div>

                <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-gray-950 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

              <div>
                <motion.div variants={fadeUp} className="mb-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
                    <span className="w-6 h-px bg-primary inline-block" /> Our Distinction
                  </p>
                  <h2 className="text-4xl font-bold text-white tracking-tight leading-[1.08] mb-4">
                    What makes us<br />unique.
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We blend innovation, research, and compassion in everything we do.
                  </p>
                </motion.div>

                <div className="space-y-5">
                  {[
                    { label: 'Standardized Assessment Tools', desc: 'SCOPE, SP2, PLS-5, BOT-2, and Functional Communication Profile-Revised for accurate, individualized planning.' },
                    { label: 'Evidence-Based Practices', desc: 'DIR Floortime, Sensory Integration, Visual Supports, and Pivotal Response Training.' },
                    { label: 'Cultural & Contextual Relevance', desc: 'Making therapy meaningful and relatable for Bangladeshi families.' },
                    { label: 'Holistic Approach', desc: 'Play, social interaction, art, music, and routine-building for whole-child development.' },
                    { label: 'Strong Family Involvement', desc: 'Ensuring learning and progress extend well beyond the therapy room.' },
                  ].map(({ label, desc }, i) => (
                    <motion.div key={label} variants={fadeUp} className="flex gap-4 group">
                      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/25 transition-colors duration-200">
                        <CheckCircle2 size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white mb-0.5">{label}</p>
                        <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <motion.div variants={fadeUp} className="mb-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
                    <span className="w-6 h-px bg-primary inline-block" /> Why Choose Us
                  </p>
                  <h2 className="text-4xl font-bold text-white tracking-tight leading-[1.08] mb-4">
                    The right choice<br />for your child.
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                    At Sparkling Insight, we see the potential in every child — creating an environment where children gain skills, confidence, and independence to participate meaningfully in everyday life.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Over 8 years of pediatric therapy experience',
                    'Multidisciplinary team: OT, ABA, SLT & counseling',
                    'Certified in globally recognized frameworks',
                    'Culturally sensitive & child-centered approach',
                    'Structured yet flexible programs',
                    'Transparent communication with families',
                  ].map((item) => (
                    <motion.div
                      key={item}
                      variants={fadeUp}
                      className="flex items-start gap-3 bg-white/[0.04] border border-white/8 hover:border-primary/30 rounded-xl p-4 transition-colors duration-200 group"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={11} className="text-primary" />
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-200">{item}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={fadeUp} className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-2xl">
                  <p className="text-sm text-white/80 leading-relaxed italic">
                    "Therapy here is not just a session — it&apos;s a journey toward a brighter future."
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-3">— Sparkling Insight Team</p>
                </motion.div>
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-gray-50/70 border-y border-gray-100 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="max-w-xl mb-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-primary inline-block" /> What Drives Us
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-[1.08]">
                Our core<br />values.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <ValueCard key={v.title} icon={v.icon} title={v.title} description={v.description} index={i} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <AnimatedSection>
          <motion.div
            variants={fadeUp}
            className="relative bg-gray-950 rounded-2xl overflow-hidden px-10 md:px-20 py-20 flex flex-col md:flex-row md:items-center justify-between gap-12"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '80px 100%' }} />
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-lg">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-4">Meet the Team</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
                The people behind<br />every breakthrough.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our therapists are not just professionals — they&apos;re advocates, mentors, and champions for every child in our care.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0 flex flex-col sm:flex-row gap-3">
              <a href="/team"
                className="group flex items-center gap-2 bg-white text-gray-900 hover:bg-primary hover:text-white text-sm font-bold px-8 py-4 rounded-xl transition-all duration-200">
                Meet Our Team
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
              <a href="/contact"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-8 py-4 rounded-xl transition-colors duration-200">
                Contact Us
              </a>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

    </div>
  );
}