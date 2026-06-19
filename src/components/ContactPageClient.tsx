'use client';

import { useState } from 'react';
import { AGENCY_WA } from '@/lib/listings';
import { useLang } from '@/lib/i18n';

const inquiryTypesEn = [
  'Buy Property',
  'Sell Property',
  'Auction Query',
  'Rent-to-Own',
  'Investment Analysis',
  'Partnership',
  'Other',
];

const inquiryTypesBm = [
  'Beli Hartanah',
  'Jual Hartanah',
  'Pertanyaan Lelongan',
  'Sewa Beli',
  'Analisis Pelaburan',
  'Perkongsian',
  'Lain-lain',
];

export default function ContactPageClient() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { lang } = useLang();

  const t = lang === 'en' ? {
    heading: 'Send us a Message',
    fullName: 'Full Name *',
    namePlaceholder: 'Your full name',
    emailLabel: 'Email Address *',
    emailPlaceholder: 'you@example.com',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+60 12-345 6789',
    inquiryLabel: 'Inquiry Type',
    inquiryPlaceholder: 'Select type...',
    messageLabel: 'Message *',
    messagePlaceholder: 'Tell us how we can help you...',
    sending: 'Sending...',
    submit: 'Send Message',
    successHeading: 'Message Sent!',
    successSub: "Thank you, {name}. We've received your message and will get back to you within 24 hours.",
    sendAnother: 'Send another message',
    inquiryTypes: inquiryTypesEn,
  } : {
    heading: 'Hantar Mesej Kepada Kami',
    fullName: 'Nama Penuh *',
    namePlaceholder: 'Nama penuh anda',
    emailLabel: 'Alamat E-mel *',
    emailPlaceholder: 'anda@contoh.com',
    phoneLabel: 'Nombor Telefon',
    phonePlaceholder: '+60 12-345 6789',
    inquiryLabel: 'Jenis Pertanyaan',
    inquiryPlaceholder: 'Pilih jenis...',
    messageLabel: 'Mesej *',
    messagePlaceholder: 'Beritahu kami bagaimana kami boleh membantu anda...',
    sending: 'Menghantar...',
    submit: 'Hantar Mesej',
    successHeading: 'Mesej Dihantar!',
    successSub: 'Terima kasih, {name}. Kami telah menerima mesej anda dan akan menghubungi anda dalam 24 jam.',
    sendAnother: 'Hantar mesej lain',
    inquiryTypes: inquiryTypesBm,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          inquiry_type: form.inquiryType,
          message: form.message,
          source: 'contact_form',
        }),
      });
    } catch {
      // Non-fatal — still open WhatsApp even if save fails
    }
    const lines = [
      `*Pertanyaan dari eHartanah*`,
      `Nama: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Telefon: ${form.phone}` : null,
      form.inquiryType ? `Jenis: ${form.inquiryType}` : null,
      `Mesej: ${form.message}`,
    ].filter(Boolean).join('\n');
    window.open(`${AGENCY_WA}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener,noreferrer');
    setLoading(false);
    setSubmitted(true);
  };

  const isValid = form.name && form.email && form.message;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      {submitted ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t.successHeading}</h2>
          <p className="text-gray-500 text-sm mb-6">
            {t.successSub.replace('{name}', form.name)}
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', inquiryType: '', message: '' }); }}
            className="text-[#1e3a5f] font-semibold text-sm hover:underline"
          >
            {t.sendAnother}
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold text-gray-900 mb-5">{t.heading}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.fullName}</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder={t.namePlaceholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4a017] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.emailLabel}</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder={t.emailPlaceholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4a017] transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.phoneLabel}</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4a017] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.inquiryLabel}</label>
                <select
                  name="inquiryType"
                  value={form.inquiryType}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4a017] transition-colors bg-white"
                >
                  <option value="">{t.inquiryPlaceholder}</option>
                  {t.inquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.messageLabel}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={t.messagePlaceholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4a017] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={!isValid || loading}
              className="w-full bg-[#0f2540] hover:bg-[#0a1e38] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {t.sending}
                </>
              ) : t.submit}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
