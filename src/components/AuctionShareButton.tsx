'use client';

export default function AuctionShareButton({ title, address, url }: { title: string; address: string; url: string }) {
  function share(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title, text: address, url });
    } else {
      navigator.clipboard?.writeText(url);
      alert('Link copied to clipboard!');
    }
  }

  return (
    <button
      onClick={share}
      title="Share this listing"
      className="p-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-50 transition-colors shrink-0"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    </button>
  );
}
