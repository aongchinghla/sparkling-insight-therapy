import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Info',
    description:
        'Contact Sparkling Insight Therapy Point in Dhaka for appointments, therapy services, consultations, and child development support.',
    keywords: [
        'contact Sparkling Insight Therapy Point',
        'therapy center contact in Dhaka',
        'speech therapy appointment Dhaka',
        'occupational therapy contact Dhaka',
        'ABA therapy center contact Bangladesh',
        'child development center Dhaka contact',
    ],
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact Info | Sparkling Insight Therapy Point',
        description:
            'Contact Sparkling Insight Therapy Point in Dhaka for appointments, therapy services, consultations, and child development support.',
        url: 'https://sparklingtherapybd.com/contact',
        siteName: 'Sparkling Insight Therapy Point',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Info | Sparkling Insight Therapy Point',
        description:
            'Contact Sparkling Insight Therapy Point in Dhaka for appointments, therapy services, consultations, and child development support.',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}