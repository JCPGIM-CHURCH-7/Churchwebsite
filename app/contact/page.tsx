"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle } from "lucide-react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-yellow-600" />,
      title: "Address",
      details: ["Beside Ibrahiptnam Bus Pass Counter", "Hyderabad, Rangareddy - 501510", "Telangana, India"],
    },
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      title: "Phone",
      details: ["+91 98662 85511", "Available for calls and WhatsApp"],
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "Email",
      details: ["jcpgimofficial@gmail.com", "We respond within 24 hours"],
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Service Times",
      details: [
        "Daily Online: 5:00 AM - 6:00 AM",
        "Sunday Worship: 10:00 AM - 12:00 PM",
        "Prayer Meeting: Wednesday 7:00 PM",
      ],
    },
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <Card className="border-2 border-green-200">
            <CardContent className="pt-8 pb-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for contacting us. We have received your message and will get back to you within 24 hours.
              </p>
              <div className="space-y-3">
                <Button onClick={() => setIsSubmitted(false)} className="w-full bg-yellow-600 hover:bg-yellow-700">
                  Send Another Message
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
                  Return to Home
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
      {/* Navigation Component */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl">
            We'd love to hear from you. Reach out with any questions or to learn more about our ministry.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        className="mt-1"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        className="mt-1"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="mt-1"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="mt-1"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="visit">Planning a Visit</SelectItem>
                        <SelectItem value="prayer">Prayer Request</SelectItem>
                        <SelectItem value="ministry">Ministry Information</SelectItem>
                        <SelectItem value="events">Events & Programs</SelectItem>
                        <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                        <SelectItem value="pastoral">Pastoral Care</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Please share your message, questions, or how we can help you..."
                      className="mt-1 min-h-[120px]"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      {info.icon}
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Leadership Contact */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Direct Contact with Leadership</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image src="/images/pastor-anna.jpg" alt="Pastor K. Ravi Kumar" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800">Pastor K. Ravi Kumar</h4>
                      <p className="text-sm text-yellow-700">Senior Pastor</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/images/pastor-prophetess.jpg"
                        alt="Prophetess Madhuri Abiel Glory"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800">Prophetess Madhuri Abiel Glory</h4>
                      <p className="text-sm text-yellow-700">Prophetess</p>
                    </div>
                  </div>

                  <div className="text-sm text-yellow-700 pt-3 border-t border-yellow-200">
                    <p>
                      For pastoral care, spiritual guidance, or ministry-related inquiries, you can reach our leadership
                      directly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Online Service Info */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Join Our Daily Online Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-red-700 text-sm">Connect with us every morning for prayer and Bible reading:</p>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-red-800">Time: 5:00 AM - 6:00 AM (Daily)</p>
                    <p className="font-semibold text-red-800">Google Meet: pbpqvtmare</p>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Join Online Service</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-yellow-600" />
                <span>Find Us</span>
              </CardTitle>
              <CardDescription>
                We're located beside Ibrahiptnam Bus Pass Counter in Hyderabad. Easy to find with public transport
                access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6!2d78.4!3d17.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI0JzAwLjAiTiA3OMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">Transportation</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Located beside Ibrahiptnam Bus Pass Counter</li>
                      <li>• Easy access by local buses</li>
                      <li>• Auto-rickshaws and taxis available</li>
                      <li>• Parking space available for cars</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">Nearby Landmarks</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Ibrahiptnam Bus Pass Counter</li>
                      <li>• Local shops and markets nearby</li>
                      <li>• Residential area with good connectivity</li>
                      <li>• Well-connected to Hyderabad city center</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    className="bg-yellow-600 hover:bg-yellow-700"
                    onClick={() => window.open("https://share.google/r5qEeMaRRpPUtUVeq", "_blank")}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call for Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
