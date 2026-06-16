'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { AGENCY_WA } from '@/lib/listings';
import { useLang } from '@/lib/i18n';

const navLinks = [
  { en: 'AI Search',   bm: 'Carian AI',   href: '/ai-search' },
  { en: 'Properties',  bm: 'Hartanah',    href: '/browse' },
  { en: 'Auction',     bm: 'Lelongan',    href: '/auction' },
  { en: 'Rent-to-Own', bm: 'Sewa Beli',   href: '/rent-to-own' },
  { en: 'Insights',    bm: 'Wawasan',     href: '/investment-insights' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang } = useLang();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`bg-[#0f2540] sticky top-0 z-50 transition-all duration-200 ${scrolled ? 'shadow-xl shadow-black/30' : 'shadow-md shadow-black/20'}`}>
      {/* Gold accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#d4a017] via-[#f0c040] to-[#d4a017]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0 hover:opacity-90 transition-opacity">
            <Logo dark />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 font-semibold text-sm transition-all duration-150 rounded-xl ${
                    isActive
                      ? 'text-[#d4a017] bg-white/10 shadow-sm border-b-2 border-[#d4a017]'
                      : 'text-[#94b3cc] hover:text-white hover:bg-white/10 border-b-2 border-transparent'
                  }`}
                >
                  {lang === 'bm' ? link.bm : link.en}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 text-[#94b3cc] hover:border-[#d4a017] hover:text-[#d4a017] hover:bg-white/10 transition-all"
              aria-label={lang === 'en' ? 'Tukar ke Bahasa Malaysia' : 'Switch to English'}
            >
              <span className={lang === 'en' ? 'text-white' : 'text-[#94b3cc]'}>EN</span>
              <span className="text-white/20">|</span>
              <span className={lang === 'bm' ? 'text-white' : 'text-[#94b3cc]'}>BM</span>
            </button>

            {/* WhatsApp CTA */}
            <a
              href={AGENCY_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl text-[#94b3cc] hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                    isActive ? 'text-[#d4a017] bg-white/10' : 'text-[#94b3cc] hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {lang === 'bm' ? link.bm : link.en}
                </Link>
              );
            })}
            <div className="flex gap-2 px-4 pt-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 border border-white/20 text-xs font-bold px-3 py-2 rounded-full text-[#94b3cc] hover:border-[#d4a017] hover:text-[#d4a017] transition-all"
                aria-label={lang === 'en' ? 'Tukar ke Bahasa Malaysia' : 'Switch to English'}
              >
                <span className={lang === 'en' ? 'text-white' : 'text-[#94b3cc]'}>EN</span>
                <span className="text-white/20">|</span>
                <span className={lang === 'bm' ? 'text-white' : 'text-[#94b3cc]'}>BM</span>
              </button>
              <a
                href={AGENCY_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 text-white text-sm font-bold py-2 rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Kami
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
