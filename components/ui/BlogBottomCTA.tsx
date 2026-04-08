'use client';

import { useModal } from '@/context/ModalContext';

export default function BlogBottomCTA() {
  const { openModal } = useModal();

  return (
    <div className="mt-16 relative bg-gray-950 rounded-2xl px-8 py-10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-2">Need support?</p>
          <h3 className="text-xl font-bold text-white">Book a consultation with our team.</h3>
          <p className="text-sm text-white/45 mt-1">We are here to help your child thrive.</p>
        </div>
        <button
          onClick={openModal}
          className="flex-shrink-0 flex items-center gap-2 bg-white hover:bg-primary hover:text-white text-gray-900 text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}