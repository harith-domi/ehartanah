'use client';

import { useState } from 'react';
import { AGENCY_WA } from '@/lib/listings';

interface Props {
  listingId: string;
  listingTitle: string;
  listingPrice: string;
  listingType: 'rent' | 'sale' | 'auction';
}

export default function EnquiryForm({ listingId, listingTitle, listingPrice, listingType }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = `Hi, I'm interested in: ${listingTitle} (${listingPrice}). Please contact me.`;

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message,
          listing_id: listingId,
          listing_title: listingTitle,
          listing_price: listingPrice,
          source: listingType === 'auction' ? 'auction_enquiry' : 'listing_enquiry',
        }),
      });
    } catch {
      // Non-fatal
    }

    const waText = `Salam! Saya berminat dengan hartanah ini:\n*${listingTitle}*\n${listingPrice}\n\nNama saya: ${form.name}\nNo. telefon: ${form.phone}`;
    window.open(`${AGENCY_WA}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener,noreferrer');
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-gray-900 text-sm mb-1">Enquiry Sent!</p>
        <p className="text-gray-500 text-xs">We&apos;ve opened WhatsApp for you. Our team will follow up shortly.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-3 text-xs text-[#1e3a5f] hover:underline font-medium"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-bold text-gray-900 mb-1 text-sm">Interested in this property?</h3>
      <p className="text-xs text-gray-500 mb-4">Leave your details and we&apos;ll contact you within 2 hours.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your name *"
          className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#d4a017] transition-colors"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="WhatsApp number * (e.g. 012-345 6789)"
          className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#d4a017] transition-colors"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email address *"
          className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#d4a017] transition-colors"
        />

        <button
          type="submit"
          disabled={!form.name || !form.phone || !form.email || loading}
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          )}
          {loading ? 'Sending...' : 'Enquire via WhatsApp'}
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center mt-3">
        Your details are kept private and only shared with our licensed agents.
      </p>
    </div>
  );
}
