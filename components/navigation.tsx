"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/chosen-band", label: "Chosen Band" },
    { href: "/praises", label: "Praises" },
    { href: "/prayer-request", label: "Prayer Request" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header className="bg-white shadow-lg border-b-2 border-yellow-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo Section - Enhanced for Mobile */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Image src="/images/logo.png" alt="JCPGIM Logo" width={50} height={38} className="object-contain" />
            <div>
              {/* Mobile - Show full name */}
              <div className="block sm:hidden">
                <h1 className="text-xs font-bold text-gray-900 leading-tight">Jesus Christ Power of Glory</h1>
                <p className="text-xs text-yellow-600 font-medium">International Ministries</p>
              </div>
              {/* Tablet - Show medium name */}
              <div className="hidden sm:block md:hidden">
                <h1 className="text-sm font-bold text-gray-900 leading-tight">Jesus Christ Power of Glory</h1>
                <p className="text-xs text-yellow-600 font-medium">International Ministries</p>
              </div>
              {/* Desktop - Show full name */}
              <div className="hidden md:block">
                <h1 className="text-base lg:text-lg font-bold text-gray-900 leading-tight">
                  Jesus Christ Power of Glory
                </h1>
                <p className="text-xs lg:text-sm text-yellow-600 font-medium">International Ministries</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors relative py-2 ${
                  isActive(item.href)
                    ? "text-yellow-600 border-b-2 border-yellow-600"
                    : "text-gray-700 hover:text-yellow-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/prayer-request">
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium">
                <Heart className="w-4 h-4 mr-2" />
                Prayer Request
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-6 w-6 text-gray-700" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/images/logo.png"
                        alt="JCPGIM Logo"
                        width={40}
                        height={30}
                        className="object-contain"
                      />
                      <div>
                        <h2 className="text-sm font-bold text-gray-900">JCPGIM</h2>
                        <p className="text-xs text-yellow-600">Impossible is Possible</p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-1 py-6 flex-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                          isActive(item.href)
                            ? "bg-yellow-50 text-yellow-600 border-l-4 border-yellow-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-yellow-600"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile CTA Section */}
                  <div className="border-t border-gray-200 pt-6 space-y-4">
                    <Link href="/prayer-request" onClick={handleLinkClick}>
                      <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium">
                        <Heart className="w-4 h-4 mr-2" />
                        Submit Prayer Request
                      </Button>
                    </Link>

                    {/* Contact Info */}
                    <div className="text-center text-sm text-gray-600 space-y-2">
                      <p className="font-medium text-gray-900">Daily Online Service</p>
                      <p>5:00 AM - 6:00 AM</p>
                      <p className="text-yellow-600 font-medium">Google Meet: pbpqvtmare</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
