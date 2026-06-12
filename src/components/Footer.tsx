import Link from 'next/link';
import Logo from './Logo';
import { AGENCY_WA } from '@/lib/listings';

const footerLinks = {
  Platform: [
    { label: 'Home', href: '/' },
    { label: 'AI Search', href: '/ai-search' },
    { label: 'Subsale', href: '/subsale' },
    { label: 'Auction', href: '/auction' },
    { label: 'Rent-to-Own', href: '/rent-to-own' },
    { label: 'Investment Insights', href: '/investment-insights' },
  ],
  'Property Types': [
    { label: 'Condo for Sale', href: '/subsale' },
    { label: 'House for Sale', href: '/subsale' },
    { label: 'Commercial', href: '/subsale' },
    { label: 'New Launch', href: '/subsale' },
    { label: 'Auction Properties', href: '/auction' },
  ],
  Resources: [
    { label: 'Panduan Hartanah', href: '/guides' },
    { label: 'Cara Sewa Beli Rumah', href: '/guides/cara-sewa-beli-rumah-malaysia' },
    { label: 'Gagal Loan Bank?', href: '/guides/gagal-loan-bank-pilihan-anda' },
    { label: 'Sewa Beli vs Sewa Biasa', href: '/guides/sewa-beli-vs-sewa-biasa' },
    { label: 'Investment Insights', href: '/investment-insights' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Disclaimer', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo dark />
            </Link>
            <p className="text-sm leading-relaxed mb-5 text-gray-400">
              Malaysia&apos;s AI-Powered Property Intelligence Platform
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-slate-700 hover:bg-[#1e3a5f] rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-slate-700 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 bg-slate-700 hover:bg-[#0f2540] rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 bg-slate-700 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{heading}</h4>
              <ul className="space-y-2.5 text-sm">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-white transition-colors hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-white font-semibold">Need help finding a property?</p>
            <p className="text-gray-400 text-sm">Chat with our property advisors on WhatsApp — available daily 8am–10pm</p>
          </div>
          <a
            href={AGENCY_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            <strong className="text-gray-400">Disclaimer:</strong> eHartanah is a property information and AI advisory platform. All property listings, valuations, auction information, and investment analysis provided on this platform are for informational purposes only and do not constitute professional financial, legal, or real estate advice. Property prices, rental yields, and market data are indicative and subject to change. Users should conduct their own due diligence and consult licensed real estate agents (REA/REN), lawyers, and financial advisors before making any property transaction. eHartanah does not guarantee the accuracy of third-party data including auction details, reserve prices, or market valuations. Past performance of property investments does not guarantee future returns.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <p>© 2026 eHartanah Sdn Bhd (1234567-X). All rights reserved.</p>
            <p>Real Estate Broker License: E(1)0001 &nbsp;|&nbsp; Registered with LPPEH Malaysia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
