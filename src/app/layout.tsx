import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';

const inter = Inter({ subsets: ['latin'] });

const BASE_URL = 'https://ehartanahmalaysia.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "eHartanah – Malaysia's AI-Powered Property Platform",
    template: '%s | eHartanah',
  },
  description:
    'Find your ideal property in Malaysia using AI. Browse subsale homes, bank auction deals, and rent-to-own programmes in KL, Selangor, Penang, Johor, and beyond.',
  keywords: [
    'property Malaysia',
    'rumah untuk dijual',
    'hartanah Malaysia',
    'hartanah AI',
    'AI property search Malaysia',
    'house for sale KL',
    'bank auction property Malaysia',
    'lelong hartanah',
    'rent to own Malaysia',
    'sewa beli hartanah',
    'condo for sale Kuala Lumpur',
    'property investment Malaysia',
    'real estate Malaysia',
    'beli rumah pertama',
    'new launch condo Malaysia',
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
    title: "eHartanah – Malaysia's AI-Powered Property Intelligence Platform",
    description:
      'AI-powered property search for subsale, auction, and rent-to-own in Malaysia. Get instant insights, yield analysis, and auction risk scores.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'eHartanah – Malaysia AI Property Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "eHartanah – Malaysia's AI-Powered Property Platform",
    description: 'Search subsale, auction, and rent-to-own properties in Malaysia with AI.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-MY">
      <body className={`${inter.className} bg-slate-50 text-gray-900 antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
