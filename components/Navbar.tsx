'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';

export default function Navbar() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    {
      name: 'Services', href: '#services',
      dropdown: [
        { name: 'Occupational Therapy', href: '/services/occupational-therapy' },
        { name: 'Speech & Language Therapy', href: '/services/speech-therapy' },
        { name: 'ABA Therapy', href: '/services/aba-therapy' },
        { name: 'Physiotherapy', href: '/services/physiotherapy' },
        { name: 'School Readiness', href: '/services/school-readiness' },
        { name: 'Group Therapy', href: '/services/group-therapy' },
        { name: 'Counseling Services', href: '/services/counseling-services' },
      ],
    },
    // { name: 'Premium Videos', href: '/premium-videos' },
    { name: 'Team', href: '/team' },
    { name: 'Career', href: '/career' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // text color based on menu state
  const linkCls = 'text-gray-700 hover:text-primary';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-4">
      {/* Primary top bar — always visible */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-42 h-14">
              <Image src="/logo.png" alt="Sparkling Insight" fill className="object-contain object-left" />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <>
                    <button className={`relative flex items-center gap-1 text-sm font-medium px-3 py-2 transition-all duration-150 group/link ${isActive(link.href) ? 'text-primary' : linkCls}`}>
                      {link.name}
                      <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200 opacity-50" />
                      <span className={`absolute bottom-0 left-3 right-3 h-[2px] bg-primary transition-transform duration-200 origin-left rounded-full ${isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-100'}`} />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out origin-top z-50 overflow-hidden">
                      {/* Accent */}
                      <div className="h-[2px] bg-primary" />
                      <div className="py-2">
                        {link.dropdown.map((item) => (
                          <Link key={item.name} href={item.href}
                            className="group/item flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors duration-150">
                            {item.name}
                            <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 text-primary" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={link.href}
                    className={`relative text-sm font-medium px-3 py-2 transition-colors duration-150 group/link ${isActive(link.href) ? 'text-primary' : linkCls}`}>
                    {link.name}
                    <span className={`absolute bottom-0 left-3 right-3 h-[2px] bg-primary transition-transform duration-200 origin-left rounded-full ${isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-100'}`} />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={openModal}
              className="group flex items-center gap-2 bg-gray-950 hover:bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors duration-200">
              <Calendar size={15} />
              Book Appointment
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenu(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-gray-100 mt-4 overflow-hidden"
          >
            <div className="px-6 pt-3 pb-6 space-y-0.5 max-h-[calc(100vh-85px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setServicesOpen(!isServicesOpen)}
                        className={`w-full flex items-center justify-between px-3 py-3.5 text-sm font-semibold rounded-xl transition-colors ${isActive(link.href)
                          ? 'text-primary bg-primary/5'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                          }`}
                      >
                        {link.name}
                        <ChevronDown size={15} className={`transition-transform duration-200 opacity-40 ${isServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="ml-3 border-l-2 border-primary/20 pl-3 overflow-hidden"
                          >
                            {link.dropdown.map((item) => (
                              <Link key={item.name} href={item.href}
                                onClick={() => setMobileMenu(false)}
                                className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-500 hover:text-primary transition-colors rounded-lg hover:bg-gray-50">
                                <ArrowRight size={11} className="text-primary opacity-50" />
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={link.href}
                      onClick={() => setMobileMenu(false)}
                      className={`flex items-center px-3 py-3.5 text-sm font-semibold rounded-xl transition-colors ${isActive(link.href)
                        ? 'text-primary bg-primary/5'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}>
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4">
                <button onClick={() => { setMobileMenu(false); openModal(); }}
                  className="w-full bg-gray-950 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary transition-colors duration-200">
                  <Calendar size={16} />
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}