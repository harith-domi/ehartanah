'use client';

const KEY = 'eh_compare';
const MAX = 3;

export type CompareEntry = { type: 'listing' | 'auction'; id: string };

export function getCompare(): CompareEntry[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}

export function toggleCompare(entry: CompareEntry): CompareEntry[] {
  const list = getCompare();
  const exists = list.some((e) => e.id === entry.id && e.type === entry.type);
  let next: CompareEntry[];
  if (exists) {
    next = list.filter((e) => !(e.id === entry.id && e.type === entry.type));
  } else {
    if (list.length >= MAX) next = [...list.slice(1), entry];
    else next = [...list, entry];
  }
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearCompare() {
  if (typeof window !== 'undefined') localStorage.removeItem(KEY);
}

export function isInCompare(entry: CompareEntry): boolean {
  return getCompare().some((e) => e.id === entry.id && e.type === entry.type);
}
