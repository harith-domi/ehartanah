import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const clean = (s: string | null) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY ?? null);
  const k = clean(req.nextUrl.searchParams.get('k'));

  if (!adminKey || k !== adminKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sb = createAdminSupabase();
  const { data, error } = await sb.from('admin_listings').select('id,price,source').not('price', 'is', null);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const pct = Number(req.nextUrl.searchParams.get('pct') ?? '30') / 100;
  const allowed = ['New', 'Rent', null, undefined, ''];
  const rows = (data ?? []).filter(r => allowed.includes((r as Record<string, unknown>).source as string));
  let updated = 0;

  for (const row of rows) {
    const newPrice = Math.round((row.price as number) * (1 - pct));
    const { error: ue } = await sb.from('admin_listings').update({ price: newPrice }).eq('id', row.id);
    if (!ue) updated++;
  }

  return NextResponse.json({ updated, total: rows.length });
}
