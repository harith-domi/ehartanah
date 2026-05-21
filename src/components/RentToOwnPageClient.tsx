'use client';

import { useState } from 'react';
import RentToOwnCard from '@/components/RentToOwnCard';
import { rentToOwnProperties } from '@/lib/data/rentToOwn';
import Link from 'next/link';

export default function RentToOwnPageClient() {
  const [income, setIncome] = useState('');
  const [savings, setSavings] = useState('');
  const [area, setArea] = useState('');
  const [aiResult, setAiResult] = useState<null | { score: number; recommendation: string }>(null);
  const [checking, setChecking] = useState(false);

  const handleCheck = () => {
    if (!income) return;
    setChecking(true);
    setTimeout(() => {
      const incomeNum = parseInt(income.replace(/,/g, '')) || 0;
      let score = 7.0;
      if (incomeNum >= 5000) score += 1;
      if (incomeNum >= 8000) score += 0.5;
      if (parseInt(savings.replace(/,/g, '')) >= 15000) score += 0.5;
      score = Math.min(score, 9.8);

      const recommendation =
        incomeNum < 3000
          ? 'You qualify for the Shah Alam Affordable Home RTO programme (from RM5,500 deposit). Focus on programmes with 35-40% rent credit to maximise your savings.'
          : incomeNum < 5000
          ? 'The Cheras Condo or Cyberjaya Tech Hub RTO programmes are ideal for your income. Both have deposits under RM10,000 and strong rent credit rates.'
          : 'You qualify for all our RTO programmes, including the Mont Kiara premium option. Consider the Puchong Semi-D for the best rent credit (35%) and family space.';

      setAiResult({ score: parseFloat(score.toFixed(1)), recommendation });
      setChecking(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-violet-700 to-purple-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Rent-to-Own Properties</h1>
          <p className="text-violet-200 text-sm mb-8">Live in your home now. Buy it later. From as little as RM5,000 deposit.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            {[
              { step: '01', title: 'Pay Small Deposit', desc: 'RM5k–RM20k upfront secures the property at today\'s price' },
              { step: '02', title: 'Rent & Accumulate', desc: '20%–40% of monthly rent credited towards your purchase' },
              { step: '03', title: 'Buy When Ready', desc: 'Exercise your option anytime during the 3–5 year period' },
            ].map((item) => (
              <div key={item.step} className="bg-white/10 border border-white/20 rounded-2xl p-4">
                <span className="text-violet-300 font-bold text-xs">STEP {item.step}</span>
                <h3 className="text-white font-bold mt-1 mb-1.5 text-sm">{item.title}</h3>
                <p className="text-violet-200 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            {/* AI Suitability Checker */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-violet-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
                AI Suitability Checker
              </h2>
              <p className="text-gray-500 text-sm mb-5">Tell us your financial situation and we&apos;ll match you to the best RTO programme.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Monthly Income (RM)</label>
                  <input
                    type="text"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="e.g. 5,000"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Current Savings (RM)</label>
                  <input
                    type="text"
                    value={savings}
                    onChange={(e) => setSavings(e.target.value)}
                    placeholder="e.g. 20,000"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Preferred Area</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Cheras, PJ"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                  />
                </div>
              </div>

              <button
                onClick={handleCheck}
                disabled={!income || checking}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                {checking ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Analysing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Check My Suitability
                  </>
                )}
              </button>

              {aiResult && (
                <div className="mt-5 bg-violet-50 border border-violet-200 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{aiResult.score}</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Your AI Suitability Score</p>
                      <p className="font-bold text-gray-900">{aiResult.score >= 8.5 ? 'Excellent Match' : aiResult.score >= 7.5 ? 'Good Match' : 'Suitable Match'}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{aiResult.recommendation}</p>
                  <Link href="/ai-search" className="inline-block mt-3 text-violet-700 text-sm font-semibold hover:underline">
                    Get full AI analysis →
                  </Link>
                </div>
              )}
            </div>

            {/* Listings */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5">Available Rent-to-Own Programmes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {rentToOwnProperties.map((p) => (
                  <RentToOwnCard key={p.id} property={p} />
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
              <div className="space-y-5">
                {[
                  {
                    q: 'Who is Rent-to-Own suitable for?',
                    a: 'RTO is ideal for first-time buyers, self-employed individuals with irregular income, those with previous loan rejections or thin credit history, and anyone wanting to secure today\'s property price while building savings.',
                  },
                  {
                    q: 'What happens if I decide not to buy at the end of the period?',
                    a: 'The option agreement gives you the RIGHT but not the obligation to buy. If you choose not to exercise the option, you simply stop renting — your accumulated rent credits and deposit handling depend on the specific programme terms.',
                  },
                  {
                    q: 'Can I still apply for a bank loan under Rent-to-Own?',
                    a: 'Yes. Most RTO programmes allow you to use the accumulated rent credits as part of your down payment when applying for a conventional mortgage at the end of the rental period.',
                  },
                  {
                    q: 'Is the option price fixed throughout the rental period?',
                    a: 'Yes — this is one of the biggest advantages of RTO. The option price is locked in on day one, protecting you from market price increases. If property values rise 20% during your 5-year period, you still buy at the original agreed price.',
                  },
                ].map((item) => (
                  <div key={item.q}>
                    <p className="font-semibold text-gray-900 text-sm mb-1.5">{item.q}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-violet-600 to-purple-800 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2 text-sm">Talk to an RTO Advisor</h3>
              <p className="text-violet-100 text-xs mb-4">Our licensed advisors specialise in rent-to-own programmes and first-time buyer guidance.</p>
              <a href="https://wa.me/60123456789" target="_blank" rel="noopener noreferrer" className="block text-center bg-white text-violet-700 font-semibold text-sm py-2.5 rounded-xl">
                WhatsApp Now
              </a>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">RTO vs. Conventional Mortgage</h3>
              <div className="space-y-3">
                {[
                  { label: 'Upfront cost', rto: 'RM5k–20k', conv: '10% + costs' },
                  { label: 'Credit score needed', rto: 'Flexible', conv: 'Good required' },
                  { label: 'Income type', rto: 'Any', conv: 'Salaried preferred' },
                  { label: 'Price lock', rto: 'Yes', conv: 'No' },
                  { label: 'Trial period', rto: '3–5 years', conv: 'None' },
                ].map((row) => (
                  <div key={row.label} className="grid grid-cols-3 gap-1 text-xs">
                    <span className="text-gray-500">{row.label}</span>
                    <span className="text-violet-700 font-semibold">{row.rto}</span>
                    <span className="text-gray-400">{row.conv}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 text-xs font-bold text-gray-500 border-t pt-2">
                  <span />
                  <span className="text-violet-700">RTO</span>
                  <span>Mortgage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
