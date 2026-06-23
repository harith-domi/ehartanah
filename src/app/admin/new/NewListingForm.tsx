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
    const data = new FormData(form);
    photos.forEach(f => data.append('photos', f));

    try {
      const res = await fetch('/api/admin/listing', {
        method: 'POST',
        headers: { 'x-admin-key': adminKey.replace(/[^\x20-\x7e]/g, '') },
        body: data,
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

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 bg-white';
  const lbl = 'text-xs font-semibold text-gray-500 mb-1 block';

  const SectionHead = ({ title }: { title: string }) => (
    <div className="bg-gray-50 border-b border-gray-100 px-5 py-2.5">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</span>
    </div>
  );

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

      {/* Single card — admin style */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* ── Basic Info ── */}
        <SectionHead title="Basic Info" />
        <div className="p-5 space-y-3 border-b border-gray-100">
          <div>
            <label className={lbl}>Title *</label>
            <input name="title" required placeholder="e.g. Cozy 3-Bed Terrace, Puncak Alam" className={inp} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-1">
              <label className={lbl}>Listing Type *</label>
              <select name="listing_type" required className={inp}>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            <div className="sm:col-span-1">
              <label className={lbl}>Price (RM) *</label>
              <input name="price" type="number" required placeholder="500000" className={inp} />
            </div>
            <div className="sm:col-span-1">
              <label className={lbl}>Category *</label>
              <select name="category" required className={inp}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="sm:col-span-1">
              <label className={lbl}>Tenure</label>
              <select name="tenure" className={inp}>
                <option value="">—</option>
                <option value="Freehold">Freehold</option>
                <option value="Leasehold">Leasehold</option>
                <option value="Strata Title">Strata Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Property Details ── */}
        <SectionHead title="Property Details" />
        <div className="p-5 space-y-3 border-b border-gray-100">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={lbl}>Size (sq.ft.)</label>
              <input name="size" type="number" placeholder="1200" className={inp} />
            </div>
            <div>
              <label className={lbl}>Bedrooms</label>
              <input name="bedrooms" type="number" min="0" max="20" placeholder="3" className={inp} />
            </div>
            <div>
              <label className={lbl}>Bathrooms</label>
              <input name="bathrooms" type="number" min="0" max="20" placeholder="2" className={inp} />
            </div>
          </div>
          <div>
            <label className={lbl}>Description</label>
            <textarea name="description" rows={5} placeholder="Describe the property…" className={inp} />
          </div>
        </div>

        {/* ── Location ── */}
        <SectionHead title="Location" />
        <div className="p-5 space-y-3 border-b border-gray-100">
          <div>
            <label className={lbl}>Full Address <span className="text-gray-400 font-normal">(with unit/lot — private, not shown to customers)</span></label>
            <input name="location" required placeholder="Unit No. A-08-10, Residensi XYZ, Jalan …" className={inp} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Neighbourhood / Project Name</label>
              <input name="subarea" placeholder="e.g. Puncak Bestari" className={inp} />
            </div>
            <div>
              <label className={lbl}>State / Region *</label>
              <select name="region" required className={inp}>
                <option value="">— Select —</option>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* ── Contact ── */}
        <SectionHead title="Contact" />
        <div className="p-5 border-b border-gray-100">
          <label className={lbl}>Phone Number</label>
          <input name="phone" type="tel" placeholder="0149999309" className={`${inp} max-w-xs`} />
        </div>

        {/* ── Photos ── */}
        <div className="bg-gray-50 border-b border-gray-100 px-5 py-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Photos</span>
          <button
            type="button"
            onClick={handlePaste}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-[#1e3a5f] hover:border-gray-300 transition-colors"
          >
            📋 Paste from WhatsApp
          </button>
        </div>
        <div className="p-5 space-y-3">
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#1e3a5f]/40 transition-colors"
          >
            <p className="text-gray-500 text-sm">Drop photos here or <span className="text-[#1e3a5f] font-semibold">click to select</span></p>
            <p className="text-gray-400 text-xs mt-1">JPG, PNG — multiple allowed</p>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
          </div>
          {previews.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {previews.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center leading-none"
                  >×</button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded-full">Cover</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>{/* end card */}

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
