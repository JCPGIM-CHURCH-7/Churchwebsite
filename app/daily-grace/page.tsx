"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import youtubeData from "@/lib/youtube-links.json";

// Helper to derive display title from filename
function prettyTitleFromFilename(filename: string) {
  const base = filename.replace(/\.mp4$/i, "");
  return base.replace(/[-_]+/g, " ");
}

// Known local paths (public/ is web root). The provided repo shows many English files.
// We'll create two sections by filename pattern. Telugu assumed to have files starting with "Telugu" or similar.
const DAILY_MESSAGES_BASE = "/images/Daily messages";

// List of known English files in repo (from project tree). If more exist, add here or later source dynamically.
const ENGLISH_FILES = [
  "English  Day 3.mp4",
  "English Day 10.mp4",
  "English Day 11.mp4",
  "English Day 12.mp4",
  "English Day 13.mp4",
  "English Day 14.mp4",
  "English Day 15.mp4",
  "English Day 16.mp4",
  "English Day 17.mp4",
  "English Day 18.mp4",
  "English Day 19.mp4",
  "English Day 2.mp4",
  "English Day 20.mp4",
  "English Day 21.mp4",
  "English Day 22.mp4",
  "English Day 23.mp4",
  "English Day 24.mp4",
  "English Day 25.mp4",
  "English Day 26.mp4",
  "English Day 27.mp4",
  "English Day 28.mp4",
  "English Day 29.mp4",
  "English Day 30.mp4",
  "English Day 31.mp4",
  "English Day 32.mp4",
  "English Day 33.mp4",
  "English Day 34.mp4",
  "English Day 35.mp4",
  "English Day 36.mp4",
  "English Day 37.mp4",
  "English Day 38.mp4",
  "English Day 39.mp4",
  "English Day 4.mp4",
  "English Day 40.mp4",
  "English Day 41.mp4",
  "English Day 42.mp4",
];

// Placeholder for Telugu if available later; keep empty array to render empty state gracefully
const TELUGU_FILES: string[] = [];

interface LocalVideoItem {
  title: string;
  src: string; // public URL path
  thumbnail?: string; // optional poster image
}

function buildLocalItems(files: string[]): LocalVideoItem[] {
  return files.map((name) => ({
    title: prettyTitleFromFilename(name),
    src: `${DAILY_MESSAGES_BASE}/${name}`,
  }));
}

function VideoGrid({ items, onPlay }: { items: LocalVideoItem[]; onPlay: (item: LocalVideoItem) => void }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-center text-muted-foreground">No videos available.</p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.src} className="overflow-hidden">
          <button
            type="button"
            onClick={() => onPlay(item)}
            className="text-left"
          >
            <CardContent className="p-0">
              <div className="relative w-full aspect-video bg-muted">
                {/* Use poster image if available; else generic overlay */}
                <Image
                  src={item.thumbnail || "/placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white text-sm md:text-base font-medium">{item.title}</span>
                </div>
              </div>
            </CardContent>
          </button>
        </Card>
      ))}
    </div>
  );
}

export default function DailyGracePage() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<LocalVideoItem | null>(null);

  const englishItems = useMemo(() => buildLocalItems(ENGLISH_FILES), []);
  const teluguItems = useMemo(() => buildLocalItems(TELUGU_FILES), []);

  const weeklyLives = youtubeData?.weeklyLives ?? [];

  function handlePlay(item: LocalVideoItem) {
    setCurrent(item);
    setOpen(true);
    try {
      localStorage.setItem("daily-grace:last", JSON.stringify(item));
    } catch {}
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Daily Grace</h1>
          <nav className="hidden md:block">
            {/* Align navigation with other pages via Next Link */}
            <ul className="flex items-center gap-4 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/sermons">Sermons</Link></li>
              <li><Link href="/praises">Praises</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>

        {/* Telugu Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">Telugu Daily Manna</h2>
          <VideoGrid items={teluguItems} onPlay={handlePlay} />
        </section>

        {/* English Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">English Daily Manna</h2>
          <VideoGrid items={englishItems} onPlay={handlePlay} />
        </section>

        {/* Weekly YouTube Live Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Weekly YouTube Live</h2>
          {weeklyLives && weeklyLives.length > 0 ? (
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {weeklyLives.map((live: any, idx: number) => (
                  <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                    <Card>
                      <a href={live.url} target="_blank" rel="noopener noreferrer">
                        <CardContent className="p-0">
                          <div className="relative w-full aspect-video">
                            <Image
                              src={live.thumbnail || "/placeholder.jpg"}
                              alt={live.title || "YouTube Live"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3 text-sm">{live.title || "YouTube Live"}</div>
                        </CardContent>
                      </a>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <p className="text-center text-muted-foreground">No live sessions available.</p>
          )}
        </section>
      </div>

      {/* Player Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{current?.title || ""}</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            {current?.src?.toLowerCase().endsWith(".mp4") ? (
              <video
                src={current.src}
                controls
                className="w-full h-auto"
                preload="metadata"
              />
            ) : (
              <div className="relative w-full aspect-video">
                <iframe
                  src={current?.src || ""}
                  title={current?.title || "Video"}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
