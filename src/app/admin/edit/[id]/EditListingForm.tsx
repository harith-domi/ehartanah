'use client';

import { useState, useRef, useEffect } from 'react';
import type { AdminListing } from '@/lib/supabase';

const CATEGORIES = [
  'Apartment / Condominium', 'Serviced Residence', 'Terrace / Link House',
  'Semi-Detached House', 'Bungalow', 'Townhouse', 'Flat', 'Studio',
  'SOHO', 'Duplex', 'Penthouse', 'Shop', 'Office', 'Land', 'Room',
];

const REGIONS = [
  'Kuala Lumpur', 'Selangor', 'Johor', 'Penang', 'Perak', 'Negeri Sembilan',
  'Melaka', 'Pahang', 'Kedah', 'Kelantan', 'Terengganu', 'Perlis',
  'Sabah', 'Sarawak', 'Putrajaya', 'Labuan',
];

interface Props { listing: AdminListing; adminKey: string; }

export default function EditListingForm({ listing, adminKey }: Props) {
  const [existingPhotos, setExistingPhotos] = useState<string[]>(listing.photos ?? []);
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const k = url.searchParams.get('key') ?? '';
    const clean = k.replace(/[^\x20-\x7e]/g, '');
    if (clean !== k) { url.searchParams.set('key', clean); window.history.replaceState({}, '', url.toString()); }
  }, []);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const added = Array.from(files).filter(f => f.type.startsWith('image/'));
    setNewPhotos(p => [...p, ...added]);
    setNewPreviews(p => [...p, ...added.map(f => URL.createObjectURL(f))]);
  }

  function removeExisting(i: number) {
    setExistingPhotos(p => p.filter((_, idx) => idx !== i));
  }

  function removeNew(i: number) {
    setNewPhotos(p => p.filter((_, idx) => idx !== i));
    setNewPreviews(p => p.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value ?? '';

    const cleanKey = encodeURIComponent((adminKey ?? '').replace(/[^\x20-\x7e]/g, ''));

    try {
      // Upload new photos
      const folder = `tmp-${Date.now()}`;
      const uploadedUrls: string[] = [];
      for (let i = 0; i < newPhotos.length; i++) {
        const f = newPhotos[i];
        const mime = (f.type || 'image/jpeg').replace(/[^\x20-\x7e]/g, '') || 'image/jpeg';
        const buffer = await f.arrayBuffer();
        const res = await fetch(`/api/admin/photo?k=${cleanKey}&folder=${folder}&idx=${i}`, {
          method: 'POST',
          headers: { 'Content-Type': mime },
          body: buffer,
          referrerPolicy: 'no-referrer',
        });
        const json = await res.json();
        if (json.url) uploadedUrls.push(json.url);
        else if (json.error) throw new Error(`Photo ${i + 1}: ${json.error}`);
      }

      const allPhotos = [...existingPhotos, ...uploadedUrls];

      // PUT listing
      const res = await fetch(`/api/admin/listing/${listing.id}?k=${cleanKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          title: get('title'),
          source: get('source'),
          listing_type: get('listing_type'),
          price: get('price'),
          category: get('category'),
          tenure: get('tenure'),
          size: get('size'),
          bedrooms: get('bedrooms'),
          bathrooms: get('bathrooms'),
          description: get('description'),
          location: get('location'),
          subarea: get('subarea'),
          region: get('region'),
          phone: get('phone'),
          photos: allPhotos,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setResult({ success: true });
        setNewPhotos([]);
        setNewPreviews([]);
      } else {
        setResult({ error: json.error ?? 'Unknown error' });
      }
    } catch (err) {
      setResult({ error: String(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setLoading(true);
    try {
      const cleanKey = encodeURIComponent((adminKey ?? '').replace(/[^\x20-\x7e]/g, ''));
      const res = await fetch(`/api/admin/listing/${listing.id}?k=${cleanKey}`, {
        method: 'DELETE',
        referrerPolicy: 'no-referrer',
      });
      const json = await res.json();
      if (json.success) {
        window.location.href = `/admin?key=${adminKey}`;
      } else {
        setResult({ error: json.error ?? 'Delete failed' });
      }
    } catch (err) {
      setResult({ error: String(err) });
    } finally {
      setLoading(false);
    }
  }

  const field = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30';
  const label = 'block text-xs font-semibold text-gray-600 mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {result?.success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-semibold text-green-800 text-sm">Listing updated successfully!</p>
          <a href={`/listings/${listing.id}`} target="_blank" className="text-xs text-green-700 underline mt-1 inline-block">
            View listing ↗
          </a>
        </div>
      )}
      {result?.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="font-semibold text-red-700 text-sm">Error: {result.error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

        {/* LEFT */}
        <div className="space-y-4">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-sm">Basic Info</h2>
            <div>
              <label className={label}>Title *</label>
              <input name="title" required defaultValue={listing.title} className={field} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={label}>Source *</label>
                <select name="source" required defaultValue={listing.source ?? 'New'} className={field}>
                  <option value="New">New</option>
                  <option value="Agency">Agency</option>
                  <option value="Sale">Sale</option>
                  <option value="Rent">Rent</option>
                  <option value="Auction">Auction</option>
                </select>
              </div>
              <div>
                <label className={label}>Listing Type *</label>
                <select name="listing_type" required defaultValue={listing.listing_type} className={field}>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              <div>
                <label className={label}>Price (RM) *</label>
                <input name="price" type="number" required defaultValue={listing.price ?? ''} className={field} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>Category *</label>
                <select name="category" required defaultValue={listing.category} className={field}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={label}>Tenure</label>
                <select name="tenure" defaultValue={listing.tenure ?? ''} className={field}>
                  <option value="">—</option>
                  <option value="Freehold">Freehold</option>
                  <option value="Leasehold">Leasehold</option>
                  <option value="Strata Title">Strata Title</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-sm">Property Details</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={label}>Size (sq.ft.)</label>
                <input name="size" type="number" defaultValue={listing.size ?? ''} className={field} />
              </div>
              <div>
                <label className={label}>Bedrooms</label>
                <input name="bedrooms" type="number" min="0" max="20" defaultValue={listing.bedrooms ?? ''} className={field} />
              </div>
              <div>
                <label className={label}>Bathrooms</label>
                <input name="bathrooms" type="number" min="0" max="20" defaultValue={listing.bathrooms ?? ''} className={field} />
              </div>
            </div>
            <div>
              <label className={label}>Description</label>
              <textarea name="description" rows={6} defaultValue={listing.description ?? ''} className={field} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-sm">Contact</h2>
            <div>
              <label className={label}>Phone Number</label>
              <input name="phone" type="tel" defaultValue={listing.phone ?? ''} className={field} />
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-4">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-sm">Location</h2>
            <div>
              <label className={label}>Full Address</label>
              <input name="location" required defaultValue={listing.location ?? ''} className={field} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>Neighbourhood / Project Name</label>
                <input name="subarea" defaultValue={listing.subarea ?? ''} className={field} />
              </div>
              <div>
                <label className={label}>State / Region *</label>
                <select name="region" required defaultValue={listing.region ?? ''} className={field}>
                  <option value="">— Select —</option>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-sm">Photos</h2>

            {/* Existing photos */}
            {existingPhotos.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Current photos — click × to remove</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {existingPhotos.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExisting(i)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
                      >×</button>
                      {i === 0 && <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded-full">Cover</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add new photos */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Add new photos</p>
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#1e3a5f]/40 transition-colors"
              >
                <p className="text-gray-500 text-sm">Drop photos here or <span className="text-[#1e3a5f] font-semibold">click to select</span></p>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
              </div>
              {newPreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
                  {newPreviews.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNew(i)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
                      >×</button>
                      <span className="absolute bottom-1 left-1 text-[10px] bg-blue-600/80 text-white px-1.5 py-0.5 rounded-full">New</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0f2540] text-white font-bold py-3.5 rounded-2xl text-sm hover:bg-[#1e3a5f] transition-colors disabled:opacity-60"
      >
        {loading ? 'Saving…' : 'Save Changes'}
      </button>

      {/* Delete */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          disabled={loading}
          onClick={handleDelete}
          className={`text-xs px-4 py-2 rounded-xl border transition-colors ${
            confirmDelete
              ? 'bg-red-600 text-white border-red-600 hover:bg-red-700'
              : 'border-red-200 text-red-500 hover:bg-red-50'
          }`}
        >
          {confirmDelete ? 'Confirm Delete — cannot be undone' : 'Delete Listing'}
        </button>
        {confirmDelete && (
          <button
            type="button"
            onClick={() => setConfirmDelete(false)}
            className="ml-3 text-xs px-4 py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>

    </form>
  );
}
