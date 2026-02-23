import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import VideoForm from '@/components/VideoForm'

export const metadata = { title: 'Tambah Video — Admin KawanPPM' }

export default async function NewVideoPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return <VideoForm mode="create" />
}
