import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Play } from "lucide-react";
import Link from "next/link";
import VideoCarousel from '@/components/VideoCarousel';
import DailyMessagesCarousel from '@/components/DailyMessagesCarousel';

const ServicesVideosPage = () => {
  // Sample data for weekly services (replace with actual YouTube playlist or video IDs)
  const weeklyServices = [
    {
      title: "Sunday Worship Service",
      description: "Join our weekly Sunday worship service, filled with praise and powerful sermons.",
      youtubeId: "yVhKuyAdi_Q",
      thumbnail: "/images/sunday-service.jpg",
    },
    {
      title: "Midweek Prayer Meeting",
      description: "Experience the power of prayer in our Wednesday evening gatherings.",
      youtubeId: "exampleVideoId2",
      thumbnail: "/images/prayer-meeting.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Weekly Services & Daily Messages</h1>
      
      {/* Weekly Services Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Weekly Service Videos</h2>
          <p className="text-lg text-gray-600">Watch our weekly services, including Sunday worship and midweek prayers.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {weeklyServices.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48">
                  <img
                    src={service.thumbnail || "/placeholder.svg"}
                    alt={service.title}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-80" />
                  </div>
                </div>
                <CardTitle className="text-lg mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${service.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-yellow-600 hover:bg-yellow-700">
                    Watch Now
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Daily Messages in English */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Daily Messages - English</h2>
          <p className="text-lg text-gray-600">Inspirational daily messages in English to uplift your spirit.</p>
        </div>
        <VideoCarousel videoType="dailyMessagesEnglish" title="Daily Messages in English" />
      </section>

      {/* Daily Messages in Telugu */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Daily Messages - Telugu</h2>
          <p className="text-lg text-gray-600">Daily messages in Telugu to strengthen your faith.</p>
        </div>
        <VideoCarousel videoType="dailyMessagesTelugu" title="Daily Messages in Telugu" />
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 py-12 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Connected</h2>
        <p className="text-lg text-gray-600 mb-6">Subscribe to our YouTube channel for the latest services and daily messages!</p>
        <a
          href="https://youtube.com/@jcpgimofficial27"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-yellow-600 hover:bg-yellow-700">
            Subscribe on YouTube
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </a>
      </section>
    </div>
  );
};

export default ServicesVideosPage;