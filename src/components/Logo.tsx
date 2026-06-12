export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* Mark — gold square with navy house */}
      <span className="relative w-10 h-10 rounded-2xl bg-[#d4a017] flex items-center justify-center shadow-md shrink-0">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z" fill="#0f2540" fillOpacity="0.35" stroke="#0f2540" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M9 21V12h6v9" stroke="#0f2540" strokeWidth="1.8" strokeLinejoin="round"/>
          <circle cx="18" cy="5" r="2.5" fill="#0f2540"/>
          <circle cx="18" cy="5" r="1.2" fill="#f0c040"/>
        </svg>
      </span>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span className="flex items-baseline">
          <span className="font-black text-2xl tracking-tight text-[#d4a017]">e</span>
          <span className={`font-black text-2xl tracking-tight ${dark ? 'text-white' : 'text-[#0f2540]'}`}>Hartanah</span>
        </span>
        <span className={`text-[10px] font-semibold tracking-widest uppercase ${dark ? 'text-[#f0c040]' : 'text-[#d4a017]/80'} -mt-0.5`}>
          AI Property Search
        </span>
      </span>
    </span>
  );
}
