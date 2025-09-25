"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Filter, Heart, BookOpen, Music, Baby, UserCheck, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

export default function EventsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const events = [
    {
      id: 1,
      title: "Daily Online Service",
      description:
        "Join us every morning for prayers, Bible reading, and worship with Pastor K. Ravi Kumar and Prophetess Madhuri Abiel Glory. Experience the power of corporate prayer and receive divine guidance for your day.",
      date: "Every Day",
      time: "5:00 AM - 6:00 AM",
      location: "Google Meet: pbpqvtmare",
      type: "online",
      category: "Regular Service",
      image: "/images/front-page.jpg",
      featured: true,
      details: {
        activities: ["Opening Prayer", "Bible Reading", "Prophetic Word", "Intercession", "Closing Blessing"],
        benefits: ["Start your day with God", "Receive daily guidance", "Join global prayer community"],
        requirements: "Internet connection and Google Meet access",
      },
    },
    {
      id: 2,
      title: "Youth Boys Worship",
      description:
        "Young men gathering for powerful worship, fellowship, and spiritual growth. Building godly character, leadership skills, and strong friendships in Christ through worship and praise.",
      date: "Every Friday",
      time: "6:00 PM - 8:00 PM",
      location: "Youth Hall",
      type: "youth-boys",
      category: "Youth Boys Ministry",
      image: "/images/jcpgim-youth-boys.jpg",
      featured: true,
      details: {
        activities: ["Worship & Praise", "Bible Study", "Testimonies", "Games & Fellowship", "Prayer Circle"],
        benefits: ["Build godly friendships", "Develop leadership skills", "Grow in faith"],
        requirements: "Ages 13-25, bring your Bible",
      },
    },
    {
      id: 3,
      title: "Youth Girls Worship",
      description:
        "Young women coming together for worship, prayer, and spiritual empowerment. A time of praise, fellowship, and building strong foundations in faith.",
      date: "Every Saturday",
      time: "4:00 PM - 6:00 PM",
      location: "Prayer Hall",
      type: "youth-girls",
      category: "Youth Girls Ministry",
      image: "/images/jcpgim-women.jpg",
      featured: true,
      details: {
        activities: ["Worship", "Prayer", "Bible Study", "Testimonies", "Fellowship"],
        benefits: ["Spiritual empowerment", "Sisterhood in Christ", "Faith building"],
        requirements: "Ages 13-25, bring your prayer requests",
      },
    },
    {
      id: 4,
      title: "Women's Worship Service",
      description:
        "Mature women of God gathering for worship, prayer, and spiritual encouragement. A powerful time of intercession, worship, and sharing God's love and wisdom.",
      date: "Every Wednesday",
      time: "10:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      type: "women",
      category: "Women's Ministry",
      image: "/images/jcpgim-women-worship.jpg",
      featured: true,
      details: {
        activities: ["Worship", "Intercession", "Bible Study", "Testimonies", "Fellowship"],
        benefits: ["Spiritual empowerment", "Prayer support", "Sisterhood in Christ"],
        requirements: "All women welcome, bring your prayer requests",
      },
    },
    {
      id: 5,
      title: "Men's Worship Fellowship",
      description:
        "Men of God gathering for worship, fellowship, Bible study, and mutual encouragement. Building strong Christian men who lead their families and communities with integrity.",
      date: "Every Saturday",
      time: "7:00 AM - 9:00 AM",
      location: "Main Hall",
      type: "men",
      category: "Men's Ministry",
      image: "/images/jcpgim-mens.jpg",
      featured: false,
      details: {
        activities: ["Worship", "Prayer", "Bible Study", "Testimonies", "Breakfast Fellowship"],
        benefits: ["Brotherhood in Christ", "Spiritual accountability", "Leadership development"],
        requirements: "All men welcome, light breakfast provided",
      },
    },
    {
      id: 6,
      title: "Children's Worship & Fun",
      description:
        "Fun-filled worship program for children featuring Bible stories, worship songs, games, and activities. Teaching young hearts about God's love in an engaging way.",
      date: "Every Sunday",
      time: "10:00 AM - 11:30 AM",
      location: "Children's Hall",
      type: "children",
      category: "Children's Ministry",
      image: "/images/jcpgim-kids.jpg",
      featured: true,
      details: {
        activities: ["Worship Songs", "Bible Stories", "Crafts", "Games", "Prayer Time", "Snacks"],
        benefits: ["Learn about Jesus", "Make Christian friends", "Develop faith foundation"],
        requirements: "Ages 3-12, parents welcome to stay",
      },
    },
    {
      id: 7,
      title: "The Chosen Band Worship Night",
      description:
        "Extended time of worship and praise with our anointed worship team. Experience the presence of God through powerful worship, spiritual songs, and divine encounters.",
      date: "First Friday of Month",
      time: "7:00 PM - 10:00 PM",
      location: "Main Sanctuary",
      type: "chosen-band",
      category: "Special Worship Event",
      image: "/images/worship.jpg",
      featured: true,
      details: {
        activities: ["Extended Worship", "Prophetic Songs", "Dance Ministry", "Testimonies", "Prayer"],
        benefits: ["Deep worship experience", "Encounter God's presence", "Spiritual refreshing"],
        requirements: "Come ready to worship and praise",
      },
    },
    {
      id: 8,
      title: "Community Outreach",
      description:
        "Reaching out to the community with God's love and practical help. Food distribution, medical camps, and evangelism in local neighborhoods.",
      date: "First Saturday of Month",
      time: "9:00 AM - 2:00 PM",
      location: "Various Locations",
      type: "outreach",
      category: "Community Service",
      image: "/images/araku.jpg",
      featured: false,
      details: {
        activities: ["Food Distribution", "Medical Camp", "Evangelism", "Prayer for the Sick", "Community Service"],
        benefits: ["Serve the community", "Share God's love", "Make a difference"],
        requirements: "Heart to serve, comfortable clothing",
      },
    },
    {
      id: 9,
      title: "Healing & Deliverance Service",
      description:
        "Special service for divine healing and spiritual deliverance. Experience God's miraculous power through prayer, laying on of hands, and prophetic ministry.",
      date: "Last Sunday of Month",
      time: "3:00 PM - 6:00 PM",
      location: "Main Sanctuary",
      type: "special",
      category: "Special Service",
      image: "/images/pastor-anna.jpg",
      featured: false,
      details: {
        activities: ["Worship", "Teaching on Healing", "Prayer for the Sick", "Deliverance Ministry", "Testimonies"],
        benefits: ["Receive healing", "Experience deliverance", "Witness miracles"],
        requirements: "Come with faith and expectation",
      },
    },
    {
      id: 10,
      title: "Bible Study",
      description:
        "Deep dive into God's Word with Pastor K. Ravi Kumar. Systematic study of Scripture with practical application for daily Christian living.",
      date: "Every Tuesday",
      time: "7:00 PM - 8:30 PM",
      location: "Main Hall",
      type: "study",
      category: "Bible Study",
      image: "/images/pastor-prophetess.jpg",
      featured: false,
      details: {
        activities: ["Scripture Reading", "Verse-by-verse Teaching", "Q&A Session", "Prayer", "Fellowship"],
        benefits: ["Grow in biblical knowledge", "Understand God's will", "Apply Scripture to life"],
        requirements: "Bring your Bible and notebook",
      },
    },
  ]

  const filters = [
    { value: "all", label: "All Events", count: events.length },
    { value: "online", label: "Online Services", count: events.filter((e) => e.type === "online").length },
    { value: "youth-boys", label: "Youth Boys", count: events.filter((e) => e.type === "youth-boys").length },
    { value: "youth-girls", label: "Youth Girls", count: events.filter((e) => e.type === "youth-girls").length },
    { value: "women", label: "Women's Worship", count: events.filter((e) => e.type === "women").length },
    { value: "men", label: "Men's Worship", count: events.filter((e) => e.type === "men").length },
    { value: "children", label: "Children", count: events.filter((e) => e.type === "children").length },
    { value: "chosen-band", label: "Chosen Band", count: events.filter((e) => e.type === "chosen-band").length },
    { value: "special", label: "Special Events", count: events.filter((e) => e.type === "special").length },
    { value: "outreach", label: "Outreach", count: events.filter((e) => e.type === "outreach").length },
  ]

  const filteredEvents = selectedFilter === "all" ? events : events.filter((event) => event.type === selectedFilter)
  const featuredEvents = events.filter((event) => event.featured)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "online":
        return "bg-red-600"
      case "youth-boys":
        return "bg-blue-600"
      case "youth-girls":
        return "bg-pink-600"
      case "women":
        return "bg-purple-600"
      case "men":
        return "bg-green-600"
      case "children":
        return "bg-orange-600"
      case "chosen-band":
        return "bg-yellow-600"
      case "special":
        return "bg-indigo-600"
      case "outreach":
        return "bg-teal-600"
      case "study":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "online":
        return <Calendar className="w-4 h-4" />
      case "youth-boys":
        return <Users className="w-4 h-4" />
      case "youth-girls":
        return <User className="w-4 h-4" />
      case "women":
        return <Heart className="w-4 h-4" />
      case "men":
        return <UserCheck className="w-4 h-4" />
      case "children":
        return <Baby className="w-4 h-4" />
      case "chosen-band":
        return <Music className="w-4 h-4" />
      case "special":
        return <Heart className="w-4 h-4" />
      case "outreach":
        return <Users className="w-4 h-4" />
      case "study":
        return <BookOpen className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Church Events</h1>
          <p className="text-xl mb-8">
            Join us for life-changing events where impossible becomes possible through Christ
          </p>
          <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold">
            View All Events
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Events */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Events</h2>
            <p className="text-lg text-gray-600">Don't miss these special upcoming events</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className={`object-cover ${event.type === "women" ? "-rotate-90" : ""}`}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getTypeColor(event.type)} text-white flex items-center gap-1`}>
                      {getTypeIcon(event.type)}
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge variant="outline">{event.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Event Filters */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-6 h-6 text-yellow-600" />
                <span>Filter Events</span>
              </CardTitle>
              <CardDescription>Find events that interest you most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {filters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={selectedFilter === filter.value ? "default" : "outline"}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`text-sm ${
                      selectedFilter === filter.value
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{filter.label}</span>
                    <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-800">
                      {filter.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* All Events with Detailed Information */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedFilter === "all" ? "All Events" : filters.find((f) => f.value === selectedFilter)?.label}
            </h2>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {filteredEvents.length} events
            </Badge>
          </div>

          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative h-48 md:h-full">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className={`object-cover rounded-l-lg ${event.type === "women" ? "-rotate-90" : ""}`}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`${getTypeColor(event.type)} text-white flex items-center gap-1`}>
                        {getTypeIcon(event.type)}
                        {event.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="md:col-span-2 p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl text-yellow-600">{event.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="p-0">
                      <p className="text-gray-600 mb-4">{event.description}</p>

                      {/* Event Details */}
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Event Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">What to Expect</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {event.details.activities.slice(0, 3).map((activity, idx) => (
                              <li key={idx} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-2 flex-shrink-0"></span>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
                        <div className="flex flex-wrap gap-2">
                          {event.details.benefits.map((benefit, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-yellow-100 text-yellow-800">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                        <p className="text-sm text-gray-600">{event.details.requirements}</p>
                      </div>

                      <div className="flex gap-3">
                        <Button className="bg-yellow-600 hover:bg-yellow-700">Join Event</Button>
                        <Button variant="outline">More Details</Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Event Calendar CTA */}
        <section>
          <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-0">
            <CardContent className="pt-12 pb-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-6 text-yellow-200" />
              <h2 className="text-3xl font-bold mb-4">Never Miss an Event</h2>
              <p className="text-xl mb-8 opacity-90">
                Stay connected with all our church activities and special events
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold">
                  <Users className="w-5 h-5 mr-2" />
                  Join Our WhatsApp Group
                </Button>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-yellow-600 font-semibold bg-transparent"
                  >
                    Contact for More Info
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
