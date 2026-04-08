'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const team = [
  {
    id: 1, name: 'Anamika Sarker', role: 'Occupational Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1772952472/anaamika_sarker_nd7dyh.png'
  },
  {
    id: 2, name: 'Mary Chisim', role: 'Associate Sr. ABA Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1772952474/mary_chisim_lplkkk.png'
  },
  {
    id: 3, name: 'Marjana Nuzhat', role: 'Associate Sr. ABA Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1772961191/marjana_nuzhat_o3vgah.png'
  },
  {
    id: 4, name: 'Lubja Azad Mim', role: 'Occupational Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1772952474/mim_hshi1k.png'
  },
  {
    id: 5, name: 'Farah Ulfath Mukut', role: 'ABA Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1773220119/mukut_iytck9.png'
  },
  {
    id: 6, name: 'Tanzina Tisha', role: 'Occupational Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1772952474/tanzina_akter_gl7qzr.png'
  },
  {
    id: 7, name: 'Md. Meraj Hossain Shaon', role: 'SLT Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1772952473/Shaon_qvag2y.png'
  },
  {
    id: 8, name: 'Nazifa', role: 'ABA Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1773164783/najifa_o07okk.png'
  },
  {
    id: 9, name: 'Iqra Muntaha', role: 'Associate Sr. SLP Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1773164783/iqra_muntaha_ujjy51.png'
  },
  {
    id: 10, name: 'Umme Hafsa', role: 'ABA Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1773213808/umme_hafsa_hnwqod.png'
  },
  {
    id: 11, name: 'Sabria Yesmin', role: 'SLP Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1773235011/sabria_yesmin_g7rhvd.png'
  },
  {
    id: 12, name: 'Leja Mrong', role: 'ABA Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1773220101/leja_mrong_cj6tql.png'
  },
  {
    id: 13, name: 'Sadika Afrin', role: 'ABA Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1773218396/sadika_afrin_dqh6fm.png'
  },
  {
    id: 14, name: 'Fariha Sultana', role: 'SLP Therapist',
    image: 'https://res.cloudinary.com/dl1rkhdzt/image/upload/v1773290979/fariha_sultana_crepwg.png'
  },
];

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

interface TeamProps {
  variant?: 'slider' | 'grid';
}

