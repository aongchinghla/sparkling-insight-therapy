import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Therapists',
    description:
        'Meet the expert therapists and leadership team at Sparkling Insight Therapy Point who support children and families in Dhaka with compassionate, multidisciplinary care.',
    keywords: [
        'our therapists',
        'Sparkling Insight Therapy Point team',
        'therapy team in Dhaka',
        'occupational therapist in Dhaka',
        'speech therapist in Dhaka',
        'ABA therapist in Dhaka',
        'child development specialists in Bangladesh',
    ],
    alternates: {
        canonical: '/team',
    },
    openGraph: {
        title: 'Our Therapists | Sparkling Insight Therapy Point',
        description:
            'Meet the expert therapists and leadership team at Sparkling Insight Therapy Point who support children and families in Dhaka with compassionate, multidisciplinary care.',
        url: 'https://www.sparklingtherapybd.com/team',
        siteName: 'Sparkling Insight Therapy Point',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Therapists | Sparkling Insight Therapy Point',
        description:
            'Meet the expert therapists and leadership team at Sparkling Insight Therapy Point who support children and families in Dhaka with compassionate, multidisciplinary care.',
    },
};

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}