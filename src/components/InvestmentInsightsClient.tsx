'use client';

import { useState } from 'react';
import Link from 'next/link';

const articles = [
  {
    category: 'Subsale Guide',
    color: 'text-emerald-700 bg-emerald-50',
    title: 'Subsale Property Investment Guide for Malaysians',
    excerpt: 'A complete walkthrough of buying subsale properties in Malaysia — from due diligence and title search to financing options and stamp duty calculations. Learn how to identify undervalued properties and negotiate effectively.',
    readTime: '8 min read',
    topics: ['Title search process', 'Stamp duty calculation', 'Loan margin by bank', 'Negotiation tactics', 'Below-market identification'],
  },
  {
    category: 'Auction Guide',
    color: 'text-amber-700 bg-amber-50',
    title: 'Auction Property Risks & Rewards — A Definitive Guide',
    excerpt: 'Bank auctions offer Malaysia\'s best property discounts — but come with unique risks. This guide covers everything from pre-auction due diligence and bidding strategy to post-auction financing and vacant possession challenges.',
    readTime: '10 min read',
    topics: ['Pre-bid due diligence checklist', 'Understanding proclamation of sale', 'Financing auction properties', 'Vacant possession process', 'When to walk away'],
  },
  {
    category: 'Rent-to-Own',
    color: 'text-teal-700 bg-teal-50',
    title: 'Rent-to-Own Explained: Malaysia\'s Path to Homeownership',
    excerpt: 'Rent-to-Own is no longer just a last resort — it\'s a strategic tool for smart buyers. Learn the legal framework, programme options, and how to negotiate the best rent credit terms and option agreement conditions.',
    readTime: '6 min read',
    topics: ['Legal structure of RTO', 'Rent credit negotiation', 'Option agreement terms', 'Government RTO schemes', 'Converting to mortgage'],
  },
  {
    category: 'Rental Yield',
    color: 'text-green-700 bg-green-50',
    title: 'Understanding Rental Yield: Malaysia Investment Deep Dive',
    excerpt: 'Gross yield is just the starting point. This guide explains net yield, capital yield, occupancy rates, and how to model total returns over a 10-year investment horizon for Malaysian properties.',
    readTime: '7 min read',
    topics: ['Gross vs. net yield', 'Top yield areas by state', 'Short-term vs. long-term rental', 'Tax implications', '10-year return modelling'],
  },
];

const checklist = [
  'I have a stable employment history of 2+ years',
  'My total monthly debt obligations are below 60% of gross income',
  'I have 10% down payment + 3-5% closing costs saved',
  'My CCRIS report shows no arrears in the last 12 months',
  'I have 6 months emergency fund separate from down payment',
  'I have compared loan packages from at least 3 banks',
  'I understand the property\'s maintenance fees and sinking fund',
  'I have conducted a title search and verified no encumbrances',
  'I have appointed a conveyancing lawyer',
  'I understand the monthly commitment for 30+ years',
];

export default function InvestmentInsightsClient() {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [checked, setChecked] = useState<boolean[]>(new Array(checklist.length).fill(false));

  const grossYield = (() => {
    const price = parseFloat(purchasePrice.replace(/,/g, ''));
    const rent = parseFloat(monthlyRent.replace(/,/g, ''));
    if (!price || !rent || price === 0) return null;
    return ((rent * 12) / price) * 100;
  })();

  const toggleCheck = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const checkedCount = checked.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-teal-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Investment Insights</h1>
          <p className="text-green-200 text-sm">Data-driven property investment guides and tools for Malaysian investors</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Articles */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Investment Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <div key={article.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${article.color}`}>
                  {article.category}
                </span>
                <h3 className="font-bold text-gray-900 mt-3 mb-2 leading-snug">{article.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.topics.map((topic) => (
                    <span key={topic} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{topic}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                  <Link href="/ai-search" className="text-emerald-700 text-sm font-semibold hover:underline">
                    Ask AI about this →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rental Yield Calculator */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Rental Yield Calculator</h2>
              <p className="text-gray-500 text-sm">Calculate gross rental yield for any Malaysian property</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Purchase Price (RM)</label>
              <input
                type="text"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="e.g. 450,000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Expected Monthly Rent (RM)</label>
              <input
                type="text"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                placeholder="e.g. 2,200"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-400"
              />
            </div>
          </div>

          {grossYield !== null ? (
            <div className={`rounded-2xl p-5 ${grossYield >= 6 ? 'bg-green-50 border border-green-200' : grossYield >= 4.5 ? 'bg-amber-50 border border-amber-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Gross Rental Yield</p>
                  <p className={`text-4xl font-bold ${grossYield >= 6 ? 'text-green-700' : grossYield >= 4.5 ? 'text-amber-700' : 'text-red-700'}`}>
                    {grossYield.toFixed(2)}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Annual rent: RM{(parseFloat(monthlyRent.replace(/,/g, '')) * 12).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${grossYield >= 6 ? 'bg-green-100 text-green-800' : grossYield >= 4.5 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                    {grossYield >= 6 ? 'Excellent yield' : grossYield >= 4.5 ? 'Average yield' : 'Below average'}
                  </span>
                  <p className="text-xs text-gray-500 mt-2">Malaysian average: 5.0%–6.5%</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-current border-opacity-10 text-xs text-gray-500">
                <p><strong>Note:</strong> This is <em>gross</em> yield. Net yield (after maintenance, assessment, and vacancy) is typically 1–1.5% lower. Net yield = {Math.max(0, grossYield - 1.25).toFixed(2)}%–{Math.max(0, grossYield - 1.0).toFixed(2)}% estimated.</p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-5 text-center text-gray-400 text-sm">
              Enter purchase price and monthly rent to calculate yield
            </div>
          )}
        </section>

        {/* Financing Readiness Checklist */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Financing Readiness Checklist</h2>
                <p className="text-gray-500 text-sm">Tick all boxes before applying for a home loan</p>
              </div>
            </div>
            <div className="text-center">
              <span className={`text-2xl font-bold ${checkedCount >= 8 ? 'text-green-700' : checkedCount >= 5 ? 'text-amber-600' : 'text-gray-400'}`}>
                {checkedCount}/{checklist.length}
              </span>
              <p className="text-xs text-gray-500">completed</p>
            </div>
          </div>

          <div className="h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${checkedCount >= 8 ? 'bg-green-500' : checkedCount >= 5 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${(checkedCount / checklist.length) * 100}%` }}
            />
          </div>

          <div className="space-y-3">
            {checklist.map((item, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${checked[i] ? 'bg-emerald-700 border-emerald-700' : 'border-gray-300 group-hover:border-emerald-400'}`}>
                  {checked[i] && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input type="checkbox" checked={checked[i]} onChange={() => toggleCheck(i)} className="sr-only" />
                <span className={`text-sm ${checked[i] ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item}</span>
              </label>
            ))}
          </div>

          {checkedCount >= 8 && (
            <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <strong>Great news!</strong> You&apos;re financially well-prepared to apply for a home loan. We recommend consulting with 3 banks to compare rates before committing.
            </div>
          )}
        </section>

        {/* AI CTA */}
        <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 rounded-2xl p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Get Personalised AI Investment Analysis</h2>
          <p className="text-emerald-100 text-sm mb-6 max-w-lg mx-auto">
            Tell our AI your income, savings, and investment goals. Get a personalised property portfolio strategy in minutes.
          </p>
          <Link href="/ai-search" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-7 py-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Start AI Investment Analysis
          </Link>
        </section>
      </div>
    </div>
  );
}
