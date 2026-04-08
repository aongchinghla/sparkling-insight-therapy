'use client';

import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function ServiceBookingCard() {
  const { openModal } = useModal();

  return (
    <div className="relative bg-gray-950 rounded-2xl overflow-hidden p-7">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '80px 100%' }} />
      {/* Glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-5">
          <Calendar size={18} className="text-primary" />
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 flex items-center gap-2">
          <span className="w-3 h-px bg-primary inline-block" /> Free Consultation
        </p>
        <h3 className="text-lg font-bold text-white leading-snug mb-3">
          Book a Session
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-7">
          Not sure if this is the right therapy? Schedule a free consultation with our experts.
        </p>

        <button
          onClick={openModal}
          className="group w-full bg-white hover:bg-primary text-gray-900 hover:text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          Book Now
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}