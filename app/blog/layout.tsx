import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resources for Parents',
    description:
        'Explore helpful articles, therapy guides, and child development resources for parents and caregivers from Sparkling Insight Therapy Point.',
    keywords: [
        'Sparkling Insight Therapy Point blog',
        'parent resources',
        'child development articles',
        'speech therapy articles',
        'occupational therapy blog',
        'ABA therapy resources',
        'therapy blog in Dhaka',
    ],
    alternates: {
        canonical: '/blog',
    },
    openGraph: {
        title: 'Resources for Parents | Sparkling Insight Therapy Point',
        description:
            'Explore helpful articles, therapy guides, and child development resources for parents and caregivers from Sparkling Insight Therapy Point.',
        url: 'https://www.sparklingtherapybd.com/blog',
        siteName: 'Sparkling Insight Therapy Point',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Resources for Parents | Sparkling Insight Therapy Point',
        description:
            'Explore helpful articles, therapy guides, and child development resources for parents and caregivers from Sparkling Insight Therapy Point.',
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}