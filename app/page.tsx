import { Metadata } from 'next';
import React from 'react';
import Hero from '@/components/home/Hero';
import Challenges from '@/components/home/Challenges';
import FeaturedVideos from '@/components/home/FeaturedVideos';
import Services from '@/components/home/Services';
import Blog from '@/components/home/Blog';
import Testimonials from '@/components/home/Testimonials';
import Team from '@/components/home/Team';
import Gallery from '@/components/home/Gallery';
import { localBusinessJsonLd, servicesItemListJsonLd, websiteJsonLd } from '@/lib/site';
import { services } from '@/data/services';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesItemListJsonLd(services)) }}
      />

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
