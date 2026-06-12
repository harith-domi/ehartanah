'use client';

import { useState } from 'react';
import { AGENCY_WA } from '@/lib/listings';

interface Question {
  key: string;
  label: string;
  options: { value: string; label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    key: 'income',
    label: 'Pendapatan bulanan isi rumah anda?',
    options: [
      { value: 'RM2,000 - RM3,500', label: 'RM2,000 – RM3,500', score: 1 },
      { value: 'RM3,500 - RM5,000', label: 'RM3,500 – RM5,000', score: 2 },
      { value: 'RM5,000 - RM8,000', label: 'RM5,000 – RM8,000', score: 3 },
      { value: 'RM8,000+', label: 'RM8,000 ke atas', score: 3 },
    ],
  },
  {
    key: 'deposit',
    label: 'Berapa deposit yang anda ada sekarang?',
    options: [
      { value: 'Bawah RM5,000', label: 'Bawah RM5,000', score: 1 },
      { value: 'RM5,000 - RM15,000', label: 'RM5,000 – RM15,000', score: 2 },
      { value: 'RM15,000 - RM30,000', label: 'RM15,000 – RM30,000', score: 3 },
      { value: 'RM30,000+', label: 'RM30,000 ke atas', score: 3 },
    ],
  },
  {
    key: 'employment',
    label: 'Status pekerjaan anda?',
    options: [
      { value: 'Makan gaji (tetap)', label: 'Makan gaji (tetap)', score: 3 },
      { value: 'Makan gaji (kontrak)', label: 'Makan gaji (kontrak)', score: 2 },
      { value: 'Bekerja sendiri / bisnes', label: 'Bekerja sendiri / bisnes', score: 2 },
      { value: 'Gig / freelance', label: 'Gig / freelance (Grab, shopee, dll)', score: 1 },
    ],
  },
  {
    key: 'credit',
    label: 'Status kredit anda (CCRIS/CTOS)?',
    options: [
      { value: 'Bersih', label: 'Bersih — tiada masalah', score: 3 },
      { value: 'Ada late payment', label: 'Ada rekod lewat bayar', score: 2 },
      { value: 'Pernah ditolak loan', label: 'Pernah ditolak loan bank', score: 2 },
      { value: 'Blacklist / AKPK', label: 'Blacklist / dalam AKPK', score: 1 },
    ],
  },
];

const MAX_SCORE = 12;

function getVerdict(score: number) {
  if (score >= 10) {
    return {
      title: 'Profil Kuat!',
      color: 'text-green-600',
      bg: 'bg-green-50 border-green-200',
      desc: 'Anda mungkin layak untuk loan bank biasa ATAU sewa beli dengan terma terbaik. Penasihat kami boleh bantu anda pilih laluan paling jimat.',
    };
  }
  if (score >= 7) {
    return {
      title: 'Sesuai untuk Sewa Beli',
      color: 'text-[#1e3a5f]',
      bg: 'bg-[#edf2f8] border-[#dce8f0]',
      desc: 'Profil anda padan dengan program sewa beli. Deposit rendah, tak perlu lulus loan bank dulu — bina ekuiti sambil duduk.',
    };
  }
  return {
    title: 'Boleh Dibantu',
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-200',
    desc: 'Ada beberapa cabaran, tapi bukan jalan mati. Penasihat kami akan cadangkan langkah pembaikan kredit dan program yang sesuai dengan situasi anda.',
  };
}

export default function RTOQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { value: string; score: number }>>({});

  const done = step >= QUESTIONS.length;
  const score = Object.values(answers).reduce((s, a) => s + a.score, 0);
  const verdict = getVerdict(score);

  function answer(q: Question, opt: Question['options'][number]) {
    setAnswers((prev) => ({ ...prev, [q.key]: { value: opt.value, score: opt.score } }));
    setStep((s) => s + 1);
  }

  function reset() {
    setAnswers({});
    setStep(0);
  }

  const waText = encodeURIComponent(
    `Salam! Saya berminat dengan program Sewa Beli. Keputusan semakan kelayakan saya:\n` +
    `• Pendapatan: ${answers.income?.value ?? '-'}\n` +
    `• Deposit: ${answers.deposit?.value ?? '-'}\n` +
    `• Pekerjaan: ${answers.employment?.value ?? '-'}\n` +
    `• Kredit: ${answers.credit?.value ?? '-'}\n` +
    `• Skor: ${score}/${MAX_SCORE} (${verdict.title})\n` +
    `Boleh hubungi saya untuk maklumat lanjut?`
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 text-left">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900">Semak Kelayakan Sewa Beli</h3>
        <span className="text-xs text-gray-400 font-medium shrink-0 ml-3">
          {done ? 'Selesai' : `${step + 1} / ${QUESTIONS.length}`}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#1e3a5f] to-[#d4a017] rounded-full transition-all duration-300"
          style={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      {!done ? (
        <div>
          <p className="font-semibold text-gray-800 text-sm mb-4">{QUESTIONS[step].label}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {QUESTIONS[step].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => answer(QUESTIONS[step], opt)}
                className="text-left border border-gray-200 hover:border-[#1e3a5f] hover:bg-[#edf2f8] text-gray-700 text-sm font-medium px-4 py-3 rounded-xl transition-all"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-4 text-xs text-gray-400 hover:text-gray-600 font-medium"
            >
              ← Kembali
            </button>
          )}
        </div>
      ) : (
        <div>
          <div className={`rounded-xl border p-5 mb-5 ${verdict.bg}`}>
            <p className={`font-bold text-lg mb-1 ${verdict.color}`}>{verdict.title}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{verdict.desc}</p>
            <p className="text-gray-400 text-xs mt-2">Skor anda: {score}/{MAX_SCORE}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`${AGENCY_WA}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hantar Keputusan ke WhatsApp
            </a>
            <button
              onClick={reset}
              className="border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
            >
              Cuba Semula
            </button>
          </div>
          <p className="text-gray-400 text-[11px] mt-3 text-center">
            Jawapan anda tidak disimpan — ia hanya dihantar terus ke WhatsApp apabila anda tekan butang.
          </p>
        </div>
      )}
    </div>
  );
}
