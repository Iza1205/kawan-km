import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

let cache: any = null;
let lastFetch = 0;

export async function GET() {
  const now = Date.now();

  // Pakai cache 10 detik
  if (cache && now - lastFetch < 10000) {
    return NextResponse.json(cache);
  }

  try {
    // Ambil data Video dari database
    const videos = await prisma.video.findMany({
      select: { id: true, title: true, description: true },
    });

    // Update cache
    cache = videos;
    lastFetch = now;

    return NextResponse.json(videos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}