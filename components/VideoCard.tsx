import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface VideoCardProps {
  url: string;
  thumbnail: string;
  title: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ url, thumbnail, title }) => {
  return (
    <div className="p-1">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Card>
          <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
            <Image
              src={thumbnail}
              alt={title}
              width={1920}
              height={1080}
              className="transition-transform transform hover:scale-110"
            />
          </CardContent>
        </Card>
        <p className="text-center mt-2">{title}</p>
      </a>
    </div>
  );
};

export default VideoCard;
