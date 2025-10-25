"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart, Share2 } from "lucide-react"

type Manna = {
  id: string
  date: string
  english: string
  telugu: string
  verse?: string
  image?: string
}

export default function DailyCard({ manna, language, onToggleFavorite, isFavorite }: { manna: Manna; language: 'en' | 'te'; onToggleFavorite: (id: string) => void; isFavorite: boolean }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const text = language === 'en' ? manna.english : manna.telugu

  const handleShare = async () => {
    const shareText = `${text}\n\n${manna.verse ?? ''}\n\nRead more: ${location.origin}/daily-grace`
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ title: 'Daily Grace', text: shareText, url: `${location.origin}/daily-grace` })
      } catch (e) {
        console.error('Share failed', e)
      }
    } else {
      // WhatsApp fallback
      const wa = `https://wa.me/?text=${encodeURIComponent(shareText)}`
      window.open(wa, '_blank')
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      {manna.image && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={manna.image}
            alt={manna.verse ?? 'Daily Grace'}
            fill
            className={`object-cover opacity-30 ${imgLoaded ? 'transition-opacity duration-700 opacity-30' : 'opacity-0'}`}
            onLoadingComplete={() => setImgLoaded(true)}
          />
        </div>
      )}

      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm text-gray-500">{manna.verse}</h3>
            <p className="mt-2 text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">{text}</p>
          </div>
          <div className="flex flex-col items-end space-y-3">
            <button aria-label="like" onClick={() => onToggleFavorite(manna.id)} className={`p-2 rounded-full ${isFavorite ? 'bg-yellow-100 text-yellow-600' : 'bg-white'} shadow` }>
              <Heart className="w-5 h-5" />
            </button>
            <button aria-label="share" onClick={handleShare} className="p-2 rounded-full bg-white shadow">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-700">
          {/* Provide small instructions */}
          <p className="italic">Tap left/right or swipe to navigate. Language toggle is at the bottom.</p>
        </div>
      </div>
    </div>
  )
}
