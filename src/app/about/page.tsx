import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About eHartanah',
  description: 'Learn about eHartanah — Malaysia\'s AI-powered property intelligence platform built to democratise property investment.',
};

const team = [
  {
    name: 'Fariz Ahmad',
    role: 'Chief Executive Officer',
    bio: 'Former VP at CIMB Property Trust with 15 years in Malaysian real estate. Founded eHartanah to bring AI-driven insights to everyday property buyers.',
    initials: 'FA',
    color: 'from-emerald-600 to-emerald-800',
  },
  {
    name: 'Li Wei Chen',
    role: 'Chief Technology Officer',
    bio: 'Ex-Google engineer (Singapore). Built the AI recommendation engine and auction risk-scoring model that powers eHartanah\'s core intelligence layer.',
    initials: 'LW',
    color: 'from-teal-600 to-teal-800',
  },
  {
    name: 'Dr. Priya Nair',
    role: 'Head of AI & Data Science',
    bio: 'PhD in Machine Learning from UM. Leads the AI property matching and rental yield prediction models trained on 5 years of Malaysian property transaction data.',
    initials: 'PN',
    color: 'from-teal-600 to-green-800',
  },
];

const missions = [
  {
    title: 'Democratise Property Intelligence',
    desc: 'Previously only large property developers and institutional investors had access to detailed market analytics. eHartanah puts the same intelligence — yield data, auction risk scores, market trend reports — in every buyer\'s hands.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    title: 'Enable First-Time Homeownership',
    desc: 'With rising property prices and tightening bank credit, many Malaysians feel priced out. Our Rent-to-Own matchmaking and first-time buyer guidance create realistic pathways to homeownership for income earners across all brackets.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    color: 'from-green-500 to-emerald-700',
  },
  {
    title: 'Build Transparent Markets',
    desc: 'Property markets suffer from information asymmetry — sellers know more than buyers. By surfacing auction discount rates, rental yield benchmarks, and AI risk scores, we create a more transparent, fair marketplace for all Malaysians.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    color: 'from-amber-500 to-orange-700',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 py-16 overflow-hidden relative">
        <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            About Us
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Building Malaysia&apos;s Property Intelligence Layer
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            eHartanah was founded in 2024 with a single mission: to give every Malaysian the same data-driven property intelligence that institutional investors have always enjoyed. We combine AI, real-time market data, and licensed human expertise into one seamless platform.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-16">
        {/* Mission */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-500 mt-2 text-sm">Three pillars that guide everything we build</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missions.map((m) => (
              <div key={m.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-4`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={m.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{m.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Platform features */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Our Platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: 'AI Property Search', desc: 'Natural language search that understands your goals and matches properties accordingly.' },
              { title: 'Auction Risk Scoring', desc: 'Every bank auction property is scored 1-10 based on AI analysis of 20+ risk factors.' },
              { title: 'Rent-to-Own Matching', desc: 'AI-powered matching of buyers to RTO programmes based on financial profile and goals.' },
              { title: 'Rental Yield Analytics', desc: 'Area-by-area yield benchmarks updated monthly from actual tenancy agreement data.' },
              { title: 'First-Time Buyer Tools', desc: 'Scheme eligibility checker, stamp duty calculator, and financing readiness assessment.' },
              { title: 'WhatsApp Consultation', desc: 'Licensed property advisors available daily via WhatsApp for personal guidance.' },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{feature.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Our Team</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Real estate, technology, and AI expertise united by a shared mission</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-xl">{member.initials}</span>
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-emerald-700 text-xs font-semibold mb-3">{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join us CTA */}
        <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Join the eHartanah Community</h2>
          <p className="text-emerald-100 text-sm mb-6 max-w-md mx-auto">
            Whether you&apos;re a first-time buyer, seasoned investor, or a property agent — eHartanah has tools to make your property journey smarter.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/ai-search" className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm">
              Start AI Search
            </Link>
            <Link href="/contact" className="bg-white/10 text-white border border-white/30 font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
