"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DailyVideoCard } from "@/components/DailyVideoCard";
import { DailyGraceModal } from "@/components/DailyGraceModal";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MannaReelCard } from "@/components/MannaReelCard";
import { MannaHighlight } from "@/components/MannaHighlight";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { format, isSameDay, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

// Types
type BilingualDay = {
  date: string;
  dayNumber: number;
  theme: string;
  english: VideoSource;
  telugu: VideoSource;
};

type VideoSource = {
  dayId: string;
  videoId?: string;
  title: string;
  src: string;
  thumbnail: string;
  type: 'image' | 'video';
};

type VideoItem = {
  id: string;
  title: string;
  date: string;
  theme: string;
  src: string;
  thumbnail: string;
  language: 'english' | 'telugu';
  type: 'image' | 'video';
};

// Curated Sunday Videos (Hardcoded for Bottom Carousel)
// Curated Sunday Videos (Hardcoded for Bottom Carousel)
const SUNDAY_VIDEOS = [
  { title: "Sunday Service 12-10-2025 | Pastor K. Ravi Kumar", src: "https://www.youtube.com/embed/yVhKuyAdi_Q", thumbnail: "https://img.youtube.com/vi/yVhKuyAdi_Q/hqdefault.jpg" },
  { title: "Sunday Service 19-10-2025 | Pastor K. Ravi Kumar", src: "https://www.youtube.com/embed/gT-Cpnw1AZ0", thumbnail: "https://img.youtube.com/vi/gT-Cpnw1AZ0/hqdefault.jpg" },
  { title: "Sunday Service 26-10-2025 | Pastor K. Ravi Kumar", src: "https://www.youtube.com/embed/rYce42cNPro", thumbnail: "https://img.youtube.com/vi/rYce42cNPro/hqdefault.jpg" },
  { title: "Sunday Service 09-11-2025 | Live | Pastor K. Ravi Kumar", src: "https://www.youtube.com/embed/ap8Ux72GkDk", thumbnail: "https://img.youtube.com/vi/ap8Ux72GkDk/hqdefault.jpg" },
  { title: "Sunday Service 16-11-2025 | Pastor K. Ravi Kumar", src: "https://www.youtube.com/embed/PXtXYOgWyWM", thumbnail: "https://img.youtube.com/vi/PXtXYOgWyWM/hqdefault.jpg" },
  { title: "Sunday Service 23-11-2025 | Pastor K. Ravi Kumar", src: "https://www.youtube.com/embed/VJWWLPx9cEI", thumbnail: "https://img.youtube.com/vi/VJWWLPx9cEI/hqdefault.jpg" },
  { title: "Sunday Service 30-11-2025 | Live | Pastor K. Ravi Kumar", src: "https://www.youtube.com/embed/kw9VWIUQhKo", thumbnail: "https://img.youtube.com/vi/kw9VWIUQhKo/hqdefault.jpg" },
  { title: "GLORIOUS SUNDAY SERVICE | 07-12-2025 | #live", src: "https://www.youtube.com/embed/PDr8Y6_So_Q", thumbnail: "https://img.youtube.com/vi/PDr8Y6_So_Q/hqdefault.jpg" },
  { title: "SUNDAY SERVICE | 14-12-2025 | #live", src: "https://www.youtube.com/embed/C_ZEDst1LB0", thumbnail: "https://img.youtube.com/vi/C_ZEDst1LB0/hqdefault.jpg" },
  { title: "YOUTH SEMI CHRISTMAS | 21-12-2025 | #live", src: "https://www.youtube.com/embed/74m65SgBRz0", thumbnail: "https://img.youtube.com/vi/74m65SgBRz0/hqdefault.jpg" },
  { title: "CANDLE LIGHT SERVICE | 23-12-2025 | #live", src: "https://www.youtube.com/embed/jG1O2yHBKbw", thumbnail: "https://img.youtube.com/vi/jG1O2yHBKbw/hqdefault.jpg" },
  { title: "CHRISTMAS WORSHIP SERVICE | 25-12-2025 | #live", src: "https://www.youtube.com/embed/Fbtimdmzaf0", thumbnail: "https://img.youtube.com/vi/Fbtimdmzaf0/hqdefault.jpg" },
  { title: "PRAISE & WORSHIP SERVICE | 28-12-2025 | #live (Morning)", src: "https://www.youtube.com/embed/5gucWw-d_nA", thumbnail: "https://img.youtube.com/vi/5gucWw-d_nA/hqdefault.jpg" },
  { title: "PRAISE & WORSHIP SERVICE | 28-12-2025 | #live (Evening)", src: "https://www.youtube.com/embed/t_VirkLYgHQ", thumbnail: "https://img.youtube.com/vi/t_VirkLYgHQ/hqdefault.jpg" },
  { title: "CROSS OVER SERVICE | 31-12-2025 | #live", src: "https://www.youtube.com/embed/7NyPOxY9zwA", thumbnail: "https://img.youtube.com/vi/7NyPOxY9zwA/hqdefault.jpg" },
  { title: "NEW YEAR SERVICE | 01-01-2026 | #live", src: "https://www.youtube.com/embed/QanFnzbUQUM", thumbnail: "https://img.youtube.com/vi/QanFnzbUQUM/hqdefault.jpg" },
  { title: "SUNDAY SERVICE | 04-01-2026 | #live", src: "https://www.youtube.com/embed/LWSVUvhuTtc", thumbnail: "https://img.youtube.com/vi/LWSVUvhuTtc/hqdefault.jpg" },
  { title: "GLORIOUS SUNDAY SERVICE | 04-01-2026 | #live", src: "https://www.youtube.com/embed/rh7ynbWPtI0", thumbnail: "https://img.youtube.com/vi/rh7ynbWPtI0/hqdefault.jpg" },
  { title: "SUNDAY SERVICE | 11-01-2026 | #live", src: "https://www.youtube.com/embed/kOxQEwxqOdo", thumbnail: "https://img.youtube.com/vi/kOxQEwxqOdo/hqdefault.jpg" },
  { title: "SUNDAY SERVICE | 18-01-2026 | #live", src: "https://www.youtube.com/embed/J27bQckpPEQ", thumbnail: "https://img.youtube.com/vi/J27bQckpPEQ/hqdefault.jpg" },
  { title: "SUNDAY SERVICE | 25-01-2026 | #live", src: "https://www.youtube.com/embed/47XTHrkc8Yc", thumbnail: "https://img.youtube.com/vi/47XTHrkc8Yc/hqdefault.jpg" },
  { title: "SUNDAY SERVICE | 01-02-2026 | #Live", src: "https://www.youtube.com/embed/QOOufKwMOKA", thumbnail: "https://img.youtube.com/vi/QOOufKwMOKA/hqdefault.jpg" },
  { title: "SUNDAY SERVICE | 08-02-2026 | #Live", src: "https://www.youtube.com/embed/ZB7s8tSn4Y8", thumbnail: "https://img.youtube.com/vi/ZB7s8tSn4Y8/hqdefault.jpg" },
  { title: "MENS SUNDAY SERVICE | 15-02-2026 | #Live", src: "https://www.youtube.com/embed/nurHlBe5G88", thumbnail: "https://img.youtube.com/vi/nurHlBe5G88/hqdefault.jpg" },
  { title: "SUNDAY SERVICE | 22-02-2026 | #Live", src: "https://www.youtube.com/embed/EcrT2wRSzpc", thumbnail: "https://img.youtube.com/vi/EcrT2wRSzpc/hqdefault.jpg" },
  { title: "PROPHETIC & DELIVERANCE SERVICE | 01-03-2026 | #Live", src: "https://www.youtube.com/embed/YAgGVFpipsI", thumbnail: "https://img.youtube.com/vi/YAgGVFpipsI/hqdefault.jpg" },
  { title: "PRAISE & WORSHIP SERVICE | 08-03-2026 | #Live", src: "https://www.youtube.com/embed/Ub-YaVGGK5A", thumbnail: "https://img.youtube.com/vi/Ub-YaVGGK5A/hqdefault.jpg" },
  { title: "SUNDAY WORSHIP SERVICE | 15-03-2026 | #Live", src: "https://www.youtube.com/embed/zTVJv6mx2yM", thumbnail: "https://img.youtube.com/vi/zTVJv6mx2yM/hqdefault.jpg" },
  { title: "SUNDAY SERVICE | 22-03-2026 | #Live", src: "https://www.youtube.com/embed/mskh0t0_7Zw", thumbnail: "https://img.youtube.com/vi/mskh0t0_7Zw/hqdefault.jpg" }
];

export default function DailyGracePage() {
  const [bilingualData, setBilingualData] = useState<BilingualDay[]>([]);
  const [loading, setLoading] = useState(true);

  // State
  const [language, setLanguage] = useState<'english' | 'telugu' | 'both'>('both');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const reelsScrollRef = useRef<HTMLDivElement>(null);
  const sundayScrollRef = useRef<HTMLDivElement>(null);

  // Load Data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/daily_manna_bilingual.json");
        if (!res.ok) throw new Error("Failed to fetch bilingual data");
        const data = await res.json();
        setBilingualData(data.sort((a: any, b: any) => b.dayNumber - a.dayNumber));
      } catch (err) {
        console.error("Error loading daily grace data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Helpers
  const flattenVideo = (day: BilingualDay, lang: 'english' | 'telugu'): VideoItem => ({
    id: day[lang].dayId,
    title: day[lang].title,
    date: day.date,
    theme: day.theme,
    src: day[lang].src,
    thumbnail: day[lang].thumbnail,
    language: lang,
    type: day[lang].type
  });

  // Archive Filter Logic
  const archiveVideos = useMemo(() => {
    let list: VideoItem[] = [];
    bilingualData.forEach(day => {
      if (language === 'english' || language === 'both') list.push(flattenVideo(day, 'english'));
      if (language === 'telugu' || language === 'both') list.push(flattenVideo(day, 'telugu'));
    });
    return list.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.theme.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate = selectedDate ? isSameDay(parseISO(video.date), selectedDate) : true;
      return matchesSearch && matchesDate;
    });
  }, [bilingualData, language, searchQuery, selectedDate]);

  // Today's Hero Video
  const todaysVideo = useMemo(() => {
    if (bilingualData.length === 0) return null;
    const latestDay = bilingualData[0];
    const prefLang = language === 'telugu' ? 'telugu' : 'english';
    return flattenVideo(latestDay, prefLang);
  }, [bilingualData, language]);

  // Scroll Handlers
  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Nav Logic
  const getCurrentDayIndex = () => {
    if (!activeVideo) return -1;
    return bilingualData.findIndex(day =>
      day.english.dayId === activeVideo.id ||
      day.telugu.dayId === activeVideo.id
    );
  };

  const handleNext = () => {
    const idx = getCurrentDayIndex();
    if (idx !== -1 && idx > 0) {
      const nextDay = bilingualData[idx - 1]; // Newer
      const lang = activeVideo?.language || 'english';
      setActiveVideo(flattenVideo(nextDay, lang));
    }
  };

  const handlePrev = () => {
    const idx = getCurrentDayIndex();
    if (idx !== -1 && idx < bilingualData.length - 1) {
      const prevDay = bilingualData[idx + 1]; // Older
      const lang = activeVideo?.language || 'english';
      setActiveVideo(flattenVideo(prevDay, lang));
    }
  };

  const handleLanguageSwitch = () => {
    if (!activeVideo) return;
    const idx = getCurrentDayIndex();
    if (idx !== -1) {
      const day = bilingualData[idx];
      const newLang = activeVideo.language === 'english' ? 'telugu' : 'english';
      setActiveVideo(flattenVideo(day, newLang));
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 text-gray-900 font-sans selection:bg-amber-100 selection:text-amber-900 pb-20">

        {/* === SECTION 1: HERO REELS === */}
        <section className="relative w-full bg-white pt-4 pb-8 border-b border-gray-100 shadow-sm z-10">
          <div className="container mx-auto px-4 mb-4 flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 tracking-tight">Daily Grace</h1>
              <p className="text-gray-400 text-[10px] md:text-sm mt-0.5 uppercase tracking-widest font-semibold">{bilingualData.length} Days of Glory</p>
            </div>
            <LanguageToggle value={language} onChange={setLanguage} />
          </div>

          <div className="relative group container mx-auto px-0 md:px-4">
            <button onClick={() => scroll(reelsScrollRef, 'left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-lg border border-gray-100 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:block hover:text-blue-600">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              ref={reelsScrollRef}
              className="flex overflow-x-auto gap-3 md:gap-6 py-4 px-4 md:px-2 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {bilingualData.map((day) => (
                <React.Fragment key={day.dayNumber}>
                  {(language === 'english' || language === 'both') && (
                    <div className="snap-center shrink-0">
                      <MannaReelCard video={day.english} dayNumber={day.dayNumber} theme={day.theme} language="english" onClick={() => setActiveVideo(flattenVideo(day, 'english'))} />
                    </div>
                  )}
                  {(language === 'telugu' || language === 'both') && (
                    <div className="snap-center shrink-0">
                      <MannaReelCard video={day.telugu} dayNumber={day.dayNumber} theme={day.theme} language="telugu" onClick={() => setActiveVideo(flattenVideo(day, 'telugu'))} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button onClick={() => scroll(reelsScrollRef, 'right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-lg border border-gray-100 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block hover:text-blue-600">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* === SECTION 2: TODAY'S HIGHLIGHT === */}
        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="h-px flex-1 bg-gray-200"></div>
            <h2 className="text-gray-400 font-medium text-[10px] md:text-sm uppercase tracking-widest">Today's Manna</h2>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>
          {todaysVideo && (
            <MannaHighlight video={todaysVideo} onClick={() => setActiveVideo(todaysVideo)} />
          )}
        </section>

        {/* === SECTION 3: ARCHIVE === */}
        <section className="container mx-auto px-4 pb-16">
          <div className="sticky top-4 z-30 mb-8 flex flex-col gap-4 rounded-2xl bg-white/90 p-4 shadow-xl shadow-gray-200/50 backdrop-blur-xl border border-white/50 md:flex-row md:items-center md:justify-between ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Archive</h2>
            </div>

            <div className="flex flex-1 flex-col gap-3 md:max-w-xl md:flex-row">
              <Input
                placeholder="Search..."
                className="border-gray-200 bg-gray-50 pl-4 h-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full md:w-[150px] h-10 rounded-xl justify-start text-left font-normal border-gray-200 bg-gray-50", !selectedDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {archiveVideos.map((video) => (
              <DailyVideoCard
                key={video.id + video.language}
                video={{ ...video, title: `Day ${video.id.replace(/\D/g, '')}: ${video.theme}`, theme: `${video.language === 'english' ? 'ENG' : 'TEL'}` }}
                onClick={() => setActiveVideo(video)}
              />
            ))}
          </div>
        </section>

        {/* === SECTION 4: SUNDAY SERVICES (16 Videos) === */}
        <section className="bg-white border-t border-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h3 className="text-center text-lg font-bold text-gray-400 uppercase tracking-widest mb-10">Sunday & Special Services (Feb 2026 – Mar 2026)</h3>

            <div className="relative group">
              <button onClick={() => scroll(sundayScrollRef, 'left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md border border-gray-100 p-2 rounded-full text-gray-500 hidden md:block hover:text-blue-600">
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div
                ref={sundayScrollRef}
                className="flex overflow-x-auto gap-6 pb-6 px-4 md:px-12 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {SUNDAY_VIDEOS.map((vid, idx) => (
                  <div
                    key={idx}
                    className="snap-center flex-shrink-0 w-[300px] cursor-pointer group/card"
                    onClick={() => setActiveVideo({
                      id: `Event-${idx}`,
                      title: vid.title,
                      date: "Sunday Service", // Generic date label
                      theme: "Special Event",
                      src: vid.src,
                      thumbnail: vid.thumbnail,
                      language: 'english',
                      type: 'video'
                    })}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover transition-transform group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover/card:bg-black/10 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Play className="h-4 w-4 text-gray-900 fill-gray-900 ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 leading-tight group-hover/card:text-blue-600 transition-colors line-clamp-2">{vid.title}</h4>
                  </div>
                ))}
              </div>

              <button onClick={() => scroll(sundayScrollRef, 'right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md border border-gray-100 p-2 rounded-full text-gray-500 hidden md:block hover:text-blue-600">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Modal Player */}
        <DailyGraceModal
          video={activeVideo}
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          onNext={getCurrentDayIndex() > 0 ? handleNext : undefined}
          onPrev={getCurrentDayIndex() < bilingualData.length - 1 ? handlePrev : undefined}
          onLanguageToggle={handleLanguageSwitch}
        />
      </div>
    </ProtectedRoute>
  );
}
