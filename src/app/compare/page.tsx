import type { Metadata } from 'next';
import { Suspense } from 'react';
import CompareClient from './CompareClient';

export const metadata: Metadata = {
  title: 'Compare Properties — eHartanah Malaysia',
};

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" /></div>}>
      <CompareClient />
    </Suspense>
  );
}
