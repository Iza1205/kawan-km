import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Contact — KawanPPM',
  description: 'Hubungi kami untuk mendapatkan akses ke koleksi video internal PPM.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-200 rounded-full mb-5">
              <span className="text-xs font-semibold text-blue-700">✉️ Hubungi Kami</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl text-forest-900 mb-4">
              Minta Akses Video
            </h1>
            <p className="text-sage-500 leading-relaxed">
              Isi form di bawah ini atau hubungi kami langsung untuk mendapatkan akses ke koleksi video internal PPM. Hanya untuk keluarga besar PPM.
            </p>
          </div>

          {/* Contact card */}
          <div className="bg-white rounded-3xl border border-blue-100 shadow-lg shadow-blue-50 p-8 mb-8">
            <h2 className="font-display font-semibold text-forest-800 text-lg mb-6">Form Permintaan Akses</h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm text-forest-800 placeholder-sage-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">Email PPM</label>
                <input
                  type="email"
                  placeholder="nama@ppm.id"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm text-forest-800 placeholder-sage-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">Divisi / Unit Kerja</label>
                <input
                  type="text"
                  placeholder="Contoh: Divisi Training & Development"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm text-forest-800 placeholder-sage-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">Keperluan Akses</label>
                <textarea
                  rows={4}
                  placeholder="Jelaskan keperluan Anda mengakses koleksi video PPM..."
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm text-forest-800 placeholder-sage-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-800 hover:to-blue-600 transition-all shadow-md shadow-blue-200 text-sm"
              >
                Kirim Permintaan →
              </button>
            </form>
          </div>

          {/* Alternative contact */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-blue-100 p-5">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3 text-xl">
                📧
              </div>
              <h3 className="font-display font-semibold text-forest-800 text-sm mb-1">Email</h3>
              <p className="text-sage-400 text-xs mb-2">Hubungi via email resmi</p>
              <a href="mailto:admin@ppm.id" className="text-blue-600 text-sm font-medium hover:text-blue-700">
                admin@ppm.id
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-blue-100 p-5">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3 text-xl">
                💬
              </div>
              <h3 className="font-display font-semibold text-forest-800 text-sm mb-1">WhatsApp</h3>
              <p className="text-sage-400 text-xs mb-2">Chat langsung dengan admin</p>
              <a href="https://wa.me/628xxxxxxxxxx" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:text-blue-700">
                +62 8xx-xxxx-xxxx
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
