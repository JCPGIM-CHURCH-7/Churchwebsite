import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import LocalVideoPlayer from '@/components/LocalVideoPlayer';
import dailyMessagesData from '@/lib/daily-messages.json';
import { Badge } from '@/components/ui/badge';

const DailyMessagesCarousel = () => {
  const sortedMessages = [...dailyMessagesData.dailyMessages].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Daily Messages</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {sortedMessages.map((video, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 relative">
                {index === 0 && (
                  <Badge className="absolute top-2 left-2 z-10 bg-red-600 text-white">
                    New
                  </Badge>
                )}
                <LocalVideoPlayer
                  videoPath={`/images/dailymessages/${video.file}`}
                  title={video.file.replace('.mp4', '')}
                />
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

export default DailyMessagesCarousel;
