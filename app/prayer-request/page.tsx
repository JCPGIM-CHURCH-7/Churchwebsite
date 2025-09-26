"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Send, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PrayerRequestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    urgency: "",
    request: "",
    anonymous: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/prayer-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "",
          urgency: "",
          request: "",
          anonymous: false,
        })
      }
    } catch (error) {
      console.error("Error submitting prayer request:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    { value: "healing", label: "Physical Healing" },
    { value: "financial", label: "Financial Breakthrough" },
    { value: "family", label: "Family & Relationships" },
    { value: "spiritual", label: "Spiritual Growth" },
    { value: "career", label: "Career & Job" },
    { value: "deliverance", label: "Deliverance & Freedom" },
    { value: "guidance", label: "Divine Guidance" },
    { value: "salvation", label: "Salvation of Loved Ones" },
    { value: "other", label: "Other" },
  ]

  const urgencyLevels = [
    { value: "normal", label: "Normal" },
    { value: "urgent", label: "Urgent" },
    { value: "emergency", label: "Emergency" },
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <Card className="border-2 border-green-200">
            <CardContent className="pt-8 pb-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prayer Request Submitted!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for sharing your prayer request with us. Our prayer team will be interceding for you, and
                Pastor K. Ravi Kumar and Prophetess Madhuri Abiel Glory will be praying over your request.
              </p>
              <div className="space-y-3">
                <Link href="/">
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">Return to Home</Button>
                </Link>
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                  Submit Another Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Submit Your Prayer Request</h1>
          <p className="text-xl">
            Share your prayer needs with us. Our prayer team and spiritual leaders will intercede for you.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Prayer Request Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-yellow-600" />
                  <span>Share Your Prayer Need</span>
                </CardTitle>
                <CardDescription>
                  We believe in the power of prayer and would be honored to pray for you and your situation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-900">Personal Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="mt-1"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1"
                        placeholder="Enter your phone number (optional)"
                      />
                    </div>
                  </div>

                  {/* Prayer Request Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-900">Prayer Request Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Prayer Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="urgency">Urgency Level *</Label>
                        <Select
                          value={formData.urgency}
                          onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                          <SelectContent>
                            {urgencyLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="request">Your Prayer Request *</Label>
                      <Textarea
                        id="request"
                        required
                        value={formData.request}
                        onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                        placeholder="Please share your prayer request in detail. Be specific about what you need prayer for..."
                        className="mt-1 min-h-[150px]"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={formData.anonymous}
                        onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="anonymous" className="text-sm">
                        Submit this request anonymously (your name will not be shared)
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-yellow-600 hover:bg-yellow-700 font-semibold"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting Prayer Request...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Prayer Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prayer Team */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-yellow-600" />
                  <span>Our Prayer Team</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                    <Image src="/images/pastor-anna.jpg" alt="Pastor K. Ravi Kumar" fill className="object-cover" />
                  </div>
                  <h4 className="font-semibold">Pastor K. Ravi Kumar</h4>
                  <p className="text-sm text-gray-600">Senior Pastor</p>
                </div>

                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                    <Image
                      src="/images/pastor-prophetess.jpg"
                      alt="Madhuri Abiel Glory"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-semibold">Madhuri</h4>
                  <p className="text-sm text-gray-600">Abiel Glory</p>
                </div>

                <div className="text-sm text-gray-600 text-center pt-4 border-t">
                  <p>
                    Our spiritual leaders and prayer team will intercede for your request with faith and dedication.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Prayer Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Prayer Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900">Be Specific</h4>
                  <p className="text-gray-600">
                    Share specific details about your prayer need so we can pray more effectively.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Have Faith</h4>
                  <p className="text-gray-600">
                    Believe that God hears your prayers and will answer according to His will.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Stay Connected</h4>
                  <p className="text-gray-600">
                    Join our daily online services for continued prayer and spiritual support.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Emergency Prayer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 mb-3 text-sm">For urgent prayer needs that require immediate attention:</p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-red-800">Call: +91 98662 85511</p>
                  <p className="font-semibold text-red-800">Email: jcpgimofficial@gmail.com</p>
                </div>
                <p className="text-xs text-red-600 mt-3">Available for emergency prayer support</p>
              </CardContent>
            </Card>

            {/* Daily Online Service */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Join Our Daily Prayer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700 mb-3 text-sm">Join us every morning for prayer and Bible reading:</p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-yellow-800">Time: 5:00 AM - 6:00 AM</p>
                  <p className="font-semibold text-yellow-800">Google Meet: pbpqvtmare</p>
                </div>
                <Button className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700 text-white text-sm">
                  Join Online Service
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
