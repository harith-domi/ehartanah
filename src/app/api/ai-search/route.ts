import { NextRequest, NextResponse } from 'next/server';
import { filterListings, rentListings, saleListings, ownListings, Listing } from '@/lib/listings';
import { getMockAIResponse } from '@/lib/mockAIResponses';

// Longer/specific entries first so they match before shorter aliases (e.g. "subang jaya" before "subang")
const MALAYSIAN_AREAS = [
  // Kuala Lumpur districts
  'kuala lumpur', 'klcc', 'bukit bintang', 'chow kit', 'brickfields', 'masjid india',
  'titiwangsa', 'jalan ipoh', 'jalan kuching', 'wangsa maju', 'kepong', 'setapak',
  'prima setapak', 'sentul', 'imbi', 'pudu', 'pantai', 'kerinchi',
  // Selangor
  'subang jaya', 'petaling jaya', 'shah alam', 'klang', 'port klang',
  'ara damansara', 'kota damansara', 'damansara damai', 'damansara', 'bangsar',
  'mont kiara', 'sri hartamas', 'ttdi', 'ampang', 'cheras', 'puchong',
  'bukit jalil', 'sri petaling', 'desa petaling', 'salak south', 'seri kembangan',
  'kajang', 'semenyih', 'selayang', 'rawang', 'batu caves', 'sunway',
  'cyberjaya', 'putrajaya', 'setia alam', 'puncak alam', 'sungai long',
  'bandar saujana', 'tanjong duabelas',
  // Building / development names
  'sri putramas', 'fortune park', 'vista impiana', 'neo cyber', 'prisma cheras',
  'desa wangsa', 'las palmas', 'empire damansara', 'royal domain',
  'solok seri kenangan', 'mid valley', 'midvalley',
  // Short aliases (after longer forms to avoid partial clobbering)
  'kl', 'pj',
  // Other states
  'selangor', 'penang', 'georgetown', 'johor bahru', 'iskandar', 'johor',
  'melaka', 'ipoh', 'kuching', 'kota kinabalu', 'miri', 'sandakan',
  'sabah', 'sarawak',
];

const ADVISORY_KEYWORDS = [
  'how much', 'how to', 'what is', 'what are', 'explain', 'afford', 'yield', 'roi',
  'investment advice', 'should i', 'is it good', 'best time', 'market trend',
  'first time buyer', 'first-time', 'lrt', 'mrt', 'below market', 'auction risk',
  'when to buy', 'good deal', 'income', 'ccris', 'loan', 'financing',
];

