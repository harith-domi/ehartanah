import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { rentToOwnProperties } from '@/lib/data/rentToOwn';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = rentToOwnProperties.find((p) => p.id === id);
  if (!property) return { title: 'Property Not Found' };
  return {
    title: `${property.title} — Rent-to-Own`,
    description: property.description.slice(0, 155),
  };
}

export function generateStaticParams() {
  return rentToOwnProperties.map((p) => ({ id: p.id }));
}

function formatPrice(price: number) {
  if (price >= 1000000) return `RM${(price / 1000000).toFixed(2)}M`;
  return `RM${(price / 1000).toFixed(0)}k`;
}

export default async function RentToOwnDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = rentToOwnProperties.find((p) => p.id === id);
  if (!property) notFound();

  const totalRentCredit = property.monthlyRent * 12 * property.purchasePeriod * (property.rentCredit / 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-sm text-gray-500 flex gap-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <Link href="/rent-to-own" className="hover:text-emerald-700">Rent-to-Own</Link>
          <span>/</span>
          <span className="text-gray-800 truncate">{property.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
              <Image src={property.imageUrl} alt={property.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded-md">Rent-to-Own</span>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold px-2 py-1 rounded-md">AI Score: {property.aiSuitabilityScore}/10</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {property.location}
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <div>
                  <p className="text-3xl font-bold text-teal-700">RM{property.monthlyRent.toLocaleString()}<span className="text-base font-normal text-gray-500">/month</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Option Price</p>
                  <p className="text-xl font-bold text-gray-800">{formatPrice(property.optionPrice)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 rounded-xl p-4 mb-5">
                {[
                  { label: 'Purchase Period', value: `${property.purchasePeriod} years` },
                  { label: 'Rent Credit', value: `${property.rentCredit}%` },
                  { label: 'Upfront Deposit', value: `RM${(property.upfrontDeposit / 1000).toFixed(0)}k` },
                  { label: 'Total Credit', value: `RM${totalRentCredit.toLocaleString('en-MY', { maximumFractionDigits: 0 })}` },
                ].map((spec) => (
                  <div key={spec.label} className="text-center">
                    <p className="font-bold text-gray-900 text-base">{spec.value}</p>
                    <p className="text-xs text-gray-500">{spec.label}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-gray-900 mb-2">About This Programme</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-3 text-sm">Apply for This Programme</h3>
              <p className="text-teal-100 text-xs mb-4">Speak with our RTO specialist to check your eligibility and get the application process started.</p>
              <a href="https://wa.me/60123456789" target="_blank" rel="noopener noreferrer" className="block text-center bg-white text-teal-700 font-semibold py-3 rounded-xl mb-3 text-sm hover:bg-teal-50 transition-colors">
                WhatsApp Advisor
              </a>
              <Link href="/ai-search" className="block text-center bg-white/10 border border-white/30 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-white/20 transition-colors">
                Check AI Suitability
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Programme Summary</h3>
              {[
                { label: 'Monthly Rent', value: `RM${property.monthlyRent.toLocaleString()}` },
                { label: 'Option Price', value: formatPrice(property.optionPrice) },
                { label: 'Deposit', value: `RM${property.upfrontDeposit.toLocaleString()}` },
                { label: 'Period', value: `${property.purchasePeriod} years` },
                { label: 'Rent Credit', value: `${property.rentCredit}%` },
                { label: 'Total Credits', value: `RM${totalRentCredit.toLocaleString('en-MY', { maximumFractionDigits: 0 })}` },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-semibold text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
