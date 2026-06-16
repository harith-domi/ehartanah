'use client';
import { useState } from 'react';
import { AGENCY_PHONE } from '@/lib/listings';

const FAQ = [
  {
    q: 'What is a bank auction (lelong)?',
    a: 'A bank auction happens when a borrower defaults on their mortgage. The bank repossesses the property and sells it publicly to recover the loan. Because banks want to recover quickly, reserve prices are typically 20–40% below market value — which is why lelong properties are attractive to investors and first-time buyers.',
  },
  {
    q: 'Who can participate in a bank auction?',
    a: 'Any Malaysian citizen or permanent resident aged 18 and above can bid. Foreigners may participate but are subject to state foreign ownership rules. You don\'t need an agent — but having one familiar with the process helps, especially for due diligence and paperwork.',
  },
  {
    q: 'What documents do I need on auction day?',
    a: 'Bring: (1) Original IC or passport, (2) Bank draft for the deposit — usually 10% of reserve price, made payable to the auctioneer. Check the Proclamation of Sale (POS) document for exact requirements. Some auctions require a cashier\'s order instead of a bank draft.',
  },
  {
    q: 'How does the bidding work?',
    a: 'Register at the auction venue before it starts. The auctioneer will announce the reserve price and open bidding. You raise your hand or number card to bid. If you\'re the highest bidder and no one beats you after 3 calls, the property is yours. You then sign the sale confirmation and pay the deposit immediately.',
  },
  {
    q: 'What happens after I win?',
    a: 'After paying the 10% deposit, you typically have 90–120 days to settle the remaining balance. This is when you finalise your bank loan. If you fail to complete payment, you forfeit the deposit. Legal fees, stamp duty, and transfer costs are the buyer\'s responsibility — budget an extra 3–5% on top of the purchase price.',
  },
  {
    q: 'Can I inspect the property before bidding?',
    a: 'Usually not — this is one of the key risks of buying at auction. The property is sold "as is, where is." You can drive past, check the exterior, and speak to neighbours. Some properties are vacant; others may still have occupants, which means eviction proceedings after purchase. Always do your due diligence: check land title, outstanding quit rent/assessments, and encumbrances at the land office before bidding.',
  },
  {
    q: 'Is there a way to get financing for an auction property?',
    a: 'Yes. Most banks offer auction property loans, but pre-approval is critical — you have 90–120 days to settle and the clock starts on auction day. Approach your bank before the auction. Some banks may be cautious about properties with occupancy issues or outstanding strata fees, so check the POS details.',
  },
];

export default function AuctionGuide() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h2 className="font-bold text-gray-900">Auction 101 — First Timer's Guide</h2>
          <p className="text-xs text-gray-500 mt-0.5">Everything you need to know before bidding at a Malaysian bank auction</p>
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {FAQ.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-gray-800 text-sm pr-4">{item.q}</span>
              <svg
                className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === i && (
              <div className="px-4 sm:px-6 pb-5">
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-5 sm:px-6 py-5 bg-amber-50 border-t border-amber-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-amber-800">Still have questions?</p>
          <p className="text-xs text-amber-700 mt-0.5">Our team has guided many first-time lelong buyers. Let us help.</p>
        </div>
        <a
          href={`https://wa.me/${AGENCY_PHONE}?text=${encodeURIComponent('Salam! Saya ingin tahu lebih lanjut tentang cara membeli hartanah lelongan bank.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Ask Us
        </a>
      </div>
    </div>
  );
}
