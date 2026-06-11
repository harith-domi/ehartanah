'use client';

import { useState } from 'react';

interface AISearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

const quickChips = [
  "I earn RM5k/month, what can I afford?",
  "Find rent-to-own near MRT",
  "Show auction below RM250k",
  "High yield condo investment",
];

export default function AISearchBar({ onSearch, className = '' }: AISearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-4 sm:p-5">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Example: I want a condo below RM300k near MRT with good rental yield..."
          className="w-full resize-none border-0 outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base leading-relaxed"
          rows={3}
        />
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          {quickChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setQuery(chip)}
              className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors font-medium border border-emerald-100"
            >
              {chip}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-400 hidden sm:block">Press Enter or click Ask AI</p>
          <button
            type="submit"
            disabled={!query.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:opacity-90 text-white font-semibold px-6 py-2.5 rounded-xl transition-opacity disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Ask AI
          </button>
        </div>
      </form>
    </div>
  );
}
