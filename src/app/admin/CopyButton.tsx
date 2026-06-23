'use client';

import { useState } from 'react';

export default function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <button
      onClick={handleCopy}
      title="Copy public link (no unit number)"
      className={`px-2 py-1 text-xs rounded-lg border transition-colors whitespace-nowrap ${
        copied
          ? 'bg-green-50 border-green-200 text-green-600'
          : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      {copied ? '✓ Copied' : '🔗 Share'}
    </button>
  );
}
