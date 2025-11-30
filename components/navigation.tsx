// @ts-nocheck
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu, Heart, Shield, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import AuthButton from "./AuthButton"
import { useAdminCheck } from "@/hooks/useAdminCheck"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { isAdmin } = useAdminCheck()

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/daily-grace", label: "Daily Grace" },
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
    <header className="bg-white shadow-md border-b border-yellow-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Left: logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image src="/images/logo.png" alt="JCPGIM Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm md:text-lg font-bold text-gray-900 leading-tight">
                  <span className="hidden sm:inline">Jesus Christ Power of Glory</span>
                  <span className="sm:hidden">JCPGIM</span>
                </h1>
                <p className="text-[10px] md:text-xs text-yellow-600 font-medium">International Ministries</p>
              </div>
            </Link>
          </div>

          {/* Center: desktop navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-yellow-600 ${isActive(item.href) ? "text-yellow-600" : "text-gray-700"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAdmin && (
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
            <Link href="/prayer-request">
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                <Heart className="w-4 h-4 mr-2" />
                Prayer Request
              </Button>
            </Link>
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            {/* Show AuthButton on mobile header too for easy access, or keep in menu? Keeping in menu for cleaner header */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] overflow-y-auto">
                <SheetHeader className="text-left border-b pb-4 mb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="relative w-8 h-8">
                      <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="font-bold text-sm">JCPGIM</span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                          ? "bg-yellow-50 text-yellow-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-yellow-600"
                        }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                  {isAdmin && (
                    <Link href="/admin" onClick={handleLinkClick}>
                      <Button variant="outline" className="w-full justify-start text-amber-600 border-amber-200 hover:bg-amber-50">
                        <Shield className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}

                  <Link href="/prayer-request" onClick={handleLinkClick}>
                    <Button className="w-full justify-start bg-yellow-600 hover:bg-yellow-700 text-white">
                      <Heart className="w-4 h-4 mr-2" />
                      Prayer Request
                    </Button>
                  </Link>

                  <div className="pt-4">
                    <AuthButton />
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
