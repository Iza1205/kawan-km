// app/api/videos/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Cache sederhana
let cache: any = null;
let lastFetch = 0;

// GET: ambil semua video
export async function GET() {
  const now = Date.now();

  // Pakai cache 10 detik
  if (cache && now - lastFetch < 10000) {
    return NextResponse.json(cache);
  }

  try {
    const videos = await prisma.video.findMany({
      select: { id: true, title: true, description: true },
    });

    cache = videos;
    lastFetch = now;

    return NextResponse.json(videos); // selalu return JSON
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: tambah video baru
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const video = await prisma.video.create({
      data: {
        title: body.title,
        description: body.description || "",
        category: body.category || "SEMINAR",
        subcategory: body.subcategory || "",
        year: body.year || new Date().getFullYear(),
        youtubeUrl: body.youtubeUrl || "",
        manualUrl: body.manualUrl || "",
        thumbnail: body.thumbnail || "",
        tags: body.tags || "",
      },
    });

    // Reset cache agar GET berikutnya dapat data terbaru
    cache = null;

    return NextResponse.json(video); // selalu return JSON baru
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}