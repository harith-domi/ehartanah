import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { subsaleProperties } from '@/lib/data/subsale';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = subsaleProperties.find((p) => p.id === id);
  if (!property) return { title: 'Property Not Found' };
  return {
    title: property.title,
    description: property.description.slice(0, 155),
  };
}

export function generateStaticParams() {
  return subsaleProperties.map((p) => ({ id: p.id }));
}

function formatPrice(price: number) {
  return `RM ${price.toLocaleString('en-MY')}`;
}

export default async function SubsaleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = subsaleProperties.find((p) => p.id === id);
  if (!property) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-sm text-gray-500 flex gap-2">
          <Link href="/" className="hover:text-blue-700">Home</Link>
          <span>/</span>
          <Link href="/subsale" className="hover:text-blue-700">Subsale</Link>
          <span>/</span>
          <span className="text-gray-800 truncate">{property.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
              <Image src={property.imageUrl} alt={property.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
              <div className="absolute top-4 left-4 flex gap-2">
                {property.isNew && <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md">NEW</span>}
                {property.isFeatured && <span className="bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded-md">FEATURED</span>}
                <span className={`text-white text-xs font-semibold px-2 py-1 rounded-md ${property.tenure === 'Freehold' ? 'bg-green-600' : 'bg-gray-500'}`}>{property.tenure}</span>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {property.area}, {property.state}
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <p className="text-3xl font-bold text-blue-700">{formatPrice(property.price)}</p>
                <p className="text-gray-500 text-sm">RM{property.pricePerSqft}/sqft</p>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-2.5 py-1 rounded-full">{property.rentalYield}% yield</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-6 bg-slate-50 rounded-xl p-4">
                {[
                  { label: 'Bedrooms', value: property.bedrooms },
                  { label: 'Bathrooms', value: property.bathrooms },
                  { label: 'Carparks', value: property.carparks },
                  { label: 'Size', value: `${property.size.toLocaleString()} sqft` },
                  { label: 'Type', value: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
                ].map((spec) => (
                  <div key={spec.label} className="text-center">
                    <p className="font-bold text-gray-900 text-lg">{spec.value}</p>
                    <p className="text-gray-500 text-xs">{spec.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {property.tags.map((tag) => (
                  <span key={tag} className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full border border-blue-100 font-medium">{tag}</span>
                ))}
              </div>

              <h3 className="font-bold text-gray-900 mb-2">About This Property</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Contact Agent</h3>
              <p className="font-semibold text-gray-800 mb-1">{property.agentName}</p>
              <p className="text-gray-500 text-sm mb-4">Licensed Property Agent</p>
              <a href={`https://wa.me/${property.agentPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm mb-3">
                WhatsApp Agent
              </a>
              <Link href="/ai-search" className="block text-center border border-blue-200 text-blue-700 font-semibold py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                AI Price Analysis
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-violet-700 rounded-2xl p-5 text-white text-center">
              <p className="font-bold mb-2 text-sm">Get AI Yield Analysis</p>
              <p className="text-blue-100 text-xs mb-4">Ask our AI if this property is a good investment for your profile</p>
              <Link href="/ai-search" className="block bg-white text-blue-700 font-semibold text-sm py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                Ask AI Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
