const ICON = 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z';

interface Props {
  count?: number;
  url?: string;
  size?: 'sm' | 'md';
}

export default function NoPhotoPlaceholder({ count, url, size = 'md' }: Props) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,.4) 19px,rgba(255,255,255,.4) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,.4) 19px,rgba(255,255,255,.4) 20px)',
        }}
      />
      <svg
        className={`${size === 'sm' ? 'w-8 h-8' : 'w-11 h-11'} text-white/50 relative`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ICON} />
      </svg>
      {url ? (
        <span className="relative text-white/80 text-[11px] font-semibold bg-black/25 px-2.5 py-1 rounded-full backdrop-blur-sm">
          View photos on source ↗
        </span>
      ) : count !== undefined && count > 0 ? (
        <span className="relative text-white/60 text-[11px]">{count} photos available</span>
      ) : null}
    </div>
  );
}
