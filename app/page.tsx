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

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sparkling Insight Therapy Point',
    alternateName: ['Sparkling Insight', 'Sparkling Therapy BD'],
    url: 'https://www.sparklingtherapybd.com/',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sparkling Insight Therapy Point',
    url: 'https://www.sparklingtherapybd.com',
    logo: 'https://www.sparklingtherapybd.com/favicon.ico',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+8801902028787',
        contactType: 'customer service',
        areaServed: 'BD',
        availableLanguage: ['en', 'bn'],
      },
    ],
  };

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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