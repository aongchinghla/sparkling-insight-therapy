import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Therapy Videos',
  description:
    'Parent-friendly therapy videos from Sparkling Insight Therapy Point with practical guidance for supporting children at home in Bangladesh.',
  alternates: {
    canonical: '/premium-videos',
  },
  openGraph: {
    title: 'Home Therapy Videos | Sparkling Insight Therapy Point',
    description:
      'Practical therapy guidance videos for parents and caregivers in Bangladesh.',
    url: 'https://www.sparklingtherapybd.com/premium-videos',
    siteName: 'Sparkling Insight Therapy Point',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Therapy Videos | Sparkling Insight Therapy Point',
    description:
      'Practical therapy guidance videos for parents and caregivers in Bangladesh.',
  },
};

export default function PremiumVideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
