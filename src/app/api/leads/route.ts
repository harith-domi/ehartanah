import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const TO = 'support@ucigroupasia.com';
const FROM = process.env.RESEND_FROM ?? 'eHartanah <onboarding@resend.dev>';

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, email, phone, message, inquiry_type, listing_id, listing_title, listing_price, source } = body;

  // ── Save to Supabase ──────────────────────────────────────────────────────
  if (supabase) {
    const { error } = await supabase.from('leads').insert({
      name,
      email,
      phone: phone || null,
      inquiry_type: inquiry_type || null,
      message: message || null,
      listing_id: listing_id || null,
      listing_title: listing_title || null,
      listing_price: listing_price || null,
      source: source || 'contact_form',
    });
    if (error) console.error('[leads] Supabase error:', error);
  }

  // ── Send email via Resend ─────────────────────────────────────────────────
  if (!process.env.RESEND_API_KEY) {
    console.warn('[leads] RESEND_API_KEY not set — email skipped');
    return NextResponse.json({ ok: true, warn: 'email_skipped' });
  }

  const isAuction = source === 'auction_enquiry';
  const isListing = source === 'listing_enquiry' || isAuction;

  const subject = isListing
    ? `New ${isAuction ? 'Auction' : 'Listing'} Enquiry — ${listing_title ?? 'Unknown'}`
    : `New Contact Message — ${name ?? 'Unknown'}`;

  const waLink = phone
    ? `https://wa.me/60${phone.replace(/[^0-9]/g, '').replace(/^0/, '')}`
    : null;

  const html = isListing ? `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f8fafc">
  <div style="background:#0f2540;padding:20px 24px;border-radius:12px 12px 0 0">
    <h1 style="color:#fff;margin:0;font-size:18px">New ${isAuction ? 'Auction' : 'Property'} Enquiry</h1>
    <p style="color:#94b3cc;margin:4px 0 0;font-size:13px">eHartanah Malaysia</p>
  </div>
  <div style="background:#fff;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0">
    ${listing_title ? `
    <div style="background:#edf2f8;border-radius:8px;padding:12px 16px;margin-bottom:20px">
      <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Property</p>
      <p style="margin:0;font-weight:700;color:#0f2540;font-size:15px">${listing_title}</p>
      ${listing_price ? `<p style="margin:4px 0 0;color:#1e3a5f;font-size:13px;font-weight:600">${listing_price}</p>` : ''}
      ${listing_id ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8">ID: ${listing_id}</p>` : ''}
    </div>` : ''}
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#64748b;width:110px">Name</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:600;color:#1e293b">${name ?? '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#64748b">WhatsApp</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:600;color:#1e293b">${phone ?? '—'}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Email</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#1e293b">${email ?? '—'}</td></tr>
    </table>
    ${message ? `<div style="margin-top:16px;padding:12px 16px;background:#f8fafc;border-radius:8px;border-left:3px solid #d4a017"><p style="margin:0;font-size:13px;color:#475569">${message}</p></div>` : ''}
    ${waLink ? `<div style="margin-top:20px;text-align:center"><a href="${waLink}" style="display:inline-block;background:#22c55e;color:#fff;font-weight:700;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:13px">Reply on WhatsApp</a></div>` : ''}
  </div>
  <p style="text-align:center;font-size:11px;color:#94a3b8;margin-top:16px">eHartanah Malaysia · ehartanahmalaysia.com</p>
</div>` : `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f8fafc">
  <div style="background:#0f2540;padding:20px 24px;border-radius:12px 12px 0 0">
    <h1 style="color:#fff;margin:0;font-size:18px">New Contact Message</h1>
    <p style="color:#94b3cc;margin:4px 0 0;font-size:13px">eHartanah Malaysia</p>
  </div>
  <div style="background:#fff;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#64748b;width:110px">Name</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:600;color:#1e293b">${name ?? '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#64748b">Email</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:600;color:#1e293b">${email ?? '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#64748b">Phone</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:600;color:#1e293b">${phone ?? '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#64748b">Type</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:600;color:#1e293b">${inquiry_type ?? '—'}</td></tr>
    </table>
    ${message ? `
    <div style="margin-top:16px;padding:14px 16px;background:#f8fafc;border-radius:8px;border-left:3px solid #d4a017">
      <p style="margin:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Message</p>
      <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.6">${message}</p>
    </div>` : ''}
    ${email ? `<div style="margin-top:20px;text-align:center"><a href="mailto:${email}" style="display:inline-block;background:#0f2540;color:#fff;font-weight:700;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:13px">Reply by Email</a></div>` : ''}
  </div>
  <p style="text-align:center;font-size:11px;color:#94a3b8;margin-top:16px">eHartanah Malaysia · ehartanahmalaysia.com</p>
</div>`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({ from: FROM, to: TO, subject, html });
  } catch (err) {
    console.error('[leads] Resend error:', err);
    // Return success anyway — lead is already saved to Supabase
  }

  return NextResponse.json({ ok: true });
}
