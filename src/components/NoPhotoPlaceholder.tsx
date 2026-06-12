const CATEGORY_CONFIG: Record<string, {
  gradient: string;
  icon: string;
  label: string;
}> = {
  'Apartment / Condominium': {
    gradient: 'from-[#0f2540] via-[#1e3a5f] to-[#2d5a8e]',
    label: 'Condominium',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  House: {
    gradient: 'from-[#14532d] via-[#166534] to-[#15803d]',
    label: 'Landed House',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  Room: {
    gradient: 'from-[#312e81] via-[#3730a3] to-[#4338ca]',
    label: 'Room Rental',
    icon: 'M5 3v18m0-18h14a2 2 0 012 2v14a2 2 0 01-2 2H5m9-9h.01M9 12h.01M9 8h.01M9 16h.01',
  },
  Land: {
    gradient: 'from-[#78350f] via-[#92400e] to-[#b45309]',
    label: 'Land / Lot',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  'Commercial Property': {
    gradient: 'from-[#1e3a5f] via-[#1d4ed8] to-[#1e40af]',
    label: 'Commercial',
    icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
};

const DEFAULT_CONFIG = CATEGORY_CONFIG['Apartment / Condominium'];

interface Props {
  count?: number;
  url?: string;
  size?: 'sm' | 'md';
  category?: string;
}

export default function NoPhotoPlaceholder({ count, url, size = 'md', category }: Props) {
  const config = (category ? CATEGORY_CONFIG[category] : undefined) ?? DEFAULT_CONFIG;
  const iconSize = size === 'sm' ? 'w-7 h-7' : 'w-10 h-10';
  const labelSize = size === 'sm' ? 'text-[10px]' : 'text-xs';

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} flex flex-col items-center justify-center gap-2`}>
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,.4) 19px,rgba(255,255,255,.4) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,.4) 19px,rgba(255,255,255,.4) 20px)',
        }}
      />

      {/* Icon */}
      <svg
        className={`${iconSize} text-white/70 relative`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={config.icon} />
      </svg>

      {/* Category label */}
      <span className={`relative text-white/80 font-semibold ${labelSize} tracking-wide uppercase`}>
        {config.label}
      </span>

      {/* Photo count / source badge */}
      {url && count !== undefined && count > 0 ? (
        <span className={`relative text-white/60 ${labelSize} bg-black/25 px-2.5 py-0.5 rounded-full`}>
          {count} photos on Mudah ↗
        </span>
      ) : url ? (
        <span className={`relative text-white/60 ${labelSize} bg-black/25 px-2.5 py-0.5 rounded-full`}>
          View on Mudah ↗
        </span>
      ) : null}
    </div>
  );
}
