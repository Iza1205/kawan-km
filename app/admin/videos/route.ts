import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const videos = await prisma.video.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(videos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title) return NextResponse.json({ error: "Title required" }, { status: 400 });

    const newVideo = await prisma.video.create({
      data: {
        title: body.title,
        description: body.description ?? "",
        category: body.category ?? "SEMINAR",
        subcategory: body.subcategory ?? "",
        youtubeUrl: body.youtubeUrl ?? "",
        manualUrl: body.manualUrl ?? "",
        thumbnail: body.thumbnail ?? "",
        tags: body.tags ?? "",
        year: body.year ?? new Date().getFullYear(),
      },
    });

    return NextResponse.json(newVideo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}