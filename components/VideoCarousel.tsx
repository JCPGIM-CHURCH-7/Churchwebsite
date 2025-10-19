import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import videoData from '@/lib/youtube-links.json';
import Image from 'next/image';

interface Video {
  url: string;
  thumbnail: string;
  title: string;
}

interface VideoCarouselProps {
  videoType: 'generalVideos' | 'dailyMessages';
  title: string;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videoType, title }) => {
  const videos = videoData[videoType] as Video[];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {videos.map((video, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        width={1920}
                        height={1080}
                        className="transition-transform transform hover:scale-110"
                      />
                    </CardContent>
                  </Card>
                </a>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default VideoCarousel;
