'use client';

import React, { useState, ChangeEvent, FormEvent, ReactNode, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  Briefcase, MapPin, Clock, ArrowRight, Send, X, Upload,
  CheckCircle, User, Mail, Phone, FileText, ChevronDown,
  ArrowUpRight, Building2, Users, TrendingUp,
} from 'lucide-react';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormFieldProps {
  icon: ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}
interface JobData {
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  department: string;
  isOpen?: boolean;
}
interface ApplicationFormData {
  name: string; email: string; phone: string;
  position: string; experience: string; coverLetter: string; cv: File | null;
}

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

// ─── Form Field ───────────────────────────────────────────────────────────────
function FormField({ icon, label, name, value, onChange, placeholder, type = 'text', required }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
        <span className="text-primary opacity-70">{icon}</span>{label}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary transition-colors duration-200"
      />
    </div>
  );
}

// ─── Application Modal ────────────────────────────────────────────────────────
function ApplicationModal({ isOpen, onClose, job }: { isOpen: boolean; onClose: () => void; job: JobData | null }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<ApplicationFormData>({
    name: '', email: '', phone: '', position: job?.title || '',
    experience: '', coverLetter: '', cv: null,
  });

  const isGeneral = !job;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_FORMATS = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) { setError('File size exceeds 5 MB limit'); return; }
    if (!ALLOWED_FORMATS.includes(file.type)) { setError('Only PDF, DOC, DOCX files are allowed'); return; }
    setError(''); setFileName(file.name); setForm(f => ({ ...f, cv: file }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.cv) { setError('Please upload a CV'); return; }
    setIsSubmitting(true); setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v as string | Blob); });
      const res = await fetch('/api/applications', { method: 'POST', body: fd });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message || 'Submission failed'); }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1); setSubmitted(false); setFileName(''); setError('');
      setForm({ name: '', email: '', phone: '', position: job?.title || '', experience: '', coverLetter: '', cv: null });
    }, 400);
  };

  const canProceed = form.name && form.email && form.phone && (isGeneral ? form.position : form.experience);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(10,10,20,0.65)' }}
          onClick={e => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col mx-2 sm:mx-0"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)' }}
          >
            {/* ── Modal Header ── */}
            <div className="flex flex-shrink-0">
              <div className="w-1.5 bg-primary flex-shrink-0" />
              <div className="flex-1 px-8 pt-7 pb-6 bg-gray-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

                {/* ✅ Fixed: transition-all → transition-colors duration-150, z-10 → z-20, bg opacity bumped */}
                <button
                  onClick={handleClose}
                  className="absolute top-5 right-5 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/15 active:bg-white/20 transition-colors duration-150 z-20"
                >
                  <X size={16} />
                </button>

                <div className="relative z-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-white/30 inline-block" />
                    {isGeneral ? 'General Application' : 'Position Application'}
                  </p>
                  <h2 className="text-2xl font-bold leading-tight text-white">
                    {isGeneral ? 'Submit Your Profile' : job?.title}
                  </h2>
                  {!isGeneral && job && (
                    <div className="flex items-center gap-4 mt-2 text-white/50 text-xs">
                      <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{job.type}</span>
                      <span className="flex items-center gap-1"><Building2 size={11} />{job.department}</span>
                    </div>
                  )}
                  {!submitted && (
                    <div className="flex items-center gap-0 mt-5">
                      {['Personal Info', 'Documents'].map((label, i) => {
                        const s = i + 1;
                        const active = step === s;
                        const done = step > s;
                        return (
                          <React.Fragment key={s}>
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${done ? 'bg-primary text-white' : active ? 'bg-white text-gray-900' : 'bg-white/10 text-white/30'
                                }`}>
                                {done ? <CheckCircle size={12} /> : s}
                              </div>
                              <span className={`text-[11px] font-semibold transition-colors duration-300 ${active ? 'text-white' : done ? 'text-primary' : 'text-white/30'}`}>
                                {label}
                              </span>
                            </div>
                            {s < 2 && (
                              <div className="mx-3 flex-shrink-0 relative w-12 h-px bg-white/10 overflow-hidden">
                                <motion.div
                                  className="absolute inset-y-0 left-0 bg-primary"
                                  animate={{ width: done ? '100%' : '0%' }}
                                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                                />
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Modal Body ── */}
            <div className="overflow-y-auto flex-1">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                  className="flex flex-col items-center justify-center py-12 px-6 sm:px-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.15 }}
                    className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-6"
                  >
                    <CheckCircle size={32} className="text-green-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Application Received</h3>
                  <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                    Thank you, <span className="font-semibold text-gray-700">{form.name}</span>. We'll review your application and reach out to{' '}
                    <span className="font-semibold text-gray-700">{form.email}</span> within 5–7 business days.
                  </p>
                  <button onClick={handleClose}
                    className="mt-8 bg-gray-900 text-white text-sm px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-5 sm:p-8">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="mb-6 px-4 py-3 bg-red-50 border-l-2 border-red-500 rounded-r-xl text-red-700 text-xs font-medium"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div key="s1"
                        initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -32 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-7"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField icon={<User size={13} />} label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                          <FormField icon={<Mail size={13} />} label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                          <FormField icon={<Phone size={13} />} label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+880 1X-XXXX-XXXX" required />
                          {isGeneral ? (
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                <Briefcase size={13} className="text-primary opacity-70" /> Area of Interest
                              </label>
                              <div className="relative">
                                <select name="position" value={form.position} onChange={handleChange} required
                                  className="w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-gray-900 text-sm appearance-none focus:outline-none focus:border-primary transition-colors duration-200">
                                  <option value="">Select a field</option>
                                  {['Occupational Therapy', 'Speech & Language Therapy', 'ABA Therapy', 'Special Education', 'Psychology', 'Other'].map(o => <option key={o}>{o}</option>)}
                                </select>
                                <ChevronDown size={13} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                <Clock size={13} className="text-primary opacity-70" /> Experience
                              </label>
                              <div className="relative">
                                <select name="experience" value={form.experience} onChange={handleChange} required
                                  className="w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-gray-900 text-sm appearance-none focus:outline-none focus:border-primary transition-colors duration-200">
                                  <option value="">Select experience</option>
                                  {['Fresh Graduate', '1–2 years', '3–5 years', '5+ years'].map(o => <option key={o}>{o}</option>)}
                                </select>
                                <ChevronDown size={13} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end pt-2">
                          <button type="button" onClick={() => canProceed && setStep(2)}
                            className={`group flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${canProceed ? 'bg-gray-900 text-white hover:bg-primary' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}>
                            Continue
                            <ArrowRight size={15} className={`transition-transform duration-200 ${canProceed ? 'group-hover:translate-x-1' : ''}`} />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="s2"
                        initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -32 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-7"
                      >
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                            CV / Resume <span className="text-red-400 normal-case tracking-normal font-normal ml-1">required</span>
                          </label>
                          <label className={`group flex items-center gap-5 p-5 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${fileName ? 'border-primary bg-primary/[0.03]' : 'border-gray-200 hover:border-gray-400 bg-gray-50/50'
                            }`}>
                            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${fileName ? 'bg-primary/10' : 'bg-white border border-gray-200 group-hover:border-gray-300'
                              }`}>
                              {fileName ? <CheckCircle size={18} className="text-primary" /> : <Upload size={18} className="text-gray-400" />}
                            </div>
                            <div className="min-w-0">
                              <p className={`text-sm font-semibold truncate ${fileName ? 'text-primary' : 'text-gray-600'}`}>
                                {fileName || 'Click to upload your CV'}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {fileName ? 'Click to replace' : 'PDF, DOC, DOCX — max 5 MB'}
                              </p>
                            </div>
                          </label>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                            <FileText size={13} className="text-primary opacity-70" /> Cover Letter
                            <span className="text-gray-300 normal-case tracking-normal font-normal ml-1">optional</span>
                          </label>
                          <textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} rows={4}
                            placeholder="Tell us about yourself and why you'd be a great fit…"
                            className="w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary transition-colors duration-200 resize-none" />
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <button type="button" onClick={() => setStep(1)}
                            className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1.5">
                            <ArrowRight size={13} className="rotate-180" /> Back
                          </button>
                          <button type="submit" disabled={!fileName || isSubmitting}
                            className="group flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-xl text-sm font-bold hover:bg-primary-hover transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
                            {isSubmitting ? (
                              <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
                            ) : (
                              <><Send size={14} /> Submit Application</>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function AnimatedSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Why Work With Us data ────────────────────────────────────────────────────
const whyWorkItems = [
  {
    icon: TrendingUp,
    title: 'Dynamic Role-Playing Opportunities',
    desc: 'We integrate structured role-playing and simulation-based exercises to strengthen practical skills, clinical decision-making, and communication across disciplines.',
  },
  {
    icon: Users,
    title: 'Regular In-Service Trainings',
    desc: 'Our team benefits from ongoing in-service training sessions that keep everyone updated with the latest tools, research, and therapeutic methods in pediatric intervention.',
  },
  {
    icon: FileText,
    title: 'Real Case Studies for Clinical Insight',
    desc: 'We encourage continuous learning through real client case discussions. These sessions help deepen understanding and promote reflective, individualized care planning.',
  },
  {
    icon: Building2,
    title: 'Collaborative Working Environment',
    desc: 'Teamwork is at the core of what we do. Therapists, special educators, and support professionals work together to create holistic therapy plans in a supportive, respectful setting.',
  },
  {
    icon: ArrowUpRight,
    title: 'International Supervision and Collaborations',
    desc: 'We offer access to international mentorship and global collaborations, opening doors to fresh insights, best practices, and research-led approaches from around the world.',
  },
  {
    icon: Briefcase,
    title: 'Career Development Pathways',
    desc: 'Our team members are supported in building long-term, fulfilling careers through mentorship, leadership opportunities, and chances to specialize in areas of passion and expertise.',
  },
];

// ─── Main Career Page ─────────────────────────────────────────────────────────
export default function CareerPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobData | null>(null);

  const openJobModal = (job: JobData) => { setSelectedJob(job); setModalOpen(true); };
  const openGeneralModal = () => { setSelectedJob(null); setModalOpen(true); };

  const jobs: JobData[] = [
    {
      title: 'Occupational Therapist', type: 'Full-time', department: 'Clinical', isOpen: false,
      location: 'Dhaka, Bangladesh',
      description: 'We are looking for a passionate Occupational Therapist to join our multidisciplinary team.',
      requirements: ['B.Sc in Occupational Therapy', 'Minimum 2 years experience', 'Strong communication skills'],
    },
    {
      title: 'Speech & Language Therapist', type: 'Full-time', department: 'Clinical', isOpen: false,
      location: 'Dhaka, Bangladesh',
      description: 'Join us in helping children overcome communication challenges and find their voice.',
      requirements: ['B.Sc in SLT', 'Experience with pediatric cases', 'Patient and empathetic nature'],
    },
    {
      title: 'ABA Therapist', type: 'Full-time', department: 'Behavioral', isOpen: false,
      location: 'Dhaka, Bangladesh',
      description: 'Help implement behavior intervention plans for children with autism and related disorders.',
      requirements: ['Background in Psychology or Special Education', 'ABA training preferred', 'Dedication to child progress'],
    },
  ];

  return (
    <>
      <ApplicationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} job={selectedJob} />

      <div className="pt-24 pb-24 bg-white">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden min-h-[540px] flex items-stretch">
          <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 md:py-20 bg-white">
            <motion.div
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:block absolute left-8 sm:left-12 lg:left-20 top-20 bottom-20 w-px bg-primary origin-top"
            />
            <div className="pl-0 sm:pl-6">
              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-5"
              >
                Careers at Sparkling Insight
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl font-bold text-gray-950 leading-[1.05] tracking-tight mb-6"
              >
                Build a<br />
                <span className="text-primary">career</span> that<br />
                matters.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-500 text-base leading-relaxed max-w-sm mb-10"
              >
                Join a dedicated team improving developmental outcomes for children across Bangladesh.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <a href="#positions"
                  className="group flex items-center gap-2 bg-gray-950 text-white text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-primary transition-colors duration-200">
                  View Open Roles
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <button onClick={openGeneralModal}
                  className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1.5">
                  Send CV <ArrowUpRight size={14} />
                </button>
              </motion.div>
            </div>
          </div>

          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2">
            <Image
              src="https://res.cloudinary.com/dl1rkhdzt/image/upload/v1772867760/20250525_131904_k2ssjq.jpg"
              alt="Career" fill className="object-cover" referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, white 0%, white 8%, transparent 36%)' }} />
          </div>
        </section>

        {/* ── Why Work With Us ─────────────────────────────────────────────── */}
        <section className="border-y border-gray-100 bg-gray-950 py-20">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <AnimatedSection className="mb-14">
              <motion.div variants={fadeUp}>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-3 flex items-center gap-3">
                  <span className="w-6 h-px bg-primary inline-block" /> Why Join Us
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.1]">
                  Why Work With Us?
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mt-3 max-w-xl">
                  At Sparkling Insight Therapy Point, we create a nurturing and progressive environment where professionals can grow, contribute, and thrive.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyWorkItems.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300"
                >
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                    <Icon size={17} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* ── Open Positions ───────────────────────────────────────────────── */}
        <section id="positions" className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-14">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3">Now Hiring</p>
                <h2 className="text-4xl font-bold text-gray-950 tracking-tight">Open Positions</h2>
              </div>
              <span className="text-sm text-gray-400 font-medium pb-1">{jobs.length} roles</span>
            </motion.div>

            <motion.div variants={fadeUp}
              className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-6 pb-3 border-b border-gray-200 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
              <span>Position</span><span>Department</span><span>Location</span><span />
            </motion.div>

            <div className="divide-y divide-gray-100">
              {jobs.map((job) => (
                <motion.div
                  key={job.title}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className={`group grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-2 md:gap-6 py-6 items-center ${job.isOpen === false ? 'cursor-default opacity-60' : 'cursor-pointer'
                    }`}
                  onClick={() => job.isOpen !== false && openJobModal(job)}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`text-base font-bold transition-colors duration-200 ${job.isOpen === false ? 'text-gray-400' : 'text-gray-900 group-hover:text-primary'
                        }`}>
                        {job.title}
                      </h3>
                      <span className="bg-primary/8 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-primary/15">
                        {job.type}
                      </span>
                      {job.isOpen === false && (
                        <span className="bg-gray-100 text-gray-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-gray-200">
                          Closed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-lg md:max-w-none">{job.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3 md:hidden">
                      {job.requirements.map(r => (
                        <span key={r} className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">{r}</span>
                      ))}
                    </div>
                  </div>
                  <span className="hidden md:block text-sm text-gray-500">{job.department}</span>
                  <span className="hidden md:flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin size={13} className="text-gray-400" />{job.location}
                  </span>
                  {job.isOpen === false ? (
                    <span className="w-full md:w-auto flex items-center justify-center gap-2 bg-gray-100 text-gray-400 text-xs font-bold px-5 py-2.5 rounded-xl whitespace-nowrap cursor-not-allowed">
                      Closed
                    </span>
                  ) : (
                    <button
                      onClick={e => { e.stopPropagation(); openJobModal(job); }}
                      className="w-full md:w-auto group/btn flex items-center justify-center gap-2 bg-gray-950 hover:bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors duration-200 whitespace-nowrap"
                    >
                      Apply
                      <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ── General Application CTA ──────────────────────────────────────── */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <motion.div variants={fadeUp}
              className="relative bg-gray-950 rounded-2xl overflow-hidden px-6 md:px-16 py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-8"
            >
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '80px 100%' }} />
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
              <div className="relative z-10 max-w-xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-4">Open Application</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
                  Don't see the right role?
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm">
                  We hire on character and capability, not just vacancies. Send your profile and we'll reach out when the right opportunity arises.
                </p>
              </div>
              <div className="relative z-10 flex-shrink-0">
                <button onClick={openGeneralModal}
                  className="group w-full md:w-auto flex items-center justify-center gap-3 bg-white text-gray-900 hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 text-sm">
                  <Send size={15} />
                  Send Your CV
                  <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </button>
              </div>
            </motion.div>
          </AnimatedSection>
        </section>

      </div>
    </>
  );
}