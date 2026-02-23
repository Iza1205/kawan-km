import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const year = searchParams.get('year')
  const category = searchParams.get('category')
  const subcategory = searchParams.get('subcategory')

  const where: Record<string, unknown> = {}
  if (year) where.year = parseInt(year)
  if (category) where.category = category
  if (subcategory) where.subcategory = subcategory

  const videos = await prisma.video.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(videos)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { title, category, subcategory, year } = body

  if (!title || !category || !subcategory || !year) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const video = await prisma.video.create({
    data: {
      title,
      category,
      subcategory,
      year: parseInt(year),
    },
  })

  return NextResponse.json(video, { status: 201 })
}
