import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description:
        'Learn about Sparkling Insight Therapy Point, our mission, vision, multidisciplinary approach, and commitment to supporting children and families in Dhaka.',
    keywords: [
        'about Sparkling Insight Therapy Point',
        'child development center in Dhaka',
        'therapy center in Dhaka',
        'speech therapy center in Dhaka',
        'occupational therapy center in Dhaka',
        'ABA therapy center in Dhaka',
        'child therapy team in Bangladesh',
    ],
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About Us | Sparkling Insight Therapy Point',
        description:
            'Learn about Sparkling Insight Therapy Point, our mission, vision, multidisciplinary approach, and commitment to supporting children and families in Dhaka.',
        url: 'https://sparklingtherapybd.com/about',
        siteName: 'Sparkling Insight Therapy Point',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us | Sparkling Insight Therapy Point',
        description:
            'Learn about Sparkling Insight Therapy Point, our mission, vision, multidisciplinary approach, and commitment to supporting children and families in Dhaka.',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}