import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase';

function shortType(cat: string) {
  const c = (cat ?? '').toLowerCase();
  if (c.includes('terrace') || c.includes('link')) return 'terrace house';
  if (c.includes('semi')) return 'semi-detached house';
  if (c.includes('bungalow')) return 'bungalow';
  if (c.includes('condominium') || c.includes('condo')) return 'condominium';
  if (c.includes('flat')) return 'flat';
  if (c.includes('studio')) return 'studio';
  if (c.includes('soho')) return 'SOHO unit';
  return 'apartment';
}

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
    const desc = (row.description ?? '') as string;
    if (!desc.toLowerCase().includes('auction') && !desc.toLowerCase().includes('no bidder')) continue;

    const type = shortType(row.category ?? '');
    const area = row.subarea || row.region || 'Malaysia';
    const baths = row.bathrooms ?? (row.bedrooms >= 4 ? 3 : row.bedrooms >= 3 ? 2 : row.bedrooms >= 1 ? 1 : null);

    const parts: (string | null)[] = [
      row.bedrooms
        ? `${row.bedrooms}-bedroom ${type} available for rent in ${area}, ${row.region || ''}.`
        : `${type.charAt(0).toUpperCase() + type.slice(1)} available for rent in ${area}, ${row.region || ''}.`,
      row.size ? `Built-up area: ${(row.size as number).toLocaleString('en-MY')} sq.ft.` : null,
      row.bedrooms
        ? `${row.bedrooms} bedrooms${baths ? ` and ${baths} bathrooms` : ''}.`
        : null,
      row.tenure ? `${row.tenure} tenure.` : null,
      'Well-maintained property in a convenient location with easy access to amenities, shops, and public transport.',
      'Contact us to arrange a viewing.',
    ];

    const newDesc = parts.filter(Boolean).join(' ');

    await sb.from('admin_listings').update({
      description: newDesc,
      ...(row.bathrooms == null && baths != null ? { bathrooms: baths } : {}),
    }).eq('id', row.id);
    updated++;
  }

  return NextResponse.json({ updated });
}
