import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import AdminVideoList from './AdminVideoList'

async function getAdminStats() {
  try {
    const [total, seminar, pelatihan, byYear] = await Promise.all([
      prisma.video.count(),
      prisma.video.count({ where: { category: 'SEMINAR' } }),
      prisma.video.count({ where: { category: 'PELATIHAN' } }),
      prisma.video.groupBy({
        by: ['year'],
        _count: { id: true },
        orderBy: { year: 'desc' },
        take: 5,
      }),
    ])
    return { total, seminar, pelatihan, byYear }
  } catch {
    return { total: 0, seminar: 0, pelatihan: 0, byYear: [] }
  }
}

async function getRecentVideos() {
  try {
    return await prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
  } catch {
    return []
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const stats = await getAdminStats()
  const videos = await getRecentVideos()

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Admin Navbar */}
      <nav className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <span className="font-display font-bold text-forest-800">KawanPPM</span>
            <span className="text-sage-300">|</span>
            <span className="text-sm text-sage-500">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-sage-500 hover:text-blue-600 transition-colors">
              ← Lihat Website
            </Link>
            <Link
              href="/api/auth/signout"
              className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              Keluar
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl text-forest-900">Dashboard Admin</h1>
          <p className="text-sm text-sage-400 mt-1">Kelola koleksi video internal PPM</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Video', value: stats.total, icon: '🎬', color: 'from-blue-600 to-blue-400' },
            { label: 'Seminar/Konferensi', value: stats.seminar, icon: '🎙️', color: 'from-blue-600 to-blue-400' },
            { label: 'Video Pelatihan', value: stats.pelatihan, icon: '🎓', color: 'from-amber-600 to-amber-400' },
            { label: 'Tahun Aktif', value: stats.byYear.length, icon: '📅', color: 'from-purple-600 to-purple-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg mb-3`}>
                {stat.icon}
              </div>
              <div className="font-display font-bold text-2xl text-forest-900">{stat.value}</div>
              <div className="text-xs text-sage-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/admin/videos/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-800 hover:to-blue-600 transition-all shadow-md shadow-blue-200 text-sm"
          >
            <span>+</span> Tambah Video Baru
          </Link>
        </div>

        {/* Video list */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-blue-50">
            <h2 className="font-display font-semibold text-forest-800">Semua Video</h2>
          </div>
          <AdminVideoList videos={videos.map(v => ({
            ...v,
            category: v.category as 'SEMINAR' | 'PELATIHAN',
            subcategory: v.subcategory,
            description: v.description ?? undefined,
            youtubeUrl: v.youtubeUrl ?? undefined,
            manualUrl: v.manualUrl ?? undefined,
            thumbnail: v.thumbnail ?? undefined,
            tags: v.tags ?? undefined,
          }))} />
        </div>
      </div>
    </div>
  )
}
