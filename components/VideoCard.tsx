'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getYouTubeId, getYouTubeThumbnail, CATEGORY_LABELS } from '@/lib/utils'

interface VideoCardProps {
  video: {
    id: string
    title: string
    description?: string | null
    youtubeUrl?: string | null
    manualUrl?: string | null
    thumbnail?: string | null
    category: 'SEMINAR' | 'PELATIHAN'
    year: number
    tags?: string | null
  }
}

export default function VideoCard({ video }: VideoCardProps) {
  const [playing, setPlaying] = useState(false)

  const ytId = video.youtubeUrl ? getYouTubeId(video.youtubeUrl) : null
  const thumbnail =
    video.thumbnail ||
    (video.youtubeUrl ? getYouTubeThumbnail(video.youtubeUrl) : null) ||
    '/placeholder-video.jpg'

  const categoryColor =
    video.category === 'SEMINAR'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-blue-50 text-blue-700 border-blue-200'

  const handleWatch = () => {
    if (ytId) {
      setPlaying(true)
    } else if (video.manualUrl) {
      window.open(video.manualUrl, '_blank')
    }
  }

  return (
    <div className="video-card bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-sm flex flex-col">
      {/* Thumbnail / Player */}
      <div className="relative aspect-video bg-forest-950 overflow-hidden">
        {playing && ytId ? (
          <div className="video-iframe-container">
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          </div>
        ) : (
          <>
            {thumbnail && thumbnail !== '/placeholder-video.jpg' ? (
              <Image
                src={thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-forest-800 to-forest-950 flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                  />
                </svg>
              </div>
            )}

            {/* Play overlay */}
            <button
              onClick={handleWatch}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Tonton video"
            >
              <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-200">
                <svg className="w-5 h-5 text-blue-700 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${categoryColor}`}>
            {video.category === 'SEMINAR' ? '🎙️' : '🎓'} {CATEGORY_LABELS[video.category].split('/')[0].trim()}
          </span>
        </div>

        <h3 className="font-display font-semibold text-forest-800 text-sm leading-snug mb-2 line-clamp-2 flex-1">
          {video.title}
        </h3>

        {video.description && (
          <p className="text-xs text-sage-500 line-clamp-2 mb-3 leading-relaxed">
            {video.description}
          </p>
        )}

        {/* Tags */}
        {video.tags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {video.tags.split(',').slice(0, 3).map((tag, i) => (
              <span key={i} className="px-1.5 py-0.5 bg-sage-100 text-sage-500 text-xs rounded-md">
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Action */}
        <button
          onClick={handleWatch}
          className="mt-auto w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          {ytId ? (
            <>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Tonton Sekarang
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Buka Link Video
            </>
          )}
        </button>
      </div>
    </div>
  )
}
