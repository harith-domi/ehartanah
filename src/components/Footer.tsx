import Link from 'next/link';
import Logo from './Logo';
import T from './T';
import { AGENCY_WA } from '@/lib/listings';

interface FooterLink {
  label: { en: string; bm: string };
  href: string;
}

const footerLinks: Record<string, { heading: { en: string; bm: string }; links: FooterLink[] }> = {
  platform: {
    heading: { en: 'Platform', bm: 'Platform' },
    links: [
      { label: { en: 'Home', bm: 'Utama' }, href: '/' },
      { label: { en: 'AI Search', bm: 'Carian AI' }, href: '/ai-search' },
      { label: { en: 'Subsale', bm: 'Subsale' }, href: '/subsale' },
      { label: { en: 'Rent', bm: 'Sewa' }, href: '/rent' },
      { label: { en: 'Auction', bm: 'Lelongan' }, href: '/auction' },
      { label: { en: 'Rent-to-Own', bm: 'Sewa Beli' }, href: '/rent-to-own' },
      { label: { en: 'Investment Insights', bm: 'Wawasan Pelaburan' }, href: '/investment-insights' },
    ],
  },
  propertyTypes: {
    heading: { en: 'Property Types', bm: 'Jenis Hartanah' },
    links: [
      { label: { en: 'Condo for Sale', bm: 'Kondo untuk Dijual' }, href: '/subsale' },
      { label: { en: 'House for Sale', bm: 'Rumah untuk Dijual' }, href: '/subsale' },
      { label: { en: 'Commercial', bm: 'Komersial' }, href: '/subsale' },
      { label: { en: 'New Launch', bm: 'Pelancaran Baharu' }, href: '/subsale' },
      { label: { en: 'Auction Properties', bm: 'Hartanah Lelongan' }, href: '/auction' },
    ],
  },
  resources: {
    heading: { en: 'Resources', bm: 'Sumber' },
    links: [
      { label: { en: 'Property Guides', bm: 'Panduan Hartanah' }, href: '/guides' },
      { label: { en: 'How Rent-to-Own Works', bm: 'Cara Sewa Beli Rumah' }, href: '/guides/cara-sewa-beli-rumah-malaysia' },
      { label: { en: 'Rejected by the Bank?', bm: 'Gagal Loan Bank?' }, href: '/guides/gagal-loan-bank-pilihan-anda' },
      { label: { en: 'RTO vs Normal Rental', bm: 'Sewa Beli vs Sewa Biasa' }, href: '/guides/sewa-beli-vs-sewa-biasa' },
      { label: { en: 'Investment Insights', bm: 'Wawasan Pelaburan' }, href: '/investment-insights' },
    ],
  },
  company: {
    heading: { en: 'Company', bm: 'Syarikat' },
    links: [
      { label: { en: 'About Us', bm: 'Tentang Kami' }, href: '/about' },
      { label: { en: 'Contact', bm: 'Hubungi' }, href: '/contact' },
      { label: { en: 'Privacy Policy', bm: 'Dasar Privasi' }, href: '/contact' },
      { label: { en: 'Terms of Service', bm: 'Terma Perkhidmatan' }, href: '/contact' },
      { label: { en: 'Disclaimer', bm: 'Penafian' }, href: '/contact' },
    ],
  },
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
              <T en="Malaysia's AI-Powered Property Intelligence Platform" bm="Platform Kecerdasan Hartanah AI Malaysia" />
            </p>
            {/* WhatsApp quick link */}
            <a
              href={AGENCY_WA}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex items-center gap-2 text-xs text-green-400 hover:text-green-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Kami
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([key, col]) => (
            <div key={key}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider"><T en={col.heading.en} bm={col.heading.bm} /></h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map(({ label, href }) => (
                  <li key={label.en}>
                    <Link href={href} className="hover:text-white transition-colors">
                      <T en={label.en} bm={label.bm} />
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
            <p className="text-white font-semibold"><T en="Need help finding a property?" bm="Perlukan bantuan cari hartanah?" /></p>
            <p className="text-gray-400 text-sm"><T en="Chat with our property advisors on WhatsApp — available daily 8am–10pm" bm="Chat dengan penasihat hartanah kami di WhatsApp — tersedia setiap hari 8pg–10mlm" /></p>
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
            <T en="Chat on WhatsApp" bm="Chat di WhatsApp" />
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
