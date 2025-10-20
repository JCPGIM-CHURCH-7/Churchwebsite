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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DailyMessagesCarousel = () => {
  // Sort messages by timestamp in descending order (newest first)
  const sortedMessages = [...dailyMessagesData.dailyMessages].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          Daily Messages
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true, // Allows smooth dragging
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2">
            {sortedMessages.map((video, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="relative overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  {index === 0 && (
                    <Badge className="absolute top-3 left-3 z-10 bg-red-600 text-white px-3 py-1">
                      New
                    </Badge>
                  )}
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {video.file.replace('.mp4', '')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <LocalVideoPlayer
                      videoPath={`/videos/daily-messages/${video.file}`} // Adjusted path for correct public directory reference
                      title={video.file.replace('.mp4', '')}
                      className="w-full h-48 rounded-md object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:block -left-12 bg-gray-800 text-white hover:bg-gray-700" />
          <CarouselNext className="hidden md:block -right-12 bg-gray-800 text-white hover:bg-gray-700" />
        </Carousel>
      </div>
    </section>
  );
};

export default DailyMessagesCarousel;