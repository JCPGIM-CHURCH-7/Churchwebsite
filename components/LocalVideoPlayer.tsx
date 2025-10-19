import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LocalVideoPlayerProps {
  videoPath: string;
  title: string;
}

const LocalVideoPlayer: React.FC<LocalVideoPlayerProps> = ({ videoPath, title }) => {
  return (
    <div className="p-1">
      <Card>
        <CardContent className="flex flex-col aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
          <video controls className="w-full h-full">
            <source src={videoPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </CardContent>
      </Card>
      <p className="text-center mt-2 font-semibold">{title}</p>
    </div>
  );
};

export default LocalVideoPlayer;
