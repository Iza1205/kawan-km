// app/admin/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminVideoList from "./AdminVideoList";

let cache: any = null;
let lastFetch = 0;

async function getRecentVideos() {
  const now = Date.now();

  // Pakai cache 10 detik
  if (cache && now - lastFetch < 10000) {
    return cache;
  }

  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    cache = videos;
    lastFetch = now;
    return videos;
  } catch (err) {
    console.error("Error fetching videos:", err);
    return [];
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const videos = await getRecentVideos();

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm text-sage-500 hover:text-blue-600">
            ← Lihat Website
          </Link>
          <Link
            href="/api/auth/signout"
            className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
          >
            Keluar
          </Link>
        </div>
      </nav>

      {/* Dashboard content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display font-bold text-2xl text-forest-900 mb-2">
          Dashboard Admin
        </h1>
        <p className="text-sm text-sage-400 mb-6">
          Kelola koleksi video internal PPM
        </p>

        <AdminVideoList
          videos={videos.map((v) => ({
            ...v,
            category: v.category as "SEMINAR" | "PELATIHAN",
            subcategory: v.subcategory ?? "",
            description: v.description ?? "",
            youtubeUrl: v.youtubeUrl ?? "",
            manualUrl: v.manualUrl ?? "",
            thumbnail: v.thumbnail ?? "",
            tags: v.tags ?? "",
          }))}
        />
      </div>
    </div>
  );
}