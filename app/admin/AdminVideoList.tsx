'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CATEGORY_LABELS } from '@/lib/utils'

interface Video {
  id: string
  title: string
  category: 'SEMINAR' | 'PELATIHAN'
  subcategory: string
  year: number
  youtubeUrl?: string
  manualUrl?: string
  description?: string
  tags?: string
  createdAt: Date
}

export default function AdminVideoList({ videos }: { videos: Video[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [filterYear, setFilterYear] = useState<string>('all')
  const [filterCat, setFilterCat] = useState<string>('all')
  const [filterSub, setFilterSub] = useState<string>('all')
  const [search, setSearch] = useState('')

  const years = Array.from(new Set(videos.map((v) => v.year))).sort((a, b) => b - a)
  const subcats = Array.from(new Set(videos.map((v) => v.subcategory))).sort()

  const filtered = videos.filter((v) => {
    const yearOk = filterYear === 'all' || v.year === parseInt(filterYear)
    const catOk = filterCat === 'all' || v.category === filterCat
    const subOk = filterSub === 'all' || v.subcategory === filterSub
    const searchOk = search === '' || v.title.toLowerCase().includes(search.toLowerCase())
    return yearOk && catOk && subOk && searchOk
  })

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus video "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return
    setDeletingId(id)
    try {
      await fetch(`/api/videos/${id}`, { method: 'DELETE' })
      router.refresh()
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      {/* Filters */}
      <div className="px-6 py-4 border-b border-blue-50 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Cari judul video..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 text-sm border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
        />
        <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}
          className="px-3 py-2 text-sm border border-blue-200 rounded-lg focus:border-blue-500 outline-none">
          <option value="all">Semua Tahun</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
          className="px-3 py-2 text-sm border border-blue-200 rounded-lg focus:border-blue-500 outline-none">
          <option value="all">Semua Kategori</option>
          <option value="SEMINAR">🎙️ Seminar</option>
          <option value="PELATIHAN">🎓 Pelatihan</option>
        </select>
        <select value={filterSub} onChange={(e) => setFilterSub(e.target.value)}
          className="px-3 py-2 text-sm border border-blue-200 rounded-lg focus:border-blue-500 outline-none">
          <option value="all">Semua Sub-Kategori</option>
          {subcats.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="text-xs text-sage-400 self-center">{filtered.length} video</span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sage-400 text-sm">Tidak ada video ditemukan.</p>
          <Link href="/admin/videos/new" className="mt-4 inline-block text-sm text-blue-600 font-medium hover:underline">
            + Tambah video pertama
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-50 bg-sage-50/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-sage-400 uppercase tracking-wider">Judul</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sage-400 uppercase tracking-wider hidden sm:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sage-400 uppercase tracking-wider hidden md:table-cell">Sub-Kategori</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sage-400 uppercase tracking-wider hidden lg:table-cell">Tahun</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sage-400 uppercase tracking-wider hidden xl:table-cell">Link</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-sage-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {filtered.map((video) => (
                <tr key={video.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-sm text-forest-800 line-clamp-1 max-w-xs">{video.title}</div>
                    {video.tags && (
                      <div className="text-xs text-sage-400 mt-0.5 line-clamp-1">{video.tags}</div>
                    )}
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                      video.category === 'SEMINAR' ? 'bg-blue-50 text-blue-700' : 'bg-indigo-50 text-indigo-700'
                    }`}>
                      {video.category === 'SEMINAR' ? '🎙️' : '🎓'} {video.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs font-medium text-forest-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                      {video.subcategory}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-sm font-medium text-forest-700">{video.year}</span>
                  </td>
                  <td className="px-4 py-4 hidden xl:table-cell">
                    {video.youtubeUrl ? (
                      <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        ▶ YouTube
                      </a>
                    ) : video.manualUrl ? (
                      <a href={video.manualUrl} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-700">
                        🔗 Manual Link
                      </a>
                    ) : (
                      <span className="text-xs text-sage-300">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/videos/${video.id}/edit`}
                        className="px-3 py-1.5 text-xs font-medium text-forest-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(video.id, video.title)}
                        disabled={deletingId === video.id}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50">
                        {deletingId === video.id ? '...' : 'Hapus'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
