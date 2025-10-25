// @ts-nocheck
"use client"

import { useEffect, useRef, useState } from "react"
import DailyCard from "./DailyCard"

type Manna = {
  id: string
  date: string
  english: string
  telugu: string
  verse?: string
  image?: string
}

export default function DailyGrace() {
  const [mannas, setMannas] = useState<Manna[]>([])
  const [index, setIndex] = useState(0)
  const [language, setLanguage] = useState<'en' | 'te'>(() => (typeof window !== 'undefined' ? (localStorage.getItem('dg_lang') as 'en' | 'te') || 'en' : 'en'))
  const [isPaused, setIsPaused] = useState(false)
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem('dg_favs') || '[]') } catch { return [] }
  })

  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    fetch('/api/daily-grace')
      .then((r) => r.json())
      .then((d) => setMannas(d.mannas || []))
      .catch((e) => console.error(e))
  }, [])

  useEffect(() => {
    localStorage.setItem('dg_lang', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('dg_favs', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    if (!mannas.length) return
    if (isPaused) return

    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % mannas.length)
    }, 6000)

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [mannas, isPaused])

  const goNext = () => setIndex((i) => Math.min(mannas.length - 1, i + 1))
  const goPrev = () => setIndex((i) => Math.max(0, i - 1))

  const onToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const has = prev.includes(id)
      const next = has ? prev.filter((p) => p !== id) : [...prev, id]
      return next
    })
  }

  // touch handling
  const touchStartY = useRef<number | null>(null)
  const touchLocked = useRef(false)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    touchLocked.current = false
    setIsPaused(true)
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current == null) return
    const delta = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(delta) > 40 && !touchLocked.current) {
      if (delta < 0) {
        // swipe up -> next
        setIndex((i) => Math.min(mannas.length - 1, i + 1))
      } else {
        // swipe down -> prev
        setIndex((i) => Math.max(0, i - 1))
      }
      touchLocked.current = true
    }
    touchStartY.current = null
    setIsPaused(false)
  }

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setIndex((i) => Math.min(mannas.length - 1, i + 1))
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1))
      if (e.key === ' ') setIsPaused((p) => !p)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mannas.length])

  return (
    <div className="w-full min-h-[70vh] h-[80vh] md:h-[90vh] flex items-center justify-center">
      <div className="relative w-full h-full max-w-4xl">
        {/* Progress indicators */}
        <div className="absolute top-4 left-4 right-4 flex gap-2 z-40">
          {mannas.map((m, idx) => (
            <div key={m.id} className={`h-1 rounded ${idx === index ? 'bg-yellow-600 flex-1' : 'bg-white/50 flex-1'}`} style={{ transition: 'width 300ms' }} />
          ))}
        </div>

        {/* Click zones for nav */}
        <div className="absolute inset-0 z-30 flex" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div onClick={goPrev} className="w-1/3 h-full" />
          <div onClick={() => setIsPaused((p) => !p)} className="w-1/3 h-full" />
          <div onClick={goNext} className="w-1/3 h-full" />
        </div>

        {/* Main card area */}
        <div className="absolute inset-0 flex items-center justify-center">
          {mannas.length ? (
            <div className="w-full h-full p-4">
              <div className="w-full h-full relative overflow-hidden rounded-3xl">
                {/* Transition simple */}
                <div className="absolute inset-0 transition-transform duration-400" style={{ transform: `translateY(-${index * 100}%)` }}>
                  {mannas.map((m) => (
                    <section key={m.id} className="w-full h-full">
                      <DailyCard manna={m} language={language} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(m.id)} />
                    </section>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => setLanguage((l) => (l === 'en' ? 'te' : 'en'))} className="px-3 py-1 rounded-full bg-white shadow">
                    {language === 'en' ? 'English' : 'తెలుగు'}
                  </button>
                  <button onClick={() => setIsPaused((p) => !p)} className="px-3 py-1 rounded-full bg-white shadow">
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                </div>

                <div className="text-sm text-gray-600">{index + 1} / {mannas.length}</div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-gray-600">No Daily Grace items found for today.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
