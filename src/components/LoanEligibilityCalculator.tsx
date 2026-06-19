'use client';
import { useState, useMemo } from 'react';

function calcMonthly(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function maxLoan(availableMonthly: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return availableMonthly * n;
  return (availableMonthly * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `RM ${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `RM ${Math.round(n / 1000)}k`;
  return `RM ${Math.round(n).toLocaleString('en-MY')}`;
}

export default function LoanEligibilityCalculator() {
  const [grossIncome, setGrossIncome] = useState(5000);
  const [commitments, setCommitments] = useState(0);
  const [years, setYears] = useState(30);
  const [rate] = useState(4.5);
  const LTV = 0.9;

  const netIncome = useMemo(() => grossIncome * 0.85, [grossIncome]);
  const maxDSR = useMemo(() => netIncome * 0.6, [netIncome]);
  const available = useMemo(() => Math.max(0, maxDSR - commitments), [maxDSR, commitments]);
  const loanAmount = useMemo(() => maxLoan(available, rate, years), [available, rate, years]);
  const propertyPrice = useMemo(() => loanAmount / LTV, [loanAmount]);
  const downpayment = useMemo(() => propertyPrice * (1 - LTV), [propertyPrice]);
  const monthly = useMemo(() => calcMonthly(loanAmount, rate, years), [loanAmount, rate, years]);

  const canAfford = loanAmount > 50000;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <svg className="w-4 h-4 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        <h3 className="font-bold text-gray-900 text-sm">Semak Kelayakan Pinjaman / Loan Eligibility</h3>
      </div>

      <div className="p-5 space-y-5">
        {/* Result hero */}
        <div className={`rounded-xl p-4 text-center ${canAfford ? 'bg-[#0f2540]' : 'bg-gray-100'}`}>
          {canAfford ? (
            <>
              <p className="text-amber-300 text-xs font-medium mb-1">Anggaran Harga Rumah Mampu Beli</p>
              <p className="text-3xl font-black text-white">{fmt(propertyPrice)}</p>
              <p className="text-gray-400 text-xs mt-1">Pinjaman {fmt(loanAmount)} · {fmt(monthly)}/bulan · {years} thn</p>
            </>
          ) : (
            <p className="text-gray-500 text-sm font-medium">Masukkan maklumat pendapatan anda</p>
          )}
        </div>

        {/* Gross income */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500 font-medium">Pendapatan Kasar / Gross Income</span>
            <span className="font-bold text-[#0f2540]">RM {grossIncome.toLocaleString('en-MY')}/bln</span>
          </div>
          <input type="range" min={1500} max={30000} step={500} value={grossIncome}
            onChange={(e) => setGrossIncome(Number(e.target.value))}
            className="w-full accent-[#0f2540]" />
          <div className="flex justify-between text-[11px] text-gray-400 mt-0.5">
            <span>RM 1,500</span><span>RM 15,000</span><span>RM 30,000</span>
          </div>
        </div>

        {/* Existing commitments */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500 font-medium">Komitmen Sedia Ada / Monthly Commitments</span>
            <span className="font-bold text-[#0f2540]">RM {commitments.toLocaleString('en-MY')}/bln</span>
          </div>
          <input type="range" min={0} max={5000} step={100} value={commitments}
            onChange={(e) => setCommitments(Number(e.target.value))}
            className="w-full accent-amber-500" />
          <p className="text-[11px] text-gray-400 mt-0.5">Bayaran kereta, kad kredit, PTPTN, dll.</p>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500 font-medium">Tempoh Pinjaman / Loan Tenure</span>
            <span className="font-bold text-[#0f2540]">{years} tahun</span>
          </div>
          <input type="range" min={10} max={35} step={5} value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-[#0f2540]" />
          <div className="flex justify-between text-[11px] text-gray-400 mt-0.5">
            <span>10 thn</span><span>25 thn</span><span>35 thn</span>
          </div>
        </div>

        {/* Breakdown */}
        {canAfford && (
          <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Pendapatan bersih (anggaran)</span>
              <span className="font-semibold">{fmt(netIncome)}/bln</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Had DSR (60%)</span>
              <span className="font-semibold">{fmt(maxDSR)}/bln</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Baki untuk rumah</span>
              <span className="font-semibold text-green-600">{fmt(available)}/bln</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="text-gray-500">Deposit diperlukan (10%)</span>
              <span className="font-bold text-amber-700">{fmt(downpayment)}</span>
            </div>
          </div>
        )}

        <p className="text-[10px] text-gray-400 leading-relaxed">
          Kiraan berdasarkan kadar faedah {rate}% setahun, DSR 60%, pembiayaan 90%. Anggaran sahaja — kelulusan bergantung pada bank dan profil kredit anda.
        </p>
      </div>
    </div>
  );
}
