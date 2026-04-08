'use client';

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  Clock, ArrowRight, MessageSquare,
} from 'lucide-react';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({
  label, name, value, onChange, placeholder, type = 'text', required, icon,
}: {
  label: string; name: string; value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; type?: string; required?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-1.5 group-focus-within:text-primary transition-colors duration-200">
        <span className="opacity-60">{icon}</span>{label}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary transition-colors duration-200"
      />
    </div>
  );
}

// ─── Contact info card ────────────────────────────────────────────────────────
function InfoCard({ icon: Icon, label, value, sub, href }: {
  icon: React.ElementType; label: string; value: string; sub?: string; href?: string;
}) {
  const inner = (
    <motion.div
      variants={fadeUp}
      className="group flex gap-4 items-start p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-200 cursor-pointer"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary/15 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
        <Icon size={16} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      {href && (
        <ArrowRight size={13} className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-3" />
      )}
    </motion.div>
  );

  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
      {inner}
    </a>
  ) : <>{inner}</>;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      await new Promise(r => setTimeout(r, 1200));
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-12">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-primary inline-block" /> Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-5xl md:text-6xl font-bold text-gray-950 leading-[1.05] tracking-tight mb-6"
          >
            We&apos;d love to<br />
            <span className="text-primary">hear from</span> you.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-500 text-base leading-relaxed max-w-lg"
          >
            Whether you have a question about our services, want to schedule a consultation, or just want to say hello — our team is here to help.
          </motion.p>
        </div>
      </section>

      {/* ── Main split layout ─────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-20 items-start">

          {/* ── Left: Sticky sidebar ──────────────────────────────────────── */}
          <aside className="order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start space-y-6">
            <AnimatedSection className="space-y-6">

              {/* Contact details */}
              <motion.div variants={fadeUp}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
                  <span className="w-4 h-px bg-gray-300 inline-block" /> Contact Details
                </p>
                <div className="space-y-2">
                  <InfoCard icon={Phone} label="Phone" value="+880 1902-028787" sub="Sat – Fri, 9 AM – 6 PM" href="tel:+8801902028787" />
                  <InfoCard icon={Mail} label="Email" value="sparklingtherapybd@gmail.com" sub="We reply within 24 hours" href="mailto:sparklingtherapybd@gmail.com" />
                  <InfoCard icon={MapPin} label="Address" value="House No: 395, New Eskaton Road" sub="Dhaka 1000, Bangladesh" />
                  <InfoCard icon={Clock} label="Working Hours" value="Saturday – Friday" sub="9:00 AM – 6:00 PM" />
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div variants={fadeUp} className="h-px bg-gray-100" />

              {/* Google Maps */}
              <motion.div variants={fadeUp}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
                  <span className="w-4 h-px bg-gray-300 inline-block" /> Find Us
                </p>
                <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: '220px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.299!2d90.3994182!3d23.7485249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b922270036ef%3A0x923d8e3eb280461e!2sSparkling%20Insight%20Therapy!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sparkling Insight Therapy Point"
                    className="w-full h-full"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/place/Sparkling+Insight+Therapy/@23.7485249,90.4019931,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 group inline-flex items-center gap-1.5 text-[11px] font-bold text-primary hover:text-primary/70 transition-colors"
                >
                  <MapPin size={11} /> Open in Google Maps
                  <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </a>
              </motion.div>

            </AnimatedSection>
          </aside>

          {/* ── Right: Form ───────────────────────────────────────────────── */}
          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="flex flex-col items-start py-16"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
                    className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mb-8"
                  >
                    <CheckCircle size={32} className="text-green-500" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-950 mb-3">Message Sent!</h2>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
                    Thank you, <span className="font-semibold text-gray-700">{form.name}</span>. We&apos;ve received your message and will get back to you within 1–2 business days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                    className="group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <ArrowRight size={14} className="rotate-180" /> Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="px-4 py-3 bg-red-50 border-l-2 border-red-500 rounded-r-xl text-red-700 text-xs font-medium"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Field icon={<Mail size={13} />} label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                    <Field icon={<Mail size={13} />} label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                    <Field icon={<Phone size={13} />} label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+880 1X-XXXX-XXXX" />

                    <div className="space-y-1.5 group">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-1.5 group-focus-within:text-primary transition-colors duration-200">
                        <MessageSquare size={13} className="opacity-60" /> Subject
                      </label>
                      <div className="relative">
                        <select
                          name="subject" value={form.subject} onChange={handleChange} required
                          className="w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-gray-900 text-sm appearance-none focus:outline-none focus:border-primary transition-colors duration-200"
                        >
                          <option value="">Select a topic</option>
                          <option>General Enquiry</option>
                          <option>Book a Consultation</option>
                          <option>Service Information</option>
                          <option>Referral</option>
                          <option>Career / Volunteering</option>
                          <option>Other</option>
                        </select>
                        <ArrowRight size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 group">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-1.5 group-focus-within:text-primary transition-colors duration-200">
                      <MessageSquare size={13} className="opacity-60" /> Your Message
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      rows={5} required
                      placeholder="Tell us how we can help you…"
                      className="w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group flex items-center gap-2.5 bg-gray-950 hover:bg-primary text-white text-sm font-bold px-8 py-3.5 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                      ) : (
                        <><Send size={14} /> Send Message
                          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-400">We reply within 1–2 business days</p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>


        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-24">
        <AnimatedSection>
          <motion.div
            variants={fadeUp}
            className="relative bg-gray-950 rounded-2xl overflow-hidden px-10 md:px-16 py-14 flex flex-col md:flex-row md:items-center justify-between gap-8"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '80px 100%' }} />
            <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3">Ready to start?</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight">
                Your child&apos;s journey begins<br className="hidden md:block" /> with one conversation.
              </h2>
            </div>

            <div className="relative z-10 flex gap-3 flex-wrap">
              <a href="tel:+8801902028787"
                className="flex items-center gap-2 bg-primary text-white text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-primary-hover transition-colors duration-200">
                <Phone size={14} /> Call Now
              </a>
              <a href="mailto:hello@sparklinginsight.com"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200">
                <Mail size={14} /> Send Email
              </a>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

    </div>
  );
}