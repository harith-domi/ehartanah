import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0">
                <span className="italic text-red-500 font-black" style={{ fontFamily: 'Georgia, serif', fontSize: '2.8rem', lineHeight: 1, letterSpacing: '-0.04em' }}>e</span>
                <span className="font-extrabold text-white text-2xl tracking-tight" style={{ letterSpacing: '0.02em' }}>Hartanah</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Malaysia's trusted property marketplace. Find your dream home or commercial space across the country.
            </p>
            <div className="flex gap-3">
              {['f', 'in', 'yt'].map(s => (
                <a key={s} href="#" className="w-8 h-8 bg-gray-700 hover:bg-red-600 rounded flex items-center justify-center text-xs font-bold text-white transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Buy/Rent */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Properties</h4>
            <ul className="space-y-2 text-sm">
              {['Houses for Sale', 'Condos for Sale', 'Commercial for Sale', 'Houses for Rent', 'Condos for Rent', 'Office for Rent'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-white hover:underline transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Areas */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Popular Areas</h4>
            <ul className="space-y-2 text-sm">
              {['KLCC', 'Mont Kiara', 'Bangsar', 'Petaling Jaya', 'Subang Jaya', 'Georgetown, Penang'].map(area => (
                <li key={area}>
                  <Link href="#" className="hover:text-white hover:underline transition-colors">{area}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Careers', 'Press', 'Contact Us', 'Advertise With Us', 'Terms & Conditions', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-white hover:underline transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <p>© 2026 eHartanah Sdn Bhd. All rights reserved.</p>
          <p className="text-xs">
            Real Estate Broker License: E(1)0001 &nbsp;|&nbsp; Registered with LPPEH
          </p>
        </div>
      </div>
    </footer>
  );
}
