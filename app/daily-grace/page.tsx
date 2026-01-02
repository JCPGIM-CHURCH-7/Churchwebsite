"use client";

import React, { useState, useEffect, useMemo } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DailyVideoCard } from "@/components/DailyVideoCard";
import { DailyGraceModal } from "@/components/DailyGraceModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // Assuming this exists or using react-day-picker
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Calendar as CalendarIcon, X } from "lucide-react";
import { format, isSameDay, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

// Define Video Type
type VideoItem = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  theme: string;
  src: string;
  type: string;
};

export default function DailyGracePage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // State for Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // State for Modal
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Load Data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/daily_videos_full.json");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error loading daily grace data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // "Today's Grace" Logic
  const todayVideo = useMemo(() => {
    const todayStr = format(new Date(), "yyyy-MM-dd");
    // Find video for today
    const found = videos.find(v => v.date === todayStr);
    // Fallback to the latest video if today's is missing
    return found || videos[0]; // Assumes videos are sorted desc
  }, [videos]);

  // Filter Logic
  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      // 1. Search Filter
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.theme.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Date Filter
      const matchesDate = selectedDate
        ? isSameDay(parseISO(video.date), selectedDate)
        : true;

      // Exclude "Today's Video" from the main grid to avoid duplication (optional, but good for UX)
      // const isToday = todayVideo && video.id === todayVideo.id;
      // return matchesSearch && matchesDate && !isToday;
      return matchesSearch && matchesDate;
    });
  }, [videos, searchQuery, selectedDate]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30">

        {/* === HERO SECTION (Today's Grace) === */}
        {todayVideo && !selectedDate && !searchQuery && (
          <section className="relative h-[60vh] w-full overflow-hidden">
            {/* Background with blur */}
            <div className="absolute inset-0 z-0">
              <video
                src={todayVideo.src}
                className="h-full w-full object-cover opacity-60 blur-sm"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-yellow-500/20 px-4 py-1.5 backdrop-blur-md">
                <span className="text-sm font-semibold text-yellow-500">Today's Grace • {format(parseISO(todayVideo.date), "MMMM d, yyyy")}</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                {todayVideo.title}
              </h1>
              <p className="mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
                Theme: <span className="text-white">{todayVideo.theme}</span>
              </p>
              <Button
                size="lg"
                className="rounded-full bg-white px-8 text-black hover:bg-gray-200"
                onClick={() => setActiveVideo(todayVideo)}
              >
                Watch Now
              </Button>
            </div>
          </section>
        )}

        {/* === MAIN CONTENT === */}
        <section className="container mx-auto px-4 py-12 md:px-6">

          {/* Controls Bar */}
          <div className="sticky top-0 z-30 mb-8 flex flex-col gap-4 rounded-xl bg-gray-900/80 p-4 backdrop-blur-md md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-white">Archive</h2>

            <div className="flex flex-1 flex-col gap-3 md:max-w-md md:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by title or theme..."
                  className="border-gray-700 bg-gray-800 pl-9 text-white placeholder:text-gray-500 focus-visible:ring-yellow-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full md:w-[240px] border-gray-700 bg-gray-800 text-left font-normal text-white hover:bg-gray-700 hover:text-white",
                      !selectedDate && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="text-white"
                  />
                </PopoverContent>
              </Popover>

              {/* Clear Filters */}
              {(searchQuery || selectedDate) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { setSearchQuery(""); setSelectedDate(undefined); }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Video Grid */}
          {loading ? (
            <div className="flex h-40 items-center justify-center text-gray-500">Loading Manna...</div>
          ) : filteredVideos.length === 0 ? (
            <div className="flex h-60 flex-col items-center justify-center text-gray-500">
              <p className="text-lg">No messages found.</p>
              <Button variant="link" className="text-yellow-500" onClick={() => { setSearchQuery(""); setSelectedDate(undefined); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredVideos.map((video) => (
                <DailyVideoCard
                  key={video.id}
                  video={video}
                  onClick={() => setActiveVideo(video)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Modal Player */}
        <DailyGraceModal
          video={activeVideo}
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
        />

      </div>
    </ProtectedRoute>
  );
}
