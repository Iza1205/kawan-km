import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getYears } from '@/lib/utils'
import { prisma } from '@/lib/db'

async function getStats() {
  try {
    const [total, seminar, pelatihan] = await Promise.all([
      prisma.video.count(),
      prisma.video.count({ where: { category: 'SEMINAR' } }),
      prisma.video.count({ where: { category: 'PELATIHAN' } }),
    ])
    return { total, seminar, pelatihan }
  } catch {
    return { total: 0, seminar: 0, pelatihan: 0 }
  }
}

export default async function HomePage() {
  const years = getYears()
  const stats = await getStats()

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-16">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/10 rounded-full blur-3xl" />

          {/* Decorative grid dots */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #15803d 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-slide-up stagger-1 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-8">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">Khusus Keluarga Besar PPM</span>
          </div>

          {/* Main heading */}
          <h1 className="animate-slide-up stagger-2 font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-forest-900 leading-[1.05] tracking-tight mb-6">
            KM Wadah{' '}
            <span className="gradient-text">Pengetahuan</span>
            <br />
            Internal PPM
          </h1>

          {/* Subtitle */}
          <p className="animate-slide-up stagger-3 text-lg sm:text-xl text-sage-600 max-w-2xl mx-auto leading-relaxed mb-4">
            Akses Koleksi Video Terbaik dari PPM.
          </p>
          <p className="animate-slide-up stagger-3 text-base text-sage-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Ribuan video pelatihan, seminar, dan konferensi internal PPM tersimpan rapi —{' '}
            <strong className="text-forest-700">dari 2014 hingga hari ini</strong>.
            Khusus untuk keluarga besar PPM.
          </p>

          {/* CTA Buttons */}
          <div className="animate-slide-up stagger-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="px-7 py-3.5 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:from-blue-800 hover:to-blue-600 transition-all hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5 text-sm"
            >
              Minta Akses Video →
            </Link>
            <a
              href="#koleksi"
              className="px-7 py-3.5 bg-white/80 border border-blue-200 text-forest-700 font-semibold rounded-xl hover:bg-white hover:border-blue-300 transition-all text-sm backdrop-blur-sm"
            >
              Lihat Koleksi ↓
            </a>
          </div>

          {/* Stats */}
          {stats.total > 0 && (
            <div className="animate-slide-up stagger-5 mt-14 flex flex-wrap justify-center gap-8 sm:gap-12">
              <div className="text-center">
                <div className="font-display font-bold text-3xl text-forest-800">{stats.total}+</div>
                <div className="text-xs text-sage-500 mt-1">Total Video</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-3xl text-forest-800">{stats.seminar}+</div>
                <div className="text-xs text-sage-500 mt-1">Seminar & Konferensi</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-3xl text-forest-800">{stats.pelatihan}+</div>
                <div className="text-xs text-sage-500 mt-1">Video Pelatihan</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-3xl text-forest-800">13</div>
                <div className="text-xs text-sage-500 mt-1">Tahun Koleksi</div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-sage-400">Scroll</span>
          <svg className="w-4 h-4 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ===== KOLEKSI TAHUN SECTION ===== */}
      <section id="koleksi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-200 rounded-full mb-5">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">📚 Koleksi Lengkap</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-forest-900 mb-4">
            Jelajahi Koleksi Per Tahun
          </h2>
          <p className="text-sage-500 max-w-xl mx-auto">
            Pilih tahun untuk mengakses koleksi video seminar dan pelatihan pada periode tersebut.
          </p>
        </div>

        {/* Years grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {years.map((year, i) => (
            <Link
              key={year}
              href={`/koleksi/${year}`}
              className={`group relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100 ${
                i === 0
                  ? 'bg-gradient-to-br from-blue-700 to-blue-500 border-blue-600 text-white shadow-md shadow-blue-200 col-span-2 sm:col-span-1'
                  : 'bg-white border-blue-100 hover:border-blue-300'
              }`}
            >
              {/* Decorative circle */}
              <div
                className={`absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10 transition-opacity group-hover:opacity-20 ${
                  i === 0 ? 'bg-white' : 'bg-blue-400'
                }`}
              />

              <div className="relative z-10">
                <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  i === 0 ? 'text-blue-200' : 'text-sage-400'
                }`}>
                  Koleksi
                </div>
                <div className={`font-display font-extrabold text-2xl ${
                  i === 0 ? 'text-white' : 'text-forest-800'
                }`}>
                  {year}
                </div>
                {i === 0 && (
                  <div className="mt-1 text-xs text-blue-200">Terbaru ✨</div>
                )}
              </div>

              <div className={`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-sm ${
                i === 0 ? 'text-blue-200' : 'text-blue-500'
              }`}>
                →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURE SECTION ===== */}
      <section className="bg-white border-t border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header — center */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-200 rounded-full mb-5">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">📹 Koleksi Kami</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-forest-900 mb-4">
              Dua jenis koleksi video yang tersimpan lengkap
            </h2>
            <p className="text-sage-500 max-w-xl mx-auto">
              Semua materi internal PPM terkurasi dengan baik, mudah diakses kapan saja.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 — Video Sharing */}
            <div className="group border border-blue-100 rounded-2xl p-8 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                  🎙️
                </div>
                <span className="text-[11px] font-semibold tracking-widest text-blue-200 uppercase">01</span>
              </div>
              <h3 className="font-display font-bold text-blue-900 text-3xl mb-3 leading-snug">
                Video Sharing<br />Seminar & Konferensi
              </h3>
              <p className="text-blue-400 text-md leading-relaxed mb-6">
                Rekaman lengkap sharing session, seminar, dan konferensi internal. Ilmu langsung dari para pakar dan praktisi terbaik PPM.
              </p>
              <div className="pt-6 border-t border-blue-50 flex flex-wrap gap-2">
                {['Sekolah Tinggi Manajemen', 'Pojok Pintar', 'Modal Insani', 'dll'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-blue-50 text-blue-400 text-xs rounded-lg">{tag}</span>
                ))}
              </div>
            </div>

            {/* Card 2 — Video Pelatihan */}
            <div className="group border border-blue-100 rounded-2xl p-8 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                  🎓
                </div>
                <span className="text-[11px] font-semibold tracking-widest text-blue-200 uppercase">02</span>
              </div>
              <h3 className="font-display font-bold text-blue-900 text-3xl mb-3 leading-snug">
                Video Pelatihan<br />& Pengembangan
              </h3>
              <p className="text-blue-400 text-md leading-relaxed mb-6">
                Materi pelatihan terstruktur untuk pengembangan kompetensi. Kurikulum internal PPM yang telah teruji dan terbukti.
              </p>
              <div className="pt-6 border-t border-blue-50 flex flex-wrap gap-2">
                {['Program Pengembangan Executive', 'Program Pengembangan Sertifikasi', 'dll'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-blue-50 text-blue-400 text-xs rounded-lg">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-10 sm:p-14 shadow-2xl shadow-blue-200">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full" />

          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-5 tracking-wider uppercase">
              Khusus Internal PPM
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Ingin Akses ke Semua Video?
            </h2>
            <p className="text-blue-100 mb-8 max-w-md mx-auto">
              Hubungi kami untuk mendapatkan akses ke seluruh koleksi video internal PPM dari 2014 hingga sekarang.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-sm"
            >
              Minta Akses Sekarang →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
