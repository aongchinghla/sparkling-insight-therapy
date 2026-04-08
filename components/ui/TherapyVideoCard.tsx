'use client';

import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

interface VideoProps {
  id: string;
  title: string;
  description: string;
  price: number;
  vimeoVideoUrl: string; // 30 sec unlisted teaser
}

export default function TherapyVideoCard({ video }: { video: VideoProps }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full group">
        {/* Vimeo Embed Wrapper */}
        <div className="relative aspect-video bg-gray-900 w-full overflow-hidden">
          <iframe
            src={video.vimeoVideoUrl}
            allow="autoplay; fullscreen; picture-in-picture"
            className="absolute top-0 left-0 w-full h-full"
            title={video.title}
          ></iframe>
        </div>

        {/* Content Area */}
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4 gap-4">
            <h3 className="text-2xl font-bold text-gray-900 leading-[1.2] group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <div className="shrink-0 flex flex-col items-end">
              <span className="bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-base">
                ৳{video.price}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 uppercase font-semibold tracking-widest">BDT Only</span>
            </div>
          </div>

          <p className="text-gray-600 text-[15px] leading-relaxed mb-8 flex-grow">
            {video.description}
          </p>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4.5 px-6 rounded-2xl transition-all flex justify-center items-center gap-3 shadow-md shadow-primary/10 group-active:scale-95"
          >
            <span>Get Full Video Access</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          video={video}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </>
  );
}
