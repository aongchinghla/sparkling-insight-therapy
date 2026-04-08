'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Variants } from 'motion/react';
import { ArrowRight, Play, Download, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface PurchasedVideo {
  id: string;
  title: string;
  purchaseDate: string;
  vimeoLink: string;
  downloadEnabled: boolean;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function MyVideosSearch() {
  const [email, setEmail] = useState('');
  const [videos, setVideos] = useState<PurchasedVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage('');
    setError('');
    setVideos([]);

    try {
      const res = await fetch('/api/my-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });

      const data = await res.json();

      if (data.success) {
        setVideos(data.videos || []);
        if (data.videos.length === 0) {
          setMessage("No verified purchases found with this email. If you just paid, please wait for manual verification.");
        }
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to fetch videos. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-12">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:outline-none text-sm font-medium text-gray-900 placeholder:text-gray-300 transition-colors duration-200"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="group flex items-center justify-center gap-2 bg-gray-950 hover:bg-primary text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 shrink-0 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Find My Videos
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </>
          )}
        </button>
      </form>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {videos.length > 0 ? (
          <motion.div
            key="results"
            initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-4 max-w-2xl mx-auto"
          >
            {videos.map((video) => (
              <motion.div
                key={video.id}
                variants={fadeUp}
                className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 size={12} className="text-primary" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.14em]">Verified Purchase</span>
                  </div>
                  <h4 className="font-bold text-gray-900">{video.title}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">Purchased on: {video.purchaseDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={video.vimeoLink}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-950 hover:bg-black text-white text-[11px] font-bold px-5 py-2.5 rounded-lg transition-colors"
                  >
                    <Play size={12} fill="currentColor" /> Watch
                  </a>
                  {video.downloadEnabled && (
                    <a
                      href={video.vimeoLink}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-gray-200 hover:border-primary hover:text-primary text-gray-500 text-[11px] font-bold px-5 py-2.5 rounded-lg transition-colors"
                    >
                      <Download size={12} /> Download
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            variants={fadeUp} initial="hidden" animate="show"
            className="max-w-md mx-auto bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3"
          >
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-red-600 font-medium leading-relaxed">{error}</p>
          </motion.div>
        ) : message ? (
          <motion.div
            key="message"
            variants={fadeUp} initial="hidden" animate="show"
            className="max-w-md mx-auto text-center py-10 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200"
          >
            <p className="text-sm text-gray-500 font-medium px-8">{message}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
