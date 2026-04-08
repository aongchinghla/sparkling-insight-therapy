'use client';

import React from 'react';
import Hero from '@/components/home/Hero';
import Challenges from '@/components/home/Challenges';
import FeaturedVideos from '@/components/home/FeaturedVideos';
import Services from '@/components/home/Services';
import Blog from '@/components/home/Blog';
import Testimonials from '@/components/home/Testimonials';
import Team from '@/components/home/Team';
import Gallery from '@/components/home/Gallery';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Challenges />
      <FeaturedVideos />
      <Services />
      <Team />
      <Gallery />
      <Blog />
      <Testimonials />
    </main>
  );
}