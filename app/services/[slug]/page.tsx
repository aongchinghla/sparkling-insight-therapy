import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import ServiceBookingCard from '@/components/ui/ServiceBookingCard';
import BottomCTA from '@/components/ui/BottomCTA';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service page could not be found.',
    };
  }

  const cleanName = service.name.replace(/\s*\([^)]*\)\s*/g, '').trim();
  const title = `${service.name} in Dhaka`;
  const description = `${service.desc} Learn how ${cleanName.toLowerCase()} at Sparkling Insight Therapy Point supports children in Dhaka.`;

  return {
    title,
    description,
    keywords: [
      service.name,
      `${cleanName} in Dhaka`,
      `${cleanName} for children`,
      'Sparkling Insight Therapy Point',
      'child therapy center in Dhaka',
      ...service.focusAreas.slice(0, 4),
    ],
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} | Sparkling Insight Therapy Point`,
      description,
      url: `https://www.sparklingtherapybd.com/services/${service.slug}`,
      type: 'website',
      siteName: 'Sparkling Insight Therapy Point',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} | Sparkling Insight Therapy Point`,
      description,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) return notFound();

  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gray-950 pt-36 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg,white 0,white 1px,transparent 0,transparent 50%)',
            backgroundSize: '80px 100%',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
        <div className="absolute -left-32 top-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/30 mb-10">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white/60 transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-primary">{service.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-8 max-w-3xl">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${service.color} ring-1 ring-white/10`}>
              <service.icon size={28} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-primary inline-block" /> Our Services
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] tracking-tight mb-4">
                {service.name}
              </h1>
              <p className="text-white/50 text-sm leading-relaxed max-w-xl">
                {service.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gray-400 hover:text-gray-900 transition-colors mb-16 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">
          <div className="space-y-20">
            <section>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-primary inline-block" /> Overview
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-6">
                What is {service.name}?
              </h2>
              <div className="text-gray-500 leading-relaxed whitespace-pre-line text-sm space-y-4 border-l-2 border-gray-100 pl-6">
                {service.fullDescription}
              </div>
            </section>

            <section>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-primary inline-block" /> Focus Areas
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-8">
                What We Work On
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.focusAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors duration-200">
                      <CheckCircle size={14} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-primary inline-block" /> Benefits
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-8">
                How It Helps Your Child
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-primary/8 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <span className="text-gray-600 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-5">
            <ServiceBookingCard />

            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 flex items-center gap-2">
                  <span className="w-3 h-px bg-gray-300 inline-block" /> Other Services
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${s.color}`}>
                        <s.icon size={13} />
                      </div>
                      <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors duration-150">
                        {s.name}
                      </span>
                    </div>
                    <ArrowRight size={13} className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-primary/[0.04] border border-primary/15 p-5">
              <p className="text-xs font-bold text-gray-700 mb-1">Have questions?</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Our team is happy to help you understand which services are right for your child.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors"
              >
                Get in touch
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </aside>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 mt-8">
          <BottomCTA serviceName={service.name} />
        </div>
      </div>
    </div>
  );
}