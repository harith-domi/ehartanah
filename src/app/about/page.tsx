import type { Metadata } from 'next';
import Link from 'next/link';
import T from '@/components/T';

export const metadata: Metadata = {
  title: 'About eHartanah — Malaysia Property Agency',
  description: 'eHartanah is a Malaysian property agency offering residential rentals and sales across KL and Selangor. Browse our exclusive agency listings or contact us directly.',
};

const services = [
  {
    title: { en: 'Residential Rentals', bm: 'Sewaan Kediaman' },
    desc: { en: 'Wide selection of apartments, condominiums, houses, and rooms across KL and Selangor — from budget-friendly flats to premium condos.', bm: 'Pilihan luas apartmen, kondominium, rumah, dan bilik di KL dan Selangor — dari flat bajet hingga kondo premium.' },
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    color: 'from-[#1e3a5f] to-[#0f2540]',
  },
  {
    title: { en: 'Subsale Properties', bm: 'Hartanah Subsale' },
    desc: { en: 'Verified subsale listings from private owners and agency stock. Get transparent pricing data and direct access to sellers.', bm: 'Listing subsale disahkan daripada pemilik persendirian dan stok agensi. Data harga telus dan akses terus kepada penjual.' },
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    color: 'from-[#1e3a5f] to-[#0f2540]',
  },
  {
    title: { en: 'AI-Powered Search', bm: 'Carian Dikuasakan AI' },
    desc: { en: 'Describe what you\'re looking for in plain language — our AI matches you to the right properties from over 15,000 listings.', bm: 'Terangkan apa yang anda cari dalam bahasa biasa — AI kami padankan anda dengan hartanah yang tepat daripada 15,000+ listing.' },
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    color: 'from-[#1e3a5f] to-[#0f2540]',
  },
  {
    title: { en: 'Direct Enquiries', bm: 'Pertanyaan Terus' },
    desc: { en: 'No middlemen for private listings — contact owners directly via WhatsApp. For agency listings, our team handles all enquiries personally.', bm: 'Tiada orang tengah untuk listing persendirian — hubungi pemilik terus melalui WhatsApp. Untuk listing agensi, pasukan kami uruskan setiap pertanyaan.' },
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    color: 'from-green-500 to-[#0f2540]',
  },
];

const stats = [
  { label: { en: 'Rental Listings', bm: 'Listing Sewaan' }, value: '9,850+' },
  { label: { en: 'Subsale Listings', bm: 'Listing Subsale' }, value: '5,700+' },
  { label: { en: 'Agency Listings', bm: 'Listing Agensi' }, value: '72' },
  { label: { en: 'Coverage', bm: 'Liputan' }, value: 'KL & Selangor' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0f2540] to-slate-900 py-16 overflow-hidden relative">
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#1e3a5f]/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#1e3a5f]/20 border border-[#d4a017]/40 text-[#f0c040] text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <T en="Malaysian Property Agency" bm="Agensi Hartanah Malaysia" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            <T en="Your Property Partner in" bm="Rakan Hartanah Anda di" /><br />Kuala Lumpur &amp; Selangor
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            <T
              en="eHartanah connects buyers, renters, and property owners across Malaysia with a searchable database of over 15,000 listings — combining private owner ads with our own exclusive agency stock."
              bm="eHartanah menghubungkan pembeli, penyewa, dan pemilik hartanah di seluruh Malaysia dengan pangkalan data 15,000+ listing — menggabungkan iklan pemilik persendirian dengan stok eksklusif agensi kami."
            />
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-14">

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label.en} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-extrabold text-[#1e3a5f]">{s.value}</p>
              <p className="text-gray-500 text-xs mt-1"><T en={s.label.en} bm={s.label.bm} /></p>
            </div>
          ))}
        </div>

        {/* Services */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900"><T en="What We Offer" bm="Apa Yang Kami Tawarkan" /></h2>
            <p className="text-gray-500 mt-2 text-sm"><T en="Property services for buyers, renters, and investors in Malaysia" bm="Perkhidmatan hartanah untuk pembeli, penyewa, dan pelabur di Malaysia" /></p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title.en} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1"><T en={s.title.en} bm={s.title.bm} /></h3>
                  <p className="text-gray-500 text-sm leading-relaxed"><T en={s.desc.en} bm={s.desc.bm} /></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center"><T en="How eHartanah Works" bm="Cara eHartanah Berfungsi" /></h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { step: '1', title: { en: 'Browse Listings', bm: 'Lihat Listing' }, desc: { en: 'Search over 15,000 properties by area, price, size, and type. Filter by agency or private owner.', bm: 'Cari 15,000+ hartanah mengikut kawasan, harga, saiz, dan jenis. Tapis mengikut agensi atau pemilik persendirian.' } },
              { step: '2', title: { en: 'Shortlist & Compare', bm: 'Senarai Pendek & Banding' }, desc: { en: 'Save your favourites with the heart button. Compare prices per sq.ft. to find the best value.', bm: 'Simpan kegemaran anda dengan butang hati. Bandingkan harga sekaki persegi untuk nilai terbaik.' } },
              { step: '3', title: { en: 'Contact Directly', bm: 'Hubungi Terus' }, desc: { en: 'WhatsApp private owners instantly, or enquire with our agency team for exclusive listings.', bm: 'WhatsApp pemilik persendirian serta-merta, atau bertanya dengan pasukan agensi kami untuk listing eksklusif.' } },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#dce8f0] text-[#1e3a5f] font-extrabold text-lg flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1"><T en={item.title.en} bm={item.title.bm} /></h3>
                <p className="text-gray-500 text-sm"><T en={item.desc.en} bm={item.desc.bm} /></p>
              </div>
            ))}
          </div>
        </section>

        {/* Coverage */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center"><T en="Coverage Area" bm="Kawasan Liputan" /></h2>
          <p className="text-gray-500 text-sm text-center mb-6"><T en="Our listings span the major districts of KL and Selangor" bm="Listing kami merangkumi daerah utama KL dan Selangor" /></p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Kuala Lumpur', 'Petaling Jaya', 'Shah Alam', 'Subang Jaya', 'Klang', 'Sepang', 'Gombak', 'Hulu Langat', 'Kuala Selangor', 'Rawang', 'Kajang', 'Ampang', 'Cheras', 'Setapak', 'Wangsa Maju'].map((area) => (
              <span key={area} className="bg-[#edf2f8] text-[#1e3a5f] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#dce8f0]">
                {area}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#0f2540] via-[#1e3a5f] to-[#1e3a5f] rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3"><T en="Ready to Find Your Property?" bm="Sedia Mencari Hartanah Anda?" /></h2>
          <p className="text-[#fef3c7] text-sm mb-6 max-w-md mx-auto">
            <T en="Browse our full database of rentals and sales, or reach out to our team directly for personal guidance." bm="Lihat pangkalan data penuh sewaan dan jualan kami, atau hubungi pasukan kami terus untuk panduan peribadi." />
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/rent" className="bg-white text-[#1e3a5f] font-bold px-6 py-3 rounded-xl hover:bg-[#edf2f8] transition-colors text-sm">
              <T en="Browse Rentals" bm="Lihat Sewaan" />
            </Link>
            <Link href="/subsale" className="bg-white text-[#1e3a5f] font-bold px-6 py-3 rounded-xl hover:bg-[#edf2f8] transition-colors text-sm">
              <T en="Browse Subsale" bm="Lihat Subsale" />
            </Link>
            <Link href="/contact" className="bg-white/10 text-white border border-white/30 font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm">
              <T en="Contact Us" bm="Hubungi Kami" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
