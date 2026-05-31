import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Careers',
    description:
        'Explore career opportunities at Sparkling Insight Therapy Point and join our mission to support children and families in Dhaka.',
    keywords: [
        'careers at Sparkling Insight Therapy Point',
        'therapy jobs in Dhaka',
        'occupational therapist job in Bangladesh',
        'speech therapist job in Dhaka',
        'ABA therapist job in Bangladesh',
        'child development center careers',
    ],
    alternates: {
        canonical: '/career',
    },
    openGraph: {
        title: 'Careers | Sparkling Insight Therapy Point',
        description:
            'Explore career opportunities at Sparkling Insight Therapy Point and join our mission to support children and families in Dhaka.',
        url: 'https://sparklingtherapybd.com/career',
        siteName: 'Sparkling Insight Therapy Point',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Careers | Sparkling Insight Therapy Point',
        description:
            'Explore career opportunities at Sparkling Insight Therapy Point and join our mission to support children and families in Dhaka.',
    },
};

export default function CareerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}