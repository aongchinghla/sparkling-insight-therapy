'use client';

import { useState } from 'react';

interface Video {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface CheckoutModalProps {
  video: Video;
  onClose: () => void;
}

export default function CheckoutModal({ video, onClose }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    paymentMethod: 'bkash',
    trxId: '',
    phoneLast3: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, videoId: video.id, price: video.price })
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
          <h3 className="text-2xl font-bold mb-2">Order Received!</h3>
          <p className="text-gray-600 mb-6 px-4">
            We are verifying your transaction. Once confirmed, you will receive an email with the video link. You can also search using your email <span className="font-semibold text-primary">{formData.email}</span> later.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[2rem] max-w-md w-full overflow-hidden shadow-2xl relative my-auto border border-gray-100">

        {/* Header */}
        <div className="bg-gray-50/50 border-b border-gray-100 p-8 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-xl text-gray-900">Checkout</h3>
            <p className="text-sm text-gray-500 mt-1">{video.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 bg-white shadow-sm rounded-full p-2 w-10 h-10 flex justify-center items-center transition-all border border-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Amount to pay */}
          <div className="bg-primary/5 border border-primary/10 text-primary p-5 rounded-2xl flex justify-between items-center font-bold">
            <span className="text-sm uppercase tracking-wider">Total Amount:</span>
            <span className="text-2xl">৳{video.price}</span>
          </div>

          <div className="text-sm bg-gray-50 border border-gray-100 p-4 rounded-2xl space-y-2">
            <p className="text-gray-700">Please Send Money to:</p>
            <p className="text-lg font-bold text-gray-900 tracking-wide">017XXXXXXXX <span className="text-xs font-normal text-gray-500 bg-white px-2 py-0.5 rounded border ml-1 uppercase">Personal</span></p>
            <p className="text-[11px] text-gray-400 leading-tight">Send the exact amount via bKash or Nagad before filling this form.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-gray-900"
              placeholder="you@email.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Method</label>
              <select
                value={formData.paymentMethod}
                onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary appearance-none cursor-pointer"
              >
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Phone (Last 3 Digits)</label>
              <input
                type="text"
                required
                maxLength={3}
                pattern="\d{3}"
                value={formData.phoneLast3}
                onChange={e => setFormData({ ...formData, phoneLast3: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary"
                placeholder="195"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Transaction ID (TrxID)</label>
            <input
              type="text"
              required
              value={formData.trxId}
              onChange={e => setFormData({ ...formData, trxId: e.target.value })}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary"
              placeholder="e.g. 5K7A9BCD2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-5 rounded-[1.25rem] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Confirm Payment'}
          </button>
        </form>
      </div>
    </div>
  );
}