function extractParams(q: string) {
  const lower = ` ${q.toLowerCase()} `;

  // Listing type
  let type: 'rent' | 'sale' | 'agency' | 'both' = 'both';
  if (/\b(rent|sewa|for rent|sewaan|rental|sewa rumah|cari sewa)\b/.test(lower)) type = 'rent';
  else if (/\b(buy|sale|beli|subsale|for sale|purchase|jual|selling)\b/.test(lower)) type = 'sale';
  else if (/\b(agency|agent|ejen|our listing|your listing)\b/.test(lower)) type = 'agency';

  // Location — word-boundary match so "pj" doesn't fire inside "pjk" or similar
  let location = '';
  for (const area of MALAYSIAN_AREAS) {
    const escaped = area.replace(/[-\s]+/g, '[\\s-]+');
    if (new RegExp(`\\b${escaped}\\b`).test(lower)) {
      location = area;
      break;
    }
  }

  // Price extraction
  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  // Safe price regex — digit groups bounded to prevent ReDoS on crafted input
  const maxMatch = lower.match(/(?:below|under|max|budget|less than|bawah|kurang dari|tidak melebihi)\s*(?:rm)?\s*(\d{1,3}(?:,\d{3}){0,4})/);
  if (maxMatch) maxPrice = parseInt(maxMatch[1].replace(/,/g, ''));

  const minMatch = lower.match(/(?:above|over|min|more than|lebih dari|at least|sekurang)\s*(?:rm)?\s*(\d{1,3}(?:,\d{3}){0,4})/);
  if (minMatch) minPrice = parseInt(minMatch[1].replace(/,/g, ''));

  const rangeMatch = lower.match(/(?:rm)?\s*(\d{1,3}(?:,\d{3}){0,4})\s*(?:to|-)\s*(?:rm)?\s*(\d{1,3}(?:,\d{3}){0,4})/);
  if (rangeMatch && !minMatch && !maxMatch) {
    minPrice = parseInt(rangeMatch[1].replace(/,/g, ''));
    maxPrice = parseInt(rangeMatch[2].replace(/,/g, ''));
  }

  // Bedroom extraction
  let beds: number | undefined;
  const bedMatch = lower.match(/(\d+)\s*(?:bed(?:room)?s?|bilik|br\b)/);
  if (bedMatch) beds = parseInt(bedMatch[1]);

  // Is this a pure advisory question with no location/property intent?
  const hasAdvisory = ADVISORY_KEYWORDS.some((kw) => lower.includes(kw));
  const hasLocation = !!location;
  const hasPrice = !!(minPrice || maxPrice);
  const hasBeds = !!beds;
  const hasPropertyIntent = hasLocation || hasPrice || hasBeds || type !== 'both';

  // Only go advisory if it's a pure question with no property search signals
  const isAdvisory = hasAdvisory && !hasPropertyIntent;

  const searchQ = location || q.trim();

  return { type, location, minPrice, maxPrice, beds, isAdvisory, searchQ };
}

function buildBrowseUrl(params: ReturnType<typeof extractParams>): string {
  const base = params.type === 'sale' ? '/subsale' : '/rent';
  const qp = new URLSearchParams();
  if (params.location) qp.set('q', params.location);
  if (params.maxPrice) qp.set('maxPrice', String(params.maxPrice));
  if (params.minPrice) qp.set('minPrice', String(params.minPrice));
  if (params.beds) qp.set('beds', String(params.beds));
  const qs = qp.toString();
  return qs ? `${base}?${qs}` : base;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || '';
  if (!q.trim()) {
    return NextResponse.json({ text: 'Please ask me something about Malaysian property.', listings: [] });
  }

  const params = extractParams(q);

  if (params.isAdvisory) {
    return NextResponse.json({ text: getMockAIResponse(q), listings: [], browseUrl: null });
  }

  const filters = {
    q: params.searchQ,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    beds: params.beds,
  };

  let results: Listing[] = [];

  if (params.type === 'rent') {
    results = filterListings(rentListings, filters);
  } else if (params.type === 'sale') {
    results = filterListings(saleListings, filters);
  } else if (params.type === 'agency') {
    results = filterListings(ownListings, filters);
  } else {
    const r = filterListings(rentListings, filters);
    const s = filterListings(saleListings, filters);
    results = [...r, ...s];
  }

  const topListings = results.slice(0, 6);
  const count = results.length;
  const browseUrl = buildBrowseUrl(params);

  let text = '';
  if (count === 0) {
    const areaLabel = params.location ? ` in **${params.location}**` : '';
    text = `No listings found${areaLabel} with those filters. Try a nearby area or wider price range.`;
  } else {
    const typeLabel = params.type === 'rent' ? 'rental' : params.type === 'sale' ? 'subsale' : '';
    const areaLabel = params.location
      ? ` in **${params.location.replace(/\b\w/g, (c) => c.toUpperCase())}**`
      : '';
    const priceLabel = params.maxPrice
      ? ` under **RM ${params.maxPrice.toLocaleString()}**`
      : params.minPrice
      ? ` above **RM ${params.minPrice.toLocaleString()}**`
      : '';
    const bedLabel = params.beds ? ` · **${params.beds}+ bed**` : '';

    text = `Found **${count.toLocaleString()} ${typeLabel} listings**${areaLabel}${priceLabel}${bedLabel}. Top picks:`;
  }

  return NextResponse.json({ text, listings: topListings, browseUrl, total: count });
}
