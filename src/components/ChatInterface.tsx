'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { EXAMPLE_PROMPTS } from '@/lib/mockAIResponses';
import type { Listing } from '@/lib/listings';
import NoPhotoPlaceholder from './NoPhotoPlaceholder';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  listings?: Listing[];
  browseUrl?: string | null;
  total?: number;
  timestamp: Date;
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 py-2 px-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-[#d4a017] rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
        />
      ))}
    </div>
  );
}

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, j) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={j} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
    ) : (
      <span key={j}>{part}</span>
    )
  );
}

function ListingResultCard({ listing }: { listing: Listing }) {
  const priceStr = listing.price === null
    ? 'Price on request'
    : `RM ${listing.price.toLocaleString('en-MY')}${listing.listingType === 'rent' ? '/mo' : ''}`;

  const specs = [
    listing.bedrooms !== null ? `${listing.bedrooms} bed` : null,
    listing.bathrooms !== null ? `${listing.bathrooms} bath` : null,
    listing.size !== null ? `${listing.size.toLocaleString()} sqft` : null,
  ].filter(Boolean).join(' · ');

  const area = listing.subarea || listing.region || '';

  const coverPhoto = listing.photos?.[0] ?? listing.thumbnailUrl;

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group flex flex-col bg-white border border-gray-200 hover:border-[#d4a017] rounded-xl overflow-hidden transition-all hover:shadow-md"
    >
      <div className="relative h-32 bg-gradient-to-br from-[#1e3a5f] to-[#0f2540] shrink-0">
        {coverPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverPhoto}
            alt={listing.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <NoPhotoPlaceholder count={listing.imageCount} url={listing.url} size="sm" category={listing.category} />
        )}
        <span className="absolute top-2 left-2 bg-[#0f2540]/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
          {listing.listingType === 'rent' ? 'For Rent' : 'For Sale'}
        </span>
        {listing.featured && (
          <span className="absolute top-2 right-2 bg-[#d4a017] text-[#0f2540] text-[10px] font-bold px-2 py-0.5 rounded-md">
            Agency
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-0.5 flex-1">
        <p className="font-bold text-[#0f2540] text-sm leading-none">{priceStr}</p>
        <p className="text-gray-700 text-xs font-medium leading-snug line-clamp-2 mt-0.5">{listing.title}</p>
        {area && (
          <p className="text-gray-400 text-[11px] flex items-center gap-1 mt-0.5">
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {area}
          </p>
        )}
        {specs && <p className="text-gray-400 text-[11px] mt-0.5">{specs}</p>}
      </div>
      <div className="px-3 pb-3">
        <span className="block w-full text-center bg-[#0f2540] group-hover:bg-[#d4a017] text-white group-hover:text-[#0f2540] text-xs font-semibold py-1.5 rounded-lg transition-colors">
          View Property →
        </span>
      </div>
    </Link>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const lines = message.content.split('\n\n');

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0f2540] to-[#1e3a5f] flex items-center justify-center shrink-0 mt-1">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      )}

      <div className={`${isUser ? 'items-end max-w-[80%]' : 'items-start w-full max-w-[95%]'} flex flex-col gap-2`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-[#0f2540] text-white rounded-tr-sm'
              : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'
          }`}
        >
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <div className="space-y-1.5">
              {lines.map((line, i) => (
                <p key={i} className={i === 0 ? '' : 'text-gray-700'}>{renderBold(line)}</p>
              ))}
            </div>
          )}
        </div>

        {/* Listing cards */}
        {!isUser && message.listings && message.listings.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
            {message.listings.map((l) => (
              <ListingResultCard key={l.id} listing={l} />
            ))}
          </div>
        )}

        {/* Browse all button */}
        {!isUser && message.browseUrl && message.total && message.total > 0 && (
          <Link
            href={message.browseUrl}
            className="flex items-center justify-between w-full bg-[#0f2540] hover:bg-[#1e3a5f] text-white px-4 py-3 rounded-xl transition-colors group"
          >
            <div>
              <p className="font-bold text-sm">Browse all {message.total.toLocaleString()} listings</p>
              <p className="text-[#f0c040] text-xs mt-0.5">See full results with filters →</p>
            </div>
            <svg className="w-5 h-5 text-[#d4a017] group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        )}

        <span className="text-xs text-gray-400 px-1">
          {message.timestamp.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

export default function ChatInterface({ initialQuery }: { initialQuery?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const initialFiredRef = useRef(false);
  useEffect(() => {
    if (initialQuery && !initialFiredRef.current) {
      initialFiredRef.current = true;
      handleSend(initialQuery);
    }
  // handleSend is intentionally excluded: we only want this to fire once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = async (text: string = input) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const userMessage: Message = { role: 'user', content: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setThinking(true);

    try {
      const res = await fetch(`/api/ai-search?q=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error(`Search failed (${res.status})`);
      const data = await res.json();
      const aiMessage: Message = {
        role: 'assistant',
        content: data.text || 'Sorry, I had trouble searching. Please try again.',
        listings: data.listings ?? [],
        browseUrl: data.browseUrl ?? null,
        total: data.total ?? 0,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I had trouble connecting. Please try again.', timestamp: new Date() },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full bg-slate-50 rounded-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f2540] to-[#1e3a5f] px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">eHartanah AI Advisor</p>
          <p className="text-[#f0c040] text-xs">Powered by property intelligence</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white text-xs">Online</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#edf2f8] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Find properties by just asking</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm">Tell me your budget, location, and what you need — I&apos;ll find matching properties instantly.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {EXAMPLE_PROMPTS.slice(0, 6).map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-left text-xs bg-white border border-gray-200 hover:border-[#d4a017] hover:bg-[#edf2f8] text-gray-700 px-3 py-2.5 rounded-xl transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {thinking && (
              <div className="flex gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0f2540] to-[#1e3a5f] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4">
                  <ThinkingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input bar */}
      <div className="border-t border-gray-200 bg-white p-3">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. rent in Puchong below RM1500, 3 bedrooms"
            className="flex-1 resize-none border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#d4a017] transition-colors leading-relaxed max-h-[120px]"
            rows={1}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || thinking}
            className="w-10 h-10 bg-gradient-to-r from-[#0f2540] to-[#1e3a5f] rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shrink-0"
            aria-label="Send"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-center">Enter to search &nbsp;·&nbsp; Shift+Enter for new line</p>
      </div>
    </div>
  );
}
