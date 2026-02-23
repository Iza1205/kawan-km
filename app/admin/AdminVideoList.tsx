"use client";

import { useState } from "react";

interface Video {
  id: string;
  title: string;
  description?: string;
  category?: "SEMINAR" | "PELATIHAN";
  subcategory?: string;
  youtubeUrl?: string;
  manualUrl?: string;
  thumbnail?: string;
  tags?: string;
}

interface Props {
  videos: Video[];
}

export default function AdminVideoList({ videos: initialVideos }: Props) {
  const [videos, setVideos] = useState<Video[]>(initialVideos || []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const addVideo = async () => {
    if (!title) return alert("Title wajib diisi");
    setLoading(true);
    try {
      const res = await fetch("/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to add video");
      const newVideo: Video = await res.json();
      setVideos([newVideo, ...videos]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={addVideo}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Loading..." : "Add Video"}
        </button>
      </div>

      <ul>
        {videos.map((v) => (
          <li key={v.id} className="border-b py-2">
            <strong>{v.title}</strong> - {v.description || "-"}
          </li>
        ))}
      </ul>
    </div>
  );
}