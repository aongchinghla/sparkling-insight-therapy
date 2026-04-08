'use client';

import React, { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import { Lock, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

interface VimeoPlayerProps {
  videoUrl: string;
  checkoutUrl: string;
}

export default function VimeoPlayer({ videoUrl, checkoutUrl }: VimeoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    player.on('loaded', () => {
      setIsReady(true);
    });

    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 4000);

    player.on('timeupdate', (data: any) => {
      if (data.seconds >= 20) {
        player.pause().catch(() => { });
        setIsLimitReached(true);
      }
    });

    player.on('play', () => {
      if (isLimitReached) {
        player.pause().catch(() => { });
      }
    });

    return () => {
      clearTimeout(timeout);
      player.destroy();
    };
  }, [videoUrl, isLimitReached]);

  return (
    <div className="relative w-full h-full group bg-black overflow-hidden">
      <iframe
        ref={iframeRef}
        src={videoUrl}
        className={`w-full h-full transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        allow="autoplay; fullscreen; picture-in-picture"
        title="Therapy Session Preview"
      />

      {!isReady && !isLimitReached && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950">
          <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Initializing Preview</p>
        </div>
      )}

      {isLimitReached && (
        <div className="absolute inset-0 z-20 bg-gray-950/80 backdrop-blur-xl flex items-center justify-center p-2 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="relative p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden max-w-[260px] w-full mx-auto">
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/20 blur-[50px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-2 shadow-lg shadow-primary/5 border border-primary/10">
                <Lock className="text-primary" size={16} strokeWidth={2.5} />
              </div>

              <h4 className="text-white font-bold text-base mb-1 tracking-tight">Full Access</h4>
              <p className="text-white/40 text-[10px] leading-tight mb-3 px-2">
                Preview ended. Purchase to unlock full session.
              </p>

              <Link
                href={checkoutUrl}
                className="group/btn w-full flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-[11px] font-bold py-2 rounded-lg transition-all shadow-lg shadow-primary/10 active:scale-95"
              >
                Unlock Full Video
                <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
