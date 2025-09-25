import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ca8a04",
  other: {
    "msapplication-TileColor": "#ca8a04",
    "msapplication-config": "/browserconfig.xml",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
