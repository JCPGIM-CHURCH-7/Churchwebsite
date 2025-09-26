"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Users,
  Phone,
  Mail,
  ChevronRight,
  Play,
  Baby,
  UserCheck,
  User,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const upcomingEvents = [
    {
      title: "Daily Online Service",
      date: "Every Day",
      time: "5:00 AM - 6:00 AM",
      location: "Google Meet: pbpqvtmare",
      type: "Online",
    },
    {
      title: "Sunday Worship Service",
      date: "Every Sunday",
      time: "10:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      type: "Worship",
    },
    {
      title: "Youth Fellowship",
      date: "Every Friday",
      time: "6:00 PM - 8:00 PM",
      location: "Youth Hall",
      type: "Youth",
    },
    {
      title: "Prayer Meeting",
      date: "Every Wednesday",
      time: "7:00 PM - 9:00 PM",
      location: "Prayer Hall",
      type: "Prayer",
    },
  ]

  const ministries = [
    {
      title: "Youth Boys Ministry",
      description: "Empowering young men to serve God with passion and purpose",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      image: "/images/jcpgim-youth-boys.jpg",
      ageGroup: "Ages 13-25",
    },
    {
      title: "Youth Girls Ministry",
      description: "Building strong young women of faith and spiritual leadership",
      icon: <User className="w-8 h-8 text-pink-600" />,
      image: "/images/jcpgim-women.jpg",
      ageGroup: "Ages 13-25",
    },
    {
      title: "Women's Ministry",
      description: "Mature women of God leading with wisdom and grace",
      icon: <Heart className="w-8 h-8 text-purple-600" />,
      image: "/images/jcpgim-women-worship.jpg",
      ageGroup: "Women",
    },
    {
      title: "Men's Ministry",
      description: "Raising godly men who lead with integrity and strength",
      icon: <UserCheck className="w-8 h-8 text-green-600" />,
      image: "/images/jcpgim-mens.jpg",
      ageGroup: "Men",
    },
    {
      title: "Children's Ministry",
      description: "Nurturing young hearts in faith, love, and worship",
      icon: <Baby className="w-8 h-8 text-orange-600" />,
      image: "/images/jcpgim-kids.jpg",
      ageGroup: "Ages 3-12",
    },
  ]

  const socialLinks = [
    { name: "Facebook", url: "https://www.facebook.com/share/1AMrgQCnq3/", icon: "facebook" },
    { name: "Twitter", url: "https://x.com/jcpgimchurch?t=xjBU4cdUkHy46K3KXtmt6A&s=09", icon: "twitter" },
    { name: "Instagram", url: "https://www.instagram.com/jcpgim_church?igsh=MWYxc21tdHhoZmRweQ==", icon: "instagram" },
    { name: "YouTube", url: "https://youtube.com/@jcpgimofficial27?si=x6Tn1ve85xXeGGZH", icon: "youtube" },
    { name: "WhatsApp", url: "https://whatsapp.com/channel/0029VaJ4FCT3AzNJ64QPYe2S", icon: "whatsapp" },
    { name: "Threads", url: "https://www.threads.net/@jcpgim_church", icon: "threads" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Welcome to JCPGIM</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Where Impossible becomes Possible through the Power of Jesus Christ
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold">
                  Join Online Service
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-yellow-600 font-semibold bg-transparent"
                >
                  Plan Your Visit
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/front-page.jpg"
                alt="Daily Online Service"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Online Service Banner */}
      <section className="bg-red-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Daily Online Service</h3>
              <p className="text-lg">Prayers and Bible Reading - Every Morning 5:00 AM - 6:00 AM</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white text-red-600 px-4 py-2 text-lg">
                Google Meet: pbpqvtmare
              </Badge>
              <Button className="bg-white text-red-600 hover:bg-gray-100">
                <Play className="w-4 h-4 mr-2" />
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Us for Worship</h2>
            <p className="text-lg text-gray-600">Everyone is welcome at JCPGIM</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant={
                        event.type === "Online"
                          ? "default"
                          : event.type === "Worship"
                            ? "secondary"
                            : event.type === "Youth"
                              ? "outline"
                              : "destructive"
                      }
                      className={
                        event.type === "Online"
                          ? "bg-red-600"
                          : event.type === "Worship"
                            ? "bg-yellow-600"
                            : event.type === "Youth"
                              ? "border-blue-600 text-blue-600"
                              : ""
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Ministries Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Ministries</h2>
            <p className="text-lg text-gray-600">Discover ways to grow and serve in our community</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {ministries.map((ministry, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={ministry.image || "/placeholder.svg"}
                    alt={ministry.title}
                    fill
                    className={`object-cover ${ministry.title === "Women's Ministry" ? "-rotate-90" : ""}`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    {ministry.icon}
                  </div>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{ministry.title}</CardTitle>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {ministry.ageGroup}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center mb-4">{ministry.description}</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Leadership</h2>
            <p className="text-lg text-gray-600">Meet our spiritual leaders</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src="/images/pastor-anna.jpg" alt="Pastor K. Ravi Kumar" fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pastor K. Ravi Kumar</h3>
                <p className="text-yellow-600 font-medium mb-3">Senior Pastor</p>
                <p className="text-sm text-gray-600">
                  A man of God with a heart for souls and a passion for spreading the Gospel
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/pastor-prophetess.jpg"
                    alt="Prophetess Madhuri Abiel Glory"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Prophetess Madhuri Abiel Glory</h3>
                <p className="text-yellow-600 font-medium mb-3">Prophetess</p>
                <p className="text-sm text-gray-600">
                  A woman of prayer and prophecy, ministering with divine revelation and wisdom
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/about">
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                Learn More About Our Leaders
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Community</h2>
            <p className="text-lg text-gray-600">See our church family in action</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/araku.jpg"
                alt="Church Community Outing"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Community Outings</h3>
                  <p className="text-sm opacity-90">Building fellowship through shared experiences</p>
                </div>
              </div>
            </div>

            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/worship.jpg"
                alt="The Chosen Band Worship"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">The Chosen Band</h3>
                  <p className="text-sm opacity-90">Anointed worship leading us into God's presence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Your Next Step?</h2>
          <p className="text-xl mb-8">Join our church family and experience the power of God in your life</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prayer-request">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold">
                Request Prayer
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-yellow-600 font-semibold bg-transparent"
              >
                Visit Us
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-yellow-600 font-semibold bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-300 text-sm">
                Beside Ibrahiptnam Bus Pass Counter
                <br />
                Hyderabad, Rangareddy - 501510
              </p>
            </div>
            <div>
              <Phone className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">+91 98662 85511</p>
            </div>
            <div>
              <Mail className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300">jcpgimofficial@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Social Media */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/images/logo.png" alt="JCPGIM Logo" width={40} height={30} className="object-contain" />
                <span className="font-bold">JCPGIM</span>
              </div>
              <p className="text-gray-400 text-sm">Impossible is Possible</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/chosen-band" className="hover:text-white">
                    Chosen Band
                  </Link>
                </li>
                <li>
                  <Link href="/praises" className="hover:text-white">
                    Praises
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Online Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sunday Worship
                  </a>
                </li>
                <li>
                  <Link href="/prayer-request" className="hover:text-white">
                    Prayer Request
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-700 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-colors"
                    title={social.name}
                  >
                    <span className="text-sm font-bold">
                      {social.icon === "facebook" && "f"}
                      {social.icon === "twitter" && "𝕏"}
                      {social.icon === "instagram" && "📷"}
                      {social.icon === "youtube" && "▶"}
                      {social.icon === "whatsapp" && "💬"}
                      {social.icon === "threads" && "@"}
                    </span>
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">Follow us for updates and inspiration</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Jesus Christ Power of Glory International Ministries. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
