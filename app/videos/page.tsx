import React from 'react';
import VideoCarousel from '@/components/VideoCarousel';
import DailyMessagesCarousel from '@/components/DailyMessagesCarousel';

const VideosPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Videos</h1>
      <VideoCarousel videoType="generalVideos" title="YouTube Videos" />
      <DailyMessagesCarousel />
    </div>
  );
};

export default VideosPage;
