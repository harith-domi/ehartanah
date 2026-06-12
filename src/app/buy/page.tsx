import { redirect } from 'next/navigation';
import type { BrowseParams } from '@/components/ListingBrowser';

export default async function BuyPage({ searchParams }: { searchParams: Promise<BrowseParams> }) {
  const params = await searchParams;
  const qs = new URLSearchParams({ type: 'sale', ...Object.fromEntries(Object.entries(params).filter(([, v]) => v)) }).toString();
  redirect(`/browse?${qs}`);
}
