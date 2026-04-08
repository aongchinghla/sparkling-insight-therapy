'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible]         = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered]         = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll  = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setScrollProgress(windowHeight > 0 ? totalScroll / windowHeight : 0);
      setIsVisible(totalScroll > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // SVG ring
  const SIZE         = 40;
  const STROKE       = 2.5;
  const RADIUS       = (SIZE - STROKE * 2) / 2;   // 17.5
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dashOffset   = CIRCUMFERENCE * (1 - scrollProgress);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{   opacity: 0, scale: 0.6,  y: 12 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="fixed bottom-24 right-6 z-50"
        >
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Scroll to top"
            className="relative flex items-center justify-center focus:outline-none"
            style={{ width: SIZE, height: SIZE }}
          >
            {/* ── Dark filled background disc ── */}
            <motion.span
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute inset-0 rounded-full bg-gray-950 shadow-lg shadow-gray-950/30"
            />

            {/* ── SVG progress ring ── */}
            <svg
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="absolute inset-0 -rotate-90 pointer-events-none"
            >
              {/* Track */}
              <circle
                cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={STROKE}
              />
              {/* Progress */}
              <motion.circle
                cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                className="text-primary transition-[stroke-dashoffset] duration-100 ease-out"
              />
            </svg>

            {/* ── Arrow icon ── */}
            <motion.span
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="relative z-10"
            >
              <ArrowUp size={13} strokeWidth={2.5} className="text-white" />
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}