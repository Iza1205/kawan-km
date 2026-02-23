import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'KawanPPM — Koleksi Video Internal PPM',
  description: 'Wadah pengetahuan internal PPM. Akses koleksi video pelatihan, seminar, dan konferensi dari 2014 hingga hari ini.',
  keywords: 'PPM, pelatihan, seminar, konferensi, video, koleksi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
