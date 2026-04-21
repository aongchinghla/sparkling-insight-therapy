import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, LayoutGrid, Phone } from 'lucide-react';
import { services } from '@/data/services';
import {
  breadcrumbJsonLd,
  servicesItemListJsonLd,
  siteConfig,
} from '@/lib/site';

export const metadata: Metadata = {
  title: 'Therapy Services in Dhaka',
  description:
    'Explore speech therapy, occupational therapy, ABA therapy, physiotherapy, school readiness, group therapy, and counseling services for children in Dhaka, Bangladesh.',
  keywords: [
    'therapy services in Dhaka',
    'child therapy center Bangladesh',
    'speech therapy Dhaka',
    'occupational therapy Dhaka',
    'ABA therapy Dhaka',
    'autism therapy center Dhaka',
    'school readiness program Dhaka',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Therapy Services in Dhaka | Sparkling Insight Therapy Point',
    description:
      'Specialized child development and therapy services for families in Dhaka, Bangladesh.',
    url: 'https://www.sparklingtherapybd.com/services',
    siteName: 'Sparkling Insight Therapy Point',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Therapy Services in Dhaka | Sparkling Insight Therapy Point',
    description:
      'Specialized child development and therapy services for families in Dhaka, Bangladesh.',
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesItemListJsonLd(services)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
            ]),
          ),
        }}
      />

      <section className="relative bg-gray-950 pt-36 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg,white 0,white 1px,transparent 0,transparent 50%)',
            backgroundSize: '80px 100%',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> Child Therapy Services
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-5">
              Therapy services for children in Dhaka.
            </h1>
            <p className="text-white/55 text-base leading-relaxed max-w-2xl">
              Our multidisciplinary team supports speech, sensory, behavior,
              motor, school readiness, social, and family needs with practical,
              evidence-informed care.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> Programs
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              Choose the right support.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <LayoutGrid size={14} />
            <span className="text-xs font-semibold">{services.length} services available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative h-full bg-white border border-gray-200 rounded-2xl p-6 flex flex-col overflow-hidden hover:border-gray-950 hover:bg-gray-950 transition-all duration-300"
            >
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              <span className="absolute top-4 right-5 text-[11px] font-bold text-gray-200 group-hover:text-white/20 transition-colors duration-300 select-none">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0 ${service.color} group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-200`}>
                <service.icon size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-200">
                {service.name}
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-white/55 leading-relaxed mb-5 flex-1">
                {service.desc}
              </p>
              <ul className="space-y-2 mb-6">
                {service.focusAreas.slice(0, 3).map((area) => (
                  <li key={area} className="flex items-start gap-2 text-xs text-gray-500 group-hover:text-white/45">
                    <CheckCircle size={13} className="text-primary mt-0.5 shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 group-hover:text-primary transition-colors duration-200">
                Learn More
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 relative bg-gray-950 rounded-2xl overflow-hidden px-8 md:px-12 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
              Need guidance?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Talk to our team before choosing a service.
            </h2>
          </div>
          <a
            href={`tel:${siteConfig.phoneE164}`}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 shrink-0"
          >
            <Phone size={15} />
            Call {siteConfig.phoneDisplay}
          </a>
        </div>
      </section>
    </main>
  );
}
