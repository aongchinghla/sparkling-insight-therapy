import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sparkling Insight Therapy Point',
    short_name: 'Sparkling Insight Therapy Point',
    description:
      'Sparkling Insight Therapy Point in Dhaka offers Occupational Therapy, Speech & Language Therapy, ABA Therapy, physiotherapy, counseling, and school readiness programs for children with autism and developmental delays.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
