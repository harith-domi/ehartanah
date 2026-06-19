import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides, getGuide } from '@/lib/guides';
import T from '@/components/T';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: 'Panduan Tidak Dijumpai' };
  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.publishedAt,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const others = guides.filter((g) => g.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/guides" className="text-[#1e3a5f] text-sm font-semibold inline-flex items-center gap-1 mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <T en="All Guides" bm="Semua Panduan" />
        </Link>

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <span>{new Date(guide.publishedAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>·</span>
          <span>{guide.readMinutes} <T en="min read" bm="min bacaan" /></span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 leading-tight">{guide.title}</h1>

        <div className="space-y-8">
          {guide.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-gray-600 text-sm leading-relaxed mb-3">{p}</p>
              ))}
              {s.bullets && (
                <ul className="space-y-2 mt-2">
                  {s.bullets.map((b) => (
                    <li key={b.slice(0, 40)} className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-[#dce8f0] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#0f2540] to-[#1e3a5f] rounded-2xl p-6 text-center">
          <p className="text-white font-bold mb-1">
            <T en="Ready to take the next step?" bm="Sedia ambil langkah seterusnya?" />
          </p>
          <p className="text-[#94b3cc] text-sm mb-4">
            <T en="Check your rent-to-own eligibility — free, takes 1 minute." bm="Semak kelayakan sewa beli anda — percuma, 1 minit sahaja." />
          </p>
          <Link
            href="/rent-to-own"
            className="inline-block bg-[#d4a017] hover:bg-[#c49012] text-[#0f2540] font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            <T en="Check Eligibility Now" bm="Semak Kelayakan Sekarang" />
          </Link>
        </div>

        {/* Related guides */}
        {others.length > 0 && (
          <div className="mt-12">
            <h2 className="font-bold text-gray-900 mb-4"><T en="Other Guides" bm="Panduan Lain" /></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <p className="font-semibold text-gray-900 text-sm leading-snug mb-1">{g.title}</p>
                  <p className="text-gray-400 text-xs">{g.readMinutes} <T en="min read" bm="min bacaan" /></p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
