"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart, CreditCard, Building, ArrowLeft, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function GivePage() {
  const [amount, setAmount] = useState("")
  const [frequency, setFrequency] = useState("one-time")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [givingType, setGivingType] = useState("general")

  const quickAmounts = [25, 50, 100, 250, 500]

  const givingOptions = [
    {
      value: "general",
      title: "General Fund",
      description: "Supports the overall ministry and operations of our church",
    },
    {
      value: "missions",
      title: "Missions",
      description: "Supports our local and global mission work",
    },
    {
      value: "building",
      title: "Building Fund",
      description: "Helps maintain and improve our church facilities",
    },
    {
      value: "youth",
      title: "Youth Ministry",
      description: "Supports programs and activities for our young people",
    },
    {
      value: "outreach",
      title: "Community Outreach",
      description: "Funds our community service and outreach programs",
    },
  ]

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
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Grace Community Church</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Give Online</h1>
          <p className="text-xl">
            Thank you for your generous heart and desire to support God's work through our church.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Giving Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-blue-600" />
                  <span>Make a Donation</span>
                </CardTitle>
                <CardDescription>
                  Your generosity helps us continue our mission to serve God and our community.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Giving Type */}
                <div>
                  <Label className="text-base font-medium">Where would you like to give?</Label>
                  <Select value={givingType} onValueChange={setGivingType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {givingOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div>
                            <div className="font-medium">{option.title}</div>
                            <div className="text-sm text-gray-500">{option.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount */}
                <div>
                  <Label className="text-base font-medium">Amount</Label>
                  <div className="mt-2 space-y-3">
                    <div className="grid grid-cols-5 gap-2">
                      {quickAmounts.map((quickAmount) => (
                        <Button
                          key={quickAmount}
                          variant={amount === quickAmount.toString() ? "default" : "outline"}
                          onClick={() => setAmount(quickAmount.toString())}
                          className="h-12"
                        >
                          ${quickAmount}
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        type="number"
                        placeholder="Enter custom amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-8 h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Frequency */}
                <div>
                  <Label className="text-base font-medium">Frequency</Label>
                  <RadioGroup value={frequency} onValueChange={setFrequency} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-time" id="one-time" />
                      <Label htmlFor="one-time">One-time gift</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly">Weekly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="text-base font-medium">Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="w-4 h-4" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank" id="bank" />
                      <Building className="w-4 h-4" />
                      <Label htmlFor="bank">Bank Transfer (ACH)</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input id="routingNumber" placeholder="123456789" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" placeholder="1234567890" className="mt-1" />
                    </div>
                  </div>
                )}

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-medium">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" className="mt-1" />
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions or dedication for this gift..."
                    className="mt-1"
                  />
                </div>

                {/* Submit Button */}
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700" size="lg">
                  Complete Donation - ${amount || "0"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Notice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Secure Giving</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>PCI compliant processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>No card information stored</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Ways to Give */}
            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Give</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium">By Mail</h4>
                  <p className="text-gray-600">
                    Grace Community Church
                    <br />
                    123 Faith Street
                    <br />
                    Hometown, ST 12345
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">In Person</h4>
                  <p className="text-gray-600">
                    Drop your offering in the collection plate during any service or visit our office during business
                    hours.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Text to Give</h4>
                  <p className="text-gray-600">
                    Text "GIVE" to (555) 123-GIVE to make a quick donation via text message.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tax Information */}
            <Card>
              <CardHeader>
                <CardTitle>Tax Information</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <p>
                  Grace Community Church is a 501(c)(3) nonprofit organization. Your donation is tax-deductible to the
                  full extent allowed by law. You will receive a receipt for your records.
                </p>
                <p className="mt-2">
                  <strong>Tax ID:</strong> 12-3456789
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
