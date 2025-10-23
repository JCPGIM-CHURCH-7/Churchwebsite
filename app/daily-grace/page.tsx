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

const DAILY_MESSAGES_BASE = "/images/Daily messages";

function toTwo(n: number) {
  return n.toString().padStart(2, "0");
}

function buildSequence(prefix: string, start: number, end: number) {
  // Build filenames like: "English Day 1.mp4"... "English Day 54.mp4"
  const items: { title: string; src: string }[] = [];
  for (let day = start; day <= end; day++) {
    const name = `${prefix} Day ${day}.mp4`;
    items.push({ title: `${prefix} Day ${day}`, src: `${DAILY_MESSAGES_BASE}/${name}` });
  }
  return items;
}

interface LocalVideoItem { title: string; src: string; }

function VideoCarousel({ title, items, onPlay }: { title: string; items: LocalVideoItem[]; onPlay: (item: LocalVideoItem) => void }) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      {items.length === 0 ? (
        <p className="text-center text-muted-foreground">No videos available.</p>
      ) : (
        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem key={item.src} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <button type="button" onClick={() => onPlay(item)} className="text-left w-full">
                    <CardContent className="p-0">
                      <div className="relative w-full aspect-video bg-muted">
                        <Image src={"/placeholder.jpg"} alt={item.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="text-white text-sm md:text-base font-medium">{item.title}</span>
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
    </section>
  );
}

export default function DailyGracePage() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<LocalVideoItem | null>(null);

  const englishItems = useMemo(() => buildSequence("English", 1, 54), []);
  const teluguItems = useMemo(() => buildSequence("Telugu", 1, 54), []);

  const weeklyLives = youtubeData?.weeklyLives ?? [];

  function handlePlay(item: LocalVideoItem) {
    setCurrent(item);
    setOpen(true);
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Daily Grace</h1>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-4 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/chosen-band">Chosen Band</Link></li>
              <li><Link href="/prayer-request">Prayer Request</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>

        <VideoCarousel title="Telugu Daily Manna" items={teluguItems} onPlay={handlePlay} />
        <VideoCarousel title="English Daily Manna" items={englishItems} onPlay={handlePlay} />

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Weekly YouTube Live</h2>
          {weeklyLives && weeklyLives.length > 0 ? (
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {weeklyLives.map((live: any, idx: number) => (
                  <CarouselItem key={idx} className="basis-full sm:basis-1/2 lg:basis-1/3">
                    <Card>
                      <a href={live.url} target="_blank" rel="noopener noreferrer">
                        <CardContent className="p-0">
                          <div className="relative w-full aspect-video">
                            <Image src={live.thumbnail || "/placeholder.jpg"} alt={live.title || "YouTube Live"} fill className="object-cover" />
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{current?.title || ""}</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            {current?.src?.toLowerCase().endsWith(".mp4") ? (
              <video src={current.src} controls className="w-full h-auto" preload="metadata" />
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
