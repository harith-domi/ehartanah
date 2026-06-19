'use client';
import { useState, useMemo } from 'react';
import { useLang } from '@/lib/i18n';

function calcMonthly(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function fmt(n: number): string {
  return `RM ${Math.round(n).toLocaleString('en-MY')}`;
}

const PRESETS = [
  { label: 'Competitive', rate: 3.85 },
  { label: 'Standard', rate: 4.50 },
  { label: 'Conservative', rate: 5.50 },
];

export default function MortgageCalculator({ reservePrice, priceLabel = 'Property Price' }: { reservePrice: number; priceLabel?: string }) {
  const [ltvPct, setLtvPct] = useState(90);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(4.50);

  const loan = useMemo(() => reservePrice * (ltvPct / 100), [reservePrice, ltvPct]);
  const monthly = useMemo(() => calcMonthly(loan, rate, years), [loan, rate, years]);
  const totalPay = useMemo(() => monthly * years * 12, [monthly, years]);
  const totalInterest = useMemo(() => totalPay - loan, [totalPay, loan]);
  const downpayment = reservePrice - loan;
  const { lang } = useLang();
  const t = lang === 'en' ? {
    title: 'Loan Calculator',
    monthlyLabel: 'Estimated Monthly Instalment',
    loanSummary: (ln: string, yr: number, r: number) => `Loan: ${ln} · ${yr} yrs · ${r}% p.a.`,
    ratePreset: 'Interest Rate Preset',
    ltv: 'Loan Amount (LTV)',
    tenure: 'Loan Tenure',
    interestRate: 'Interest Rate',
    downPayment: (pct: number) => `Down Payment (${pct}%)`,
    totalInterest: 'Total Interest',
    totalRepayment: 'Total Repayment',
    disclaimer: 'Indicative only. Actual rates depend on your bank, credit profile, and property type. Consult a mortgage advisor before committing.',
  } : {
    title: 'Kalkulator Pinjaman',
    monthlyLabel: 'Anggaran Ansuran Bulanan',
    loanSummary: (ln: string, yr: number, r: number) => `Pinjaman: ${ln} · ${yr} thn · ${r}% setahun`,
    ratePreset: 'Kadar Faedah Pratetap',
    ltv: 'Jumlah Pinjaman (LTV)',
    tenure: 'Tempoh Pinjaman',
    interestRate: 'Kadar Faedah',
    downPayment: (pct: number) => `Bayaran Pendahuluan (${pct}%)`,
    totalInterest: 'Jumlah Faedah',
    totalRepayment: 'Jumlah Bayaran Balik',
    disclaimer: 'Anggaran sahaja. Kadar sebenar bergantung pada bank, profil kredit, dan jenis hartanah anda.',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <h3 className="font-bold text-gray-900 text-sm">{t.title}</h3>
      </div>

      <div className="p-5 space-y-5">
        {/* Monthly result hero */}
        <div className="bg-[#0f2540] rounded-xl p-4 text-center">
          <p className="text-amber-300 text-xs font-medium mb-1">{t.monthlyLabel}</p>
          <p className="text-3xl font-black text-white">{fmt(monthly)}<span className="text-base font-normal text-gray-300">/mo</span></p>
          <p className="text-gray-400 text-xs mt-1">{t.loanSummary(fmt(loan), years, rate)}</p>
        </div>

        {/* Rate presets */}
        <div>
          <p className="text-xs text-gray-500 font-medium mb-2">{t.ratePreset}</p>
          <div className="flex gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setRate(p.rate)}
                className={`flex-1 text-xs font-semibold py-1.5 rounded-lg border transition-colors ${rate === p.rate ? 'bg-[#0f2540] text-white border-[#0f2540]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
              >
                {p.label}<br />
                <span className="font-normal">{p.rate}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* LTV slider */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500 font-medium">{t.ltv}</span>
            <span className="font-bold text-[#0f2540]">{ltvPct}% — {fmt(loan)}</span>
          </div>
          <input type="range" min={70} max={100} step={5} value={ltvPct} onChange={(e) => setLtvPct(Number(e.target.value))}
            className="w-full accent-[#0f2540]" />
          <div className="flex justify-between text-[11px] text-gray-400 mt-0.5">
            <span>70%</span><span>90%</span><span>100%</span>
          </div>
        </div>

        {/* Tenure slider */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500 font-medium">{t.tenure}</span>
            <span className="font-bold text-[#0f2540]">{years} years</span>
          </div>
          <input type="range" min={5} max={35} step={5} value={years} onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-[#0f2540]" />
          <div className="flex justify-between text-[11px] text-gray-400 mt-0.5">
            <span>5 yrs</span><span>20 yrs</span><span>35 yrs</span>
          </div>
        </div>

        {/* Rate slider */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500 font-medium">{t.interestRate}</span>
            <span className="font-bold text-[#0f2540]">{rate.toFixed(2)}% p.a.</span>
          </div>
          <input type="range" min={3} max={6} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-amber-500" />
          <div className="flex justify-between text-[11px] text-gray-400 mt-0.5">
            <span>3%</span><span>4.5%</span><span>6%</span>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">{priceLabel}</span>
            <span className="font-semibold text-gray-800">{fmt(reservePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t.downPayment(100 - ltvPct)}</span>
            <span className="font-semibold text-amber-700">{fmt(downpayment)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t.totalInterest}</span>
            <span className="font-semibold text-red-500">{fmt(totalInterest)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2">
            <span className="text-gray-700 font-semibold">{t.totalRepayment}</span>
            <span className="font-black text-gray-900">{fmt(totalPay)}</span>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 leading-relaxed">{t.disclaimer}</p>
      </div>
    </div>
  );
}
