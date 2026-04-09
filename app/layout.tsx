import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import GlobalLayout from '@/components/GlobalLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://sparklingtherapybd.com'),
  title: {
    default: 'Sparkling Insight Therapy Point | Child Development Center in Dhaka',
    template: '%s | Sparkling Insight Therapy Point',
  },
  description:
    'Sparkling Insight Therapy Point in Dhaka offers Occupational Therapy, Speech & Language Therapy, ABA Therapy, physiotherapy, counseling, and school readiness programs for children with autism and developmental delays.',
  applicationName: 'Sparkling Insight Therapy Point',
  keywords: [
    'Sparkling Insight Therapy Point',
    'child development center in Dhaka',
    'speech therapy in Dhaka',
    'occupational therapy in Dhaka',
    'ABA therapy in Dhaka',
    'physiotherapy for children in Dhaka',
    'child counseling in Dhaka',
    'school readiness program in Dhaka',
    'autism therapy center in Dhaka',
    'developmental delay therapy in Bangladesh',
  ],
  verification: {
    google: 'JNM4Ji79XDOoitPGYZCaMiEhtNFmZAuYWDA5DQ0pMU8',
  },
  openGraph: {
    title: 'Sparkling Insight Therapy Point | Child Development Center in Dhaka',
    description:
      'Speech therapy, occupational therapy, ABA therapy, physiotherapy, counseling, and school readiness programs for children in Dhaka.',
    url: 'https://sparklingtherapybd.com',
    siteName: 'Sparkling Insight Therapy Point',
    locale: 'en_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sparkling Insight Therapy Point | Child Development Center in Dhaka',
    description:
      'Speech therapy, occupational therapy, ABA therapy, physiotherapy, counseling, and school readiness programs for children in Dhaka.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'healthcare',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <GlobalLayout>{children}</GlobalLayout>
        <ScrollToTop />
      </body>
    </html>
  );
}