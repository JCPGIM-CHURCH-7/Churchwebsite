import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jesus Christ Power of Glory International Ministries",
  description:
    "Where Impossible becomes Possible through the Power of Jesus Christ. Join our daily online services and experience God's miraculous power.",
  keywords:
    "JCPGIM, Jesus Christ, Power of Glory, International Ministries, Church, Prayer, Worship, Healing, Miracles",
  authors: [{ name: "JCPGIM" }],
  creator: "Jesus Christ Power of Glory International Ministries",
  publisher: "JCPGIM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://jcpgim.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jesus Christ Power of Glory International Ministries",
    description: "Where Impossible becomes Possible through the Power of Jesus Christ",
    url: "https://jcpgim.org",
    siteName: "JCPGIM",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "JCPGIM Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesus Christ Power of Glory International Ministries",
    description: "Where Impossible becomes Possible through the Power of Jesus Christ",
    images: ["/images/logo.png"],
    creator: "@jcpgimchurch",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: "/images/logo.png", sizes: "any" },
      { url: "/images/logo.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/images/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/images/logo.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#ca8a04",
    "msapplication-config": "/browserconfig.xml",
  },
}

export function generateViewport() {
  return {
    themeColor: "#ca8a04",
    viewport: "width=device-width, initial-scale=1",
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Explicit favicon links to ensure broad browser support */}
        <link rel="icon" href="/images/logo.png" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className + " min-h-screen flex flex-col bg-white"}>
        <AuthProvider>
          <Navigation />
          <main className="flex-1 pt-0">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}