export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      {/* Mark: house with rising-roof accent */}
      <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-sm shrink-0">
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11.5L12 4l9 7.5" />
          <path d="M5.5 10v9h13v-9" />
          <path d="M9.5 19v-5h5v5" />
        </svg>
      </span>
      {/* Wordmark */}
      <span className="flex items-baseline leading-none">
        <span className="font-extrabold text-2xl tracking-tight text-emerald-600">e</span>
        <span className={`font-extrabold text-2xl tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>Hartanah</span>
      </span>
    </span>
  );
}
