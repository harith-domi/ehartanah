'use client';

import { useState, useRef } from 'react';

const CATEGORIES = [
  'Apartment / Condominium',
  'Serviced Residence',
  'Terrace / Link House',
  'Semi-Detached House',
  'Bungalow',
  'Townhouse',
  'Flat',
  'Studio',
  'SOHO',
  'Duplex',
  'Penthouse',
  'Shop',
  'Office',
  'Land',
  'Room',
];

const REGIONS = [
  'Kuala Lumpur', 'Selangor', 'Johor', 'Penang', 'Perak', 'Negeri Sembilan',
  'Melaka', 'Pahang', 'Kedah', 'Kelantan', 'Terengganu', 'Perlis',
  'Sabah', 'Sarawak', 'Putrajaya', 'Labuan',
];

interface Props { adminKey: string; }

export default function NewListingForm({ adminKey }: Props) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ id?: string; error?: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const newFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    const newPreviews = newFiles.map(f => URL.createObjectURL(f));
    setPhotos(p => [...p, ...newFiles]);
    setPreviews(p => [...p, ...newPreviews]);
  }

  function removePhoto(i: number) {
    setPhotos(p => p.filter((_, idx) => idx !== i));
    setPreviews(p => p.filter((_, idx) => idx !== i));
  }

  async function handlePaste() {
    try {
      const items = await navigator.clipboard.read();
      const imageFiles: File[] = [];
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            imageFiles.push(new File([blob], `pasted.png`, { type: 'image/png' }));
          }
        }
      }
      if (imageFiles.length === 0) {
        alert('No image found in clipboard. Copy an image from WhatsApp first, then click Paste.');
        return;
      }
      const newPreviews = imageFiles.map(f => URL.createObjectURL(f));
      setPhotos(p => [...p, ...imageFiles]);
      setPreviews(p => [...p, ...newPreviews]);
    } catch {
      alert('Could not read clipboard. Make sure you\'ve copied an image and allowed clipboard access.');
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value ?? '';

    // Strip BOM client-side too just in case
    const cleanKey = encodeURIComponent((adminKey ?? '').replace(/[^\x20-\x7e]/g, ''));

    try {
      // Upload each photo as a plain binary body (no FormData, no ByteString risk)
      const folder = `tmp-${Date.now()}`;
      const photoUrls: string[] = [];
      for (let i = 0; i < photos.length; i++) {
        const f = photos[i];
        // Strip any non-ASCII from the MIME type (e.g. BOM from clipboard)
        const mime = (f.type || 'image/jpeg').replace(/[^\x20-\x7e]/g, '') || 'image/jpeg';
        // Convert to ArrayBuffer so no File metadata is attached to the request
        const buffer = await f.arrayBuffer();
        const res = await fetch(`/api/admin/photo?k=${cleanKey}&folder=${folder}&idx=${i}`, {
          method: 'POST',
          headers: { 'Content-Type': mime },
          body: buffer,
          referrerPolicy: 'no-referrer',
        });
        const json = await res.json();
        if (json.url) photoUrls.push(json.url);
        else if (json.error) throw new Error(`Photo ${i + 1}: ${json.error}`);
      }

      // Submit listing data as plain JSON
      const res = await fetch(`/api/admin/listing?k=${cleanKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          title: get('title'),
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
          photos: photoUrls,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setResult({ id: json.id });
        form.reset();
        setPhotos([]);
        setPreviews([]);
      } else {
        setResult({ error: json.error ?? 'Unknown error' });
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

      {/* Success / Error */}
      {result?.id && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-green-800 text-sm">Listing added successfully!</p>
            <p className="text-green-700 text-xs mt-0.5">ID: <span className="font-mono">{result.id}</span></p>
          </div>
          <a href={`/listings/${result.id}`} target="_blank" className="text-xs text-green-700 underline whitespace-nowrap">
            View page ↗
          </a>
        </div>
      )}
      {result?.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="font-semibold text-red-700 text-sm">Error: {result.error}</p>
        </div>
      )}

      {/* 2-col on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

        {/* LEFT: Basic Info + Property Details + Contact */}
        <div className="space-y-4">

          {/* Basic info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-sm">Basic Info</h2>
            <div>
              <label className={label}>Title *</label>
              <input name="title" required placeholder="e.g. Cozy 3-Bed Unit at Sunway Velocity" className={field} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>Listing Type *</label>
                <select name="listing_type" required className={field}>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              <div>
                <label className={label}>Price (RM) *</label>
                <input name="price" type="number" required placeholder="500000" className={field} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>Category *</label>
                <select name="category" required className={field}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={label}>Tenure</label>
                <select name="tenure" className={field}>
                  <option value="">—</option>
                  <option value="Freehold">Freehold</option>
                  <option value="Leasehold">Leasehold</option>
                  <option value="Strata Title">Strata Title</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-sm">Property Details</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={label}>Size (sq.ft.)</label>
                <input name="size" type="number" placeholder="1200" className={field} />
              </div>
              <div>
                <label className={label}>Bedrooms</label>
                <input name="bedrooms" type="number" min="0" max="20" placeholder="3" className={field} />
              </div>
              <div>
                <label className={label}>Bathrooms</label>
                <input name="bathrooms" type="number" min="0" max="20" placeholder="2" className={field} />
              </div>
            </div>
            <div>
              <label className={label}>Description</label>
              <textarea name="description" rows={6} placeholder="Describe the property…" className={field} />
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-sm">Contact</h2>
            <div>
              <label className={label}>Phone Number</label>
              <input name="phone" type="tel" placeholder="0149999309" className={field} />
            </div>
          </div>

        </div>

        {/* RIGHT: Location + Photos */}
        <div className="space-y-4">

          {/* Location */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-sm">Location</h2>
            <div>
              <label className={label}>Full Address (with unit/lot number — private, not shown to customers)</label>
              <input name="location" required placeholder="Unit No. A-08-10, Residensi XYZ, Jalan …" className={field} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>Neighbourhood / Project Name</label>
                <input name="subarea" placeholder="e.g. Mont Kiara" className={field} />
              </div>
              <div>
                <label className={label}>State / Region *</label>
                <select name="region" required className={field}>
                  <option value="">— Select —</option>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-800 text-sm">Photos</h2>
              <button
                type="button"
                onClick={handlePaste}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-[#1e3a5f] hover:border-gray-300 transition-colors"
              >
                📋 Paste from WhatsApp
              </button>
            </div>
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#1e3a5f]/40 transition-colors"
            >
              <p className="text-gray-500 text-sm">Drop photos here or <span className="text-[#1e3a5f] font-semibold">click to select</span></p>
              <p className="text-gray-400 text-xs mt-1">JPG, PNG — multiple allowed</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => handleFiles(e.target.files)}
              />
            </div>

        {previews.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {previews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center leading-none"
                >
                  ×
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded-full">Cover</span>
                )}
              </div>
            ))}
          </div>
        )}
          </div>{/* end Photos card */}

        </div>{/* end right col */}
      </div>{/* end 2-col grid */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0f2540] text-white font-bold py-3.5 rounded-2xl text-sm hover:bg-[#1e3a5f] transition-colors disabled:opacity-60"
      >
        {loading ? 'Uploading & Saving…' : 'Add Listing'}
      </button>
    </form>
  );
}
