import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import VideoForm from '@/components/VideoForm'

export const metadata = { title: 'Edit Video — Admin KawanPPM' }

export default async function EditVideoPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  let video
  try {
    video = await prisma.video.findUnique({ where: { id: params.id } })
  } catch {
    notFound()
  }

  if (!video) notFound()

  return (
    <VideoForm
      mode="edit"
      initialData={{
        id: video.id,
        title: video.title,
        category: video.category as 'SEMINAR' | 'PELATIHAN',
        subcategory: video.subcategory,
        year: String(video.year),
      }}
    />
  )
}
