import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

const BASE_URL = 'https://property-website-rose.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "eHartanah – Malaysia's Trusted Property Marketplace",
    template: '%s | eHartanah',
  },
  description:
    'Find your dream property in Malaysia. Browse verified houses, condos, apartments, and commercial spaces for sale and rent in KL, Selangor, Penang, Johor, and more.',
  keywords: [
    'property Malaysia',
    'rumah untuk dijual',
    'hartanah Malaysia',
    'house for sale KL',
    'condo for rent Kuala Lumpur',
    'property for sale Selangor',
    'real estate Malaysia',
    'apartment rent Malaysia',
    'commercial property Malaysia',
    'new launch condo Malaysia',
    'bungalow for sale KL',
    'landed property Selangor',
  ],
  authors: [{ name: 'eHartanah', url: BASE_URL }],
  creator: 'eHartanah',
  publisher: 'eHartanah Sdn Bhd',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    url: BASE_URL,
    siteName: 'eHartanah',
    title: "eHartanah – Malaysia's Trusted Property Marketplace",
    description:
      'Search 140,000+ residential and commercial listings across Malaysia. Verified agents, new launches, and affordable homes.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'eHartanah – Malaysia Property Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "eHartanah – Malaysia's Trusted Property Marketplace",
    description: 'Search 140,000+ properties for sale and rent in Malaysia.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-MY">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
