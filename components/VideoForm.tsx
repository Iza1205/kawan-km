'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getYears, CATEGORY_LABELS, SUBCATEGORY_SUGGESTIONS } from '@/lib/utils'

interface VideoFormData {
  title: string
  category: 'SEMINAR' | 'PELATIHAN'
  subcategory: string
  year: string
}

interface VideoFormProps {
  initialData?: Partial<VideoFormData> & { id?: string }
  mode: 'create' | 'edit'
}

const defaultData: VideoFormData = {
  title: '',
  category: 'SEMINAR',
  subcategory: '',
  year: String(new Date().getFullYear()),
}

export default function VideoForm({ initialData, mode }: VideoFormProps) {
  const router = useRouter()
  const years = getYears()
  const [form, setForm] = useState<VideoFormData>({ ...defaultData, ...initialData })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = SUBCATEGORY_SUGGESTIONS[form.category]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = mode === 'create' ? '/api/videos' : `/api/videos/${initialData?.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, year: parseInt(form.year) }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Gagal menyimpan video')
      }

      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  const set = (field: keyof VideoFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }))

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <span className="font-display font-bold text-forest-800">KawanPPM</span>
            <span className="text-sage-300">|</span>
            <span className="text-sm text-sage-500">{mode === 'create' ? 'Tambah Video' : 'Edit Video'}</span>
          </div>
          <Link href="/admin" className="text-sm text-sage-500 hover:text-blue-600 transition-colors">
            ← Kembali
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl text-forest-900">
            {mode === 'create' ? '+ Tambah Video Baru' : '✏️ Edit Video'}
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 space-y-5">

            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Judul */}
            <div>
              <label className="block text-sm font-semibold text-forest-700 mb-1.5">
                Judul Video <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={set('title')}
                placeholder="Masukkan judul video..."
                required
                className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-forest-800"
              />
            </div>

            {/* Kategori & Tahun */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-forest-700 mb-1.5">
                  Kategori <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(f => ({
                    ...f,
                    category: e.target.value as 'SEMINAR' | 'PELATIHAN',
                    subcategory: ''
                  }))}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 outline-none transition-all text-sm"
                >
                  <option value="SEMINAR">🎙️ Video Sharing</option>
                  <option value="PELATIHAN">🎓 Video Pelatihan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-forest-700 mb-1.5">
                  Tahun <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.year}
                  onChange={set('year')}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 outline-none transition-all text-sm"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sub-Kategori */}
            <div className="relative">
              <label className="block text-sm font-semibold text-forest-700 mb-1.5">
                Sub-Kategori / Program <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={form.subcategory}
                  onChange={set('subcategory')}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  placeholder="Ketik atau pilih program..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 text-xs pointer-events-none">▼</span>
              </div>

              {/* Dropdown suggestions */}
              {showSuggestions && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-blue-100 shadow-lg overflow-hidden">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseDown={() => setForm(f => ({ ...f, subcategory: s }))}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 ${
                        form.subcategory === s ? 'bg-blue-50 text-blue-700 font-medium' : 'text-forest-700'
                      }`}
                    >
                      {form.subcategory === s && <span className="text-blue-500">✓</span>}
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Quick chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, subcategory: s }))}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      form.subcategory === s
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-5">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-800 hover:to-blue-600 transition-all shadow-md shadow-blue-200 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Menyimpan...' : mode === 'create' ? '+ Simpan Video' : '✓ Perbarui Video'}
            </button>
            <Link
              href="/admin"
              className="px-6 py-3.5 border border-blue-200 text-forest-700 font-medium rounded-xl hover:bg-blue-50 transition-colors text-sm text-center"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
