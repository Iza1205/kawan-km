import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { prisma } from '@/lib/db'
import { CATEGORY_LABELS } from "@/lib/utils"

interface PageProps {
  params: { year: string }
  searchParams: { kategori?: string }
}

function isValidYear(year: number) {
  return year >= 2014 && year <= 2026
}

async function getVideos(year: number) {
  try {
    const [seminar, pelatihan] = await Promise.all([
      prisma.video.findMany({
        where: { year, category: 'SEMINAR' },
        orderBy: [{ subcategory: 'asc' }, { createdAt: 'asc' }],
      }),
      prisma.video.findMany({
        where: { year, category: 'PELATIHAN' },
        orderBy: [{ subcategory: 'asc' }, { createdAt: 'asc' }],
      }),
    ])
    return { seminar, pelatihan }
  } catch {
    return { seminar: [], pelatihan: [] }
  }
}

function groupBySubcategory<T extends { subcategory: string }>(videos: T[]): Record<string, T[]> {
  return videos.reduce((acc, video) => {
    const key = video.subcategory || 'Lainnya'
    if (!acc[key]) acc[key] = []
    acc[key].push(video)
    return acc
  }, {} as Record<string, T[]>)
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: `Koleksi ${params.year} — KawanPPM`,
  }
}

export default async function KoleksiYearPage({ params, searchParams }: PageProps) {
  const year = parseInt(params.year)
  if (isNaN(year) || !isValidYear(year)) notFound()

  const { seminar, pelatihan } = await getVideos(year)
  const activeTab = searchParams.kategori === 'seminar' ? 'seminar' : 'pelatihan'

  const totalSeminar = seminar.length
  const totalPelatihan = pelatihan.length
  const activeVideos = activeTab === 'seminar' ? seminar : pelatihan
  const grouped = groupBySubcategory(activeVideos)
  const subcategories = Object.keys(grouped).sort()


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-24 pb-20 flex gap-12">

        {/* ── SIDEBAR KIRI ── */}
        <aside className="w-60 shrink-0 hidden lg:block">
          <div className="sticky top-28 space-y-8">

            {/* Info tahun aktif */}
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-3">Tahun Aktif</p>
              <p className="font-display font-extrabold text-4xl text-blue-700">{year}</p>
              <p className="text-xs text-gray-400 mt-1.5">
                {totalPelatihan + totalSeminar} video tersedia
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Tab navigasi */}
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-3">Kategori</p>
              <nav className="space-y-1">
                <Link
                  href={`/koleksi/${year}?kategori=pelatihan`}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-all ${
                    activeTab === 'pelatihan'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <span>Video Pelatihan</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                    activeTab === 'pelatihan' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>{totalPelatihan}</span>
                </Link>
                <Link
                  href={`/koleksi/${year}?kategori=seminar`}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-all ${
                    activeTab === 'seminar'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <span>Video Sharing</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                    activeTab === 'seminar' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>{totalSeminar}</span>
                </Link>
              </nav>
            </div>
          </div>
        </aside>

        {/* ── KONTEN KANAN ── */}
        <main className="flex-1 min-w-0">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/koleksi/${year}`} className="hover:text-gray-600 transition-colors">Koleksi {year}</Link>
            <span>/</span>
            <span className="text-gray-600">
              {activeTab === 'pelatihan' ? 'Video Pelatihan' : 'Video Sharing'}
            </span>
          </div>

          {/* Page title */}
          <div className="mb-8 pb-6 border-b border-gray-100">
            <h1 className="font-display font-bold text-2xl text-blue-900 mb-1">
              {activeTab === 'pelatihan' ? CATEGORY_LABELS.PELATIHAN : CATEGORY_LABELS.SEMINAR}
            </h1>
            <p className="text-sm text-gray-400">
              Koleksi {year} &nbsp;·&nbsp; {activeTab === 'pelatihan' ? totalPelatihan : totalSeminar} video
            </p>
          </div>

          {/* Mobile tabs */}
          <div className="flex gap-2 mb-8 lg:hidden">
            <Link href={`/koleksi/${year}?kategori=pelatihan`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'pelatihan' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
              Pelatihan <span className="ml-1 opacity-60">{totalPelatihan}</span>
            </Link>
            <Link href={`/koleksi/${year}?kategori=seminar`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'seminar' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
              Sharing <span className="ml-1 opacity-60">{totalSeminar}</span>
            </Link>
          </div>

          {/* Video list */}
          {activeVideos.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gray-200 text-6xl mb-4">{activeTab === 'pelatihan' ? '🎓' : '🎙️'}</p>
              <p className="text-gray-400 text-sm">Belum ada video untuk kategori ini.</p>
              <p className="text-gray-300 text-xs mt-1">Koleksi sedang dipersiapkan.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {subcategories.map((subcat) => (
                <div key={subcat}>
                  {/* Sub-kategori header */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <h2 className="font-display font-semibold text-xl text-blue-900">
                      {subcat}
                    </h2>
                    <span className="text-xs text-gray-300">{grouped[subcat].length} video</span>
                  </div>

                  {/* Daftar video */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                    {grouped[subcat].map((video, index) => (
                      <div
                        key={video.id}
                        className={`group flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors ${
                          index < grouped[subcat].length - 1 ? 'border-b border-gray-50' : ''
                        }`}
                      >
                        {/* Nomor */}
                        <span className="text-sm text-gray-300 w-5 text-right shrink-0 font-mono">
                          {index + 1}
                        </span>

                        {/* Judul */}
                        <p className="flex-1 text-base text-gray-800 leading-snug">
                          {video.title}
                        </p>

                        {/* Link — muncul saat hover */}
                        {(video.youtubeUrl || video.manualUrl) && (
                          <a
                            href={(video.youtubeUrl || video.manualUrl) as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                          >
                            {video.youtubeUrl ? '▶ Tonton' : '↗ Buka'}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}
