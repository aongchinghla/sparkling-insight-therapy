'use client';

import React from 'react';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="h-[3px] bg-primary" />

      <div className="absolute pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '80px 100%', inset: 0 }} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-20 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">

          <div className="space-y-6">
            <Link href="/">
              <div className="relative w-32 h-18 mb-3">
                <Image src="/footer_logo.png" alt="Sparkling Insight" fill className="object-contain object-left" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Nurturing every child&apos;s potential through expert therapy and compassionate care in Dhaka, Bangladesh.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {[
                { href: 'https://www.facebook.com/profile.php?id=61555970824519', icon: Facebook },
                { href: 'https://www.instagram.com/sparklinginsightbd/', icon: Instagram },
                { href: 'https://www.youtube.com/channel/UCS81ctdUNTss-ddihVl-y4w', icon: Youtube },
              ].map(({ href, icon: Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/8 hover:border-primary/40 flex items-center justify-center text-gray-400 hover:text-primary transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
              <span className="w-3 h-px bg-gray-600 inline-block" /> Navigation
            </p>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Services', href: '/services' },
                { name: 'About Us', href: '/about' },
                { name: 'Team', href: '/team' },
                { name: 'Career', href: '/career' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map(({ name, href }) => (
                <li key={name}>
                  <Link href={href}
                    className="group flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
              <span className="w-3 h-px bg-gray-600 inline-block" /> Services
            </p>
            <ul className="space-y-3">
              {[
                { name: 'Occupational Therapy', href: '/services/occupational-therapy' },
                { name: 'Speech & Language', href: '/services/speech-therapy' },
                { name: 'ABA Therapy', href: '/services/aba-therapy' },
                { name: 'Physiotherapy', href: '/services/physiotherapy' },
                { name: 'School Readiness', href: '/services/school-readiness' },
                { name: 'Group Therapy', href: '/services/group-therapy' },
                { name: 'Counseling', href: '/services/counseling-services' },
              ].map(({ name, href }) => (
                <li key={name}>
                  <Link href={href}
                    className="group flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
              <span className="w-3 h-px bg-gray-600 inline-block" /> Contact
            </p>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin size={15} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">House No: 395, New Eskaton Road, Dhaka 1000</span>
                </div>
              </li>
              <li>
                <a href="tel:+8801902028787"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  <Phone size={15} className="text-primary flex-shrink-0" />
                  +880 1902-028787
                </a>
              </li>
              <li>
                <a href="mailto:sparklingtherapybd@gmail.com"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  <Mail size={15} className="text-primary flex-shrink-0" />
                  sparklingtherapybd@gmail.com
                </a>
              </li>
            </ul>

            {/* Mini map */}
            <a
              href="https://maps.google.com/maps?q=Sparkling+Insight+Therapy,+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block relative w-full rounded-xl overflow-hidden border border-white/10"
              style={{ height: '140px' }}
            >
              <iframe
                src="https://maps.google.com/maps?q=Sparkling+Insight+Therapy,+Dhaka&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sparkling Insight Location"
              />
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Sparkling Insight Therapy Point. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Design and Dev by <span className="text-gray-400 font-medium">Ui Streams</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
