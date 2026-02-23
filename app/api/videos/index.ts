import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const videos = await prisma.video.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      subcategory: true,
      youtubeUrl: true,
      manualUrl: true,
      thumbnail: true,
      tags: true,
      year: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(videos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const video = await prisma.video.create({ data: body });
  return NextResponse.json(video, { status: 201 });
}