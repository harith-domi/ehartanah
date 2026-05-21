'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'AI Search', href: '/ai-search' },
  { label: 'Subsale', href: '/subsale' },
  { label: 'Auction', href: '/auction' },
  { label: 'Rent-to-Own', href: '/rent-to-own' },
  { label: 'Insights', href: '/investment-insights' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 shrink-0">
            <span className="italic text-blue-700 font-black" style={{ fontFamily: 'Georgia, serif', fontSize: '2.6rem', lineHeight: 1, letterSpacing: '-0.04em' }}>e</span>
            <span className="font-extrabold text-gray-900 text-2xl tracking-tight" style={{ letterSpacing: '0.02em' }}>Hartanah</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ label, href }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`px-3 py-2 font-medium text-sm transition-colors rounded-md ${
                    isActive
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1.5 transition-colors">
              Log In
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              List Property
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
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
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {navLinks.map(({ label, href }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`block px-4 py-2.5 rounded-md font-medium text-sm transition-colors ${
                    isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
            <div className="flex gap-3 px-4 pt-2">
              <button className="flex-1 border border-gray-300 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors">Log In</button>
              <button className="flex-1 bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-800 transition-colors">List Property</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
