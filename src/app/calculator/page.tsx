import type { Metadata } from 'next';
import LoanEligibilityCalculator from '@/components/LoanEligibilityCalculator';
import MortgageCalculator from '@/components/MortgageCalculator';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kalkulator Pinjaman Rumah Malaysia — Semak Kelayakan & Ansuran Bulanan',
  description:
    'Semak kelayakan pinjaman rumah dan anggaran ansuran bulanan anda secara percuma. Masukkan gaji dan dapatkan harga rumah mampu beli dalam beberapa saat.',
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f2540] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Kalkulator Pinjaman Rumah</h1>
          <p className="text-[#fde68a] text-sm">Semak kelayakan dan ansuran bulanan anda secara percuma</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Eligibility */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">1. Berapa Mampu Saya Beli?</h2>
          <LoanEligibilityCalculator />
        </div>

        {/* Mortgage */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">2. Ansuran untuk Hartanah Tertentu</h2>
          <MortgageCalculator reservePrice={500000} priceLabel="Harga Hartanah" />
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#0f2540] to-[#1e3a5f] rounded-2xl p-6 text-white text-center">
          <p className="font-bold text-lg mb-2">Dah tahu bajet anda?</p>
          <p className="text-[#fef3c7] text-sm mb-5">Terokai 15,000+ hartanah dalam julat mampu milik anda</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/subsale" className="bg-[#d4a017] hover:bg-[#c49012] text-[#0f2540] font-bold px-6 py-3 rounded-xl text-sm transition-colors">
              Cari Rumah Untuk Dijual
            </Link>
            <Link href="/rent" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
              Cari Sewaan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
