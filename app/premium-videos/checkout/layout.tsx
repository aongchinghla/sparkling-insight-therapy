import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PremiumVideosCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
