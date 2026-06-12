import type { Metadata } from 'next';
import Link from 'next/link';
import ContactPageClient from '@/components/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact eHartanah — Malaysia\'s AI property platform. Reach our team via WhatsApp, email, or our contact form.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f2540] to-[#1e3a5f] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-[#fde68a] text-sm">We&apos;d love to hear from you. Our team responds within 24 hours on business days.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <ContactPageClient />
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-5">
            {/* WhatsApp CTA */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Fastest Response: WhatsApp</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                Chat with our property advisors directly. Most queries answered within 30 minutes during business hours.
              </p>
              <a
                href="https://wa.me/60149999309"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp Now
              </a>
            </div>

            {/* Contact details */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#edf2f8] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-800">hello@ehartanah.my</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#edf2f8] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-800">+60 14-999 9309</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#edf2f8] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Office</p>
                    <p className="text-sm font-medium text-gray-800">Kuala Lumpur, Malaysia</p>
                    <p className="text-xs text-gray-500">Serving Klang Valley & beyond</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working hours */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Working Hours</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { day: 'Monday – Friday', hours: '8:00 AM – 7:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
                  { day: 'Sunday', hours: '10:00 AM – 3:00 PM' },
                  { day: 'WhatsApp Support', hours: 'Daily 8 AM – 10 PM' },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between">
                    <span className="text-gray-500">{row.day}</span>
                    <span className="font-medium text-gray-800">{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI CTA */}
            <div className="bg-gradient-to-br from-[#0f2540] to-[#1e3a5f] rounded-2xl p-5 text-white text-center">
              <p className="font-bold mb-2 text-sm">Prefer AI Assistance?</p>
              <p className="text-[#fef3c7] text-xs mb-3">Get instant answers about properties, yields, and auction deals.</p>
              <Link href="/ai-search" className="block bg-white text-[#1e3a5f] font-semibold text-sm py-2.5 rounded-xl hover:bg-[#edf2f8] transition-colors">
                Try AI Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
