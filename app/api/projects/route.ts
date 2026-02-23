// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // sesuaikan path prisma

let cache: any = null;
let lastFetch = 0;

export async function GET() {
  const now = Date.now();

  // Pakai cache kalau masih valid 10 detik
  if (cache && now - lastFetch < 10000) {
    return NextResponse.json(cache);
  }

  try {
    const projects = await prisma.projects.findMany({
      select: { id: true, title: true, description: true },
    });

    cache = projects;
    lastFetch = now;

    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}