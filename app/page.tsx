import type { Metadata } from 'next';
import React from 'react';
import Hero from '@/components/home/Hero';
import Challenges from '@/components/home/Challenges';
import FeaturedVideos from '@/components/home/FeaturedVideos';
import Services from '@/components/home/Services';
import Blog from '@/components/home/Blog';
import Testimonials from '@/components/home/Testimonials';
import Team from '@/components/home/Team';
import Gallery from '@/components/home/Gallery';

export const metadata: Metadata = {
  title: 'Sparkling Insight Therapy Point | Child Development Center in Dhaka',
  description:
    'Sparkling Insight Therapy Point in Dhaka provides speech therapy, occupational therapy, ABA therapy, physiotherapy, counseling, school readiness, and child development support for children.',
  alternates: {
    canonical: '/',
  },
};

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