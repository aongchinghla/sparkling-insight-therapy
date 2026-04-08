import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import GlobalLayout from '@/components/GlobalLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Sparkling Insight Therapy Point | Child Development Center',
  description: 'Sparkling Insight Therapy Point in Dhaka offers Occupational Therapy, Speech & Language Therapy, ABA Therapy, physiotherapy, counseling, and school readiness programs for children with autism and developmental delays.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <GlobalLayout>
          {children}
        </GlobalLayout>
        <ScrollToTop />
      </body>
    </html>
  );
}
