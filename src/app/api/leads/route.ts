import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, inquiry_type, message, listing_id, listing_title, listing_price, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!supabase) {
      // Supabase not configured — still return success so UX isn't broken
      console.warn('Supabase not configured. Lead not saved:', { name, email });
      return NextResponse.json({ ok: true, warn: 'not_configured' });
    }

    const { error } = await supabase.from('leads').insert({
      name,
      email,
      phone: phone || null,
      inquiry_type: inquiry_type || null,
      message,
      listing_id: listing_id || null,
      listing_title: listing_title || null,
      listing_price: listing_price || null,
      source: source || 'contact_form',
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
