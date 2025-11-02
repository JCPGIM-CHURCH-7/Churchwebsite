// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DAILY_MESSAGES_BASE = "/images/Daily messages";

type VideoItem = { title: string; src: string; isYouTube?: boolean; thumbnail?: string };

async function checkVideoExists(path: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/check-video?path=${encodeURIComponent(path)}`);
    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error(`Error checking video ${path}:`, error);
    return false;
  }
}

async function buildDays(prefix: string, count: number): Promise<VideoItem[]> {
  const days: VideoItem[] = [];
  for (let i = 1; i <= count; i++) {
    const dayPath = i === 1 ? `${DAILY_MESSAGES_BASE}/${prefix} Day1.mp4` : `${DAILY_MESSAGES_BASE}/${prefix} Day ${i}.mp4`;
    const exists = await checkVideoExists(dayPath);
    if (exists) {
      days.push({
        title: `${prefix} Day ${i}`,
        src: dayPath,
      });
    }
  }
  return days;
}

function SectionCarousel({ title, items, onOpen }: { title: string; items: VideoItem[]; onOpen: (item: VideoItem) => void }) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600">Day 1 to Day {items.length}</p>
        </div>
        {items.length === 0 ? (
          <p className="text-center text-gray-600">No videos available at this time.</p>
        ) : (
          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem key={item.src} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                    <button type="button" onClick={() => onOpen(item)} className="w-full text-left">
                      <CardContent className="p-0">
                        <div className="relative w-full aspect-video">
                          <Image src="/placeholder.jpg" alt={item.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm md:text-base">{item.title}</span>
                          </div>
                        </div>
                      </CardContent>
                    </button>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  );
}

export default function DailyGracePage() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<VideoItem | null>(null);
  const [teluguVideos, setTeluguVideos] = useState<VideoItem[]>([]);
  const [englishVideos, setEnglishVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  const startDate = new Date(2025, 8, 10); // September 10, 2025
  const today = new Date();
  const diffTime = today.getTime() - startDate.getTime();
  const numDays = Math.max(Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1, 1);

  const youtubeLives: VideoItem[] = [
    {
      title: "Sunday Service 12-10-2025 | Pastor K. Ravi Kumar",
      src: "https://www.youtube.com/embed/yVhKuyAdi_Q",
      isYouTube: true,
      thumbnail: "https://img.youtube.com/vi/yVhKuyAdi_Q/maxresdefault.jpg",
    },
    {
      title: "Sunday Service (Additional)",
      src: "https://www.youtube.com/embed/gT-Cpnw1AZ0",
      isYouTube: true,
      thumbnail: "https://img.youtube.com/vi/gT-Cpnw1AZ0/maxresdefault.jpg",
    },
    {
      title: "Sunday Service Live | Pastor K. Ravi Kumar",
      src: "https://www.youtube.com/embed/rYce42cNPro",
      isYouTube: true,
      thumbnail: "https://img.youtube.com/vi/rYce42cNPro/maxresdefault.jpg",
    },
  ];

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      const [telugu, english] = await Promise.all([
        buildDays("Telugu", numDays),
        buildDays("English", numDays),
      ]);
      setTeluguVideos(telugu);
      setEnglishVideos(english);
      setLoading(false);
    }
    fetchVideos();
  }, [numDays]);

  function openPlayer(item: VideoItem) {
    setCurrent(item);
    setOpen(true);
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-white py-16 md:py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Daily Grace</h1>
            <p className="text-lg md:text-xl opacity-90">Daily Manna videos in Telugu and English</p>
          </div>
        </section>

        {/* Loading State */}
        {loading ? (
          <div className="py-12 text-center">
            <p className="text-gray-600">Loading videos...</p>
          </div>
        ) : (
          <>
            {/* Telugu Carousel */}
            <SectionCarousel title="Telugu Daily Manna" items={teluguVideos} onOpen={openPlayer} />

            {/* English Carousel */}
            <SectionCarousel title="English Daily Manna" items={englishVideos} onOpen={openPlayer} />

            {/* Weekly YouTube Lives */}
            <section className="py-12 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Weekly YouTube Live</h2>
                  <p className="text-gray-600">Latest live streams</p>
                </div>
                <Carousel className="w-full max-w-7xl mx-auto">
                  <CarouselContent>
                    {youtubeLives.map((item) => (
                      <CarouselItem key={item.src} className="basis-full sm:basis-1/2 lg:basis-1/3">
                        <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                          <a href={item.src.replace("/embed/", "/watch?v=")} target="_blank" rel="noopener noreferrer">
                            <CardContent className="p-0">
                              <div className="relative w-full aspect-video">
                                <Image
                                  src={item.thumbnail || "/placeholder.jpg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm md:text-base">{item.title}</span>
                                </div>
                              </div>
                              <div className="p-3 text-sm text-gray-600">YouTube Live</div>
                            </CardContent>
                          </a>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Be Blessed Daily</h2>
                <p className="text-xl mb-8">Stay connected with the Word every day</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/prayer-request">
                    <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold">
                      Request Prayer
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-yellow-600 font-semibold bg-transparent"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Player Dialog UI */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{current?.title}</DialogTitle>
            </DialogHeader>
            <div className="w-full">
              <div className="relative w-full aspect-video bg-black">
                {current?.isYouTube ? (
                  <iframe
                    src={current.src}
                    title={current.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={current?.src} controls className="w-full h-full" preload="metadata" />
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}