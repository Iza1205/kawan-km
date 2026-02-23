export function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url)
  if (!id) return null
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

export function getYears(): number[] {
  const years = []
  for (let y = 2026; y >= 2014; y--) {
    years.push(y)
  }
  return years
}

export const CATEGORY_LABELS = {
  SEMINAR: 'Video Sharing / Seminar / Konferensi',
  PELATIHAN: 'Video Pelatihan',
}

// Subcategory suggestions (bisa diabaikan, admin bisa ketik bebas)
export const SUBCATEGORY_SUGGESTIONS = {
  SEMINAR: [
    'Sekolah Tinggi Manajemen',
    'Pojok Pintar Manajemen',
    'Pengelolaan Pengetahuan',
    'Pusat Informasi',
    'Modal Insani',
  ],
  PELATIHAN: [
    'Program Pengembangan Executive',
    'Program Pengembangan Sertifikasi',
    'Modal Insani',
    'RCCCH',
  ],
}
