'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-0">
              <span className="italic text-red-600 font-black" style={{ fontFamily: 'Georgia, serif', fontSize: '2.8rem', lineHeight: 1, letterSpacing: '-0.04em' }}>e</span>
              <span className="font-extrabold text-gray-900 text-2xl tracking-tight" style={{ letterSpacing: '0.02em' }}>Hartanah</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/buy" className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium text-sm transition-colors rounded-md hover:bg-red-50">
              Buy
            </Link>
            <Link href="/rent" className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium text-sm transition-colors rounded-md hover:bg-red-50">
              Rent
            </Link>
            <Link href="/buy?type=condo,apartment" className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium text-sm transition-colors rounded-md hover:bg-red-50">
              New Homes
            </Link>
            <Link href="/buy?type=shophouse,office,retail" className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium text-sm transition-colors rounded-md hover:bg-red-50">
              Commercial
            </Link>
            <Link href="/agents" className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium text-sm transition-colors rounded-md hover:bg-red-50">
              Agents
            </Link>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1.5">
              Log In
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors">
              List Property
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
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
            {['Buy', 'Rent', 'New Homes', 'Commercial', 'Agents'].map(item => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="block px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md font-medium text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="flex gap-3 px-4 pt-2">
              <button className="flex-1 border border-gray-300 text-sm font-medium py-2 rounded-md hover:bg-gray-50">Log In</button>
              <button className="flex-1 bg-red-600 text-white text-sm font-semibold py-2 rounded-md hover:bg-red-700">List Property</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
