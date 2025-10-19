import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Play } from "lucide-react";
import Link from "next/link";

const ServicesVideosPage = ({ weeklyServices = [], englishMessages = [], teluguMessages = [] }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Weekly Services & Daily Messages</h1>
      
      {/* Weekly Services Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Weekly Service Videos</h2>
          <p className="text-lg text-gray-600">Watch our weekly services, including Sunday worship and midweek prayers.</p>
        </div>
        {Array.isArray(weeklyServices) && weeklyServices.length > 0 ? (
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
        ) : (
          <p className="text-center text-gray-600">No weekly service videos available at the moment.</p>
        )}
      </section>

      {/* Daily Messages in English */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Daily Messages - English</h2>
          <p className="text-lg text-gray-600">Inspirational daily messages in English to uplift your spirit.</p>
        </div>
        {Array.isArray(englishMessages) && englishMessages.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishMessages.map((video, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="relative h-48">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-80" />
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-4">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{video.description}</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
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
        ) : (
          <p className="text-center text-gray-600">No English daily messages available at the moment.</p>
        )}
      </section>

      {/* Daily Messages in Telugu */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Daily Messages - Telugu</h2>
          <p className="text-lg text-gray-600">Daily messages in Telugu to strengthen your faith.</p>
        </div>
        {Array.isArray(teluguMessages) && teluguMessages.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teluguMessages.map((video, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="relative h-48">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-80" />
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-4">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{video.description}</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
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
        ) : (
          <p className="text-center text-gray-600">No Telugu daily messages available at the moment.</p>
        )}
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

// Static data for weekly services (replace with actual API call in production)
export async function getStaticProps() {
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

  // Mock data for English and Telugu daily messages (replace with YouTube API calls)
  const englishMessages = [
    {
      title: "Daily Message - English",
      description: "An uplifting message to start your day with faith.",
      youtubeId: "exampleEnglishVideoId1",
      thumbnail: "/images/english-message.jpg",
    },
  ];

  const teluguMessages = [
    {
      title: "Daily Message - Telugu",
      description: "A powerful message in Telugu to strengthen your faith.",
      youtubeId: "exampleTeluguVideoId1",
      thumbnail: "/images/telugu-message.jpg",
    },
  ];

  // In production, replace with actual YouTube API calls
  /*
  const fetchYouTubeVideos = async (playlistId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${process.env.YOUTUBE_API_KEY}`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.items.map(item => ({
        title: item.snippet.title,
        description: item.snippet.description,
        youtubeId: item.snippet.resourceId.videoId,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      return [];
    }
  };

  const englishMessages = await fetchYouTubeVideos("ENGLISH_PLAYLIST_ID");
  const teluguMessages = await fetchYouTubeVideos("TELUGU_PLAYLIST_ID");
  */

  return {
    props: {
      weeklyServices,
      englishMessages,
      teluguMessages,
    },
    revalidate: 86400, // Revalidate every 24 hours
  };
}

export default ServicesVideosPage;