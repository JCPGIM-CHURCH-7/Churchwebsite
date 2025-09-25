"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Download, Calendar, Clock, User, Search, ArrowLeft, Volume2 } from "lucide-react"
import Link from "next/link"

export default function SermonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeries, setSelectedSeries] = useState("all")
  const [selectedSpeaker, setSelectedSpeaker] = useState("all")

  const sermons = [
    {
      id: 1,
      title: "Walking in Faith",
      speaker: "Pastor John Smith",
      date: "December 24, 2024",
      duration: "35 min",
      series: "Faith Journey",
      description:
        "Exploring what it means to trust God in uncertain times and how faith can guide our daily decisions.",
      audioUrl: "#",
      videoUrl: "#",
      notesUrl: "#",
      scripture: "Hebrews 11:1-6",
    },
    {
      id: 2,
      title: "The Power of Prayer",
      speaker: "Pastor John Smith",
      date: "December 17, 2024",
      duration: "42 min",
      series: "Faith Journey",
      description:
        "Understanding the importance of prayer in our relationship with God and how it transforms our hearts.",
      audioUrl: "#",
      videoUrl: "#",
      notesUrl: "#",
      scripture: "Matthew 6:5-15",
    },
    {
      id: 3,
      title: "Love Your Neighbor",
      speaker: "Sarah Johnson",
      date: "December 10, 2024",
      duration: "38 min",
      series: "Living Like Jesus",
      description: "Practical ways to show Christ's love to those around us and build meaningful relationships.",
      audioUrl: "#",
      videoUrl: "#",
      notesUrl: "#",
      scripture: "Mark 12:28-34",
    },
    {
      id: 4,
      title: "Finding Hope in Difficult Times",
      speaker: "Pastor John Smith",
      date: "December 3, 2024",
      duration: "40 min",
      series: "Hope & Healing",
      description: "How God's promises provide comfort and strength when we face life's challenges.",
      audioUrl: "#",
      videoUrl: "#",
      notesUrl: "#",
      scripture: "Romans 8:28-39",
    },
    {
      id: 5,
      title: "The Joy of Giving",
      speaker: "Mike Davis",
      date: "November 26, 2024",
      duration: "33 min",
      series: "Grateful Hearts",
      description: "Discovering the blessing that comes from generous giving and a thankful heart.",
      audioUrl: "#",
      videoUrl: "#",
      notesUrl: "#",
      scripture: "2 Corinthians 9:6-15",
    },
    {
      id: 6,
      title: "Building Strong Families",
      speaker: "Lisa Brown",
      date: "November 19, 2024",
      duration: "36 min",
      series: "Family Foundations",
      description: "Biblical principles for creating loving, supportive families that honor God.",
      audioUrl: "#",
      videoUrl: "#",
      notesUrl: "#",
      scripture: "Ephesians 5:21-6:4",
    },
  ]

  const series = [
    { value: "all", label: "All Series" },
    { value: "Faith Journey", label: "Faith Journey" },
    { value: "Living Like Jesus", label: "Living Like Jesus" },
    { value: "Hope & Healing", label: "Hope & Healing" },
    { value: "Grateful Hearts", label: "Grateful Hearts" },
    { value: "Family Foundations", label: "Family Foundations" },
  ]

  const speakers = [
    { value: "all", label: "All Speakers" },
    { value: "Pastor John Smith", label: "Pastor John Smith" },
    { value: "Sarah Johnson", label: "Sarah Johnson" },
    { value: "Mike Davis", label: "Mike Davis" },
    { value: "Lisa Brown", label: "Lisa Brown" },
  ]

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.scripture.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeries = selectedSeries === "all" || sermon.series === selectedSeries
    const matchesSpeaker = selectedSpeaker === "all" || sermon.speaker === selectedSpeaker

    return matchesSearch && matchesSeries && matchesSpeaker
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2 text-blue-600">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Volume2 className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Sermons</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Sermons & Messages</h1>
          <p className="text-xl">Listen to inspiring messages that will encourage and strengthen your faith journey.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find a Message</CardTitle>
            <CardDescription>Search through our sermon library or filter by series and speaker</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search sermons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by series" />
                </SelectTrigger>
                <SelectContent>
                  {series.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by speaker" />
                </SelectTrigger>
                <SelectContent>
                  {speakers.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sermon List */}
        <div className="space-y-6">
          {filteredSermons.map((sermon) => (
            <Card key={sermon.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">{sermon.series}</Badge>
                      <span className="text-sm text-gray-500">{sermon.scripture}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{sermon.title}</h3>
                    <p className="text-gray-600 mb-4">{sermon.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{sermon.speaker}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{sermon.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{sermon.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Play className="w-4 h-4 mr-2" />
                      Play Audio
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSermons.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Volume2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sermons found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}

        {/* Podcast Subscription */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Subscribe to Our Podcast</CardTitle>
            <CardDescription className="text-blue-700">
              Never miss a message! Subscribe to our podcast and get new sermons delivered automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">Apple Podcasts</Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Spotify
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Google Podcasts
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                RSS Feed
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
