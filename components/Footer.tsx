import Link from 'next/link'
import { getYears } from '@/lib/utils'

export default function Footer() {
  const years = getYears()
  const recentYears = years.slice(0, 6)

  return (
    <footer className="bg-forest-950 text-white mt-24">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <div>
                <span className="font-display font-bold text-white text-lg block">KawanPPM</span>
                <span className="text-xs text-sage-400">Koleksi Video Internal PPM</span>
              </div>
            </div>
            <p className="text-sm text-sage-400 leading-relaxed">
              Wadah pengetahuan internal PPM. Menyimpan dan menyebarluaskan ilmu pelatihan untuk keluarga besar PPM.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Koleksi Terbaru</h4>
            <div className="space-y-2">
              {recentYears.map((year) => (
                <Link
                  key={year}
                  href={`/koleksi/${year}`}
                  className="block text-sm text-sage-400 hover:text-blue-400 transition-colors"
                >
                  Koleksi {year} →
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Butuh Akses?</h4>
            <p className="text-sm text-sage-400 mb-4">
              Hubungi kami untuk mendapatkan akses ke koleksi video internal PPM.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Minta Akses →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-sage-500">© {new Date().getFullYear()} KawanPPM — PPM Internal</p>
          <Link href="/admin" className="text-xs text-sage-600 hover:text-sage-400 transition-colors">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  )
}
