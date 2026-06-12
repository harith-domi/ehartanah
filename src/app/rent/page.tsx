import { redirect } from 'next/navigation';
import type { BrowseParams } from '@/components/ListingBrowser';

export default async function RentPage({ searchParams }: { searchParams: Promise<BrowseParams> }) {
  const params = await searchParams;
  const qs = new URLSearchParams({ type: 'rent', ...Object.fromEntries(Object.entries(params).filter(([, v]) => v)) }).toString();
  redirect(`/browse?${qs}`);
}
