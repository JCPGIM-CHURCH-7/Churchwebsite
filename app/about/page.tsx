"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Globe, Crown, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  const beliefs = [
    {
      title: "The Holy Bible",
      description:
        "We believe the Bible is the inspired, infallible Word of God and our ultimate authority for faith and life.",
    },
    {
      title: "Salvation by Grace",
      description: "We believe salvation is by grace through faith in Jesus Christ alone, not by works.",
    },
    {
      title: "The Trinity",
      description: "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.",
    },
    {
      title: "Divine Healing",
      description: "We believe in divine healing and the miraculous power of God working in our lives today.",
    },
    {
      title: "Second Coming",
      description: "We believe in the second coming of Jesus Christ and the resurrection of the dead.",
    },
    {
      title: "Holy Spirit",
      description: "We believe in the baptism of the Holy Spirit with the evidence of speaking in tongues.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Ministry</h1>
          <p className="text-xl">
            Learn about our history, beliefs, and the servants of God who lead our church family.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600 space-y-6">
              <p className="text-lg leading-relaxed">
                Jesus Christ Power of Glory International Ministries (JCPGIM) was founded with a divine vision to spread
                the Gospel of Jesus Christ and demonstrate His power in the lives of believers. Our ministry began with
                a simple yet profound truth: "Impossible is Possible" through Christ.
              </p>
              <p className="text-lg leading-relaxed">
                Under the anointed leadership of Pastor K. Ravi Kumar and Madhuri Abiel Glory, our ministry
                has grown from a small fellowship to an international ministry touching lives across different nations.
                We believe in the supernatural power of God and His ability to transform lives, heal the sick, and set
                the captives free.
              </p>
              <p className="text-lg leading-relaxed">
                Our daily online services have become a beacon of hope for thousands of believers worldwide, providing
                spiritual nourishment and prayer support every morning from 5:00 AM to 6:00 AM. Through the power of
                technology and the anointing of the Holy Spirit, we continue to reach souls for the Kingdom of God.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-2 border-yellow-200">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-yellow-600">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center text-lg leading-relaxed">
                  To preach the Gospel of Jesus Christ with signs, wonders, and miracles following, demonstrating that
                  impossible situations become possible through faith in Christ. We are committed to building strong
                  believers who walk in the supernatural power of God.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200">
              <CardHeader className="text-center">
                <Globe className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-orange-600">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center text-lg leading-relaxed">
                  To establish a global network of believers who operate in the supernatural realm, bringing healing,
                  deliverance, and transformation to nations. We envision a church where every member walks in their
                  divine calling and purpose.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Spiritual Leaders</h2>
            <p className="text-lg text-gray-600">Meet the servants of God who lead our ministry</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Pastor K. Ravi Kumar */}
            <Card className="text-center hover:shadow-xl transition-shadow border-2 border-yellow-100">
              <CardContent className="pt-8">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-yellow-400">
                  <Image src="/images/pastor-anna.jpg" alt="Pastor K. Ravi Kumar" fill className="object-cover" />
                </div>
                <div className="flex items-center justify-center mb-3">
                  <Crown className="w-6 h-6 text-yellow-600 mr-2" />
                  <h3 className="text-2xl font-bold text-gray-900">Pastor K. Ravi Kumar</h3>
                </div>
                <p className="text-yellow-600 font-semibold mb-4 text-lg">Senior Pastor & Man of God</p>
                <div className="text-gray-600 space-y-3 text-left">
                  <p>
                    Pastor K. Ravi Kumar is a man of God with a powerful anointing for healing and deliverance. His
                    ministry is marked by supernatural signs, wonders, and miracles that demonstrate the power of Jesus
                    Christ.
                  </p>
                  <p>
                    With a heart for souls and a passion for seeing lives transformed, Pastor Ravi Kumar leads our daily
                    online services and Sunday worship with divine revelation and prophetic insight.
                  </p>
                  <p>
                    His teachings are rooted in the Word of God and accompanied by the demonstration of the Spirit's
                    power, bringing hope to the hopeless and healing to the broken.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Prophetess Madhuri Abiel Glory */}
            <Card className="text-center hover:shadow-xl transition-shadow border-2 border-pink-100">
              <CardContent className="pt-8">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-pink-400">
                  <Image
                    src="/images/pastor-prophetess.jpg"
                    alt="Prophetess Madhuri Abiel Glory"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 text-pink-600 mr-2" />
                  <h3 className="text-2xl font-bold text-gray-900">Madhuri Abiel Glory</h3>
                </div>
                <p className="text-pink-600 font-semibold mb-4 text-lg">Woman of God</p>
                <div className="text-gray-600 space-y-3 text-left">
                  <p>
                    Madhuri Abiel Glory operates in a powerful prophetic anointing, bringing divine
                    revelations and prophetic words that transform lives and situations.
                  </p>
                  <p>
                    Her ministry is characterized by accurate prophecies, divine visions, and a deep intercession that
                    breaks through spiritual barriers and opens heavenly doors.
                  </p>
                  <p>
                    Together with Pastor Ravi Kumar, she co-leads the ministry with wisdom, grace, and a burning passion
                    to see God's people walk in their divine destiny and purpose.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Believe</h2>
            <p className="text-lg text-gray-600">Our core beliefs guide everything we do in ministry</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((belief, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-yellow-600">{belief.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{belief.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ministry Impact */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Ministry Impact</h2>
            <p className="text-lg text-gray-600">See how God is working through JCPGIM</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/araku.jpg" alt="Ministry Outreach" fill className="object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Community Outreach</h3>
                  <p className="text-sm opacity-90">Reaching communities with the love of Christ</p>
                </div>
              </div>
            </div>

            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/worship.jpg" alt="Worship and Praise" fill className="object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Powerful Worship</h3>
                  <p className="text-sm opacity-90">Experiencing God's presence through worship</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Ministry Family</h2>
          <p className="text-xl mb-8">
            Experience the supernatural power of God and be part of a ministry where impossible becomes possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold">
                Contact Us
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
        </div>
      </section>
    </div>
  )
}
