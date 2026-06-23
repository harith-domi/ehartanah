import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const clean = (s: string | null) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY ?? null);
  const k = clean(req.nextUrl.searchParams.get('k'));
  if (!adminKey || k !== adminKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const sb = createAdminSupabase();
  const { data, error } = await sb.from('admin_listings').update({ source: 'New' }).eq('source', 'Auction').select('id');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ updated: data?.length ?? 0 });
}
