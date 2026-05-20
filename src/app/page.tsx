import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { getFeaturedProperties, getPropertiesByType, popularAreas } from '@/lib/properties';

const propertyTypeIcons = [
  { label: 'Condo', icon: '🏢', href: '/buy?type=condo' },
  { label: 'House', icon: '🏠', href: '/buy?type=house' },
  { label: 'Bungalow', icon: '🏡', href: '/buy?type=bungalow' },
  { label: 'Townhouse', icon: '🏘️', href: '/buy?type=townhouse' },
  { label: 'Commercial', icon: '🏪', href: '/buy?type=shophouse,office,retail' },
  { label: 'Office', icon: '🏬', href: '/buy?type=office' },
  { label: 'Land', icon: '🌿', href: '/buy?type=land' },
  { label: 'New Launch', icon: '✨', href: '/buy?new=true' },
];

const stats = [
  { label: 'Active Listings', value: '142,000+' },
  { label: 'Registered Agents', value: '28,000+' },
  { label: 'Properties Sold', value: '4.2M+' },
  { label: 'Happy Families', value: '1M+' },
];

export default function HomePage() {
  const featured = getFeaturedProperties(6);
  const forRent = getPropertiesByType('rent', 4);

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative bg-cover bg-center py-20 md:py-28"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight drop-shadow">
            Find Your Dream Property<br className="hidden sm:block" /> in Malaysia
          </h1>
          <p className="text-white/85 text-base sm:text-lg mb-10 max-w-xl mx-auto">
            Search from over 140,000 residential and commercial listings across the country.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-red-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-red-100">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROPERTY TYPE QUICK-LINKS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Browse by Property Type</h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {propertyTypeIcons.map(({ label, icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-red-400 hover:shadow-md transition-all group"
            >
              <span className="text-2xl sm:text-3xl">{icon}</span>
              <span className="text-xs font-medium text-gray-600 group-hover:text-red-600 text-center">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Featured Properties for Sale</h2>
            <p className="text-sm text-gray-500 mt-1">Hand-picked listings from verified agents</p>
          </div>
          <Link href="/buy" className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(p => (
            <PropertyCard key={p.id} property={p} featured />
          ))}
        </div>
      </section>

      {/* ── POPULAR AREAS ── */}
      <section className="bg-white border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Popular Areas</h2>
            <Link href="/buy" className="text-red-600 hover:text-red-700 text-sm font-semibold">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularAreas.map(area => (
              <Link
                key={area.name}
                href={`/buy?location=${area.name}`}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <Image
                  src={area.image}
                  alt={area.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <p className="font-semibold text-sm leading-tight">{area.name}</p>
                  <p className="text-xs text-white/75">{area.state}</p>
                  <p className="text-xs text-white/60 mt-0.5">{area.count.toLocaleString()} listings</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RENTAL LISTINGS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Recently Listed for Rent</h2>
            <p className="text-sm text-gray-500 mt-1">Fresh rental listings across Malaysia</p>
          </div>
          <Link href="/rent" className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {forRent.map(p => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 py-14 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Have a property to sell or rent?</h2>
        <p className="text-red-100 text-base mb-6 max-w-xl mx-auto">
          List your property on eHartanah and reach thousands of serious buyers and tenants today.
        </p>
        <button className="bg-white text-red-600 hover:bg-gray-50 font-bold px-8 py-3 rounded-lg text-sm transition-colors shadow-lg">
          List Your Property – Free
        </button>
      </section>

      {/* ── WHY DOMI ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-10">Why Choose eHartanah?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              title: 'Verified Listings',
              desc: 'Every listing is reviewed and verified by our team to ensure accuracy and legitimacy.',
              icon: '✅',
            },
            {
              title: 'Trusted Agents',
              desc: 'All agents are licensed with LPPEH/BOVAEA and carry professional certifications.',
              icon: '🤝',
            },
            {
              title: 'Comprehensive Search',
              desc: 'Advanced filters let you narrow down by area, price, size, and features in seconds.',
              icon: '🔍',
            },
          ].map(item => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
