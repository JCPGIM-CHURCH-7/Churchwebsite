import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import VideoCard from '@/components/VideoCard';
import videoData from '@/lib/youtube-links.json';

const DailyGracePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Daily Grace</h1>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Telugu Videos</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {videoData.teluguVideos.map((video) => (
              <CarouselItem key={video.day} className="md:basis-1/2 lg:basis-1/3">
                <VideoCard {...video} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">English Videos</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {videoData.englishVideos.map((video) => (
              <CarouselItem key={video.day} className="md:basis-1/2 lg:basis-1/3">
                <VideoCard {...video} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default DailyGracePage;
