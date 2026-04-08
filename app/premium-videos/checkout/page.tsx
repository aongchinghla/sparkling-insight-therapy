'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2, ShieldCheck, Copy, Check } from 'lucide-react';

const VIDEOS_DATA = [
  { id: 'v1', title: 'Anxiety Relief Techniques', price: 499, duration: '15 min' },
  { id: 'v2', title: 'Building Emotional Resilience', price: 599, duration: '22 min' },
  { id: 'v3', title: 'Mind Reset for Productivity', price: 399, duration: '18 min' },
];

const PAYMENT_METHODS = [
  { id: 'bkash', label: 'bKash', number: '01902-028787', color: 'bg-[#E2136E]' },
  { id: 'nagad', label: 'Nagad', number: '01902-028787', color: 'bg-[#F26522]' },
  { id: 'rocket', label: 'Rocket', number: '01902-028787', color: 'bg-[#8C3494]' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      {copied ? <Check size={13} className="text-primary" /> : <Copy size={13} className="text-gray-400" />}
    </button>
  );
}

function CheckoutForm() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('id') || 'v1';
  const video = VIDEOS_DATA.find(v => v.id === videoId) || VIDEOS_DATA[0];

  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [form, setForm] = useState({ email: '', trxId: '', phoneLast3: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const selectedMethod = PAYMENT_METHODS.find(m => m.id === paymentMethod)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/therapy-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          paymentMethod,
          trxId: form.trxId,
          phoneLast3: form.phoneLast3,
          videoId: video.id,
          price: video.price,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center py-12"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
          className="mb-6"
        >
          <CheckCircle2 size={56} className="text-primary" strokeWidth={1.5} />
        </motion.div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Order Received</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-950 mb-3">Payment Submitted!</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-8">
          We have received your order. After verifying your payment, we will send the video access link to{' '}
          <span className="font-bold text-gray-700">{form.email}</span> within a few hours.
        </p>
        <div className="bg-primary/6 border border-primary/15 rounded-xl p-4 text-sm text-gray-700 max-w-sm">
          Need help? WhatsApp us at{' '}
          <a href="https://wa.me/8801902028787" className="font-bold text-primary">+880 1902-028787</a>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Step 1 — Select payment method */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
          <span className="w-4 h-px bg-primary inline-block" /> Step 1 — Select Payment Method
        </p>
        <div className="grid grid-cols-3 gap-3">
          {PAYMENT_METHODS.map(method => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={`py-3 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${paymentMethod === method.id
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
            >
              {method.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 — Send money */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
          <span className="w-4 h-px bg-primary inline-block" /> Step 2 — Send Money
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-1">{selectedMethod.label} Number</p>
              <p className="text-lg font-bold text-gray-950">{selectedMethod.number}</p>
            </div>
            <div className="flex items-center gap-2">
              <CopyButton text={selectedMethod.number} />
              <div className={`w-10 h-10 rounded-xl ${selectedMethod.color} flex items-center justify-center`}>
                <span className="text-white text-xs font-bold">{selectedMethod.label[0]}</span>
              </div>
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-1">Amount to Send</p>
              <p className="text-2xl font-bold text-gray-950">৳{video.price}</p>
            </div>
            <CopyButton text={String(video.price)} />
          </div>
          <div className="bg-primary/6 border border-primary/15 rounded-xl p-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Send <strong>৳{video.price}</strong> to <strong>{selectedMethod.number}</strong> via <strong>{selectedMethod.label}</strong> using "Send Money" option.
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 — Fill details */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
          <span className="w-4 h-px bg-primary inline-block" /> Step 3 — Fill Your Details
        </p>
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Your Email Address</label>
            <input
              type="email" required
              placeholder="you@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full border-b-2 border-gray-200 focus:border-primary bg-transparent py-3 text-sm font-medium text-gray-900 placeholder:text-gray-300 outline-none transition-colors duration-200"
            />
            <p className="text-[10px] text-gray-400">We'll send your video access link here.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Transaction ID (TrxID)</label>
            <input
              type="text" required
              placeholder="e.g. ABC1234567"
              value={form.trxId}
              onChange={e => setForm(f => ({ ...f, trxId: e.target.value }))}
              className="w-full border-b-2 border-gray-200 focus:border-primary bg-transparent py-3 text-sm font-medium text-gray-900 placeholder:text-gray-300 outline-none transition-colors duration-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Last 3 Digits of Your Phone</label>
            <input
              type="text" required maxLength={3} pattern="\d{3}"
              placeholder="e.g. 787"
              value={form.phoneLast3}
              onChange={e => setForm(f => ({ ...f, phoneLast3: e.target.value.replace(/\D/g, '') }))}
              className="w-full border-b-2 border-gray-200 focus:border-primary bg-transparent py-3 text-sm font-medium text-gray-900 placeholder:text-gray-300 outline-none transition-colors duration-200"
            />
            <p className="text-[10px] text-gray-400">Used to verify your payment.</p>
          </div>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3"
          >
            <AlertCircle size={15} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-red-600 font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-xl font-bold text-sm bg-gray-950 hover:bg-primary text-white transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <><Loader2 size={16} className="animate-spin" /> Submitting...</>
        ) : (
          <><ShieldCheck size={16} /> Submit Payment Details</>
        )}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">

          {/* Left — Form */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-primary inline-block" /> Checkout
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight mb-10">
              Complete your purchase.
            </h1>

            <Suspense fallback={<div className="text-sm text-gray-400">Loading...</div>}>
              <CheckoutForm />
            </Suspense>
          </div>

          {/* Right — Order summary */}
          <Suspense fallback={null}>
            <OrderSummary />
          </Suspense>

        </div>
      </div>
    </div>
  );
}

function OrderSummary() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('id') || 'v1';
  const video = VIDEOS_DATA.find(v => v.id === videoId) || VIDEOS_DATA[0];

  return (
    <div className="lg:sticky lg:top-28 self-start">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary rounded-t-2xl" />
        <div className="p-6 border-b border-gray-100">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-4">Order Summary</p>
          <h3 className="text-base font-bold text-gray-900 mb-1">{video.title}</h3>
          <p className="text-xs text-gray-400">{video.duration} · Therapy Video</p>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Video Price</span>
            <span className="font-semibold text-gray-900">৳{video.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Processing Fee</span>
            <span className="font-semibold text-primary">Free</span>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex justify-between">
            <span className="font-bold text-gray-950">Total</span>
            <span className="text-2xl font-bold text-gray-950">৳{video.price}</span>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-2.5">
          {[
            { icon: CheckCircle2, label: 'Lifetime Access' },
            { icon: CheckCircle2, label: 'Download & Keep' },
            { icon: CheckCircle2, label: 'Access via Email Link' },
            { icon: ShieldCheck, label: 'Manual Verification — Secure' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon size={14} className="text-primary flex-shrink-0" />
              <span className="text-xs font-medium text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
