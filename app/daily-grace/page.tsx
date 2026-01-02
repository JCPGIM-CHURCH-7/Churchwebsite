"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DailyVideoCard } from "@/components/DailyVideoCard";
import { DailyGraceModal } from "@/components/DailyGraceModal";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MannaReelCard } from "@/components/MannaReelCard";
import { MannaHighlight } from "@/components/MannaHighlight";
import { SourceChannelLink } from "@/components/SourceChannelLink";
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
  videoId: string;
  title: string;
  src: string;
  thumbnail: string;
};

type VideoItem = {
  id: string;
  title: string;
  date: string;
  theme: string;
  src: string;
  thumbnail: string;
  language: 'english' | 'telugu';
};

// Official Sources Data
const SOURCE_CHANNELS = [
  { name: "Our Daily Manna", description: "Official Global Devotionals", url: "https://www.youtube.com/c/ourdailymanna", lang: "English", color: "blue" },
  { name: "Manna TV Int'l", description: "Faith & Grace Teachings", url: "https://www.youtube.com/c/mannatvinternational/videos", lang: "English", color: "blue" },
  { name: "Daily Grace Co.", description: "Bible Study Resources", url: "https://thedailygraceco.com/", lang: "English", color: "blue" },
  { name: "Joseph Prince", description: "Grace Revolution", url: "https://www.youtube.com/@JosephPrinceOnline", lang: "English", color: "blue" },
  { name: "Enosh Kumar", description: "Paraloka Manna (Telugu)", url: "https://www.youtube.com/@enoshkumar", lang: "Telugu", color: "amber" },
  { name: "Daily Manna Ch.", description: "Telugu Daily Devotionals", url: "https://www.youtube.com/@Dailymanna-007", lang: "Telugu", color: "amber" },
  { name: "Rajkumar Jeremy", description: "Telugu Christian Messages", url: "https://www.youtube.com/@RajkumarJeremy", lang: "Telugu", color: "amber" },
] as const;


export default function DailyGracePage() {
  const [bilingualData, setBilingualData] = useState<BilingualDay[]>([]);
  const [loading, setLoading] = useState(true);

  // State
  const [language, setLanguage] = useState<'english' | 'telugu' | 'both'>('both');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const reelsScrollRef = useRef<HTMLDivElement>(null);
  const sourcesScrollRef = useRef<HTMLDivElement>(null);

  // Load Data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/daily_manna_bilingual.json");
        if (!res.ok) throw new Error("Failed to fetch bilingual data");
        const data = await res.json();
        // Ensure sorted by DayNumber descending (newest first)
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
    language: lang
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

  // Today's Hero Video (First item in list, preferred lang)
  const todaysVideo = useMemo(() => {
    if (bilingualData.length === 0) return null;
    const latestDay = bilingualData[0]; // Day 124
    const prefLang = language === 'telugu' ? 'telugu' : 'english'; // Default to English if 'both'
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
      day.english.videoId === activeVideo.id ||
      day.telugu.videoId === activeVideo.id ||
      day.english.dayId === activeVideo.id ||
      day.telugu.dayId === activeVideo.id
    );
  };

  const handleNext = () => {
    const idx = getCurrentDayIndex();
    if (idx !== -1 && idx > 0) {
      const nextDay = bilingualData[idx - 1]; // Newer day
      const lang = activeVideo?.language || 'english';
      setActiveVideo(flattenVideo(nextDay, lang));
    }
  };

  const handlePrev = () => {
    const idx = getCurrentDayIndex();
    if (idx !== -1 && idx < bilingualData.length - 1) {
      const prevDay = bilingualData[idx + 1]; // Older day
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

        {/* === SECTION 1: HEADER & REELS HERO === */}
        <section className="relative w-full bg-white pt-6 pb-12 border-b border-gray-100 shadow-sm z-10">
          <div className="container mx-auto px-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Daily Grace</h1>
              <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-semibold">124 Days of Glory</p>
            </div>
            <LanguageToggle value={language} onChange={setLanguage} />
          </div>

          {/* Reels Carousel */}
          <div className="relative group container mx-auto px-0 md:px-4">
            <button onClick={() => scroll(reelsScrollRef, 'left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-lg border border-gray-100 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:block hover:bg-white hover:text-blue-600">
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

            <button onClick={() => scroll(reelsScrollRef, 'right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-lg border border-gray-100 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block hover:bg-white hover:text-blue-600">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* === SECTION 2: TODAY'S HIGHLIGHT === */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gray-200"></div>
            <h2 className="text-gray-400 font-medium text-sm uppercase tracking-widest">Latest Message</h2>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {todaysVideo && (
            <MannaHighlight video={todaysVideo} onClick={() => setActiveVideo(todaysVideo)} />
          )}
        </section>

        {/* === SECTION 3: ARCHIVE GRID === */}
        <section className="container mx-auto px-4 pb-16">
          <div className="sticky top-4 z-30 mb-8 flex flex-col gap-4 rounded-2xl bg-white/90 p-4 shadow-xl shadow-gray-200/50 backdrop-blur-xl border border-white/50 md:flex-row md:items-center md:justify-between ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <CalendarIcon className="w-5 h-5 block" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Archive</h2>
            </div>

            <div className="flex flex-1 flex-col gap-3 md:max-w-xl md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search titles or themes..."
                  className="border-gray-200 bg-gray-50 pl-10 h-10 rounded-xl focus:bg-white transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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

          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 w-4 bg-amber-400 rounded-full mb-2"></div>
                <div className="text-gray-400 text-sm">Loading Grace...</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {archiveVideos.map((video) => (
                <DailyVideoCard
                  key={video.id + video.language}
                  video={{ ...video, theme: `${video.theme} • ${video.language === 'english' ? 'ENG' : 'TEL'}` }}
                  onClick={() => setActiveVideo(video)}
                />
              ))}
            </div>
          )}
        </section>

        {/* === SECTION 4: SOURCES FOOTER === */}
        <section className="bg-white border-t border-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h3 className="text-center text-lg font-bold text-gray-400 uppercase tracking-widest mb-10">Official Sources & Channels</h3>

            <div className="relative group">
              {/* Footer Left Arrow */}
              <button onClick={() => scroll(sourcesScrollRef, 'left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md border border-gray-100 p-2 rounded-full text-gray-500 hover:text-blue-600 hidden md:block hover:scale-110 transition-transform">
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div
                ref={sourcesScrollRef}
                className="flex overflow-x-auto gap-6 pb-6 px-12 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {SOURCE_CHANNELS.map((channel, idx) => (
                  <div key={idx} className="snap-center">
                    <SourceChannelLink channel={channel} />
                  </div>
                ))}
              </div>

              {/* Footer Right Arrow */}
              <button onClick={() => scroll(sourcesScrollRef, 'right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md border border-gray-100 p-2 rounded-full text-gray-500 hover:text-blue-600 hidden md:block hover:scale-110 transition-transform">
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
