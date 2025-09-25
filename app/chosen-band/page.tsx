"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Users, Calendar, Play, Heart, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

export default function ChosenBandPage() {
  const bandMembers = [
    {
      name: "Lead Vocalist",
      role: "Worship Leader",
      description: "Leading the congregation into the presence of God through powerful worship",
      image: "/images/worship.jpg",
    },
    {
      name: "Instrumentalists",
      role: "Musicians",
      description: "Creating beautiful melodies that lift hearts to heaven",
      image: "/images/jcpgim-boys.jpg",
    },
    {
      name: "Backup Vocals",
      role: "Harmony Team",
      description: "Supporting the worship with angelic harmonies",
      image: "/images/jcpgim-girls.jpg",
    },
  ]

  const upcomingPerformances = [
    {
      event: "Sunday Worship Service",
      date: "Every Sunday",
      time: "10:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      type: "Regular Service",
    },
    {
      event: "Daily Online Worship",
      date: "Every Day",
      time: "5:00 AM - 6:00 AM",
      location: "Google Meet: pbpqvtmare",
      type: "Online Service",
    },
    {
      event: "Special Worship Night",
      date: "First Friday of Month",
      time: "7:00 PM - 9:00 PM",
      location: "Main Sanctuary",
      type: "Special Event",
    },
    {
      event: "Youth Worship",
      date: "Every Friday",
      time: "6:00 PM - 8:00 PM",
      location: "Youth Hall",
      type: "Youth Service",
    },
  ]

  const songCategories = [
    {
      title: "Worship Songs",
      count: 50,
      description: "Heart-touching worship songs that bring you into God's presence",
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Praise Songs",
      count: 40,
      description: "Uplifting praise songs that celebrate God's goodness",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Prayer Songs",
      count: 30,
      description: "Intimate prayer songs for personal communion with God",
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Victory Songs",
      count: 25,
      description: "Powerful victory songs declaring God's triumph",
      color: "bg-green-100 text-green-800",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-yellow-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">The Chosen Band</h1>
          <p className="text-xl mb-8">
            Anointed musicians and worship leaders chosen by God to lead His people into His presence
          </p>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Music className="w-8 h-8 text-yellow-200" />
            <Heart className="w-10 h-10 text-yellow-200" />
            <Music className="w-8 h-8 text-yellow-200" />
          </div>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
            <Play className="w-5 h-5 mr-2" />
            Listen to Our Worship
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About The Band */}
        <section className="mb-16">
          <Card className="border-2 border-yellow-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-yellow-600 mb-4">About The Chosen Band</CardTitle>
              <CardDescription className="text-lg">
                A Spirit-filled worship team dedicated to leading God's people into His presence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-lg mx-auto text-gray-600">
                <p className="text-center">
                  The Chosen Band is the anointed worship team of Jesus Christ Power of Glory International Ministries.
                  Our musicians and vocalists are not just performers, but true worshippers who have been called and
                  chosen by God to minister through music and song.
                </p>
                <p className="text-center">
                  Under the spiritual guidance of Pastor K. Ravi Kumar and Prophetess Madhuri Abiel Glory, our worship
                  team creates an atmosphere where the Holy Spirit can move freely, bringing healing, deliverance, and
                  transformation to all who participate in worship.
                </p>
                <p className="text-center">
                  Every song we sing and every note we play is offered as a sacrifice of praise to our Almighty God,
                  believing that through worship, impossible situations become possible.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Band Members */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Worship Team</h2>
            <p className="text-lg text-gray-600">Meet the anointed musicians who lead us in worship</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {bandMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Music className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge className="bg-yellow-600 text-white">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Performances */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Worship Schedule</h2>
            <p className="text-lg text-gray-600">Join us for these upcoming worship experiences</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingPerformances.map((performance, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{performance.event}</CardTitle>
                    <Badge
                      variant={
                        performance.type === "Online Service"
                          ? "default"
                          : performance.type === "Special Event"
                            ? "secondary"
                            : performance.type === "Youth Service"
                              ? "outline"
                              : "destructive"
                      }
                      className={
                        performance.type === "Online Service"
                          ? "bg-red-600"
                          : performance.type === "Special Event"
                            ? "bg-purple-600"
                            : performance.type === "Youth Service"
                              ? "border-blue-600 text-blue-600"
                              : "bg-yellow-600"
                      }
                    >
                      {performance.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {performance.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Music className="w-4 h-4 mr-2" />
                      {performance.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {performance.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Song Categories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Music Ministry</h2>
            <p className="text-lg text-gray-600">Explore our collection of anointed worship songs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {songCategories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <Badge className={category.color}>{category.count} Songs</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Ministry Impact */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-purple-50 to-yellow-50 border-purple-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-purple-800 mb-4">Our Worship Ministry Impact</CardTitle>
              <CardDescription className="text-lg text-purple-700">
                See how God is using our worship to transform lives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-600 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-800 mb-2">Healing</h3>
                  <p className="text-purple-700">Many have received physical and emotional healing during worship</p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-600 flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-800 mb-2">Breakthrough</h3>
                  <p className="text-yellow-700">Impossible situations become possible through worship</p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-600 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-800 mb-2">Unity</h3>
                  <p className="text-orange-700">Bringing believers together in one accord through worship</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-0">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Worship Experience</h2>
              <p className="text-xl mb-8 opacity-90">
                Experience the power of anointed worship and see impossible become possible
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold">
                  <Play className="w-5 h-5 mr-2" />
                  Join Online Worship
                </Button>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-yellow-600 font-semibold bg-transparent"
                  >
                    Visit Our Church
                  </Button>
                </Link>
                <Link href="/prayer-request">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-yellow-600 font-semibold bg-transparent"
                  >
                    Request Prayer
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
