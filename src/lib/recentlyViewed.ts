export type RecentEntry = {
  type: 'listing' | 'auction';
  id: string;
  title: string;
  price: number | null;
  photo?: string;
};

const STORAGE_KEY = 'eh_recent';
const MAX_ITEMS = 10;

export function getRecentlyViewed(): RecentEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentEntry[];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(entry: RecentEntry): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getRecentlyViewed();
    // Deduplicate by id (remove old occurrence if present)
    const deduped = existing.filter((e) => e.id !== entry.id);
    // Prepend new entry and cap at MAX_ITEMS
    const next = [entry, ...deduped].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // silently ignore storage errors
  }
}
