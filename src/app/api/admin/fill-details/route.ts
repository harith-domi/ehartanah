import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const clean = (s: string | null) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY ?? null);
  const k = clean(req.nextUrl.searchParams.get('k'));
  if (!adminKey || k !== adminKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const sb = createAdminSupabase();
  const { data, error } = await sb.from('admin_listings').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let updated = 0;
  for (const row of data ?? []) {
    const hasGenericDesc = !row.description || (row.description as string).startsWith('Auction property');
    const hasBaths = row.bathrooms != null;
    if (!hasGenericDesc && hasBaths) continue;

    const baths = row.bathrooms ??
      (row.bedrooms >= 4 ? 3 : row.bedrooms >= 3 ? 2 : row.bedrooms >= 1 ? 1 : null);

    const reserveMatch = (row.description ?? '').match(/RM\s?([\d,]+)/);
    const reserveStr = reserveMatch
      ? `RM ${parseInt((reserveMatch[1] as string).replace(/,/g, ''), 10).toLocaleString('en-MY')}`
      : null;

    const parts: (string | null)[] = [
      `${row.category} located at ${row.subarea || row.location || row.region}.`,
      row.size ? `Built-up area: ${(row.size as number).toLocaleString('en-MY')} sq.ft.` : null,
      row.bedrooms
        ? `${row.bedrooms} bedrooms${baths ? `, ${baths} bathrooms` : ''}.`
        : null,
      row.tenure ? `${row.tenure} tenure.` : null,
      reserveStr
        ? `Auction property — reserve price ${reserveStr}, no bidder.`
        : null,
      'Available for rent. Contact us to arrange a viewing.',
    ];

    const description = parts.filter(Boolean).join(' ');

    await sb.from('admin_listings').update({
      description,
      ...(hasBaths ? {} : { bathrooms: baths }),
    }).eq('id', row.id);
    updated++;
  }

  return NextResponse.json({ updated });
}
