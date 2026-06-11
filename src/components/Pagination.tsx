import Link from 'next/link';

function pageHref(basePath: string, params: Record<string, string | undefined>, page: number) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v && k !== 'page') sp.set(k, v);
  }
  if (page > 1) sp.set('page', String(page));
  const qs = sp.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default function Pagination({
  basePath,
  params,
  page,
  totalPages,
}: {
  basePath: string;
  params: Record<string, string | undefined>;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const windowSize = 2;
  const pages: number[] = [];
  for (let p = Math.max(1, page - windowSize); p <= Math.min(totalPages, page + windowSize); p++) {
    pages.push(p);
  }

  const linkClass = 'px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:border-emerald-400 hover:text-emerald-700 transition-colors';
  const activeClass = 'px-3 py-2 rounded-lg text-sm font-semibold bg-emerald-700 text-white border border-emerald-700';

  return (
    <nav className="flex items-center justify-center gap-2 mt-10 flex-wrap" aria-label="Pagination">
      {page > 1 && (
        <Link href={pageHref(basePath, params, page - 1)} className={linkClass}>
          ← Prev
        </Link>
      )}
      {pages[0] > 1 && (
        <>
          <Link href={pageHref(basePath, params, 1)} className={linkClass}>1</Link>
          {pages[0] > 2 && <span className="text-gray-400 px-1">…</span>}
        </>
      )}
      {pages.map((p) =>
        p === page ? (
          <span key={p} className={activeClass}>{p}</span>
        ) : (
          <Link key={p} href={pageHref(basePath, params, p)} className={linkClass}>{p}</Link>
        )
      )}
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="text-gray-400 px-1">…</span>}
          <Link href={pageHref(basePath, params, totalPages)} className={linkClass}>{totalPages}</Link>
        </>
      )}
      {page < totalPages && (
        <Link href={pageHref(basePath, params, page + 1)} className={linkClass}>
          Next →
        </Link>
      )}
    </nav>
  );
}
