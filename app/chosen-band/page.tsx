"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Heart, Instagram } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ChosenBandPage() {
  const bandMembers = [
    {
      name: "Soumya Sharon",
      role: "Worship Leader, Vocalist, Guitarist",
      description: "Leading the congregation into the presence of God through powerful worship",
      image: "/images/Soumya Sharon.jpg",
    },
    {
      name: "Shwetha Shalom",
      role: "Vocalist, Keyboardist",
      description: "Creating beautiful melodies that lift hearts to heaven",
      image: "/images/Shwetha Shalom.jpg",
    },
    {
      name: "Zarah Grace",
      role: "Vocalist",
      description: "Supporting the worship with angelic harmonies",
      image: "/images/Zarah Grace.jpg",
    },
    {
      name: "Abiel David Asher",
      role: "Male Vocalist",
      description: "Bringing powerful vocals to uplift the congregation",
      image: "/images/David Asher.jpg",
    },
    {
      name: "Suzanna Junia William",
      role: "Vocalist",
      description: "Adding heartfelt harmonies to the worship experience",
      image: "/images/Junia Suzzana.jpg",
    },
    {
      name: "Shawn Joshua William",
      role: "Leader, Vocalist, Percussionist",
      description: "Guiding the team with anointed leadership and rhythmic energy",
      image: "/images/Shawn.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
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
            <Music className="w-5 h-5 mr-2" />
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

          {/* Main Band Image */}
          <div className="mb-12">
            <Card className="hover:shadow-xl transition-shadow">
              <div className="relative h-[500px] overflow-hidden rounded-t-lg">
                <Image
                  src="/images/worship.jpg"
                  alt="The Chosen Band"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Music className="w-16 h-16 text-white" />
                </div>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">The Chosen Band</CardTitle>
                <CardDescription className="text-lg">
                  Leading the congregation into God's presence through anointed worship
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Individual Band Members */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {bandMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
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

          {/* Instagram Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Follow Us on Instagram</h3>
            <p className="text-lg text-gray-600 mb-6">Stay updated with our latest worship moments and inspirations</p>
            <Link href="https://www.instagram.com/thechosenhyd/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 font-semibold">
                <Instagram className="w-5 h-5 mr-2" />
                Visit @thechosenhyd
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}