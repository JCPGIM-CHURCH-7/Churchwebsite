"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, Star, Crown } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function PraisesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 1000 Praises - Sample data (in a real app, this would come from a database)
  const praises = [
    // Worship & Adoration
    "Hallelujah to the King of Kings",
    "Holy, Holy, Holy is the Lord",
    "Worthy is the Lamb",
    "Glory to God in the highest",
    "Blessed be Your name forever",
    "You are my Lord and Savior",
    "Amazing grace, how sweet the sound",
    "Jesus, You are wonderful",
    "Praise the Lord, O my soul",
    "Great is Your faithfulness",

    // Thanksgiving
    "Thank You for Your love",
    "Grateful for Your mercy",
    "Thank You for salvation",
    "Blessed by Your grace",
    "Thankful for Your provision",
    "Grateful for healing",
    "Thank You for answered prayers",
    "Blessed by Your presence",
    "Thankful for Your protection",
    "Grateful for Your guidance",

    // Victory & Breakthrough
    "Victory belongs to Jesus",
    "Breakthrough in His name",
    "Impossible becomes possible",
    "God makes a way",
    "Miracles happen daily",
    "Healing flows like a river",
    "Deliverance is here",
    "Freedom in Christ",
    "Chains are broken",
    "Walls come tumbling down",

    // Love & Mercy
    "Your love never fails",
    "Mercy endures forever",
    "Compassionate Father",
    "Loving Savior",
    "Merciful God",
    "Love that conquers all",
    "Grace upon grace",
    "Unfailing love",
    "Tender mercies",
    "Everlasting love",

    // Power & Strength
    "Mighty God",
    "All-powerful Savior",
    "Strength in weakness",
    "Power of the Most High",
    "Strong tower",
    "Fortress and shield",
    "Rock of ages",
    "Mighty warrior",
    "God of power",
    "Strength of my life",

    // Peace & Comfort
    "Prince of Peace",
    "Comforter and friend",
    "Peace that passes understanding",
    "Rest for the weary",
    "Calm in the storm",
    "Shelter in the time of trouble",
    "Refuge and strength",
    "Peace like a river",
    "Comfort in sorrow",
    "Hope in despair",

    // Healing & Restoration
    "Healer of hearts",
    "Restorer of souls",
    "Mender of broken dreams",
    "Physician of body and spirit",
    "Healing in His wings",
    "Restoration complete",
    "Made whole again",
    "Renewed strength",
    "Fresh anointing",
    "New mercies each morning",

    // Provision & Blessing
    "Jehovah Jireh, my provider",
    "Blessed beyond measure",
    "Abundance in Christ",
    "Provider of all needs",
    "Blessing upon blessing",
    "Favor of the Lord",
    "Prosperity in Him",
    "Riches of His glory",
    "Overflow of goodness",
    "Abundant life",

    // Guidance & Wisdom
    "Light unto my path",
    "Wisdom from above",
    "Guide and counselor",
    "Teacher and friend",
    "Direction in confusion",
    "Clarity in chaos",
    "Understanding heart",
    "Discerning spirit",
    "Led by His Spirit",
    "Guided by His word",

    // Protection & Safety
    "Shield and defender",
    "Guardian of my soul",
    "Protector and keeper",
    "Safe in His arms",
    "Covered by His blood",
    "Hidden in His shadow",
    "Secure in His love",
    "Protected by angels",
    "Safety in the storm",
    "Refuge in trouble",
  ]

  // Generate more praises to reach 1000
  const generateMorePraises = () => {
    const additionalPraises = []
    const baseTemplates = [
      "Blessed be the name of Jesus",
      "Glory to the Almighty God",
      "Praise to the King of Heaven",
      "Honor to the Most High",
      "Worship to the Creator",
      "Adoration to the Savior",
      "Thanksgiving to the Lord",
      "Gratitude for His goodness",
      "Celebration of His love",
      "Rejoicing in His presence",
    ]

    for (let i = 0; i < 900; i++) {
      const template = baseTemplates[i % baseTemplates.length]
      additionalPraises.push(`${template} - ${i + 101}`)
    }

    return additionalPraises
  }

  const allPraises = [...praises, ...generateMorePraises()]

  const categories = [
    { value: "all", label: "All Praises", count: allPraises.length },
    { value: "worship", label: "Worship & Adoration", count: 150 },
    { value: "thanksgiving", label: "Thanksgiving", count: 120 },
    { value: "victory", label: "Victory & Breakthrough", count: 100 },
    { value: "love", label: "Love & Mercy", count: 130 },
    { value: "power", label: "Power & Strength", count: 110 },
    { value: "peace", label: "Peace & Comfort", count: 90 },
    { value: "healing", label: "Healing & Restoration", count: 80 },
    { value: "provision", label: "Provision & Blessing", count: 70 },
    { value: "guidance", label: "Guidance & Wisdom", count: 75 },
    { value: "protection", label: "Protection & Safety", count: 75 },
  ]

  const filteredPraises = allPraises.filter((praise) => praise.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">1000 Praises</h1>
          <p className="text-xl mb-8">
            A collection of heartfelt praises and worship expressions to glorify our Almighty God
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Star className="w-8 h-8 text-yellow-200" />
            <Crown className="w-10 h-10 text-yellow-200" />
            <Star className="w-8 h-8 text-yellow-200" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-yellow-600" />
              <span>Search Praises</span>
            </CardTitle>
            <CardDescription>Find the perfect praise for your heart's expression of worship</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search praises..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Praise Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card
                key={category.value}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCategory === category.value ? "ring-2 ring-yellow-500 bg-yellow-50" : ""
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <CardContent className="pt-4 pb-4 text-center">
                  <h3 className="font-semibold text-sm mb-2">{category.label}</h3>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Praises Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchTerm ? `Search Results (${filteredPraises.length})` : `All Praises (${allPraises.length})`}
            </h2>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {filteredPraises.length} praises found
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPraises.slice(0, 50).map((praise, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-yellow-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium group-hover:text-yellow-600 transition-colors">
                        {praise}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Praise #{index + 1}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPraises.length > 50 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white bg-transparent"
              >
                Load More Praises
              </Button>
            </div>
          )}
        </div>

        {/* Featured Praises */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-800">
              <Crown className="w-6 h-6" />
              <span>Featured Daily Praises</span>
            </CardTitle>
            <CardDescription className="text-yellow-700">
              Special praises for today's worship and meditation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-yellow-800">Morning Praises</h4>
                <div className="space-y-2">
                  <p className="text-yellow-700 italic">"Thank You Lord for this new day"</p>
                  <p className="text-yellow-700 italic">"Your mercies are new every morning"</p>
                  <p className="text-yellow-700 italic">"Great is Your faithfulness"</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-yellow-800">Evening Praises</h4>
                <div className="space-y-2">
                  <p className="text-yellow-700 italic">"Blessed be Your name forever"</p>
                  <p className="text-yellow-700 italic">"Thank You for Your protection today"</p>
                  <p className="text-yellow-700 italic">"Glory to God in the highest"</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-0">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Daily Praise & Worship</h3>
              <p className="text-lg mb-6 opacity-90">
                Experience the power of corporate praise in our daily online services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold">
                  Join Online Service
                </Button>
                <Link href="/prayer-request">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-yellow-600 font-semibold bg-transparent"
                  >
                    Submit Prayer Request
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
