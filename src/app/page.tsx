import Link from 'next/link';
import SubsaleCard from '@/components/SubsaleCard';
import AuctionCard from '@/components/AuctionCard';
import { subsaleProperties } from '@/lib/data/subsale';
import { auctionProperties } from '@/lib/data/auction';

const stats = [
  { label: '10,000+ Properties', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: '500+ Auction Deals', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  { label: 'AI-Powered Matching', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { label: '24/7 WhatsApp Support', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z' },
];

const aiFeatures = [
  {
    title: 'AI Affordability Calculator',
    desc: 'Tell us your income and savings. Our AI calculates your buying power and recommends properties within range.',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    color: 'from-blue-500 to-blue-700',
  },
  {
    title: 'Auction Risk Scoring',
    desc: 'Every auction property gets an AI risk score (1-10) based on location, title status, market discount, and rental potential.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Rent-to-Own Matching',
    desc: 'AI analyses your financial profile and matches you to rent-to-own programmes with the highest suitability score.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    color: 'from-violet-500 to-purple-700',
  },
  {
    title: 'Rental Yield Intelligence',
    desc: 'Get area-by-area rental yield data, vacancy trends, and price-to-rent ratios to make data-driven investment decisions.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    color: 'from-green-500 to-emerald-700',
  },
  {
    title: 'Natural Language Search',
    desc: 'Just type what you want in plain English or Bahasa Malaysia. Our AI understands context and returns relevant results.',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    color: 'from-pink-500 to-rose-700',
  },
  {
    title: 'Market Insight Reports',
    desc: 'Monthly AI-generated market reports covering price trends, new supply, and investment hotspots across all 13 states.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    color: 'from-teal-500 to-cyan-700',
  },
];

const benefits = [
  'AI-powered property search and matching',
  'Exclusive bank auction listings with risk scoring',
  'Rent-to-own programmes for non-traditional buyers',
  'Real-time rental yield analytics by area',
  'First-time buyer guidance and scheme eligibility',
  'Licensed agent network across all 13 states',
  'WhatsApp support from property advisors',
  'Free property investment consultation',
  'CCRIS credit assessment guidance',
  'Stamp duty and legal fee calculators',
  'Market reports updated monthly',
  'Verified listings with property inspection support',
];

const featured = subsaleProperties.filter((p) => p.isFeatured).slice(0, 3);
const featuredAuctions = auctionProperties.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 md:py-28 overflow-hidden">
        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* AI badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI-Powered Property Intelligence
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Find Your Ideal Property<br />Using AI
          </h1>
          <p className="text-slate-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Malaysia&apos;s first AI property advisor. Ask in plain English — get personalised subsale picks,
            auction risk scores, and rent-to-own recommendations instantly.
          </p>

          {/* AI Search */}
          <form action="/ai-search" method="GET" className="mb-8">
            <div className="bg-white rounded-2xl shadow-2xl p-4">
              <input
                name="q"
                type="text"
                placeholder="Example: I want a condo below RM300k near MRT with good rental yield..."
                className="w-full border-0 outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base py-2"
              />
              <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-2">
                <div className="flex flex-wrap gap-2">
                  {["I earn RM5k/month", "Auction below RM250k", "Rent-to-own near MRT"].map((chip) => (
                    <span key={chip} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100 font-medium">
                      {chip}
                    </span>
                  ))}
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-700 text-white font-semibold px-5 py-2 rounded-xl text-sm shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Ask AI
                </button>
              </div>
            </div>
          </form>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/ai-search" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              Start AI Search
            </Link>
            <Link href="/auction" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              Browse Auction Deals
            </Link>
            <Link href="/rent-to-own" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              Explore Rent-to-Own
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <svg className="w-6 h-6 text-blue-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
                <p className="text-white text-sm font-semibold leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-blue-700 font-semibold text-sm uppercase tracking-wider mb-2">Simple Process</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">How eHartanah AI Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Tell AI What You Need',
                desc: 'Type your requirements in natural language — budget, location, property type, lifestyle preferences. No forms or dropdowns.',
              },
              {
                step: '02',
                title: 'AI Analyses & Matches',
                desc: 'Our AI cross-references 10,000+ listings, rental yield data, auction schedules, and market trends to find your best matches.',
              },
              {
                step: '03',
                title: 'Connect & Transact',
                desc: 'Shortlist properties, speak to our licensed advisors via WhatsApp, arrange viewings, and get financing guidance — all in one place.',
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY CATEGORIES */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-blue-700 font-semibold text-sm uppercase tracking-wider mb-2">Explore</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Three Ways to Own Property</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Subsale Properties',
                desc: 'Browse 10,000+ verified residential listings across Malaysia. Filter by yield, tenure, and proximity to transit.',
                count: '10,000+ listings',
                href: '/subsale',
                gradient: 'from-blue-600 to-blue-800',
                btnClass: 'bg-blue-700 hover:bg-blue-800',
                icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
              },
              {
                title: 'Bank Auctions (Lelong)',
                desc: 'AI-scored auction properties at 15%–35% below market value. Get risk ratings and due diligence checklists.',
                count: '500+ auction deals',
                href: '/auction',
                gradient: 'from-amber-500 to-orange-700',
                btnClass: 'bg-amber-500 hover:bg-amber-600',
                icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
              },
              {
                title: 'Rent-to-Own',
                desc: 'Live in your dream home from just RM5k deposit while building equity. Designed for first-time buyers and those rebuilding credit.',
                count: '6 programmes available',
                href: '/rent-to-own',
                gradient: 'from-violet-600 to-purple-800',
                btnClass: 'bg-violet-600 hover:bg-violet-700',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
              },
            ].map((cat) => (
              <div key={cat.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className={`bg-gradient-to-br ${cat.gradient} p-6 flex items-center justify-center`}>
                  <svg className="w-12 h-12 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{cat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{cat.desc}</p>
                  <p className="text-blue-700 text-xs font-semibold mb-4 uppercase tracking-wide">{cat.count}</p>
                  <Link href={cat.href} className={`inline-block ${cat.btnClass} text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors`}>
                    Explore Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SUBSALE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-blue-700 font-semibold text-sm uppercase tracking-wider mb-1">Subsale Properties</p>
            <h2 className="text-2xl font-bold text-gray-900">Featured Listings</h2>
          </div>
          <Link href="/subsale" className="text-blue-700 hover:text-blue-800 font-semibold text-sm flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <SubsaleCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* FEATURED AUCTION */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-1">Bank Auctions</p>
              <h2 className="text-2xl font-bold text-gray-900">Top Auction Deals This Month</h2>
            </div>
            <Link href="/auction" className="text-amber-600 hover:text-amber-700 font-semibold text-sm flex items-center gap-1">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAuctions.map((p) => (
              <AuctionCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-2">Technology</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">AI Features Built for Malaysian Property</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">From affordability analysis to auction risk scoring — our AI handles the heavy lifting so you can make confident decisions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiFeatures.map((feat) => (
              <div key={feat.title} className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition-colors">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feat.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{feat.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-blue-700 font-semibold text-sm uppercase tracking-wider mb-2">Benefits</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Choose eHartanah</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-700 py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Ready to Find Your Perfect Malaysian Property?
        </h2>
        <p className="text-blue-100 text-base mb-8 max-w-xl mx-auto">
          Let our AI property advisor guide you — whether you&apos;re buying your first home, hunting for auction deals, or exploring rent-to-own options.
        </p>
        <Link
          href="/ai-search"
          className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Start AI Property Search — Free
        </Link>
      </section>
    </>
  );
}