function MemberCard({ member, animated = false }: { member: typeof team[0]; animated?: boolean }) {
  const inner = (
    <div className="group relative cursor-pointer select-none">
      <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100 mb-3" style={{ aspectRatio: '4/5' }}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          draggable={false}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-900 leading-snug truncate group-hover:text-primary transition-colors duration-200">
          {member.name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5 font-medium truncate">{member.role}</p>
      </div>
    </div>
  );

  if (animated) return <motion.div variants={fadeUp}>{inner}</motion.div>;
  return inner;
}

export default function Team({ variant = 'slider' }: TeamProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const dragVelocity = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);

  const CARD_WIDTH = 272 + 16; // card + gap
  const TOTAL = team.length;
  const doubledTeam = [...team, ...team];

  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-64px' });

  // ── Auto-scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (variant !== 'slider') return;
    const el = scrollRef.current;
    if (!el) return;

    const step = () => {
      if (!isPaused.current && el) {
        posRef.current += 0.4;
        const maxScroll = el.scrollWidth / 2;
        if (posRef.current >= maxScroll) posRef.current = 0;
        el.scrollLeft = posRef.current;
        setActiveIndex(Math.round(posRef.current / CARD_WIDTH) % TOTAL);
      }
      animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [variant, CARD_WIDTH, TOTAL]);

  // ── Mouse drag handlers ───────────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    isPaused.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = posRef.current;
    lastDragX.current = e.clientX;
    lastDragTime.current = Date.now();
    dragVelocity.current = 0;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const now = Date.now();
    const dt = now - lastDragTime.current;
    const dx = e.clientX - lastDragX.current;
    if (dt > 0) dragVelocity.current = dx / dt;
    lastDragX.current = e.clientX;
    lastDragTime.current = now;

    const walked = dragStartX.current - e.clientX;
    const maxScroll = scrollRef.current.scrollWidth / 2;
    let next = dragStartScroll.current + walked;
    if (next < 0) next = maxScroll + next;
    if (next >= maxScroll) next -= maxScroll;
    posRef.current = next;
    scrollRef.current.scrollLeft = posRef.current;
    setActiveIndex(Math.round(posRef.current / CARD_WIDTH) % TOTAL);
  }, [CARD_WIDTH, TOTAL]);

  const onMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
    const momentum = -dragVelocity.current * 80;
    const el = scrollRef.current;
    if (el && Math.abs(momentum) > 5) {
      const maxScroll = el.scrollWidth / 2;
      let next = posRef.current + momentum;
      if (next < 0) next = maxScroll + next;
      if (next >= maxScroll) next -= maxScroll;
      posRef.current = next;
      el.scrollLeft = posRef.current;
    }
    setTimeout(() => { isPaused.current = false; }, 2000);
  }, []);

  // ── Touch handlers ────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isPaused.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartScroll.current = posRef.current;
    lastDragX.current = e.touches[0].clientX;
    lastDragTime.current = Date.now();
    dragVelocity.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const now = Date.now();
    const dt = now - lastDragTime.current;
    const dx = e.touches[0].clientX - lastDragX.current;
    if (dt > 0) dragVelocity.current = dx / dt;
    lastDragX.current = e.touches[0].clientX;
    lastDragTime.current = now;

    const walked = dragStartX.current - e.touches[0].clientX;
    const maxScroll = scrollRef.current.scrollWidth / 2;
    let next = dragStartScroll.current + walked;
    if (next < 0) next = maxScroll + next;
    if (next >= maxScroll) next -= maxScroll;
    posRef.current = next;
    scrollRef.current.scrollLeft = posRef.current;
    setActiveIndex(Math.round(posRef.current / CARD_WIDTH) % TOTAL);
  }, [CARD_WIDTH, TOTAL]);

  const onTouchEnd = useCallback(() => {
    const momentum = -dragVelocity.current * 80;
    const el = scrollRef.current;
    if (el && Math.abs(momentum) > 5) {
      const maxScroll = el.scrollWidth / 2;
      let next = posRef.current + momentum;
      if (next < 0) next = maxScroll + next;
      if (next >= maxScroll) next -= maxScroll;
      posRef.current = next;
      el.scrollLeft = posRef.current;
    }
    setTimeout(() => { isPaused.current = false; }, 2000);
  }, []);

  // ── Arrow scroll ──────────────────────────────────────────────────────────
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = CARD_WIDTH * 2;
    const maxScroll = el.scrollWidth / 2;
    let next = posRef.current + (direction === 'left' ? -amount : amount);
    if (next < 0) next = maxScroll + next;
    if (next >= maxScroll) next -= maxScroll;
    posRef.current = next;
    el.scrollLeft = posRef.current;
  };

  const jumpTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    posRef.current = index * CARD_WIDTH;
    el.scrollLeft = posRef.current;
    setActiveIndex(index);
  };

  // ── Slider ────────────────────────────────────────────────────────────────
  if (variant === 'slider') {
    return (
      <section className="py-16 lg:py-20 bg-white overflow-hidden" id="team">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-primary inline-block" /> Our Experts
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-[1.08]">
                Meet our team.
              </h2>
              <p className="text-gray-400 mt-3 text-sm max-w-sm leading-relaxed">
                Small steps, big milestones — guided by our passionate specialists.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="hidden md:flex items-center gap-2 mr-2 text-gray-400">
                <Users size={13} />
                <span className="text-xs font-semibold">{team.length} specialists</span>
              </div>
              <button onClick={() => scroll('left')}
                className="w-9 h-9 rounded-xl border border-gray-200 hover:border-gray-950 hover:bg-gray-950 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => scroll('right')}
                className="w-9 h-9 rounded-xl border border-gray-200 hover:border-gray-950 hover:bg-gray-950 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200">
                <ChevronRight size={16} />
              </button>
              <Link href="/team"
                className="group flex items-center gap-2 bg-gray-950 hover:bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors duration-200 ml-2">
                Full Team
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Slider track */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-hidden pb-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              cursor: 'grab',
              userSelect: 'none',
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {doubledTeam.map((member, index) => (
              <div
                key={`${member.id}-${index}`}
                className="flex-shrink-0 w-64 transition-transform duration-200 hover:-translate-y-1.5"
                onMouseEnter={() => { if (!isDragging.current) isPaused.current = true; }}
                onMouseLeave={() => { if (!isDragging.current) isPaused.current = false; }}
              >
                <MemberCard member={member} />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {team.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                className={`block h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-primary' : 'w-1.5 bg-gray-200 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Grid ──────────────────────────────────────────────────────────
  return (
    <motion.div
      ref={gridRef}
      variants={stagger}
      initial="hidden"
      animate={gridInView ? 'show' : 'hidden'}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {team.map((member) => (
          <MemberCard key={member.id} member={member} animated />
        ))}
      </div>
    </motion.div>
  );
}