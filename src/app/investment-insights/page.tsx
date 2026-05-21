import type { Metadata } from 'next';
import InvestmentInsightsClient from '@/components/InvestmentInsightsClient';

export const metadata: Metadata = {
  title: 'Investment Insights',
  description: 'Malaysian property investment guides, rental yield calculator, auction analysis, and financing readiness tools from eHartanah.',
};

export default function InvestmentInsightsPage() {
  return <InvestmentInsightsClient />;
}
