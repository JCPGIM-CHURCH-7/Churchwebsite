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
import Footer from '@/components/Footer';

const DailyGracePage = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-12 text-center">Daily Grace</h1>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-center">Telugu Daily Manna</h2>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full max-w-xl mx-auto"
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
          <div className="flex-1 mt-12 md:mt-0">
            <h2 className="text-3xl font-bold mb-6 text-center">English Daily Manna</h2>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full max-w-xl mx-auto"
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
      </div>
      <Footer />
    </>
  );
};

export default DailyGracePage;
