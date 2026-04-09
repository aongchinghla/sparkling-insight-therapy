'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, Phone, Mail, Info, ChevronRight, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM',
];

const generateDates = () =>
  Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      full: date,
    };
  });

const allDates = generateDates();
const PAGE_SIZE = 7;

type FormData = { parentName: string; email: string; contactNumber: string };
type FormErrors = Partial<Record<keyof FormData, string>>;

const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const validatePhone = (p: string) => /^[+\d\s\-()]{7,}$/.test(p);

const inputBase = 'w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-200 border-b-2 bg-transparent placeholder:text-gray-300';
const inputNormal = 'border-gray-200 focus:border-primary';
const inputError = 'border-red-400 focus:border-red-400';

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [datePageStart, setDatePageStart] = useState(0);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ parentName: '', email: '', contactNumber: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const visibleDates = allDates.slice(datePageStart, datePageStart + PAGE_SIZE);
  const canGoPrev = datePageStart > 0;
  const canGoNext = datePageStart + PAGE_SIZE < allDates.length;

  const handlePrevPage = () => {
    if (!canGoPrev) return;
    const newStart = datePageStart - PAGE_SIZE;
    setDatePageStart(newStart);
    if (selectedDate < newStart || selectedDate >= newStart + PAGE_SIZE) setSelectedDate(newStart);
  };
  const handleNextPage = () => {
    if (!canGoNext) return;
    const newStart = datePageStart + PAGE_SIZE;
    setDatePageStart(newStart);
    if (selectedDate < newStart || selectedDate >= newStart + PAGE_SIZE) setSelectedDate(newStart);
  };

  const validate = (data: FormData): FormErrors => {
    const errs: FormErrors = {};
    if (!data.parentName.trim()) errs.parentName = 'Name is required';
    else if (data.parentName.trim().length < 2) errs.parentName = 'At least 2 characters';
    if (!data.email.trim()) errs.email = 'Email is required';
    else if (!validateEmail(data.email)) errs.email = 'Enter a valid email';
    if (!data.contactNumber.trim()) errs.contactNumber = 'Contact number is required';
    else if (!validatePhone(data.contactNumber)) errs.contactNumber = 'Enter a valid phone number';
    return errs;
  };

  const handleFieldChange = (field: keyof FormData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) setErrors(validate(updated));
  };
  const handleBlur = (field: keyof FormData) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(formData));
  };

  const isStep2Valid = Object.keys(validate(formData)).length === 0;

  const handleNext = () => {
    if (step === 1 && selectedTime) {
      setStep(2);
    } else if (step === 2) {
      const allTouched = { parentName: true, email: true, contactNumber: true };
      setTouched(allTouched);
      const errs = validate(formData);
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
      setStep(3);
    } else if (step === 3) {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1); setSelectedTime(null); setDatePageStart(0); setSelectedDate(0);
      setFormData({ parentName: '', email: '', contactNumber: '' });
      setErrors({}); setTouched({});
    }, 350);
  };

  const selectedDateObj = allDates[selectedDate];

  const stepVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            exit={{ scale: 0.94, opacity: 0, y: 20, transition: { duration: 0.2 } }}
            className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
            style={{ maxHeight: '92vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Primary top bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary z-10" />

            {/* ── Left Panel ── */}
            <div className="md:w-[36%] bg-gray-950 p-4 sm:p-6 md:p-10 text-white flex flex-col justify-between shrink-0 relative overflow-hidden order-2 md:order-1">
              {/* Grid texture */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(90deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '80px 100%' }} />
              {/* Glow */}
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Step progress */}
                <div className="flex gap-2 mb-8">
                  {[1, 2, 3].map((s) => (
                    <motion.div
                      key={s}
                      animate={{ width: step === s ? 28 : 8, opacity: step >= s ? 1 : 0.2 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="h-1.5 rounded-full bg-primary"
                    />
                  ))}
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 flex items-center gap-2">
                  <span className="w-3 h-px bg-primary inline-block" />
                  {step === 1 ? 'Step 1 of 2' : step === 2 ? 'Step 2 of 2' : 'Confirmed'}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight text-white">
                  {step === 1 ? 'Pick a Slot' : step === 2 ? 'Your Details' : 'All Set!'}
                </h3>
                <p className="text-white/40 mb-6 text-xs leading-relaxed hidden md:block">
                  Take the first step towards your child&apos;s brighter future. Select a convenient time for an initial assessment.
                </p>

                <div className="space-y-5">
                  <InfoRow icon={MapPin} label="Our Location" value="House No: 395, New Eskaton Road, Dhaka 1000" />
                  <InfoRow icon={Clock} label="Opening Hours" value="Sat – Fri: 10:00 AM – 7:00 PM" />
                  <InfoRow icon={Phone} label="Contact Us" value="+880 1902-028787" />
                </div>
              </div>

              <div className="relative z-10 mt-6 p-4 bg-white/5 rounded-xl border border-white/8 items-start gap-3 hidden md:flex">
                <Info size={15} className="text-white/40 mt-0.5 shrink-0" />
                <p className="text-xs text-white/50 leading-relaxed">
                  Initial assessments usually take 45–60 minutes.
                </p>
              </div>
            </div>

            {/* ── Right Panel ── */}
            <div className="flex-1 flex flex-col overflow-hidden order-1 md:order-2">
              {/* Close button */}
              <div className="flex justify-end px-4 sm:px-8 md:px-10 pt-4 sm:pt-6 shrink-0">
                <button
                  onClick={handleClose}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-10 pb-4">
                <AnimatePresence mode="wait">

                  {/* ── Step 1 ── */}
                  {step === 1 && (
                    <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.22 }}>
                      {/* Date picker */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
                              <Calendar size={14} className="text-primary" />
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-[0.12em]">Select Date</h4>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={handlePrevPage} disabled={!canGoPrev}
                              className="w-7 h-7 rounded-lg border border-gray-200 hover:border-gray-400 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-150">
                              <ChevronLeft size={14} />
                            </button>
                            <button onClick={handleNextPage} disabled={!canGoNext}
                              className="w-7 h-7 rounded-lg border border-gray-200 hover:border-gray-400 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-150">
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                          {visibleDates.map((d, i) => {
                            const globalIdx = datePageStart + i;
                            const isSelected = selectedDate === globalIdx;
                            return (
                              <motion.button key={globalIdx} whileTap={{ scale: 0.94 }}
                                onClick={() => setSelectedDate(globalIdx)}
                                className={`rounded-xl py-2 sm:py-3 flex flex-col items-center justify-center transition-all duration-200 border-2 ${isSelected
                                    ? 'bg-primary border-primary text-white'
                                    : 'bg-white border-gray-200 text-gray-500 hover:border-primary/30 hover:bg-gray-50'
                                  }`}
                              >
                                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest opacity-60 mb-0.5">{d.day}</span>
                                <span className="text-sm sm:text-lg font-bold leading-none mb-0.5">{d.date}</span>
                                <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{d.month}</span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time slots */}
                      <div>
                        <div className="flex items-center gap-2 mb-5">
                          <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
                            <Clock size={14} className="text-primary" />
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-[0.12em]">Available Slots</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <motion.button key={time} whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedTime(time)}
                              className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${selectedTime === time
                                  ? 'bg-primary border-primary text-white'
                                  : 'bg-white border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-gray-50'
                                }`}
                            >
                              {time}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 2 ── */}
                  {step === 2 && (
                    <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.22 }}>
                      <button onClick={() => setStep(1)}
                        className="flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-gray-400 hover:text-gray-900 transition-colors mb-6 group">
                        <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                        Back
                      </button>

                      <div className="mb-7">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">Your Details</h4>
                        <p className="text-gray-400 text-xs">Provide your contact info to confirm the booking.</p>
                      </div>

                      <div className="space-y-6 mb-7">
                        <FormField label="Parent's Name" error={touched.parentName ? errors.parentName : undefined}>
                          <input type="text" placeholder="John Doe"
                            value={formData.parentName}
                            onChange={(e) => handleFieldChange('parentName', e.target.value)}
                            onBlur={() => handleBlur('parentName')}
                            className={`${inputBase} ${touched.parentName && errors.parentName ? inputError : inputNormal}`}
                          />
                        </FormField>
                        <FormField label="Email Address" error={touched.email ? errors.email : undefined}>
                          <input type="email" placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            onBlur={() => handleBlur('email')}
                            className={`${inputBase} ${touched.email && errors.email ? inputError : inputNormal}`}
                          />
                        </FormField>
                        <FormField label="Contact Number" error={touched.contactNumber ? errors.contactNumber : undefined}>
                          <div className={`flex items-center border-b-2 transition-all duration-200 ${touched.contactNumber && errors.contactNumber ? 'border-red-400' : 'border-gray-200 focus-within:border-primary'}`}>
                            <div className="flex items-center gap-1.5 pr-3 border-r border-gray-200 shrink-0">
                              <span className="inline-flex items-center justify-center w-5 h-3.5 rounded-sm overflow-hidden shrink-0" style={{ background: '#006A4E' }}>
                                <span className="block rounded-full" style={{ width: 7, height: 7, background: '#F42A41', marginLeft: 1 }} />
                              </span>
                              <span className="text-sm font-semibold text-gray-500">+880</span>
                            </div>
                            <input type="tel" placeholder="1XXX XXXXXX"
                              value={formData.contactNumber}
                              onChange={(e) => handleFieldChange('contactNumber', e.target.value)}
                              onBlur={() => handleBlur('contactNumber')}
                              className="flex-1 px-3 py-3.5 text-sm font-medium outline-none bg-transparent placeholder:text-gray-300"
                            />
                          </div>
                        </FormField>
                      </div>

                      {/* Selected slot summary */}
                      <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Selected Slot</p>
                          <button onClick={() => setStep(1)}
                            className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary hover:text-primary/70 transition-colors">
                            Change
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-gray-800 font-bold text-sm">
                          <Calendar size={14} className="text-primary shrink-0" />
                          {selectedDateObj.day}, {selectedDateObj.date} {selectedDateObj.month} at {selectedTime}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 3 ── */}
                  {step === 3 && (
                    <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.22 }}
                      className="flex flex-col items-center justify-center text-center py-6">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.1 }}
                        className="relative w-16 h-16 mb-6"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center">
                          <CheckCircle size={30} className="text-primary" strokeWidth={2} />
                        </div>
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary rounded-t-2xl" />
                      </motion.div>

                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Success</p>
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h4>
                      <p className="text-gray-400 mb-8 max-w-sm text-xs leading-relaxed">
                        Thank you, <span className="font-bold text-gray-700">{formData.parentName}</span>. Your appointment is successfully scheduled.
                      </p>

                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 w-full text-left space-y-3">
                        <ConfirmRow icon={Calendar} label="Appointment" value={`${selectedDateObj.day}, ${selectedDateObj.date} ${selectedDateObj.month} at ${selectedTime}`} />
                        <ConfirmRow icon={Mail} label="Confirmation Email" value={formData.email} sub="We've sent a confirmation to this address." />
                        <ConfirmRow icon={Phone} label="SMS Confirmation" value={formData.contactNumber} sub="A text message has been sent." />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer CTA */}
              <div className="px-4 sm:px-8 md:px-10 pb-4 sm:pb-8 pt-3 shrink-0">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNext}
                  disabled={step === 1 ? !selectedTime : step === 2 ? !isStep2Valid : false}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${step === 3 || (step === 1 ? selectedTime : isStep2Valid)
                      ? 'bg-gray-950 hover:bg-primary text-white'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                >
                  {step === 1 ? 'Continue' : step === 2 ? 'Confirm Booking' : 'Close'}
                  {step !== 3 && <ChevronRight size={16} />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ── Helpers ── */
function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-primary" />
      </div>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30 mb-0.5">{label}</p>
        <p className="text-xs font-medium text-white/60 leading-snug">{value}</p>
      </div>
    </div>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
            <AlertCircle size={11} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConfirmRow({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
        <Icon size={14} className="text-primary" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm font-bold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}