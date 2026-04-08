'use client';

import { ArrowRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function BottomCTA({ serviceName }: { serviceName: string }) {
  const { openModal } = useModal();

  return (
    <div className="relative bg-gray-950 rounded-2xl overflow-hidden px-8 py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg,white 0,white 1px,transparent 0,transparent 50%)',
          backgroundSize: '80px 100%',
        }}
      />
      <div className="relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Ready to begin?</p>
        <h3 className="text-xl font-bold text-white leading-tight">
          Book a session for {serviceName}
        </h3>
      </div>
      <button
        onClick={openModal}
        className="relative z-10 flex-shrink-0 group flex items-center gap-2 bg-white text-gray-900 hover:bg-primary hover:text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-all duration-200"
      >
        Book Now
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    </div>
  );
}