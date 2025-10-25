// @ts-nocheck
import Link from "next/link"
import Image from "next/image"

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/share/1AMrgQCnq3/", icon: "facebook" },
  { name: "Twitter", url: "https://x.com/jcpgimchurch?t=xjBU4cdUkHy46K3KXtmt6A&s=09", icon: "twitter" },
  { name: "Instagram", url: "https://www.instagram.com/jcpgim_church?igsh=MWYxc21tdHhoZmRweQ==", icon: "instagram" },
  { name: "YouTube", url: "https://youtube.com/@jcpgimofficial27?si=x6Tn1ve85xXeGGZH", icon: "youtube" },
  { name: "WhatsApp", url: "https://whatsapp.com/channel/0029VaJ4FCT3AzNJ64QPYe2S", icon: "whatsapp" },
  { name: "Threads", url: "https://www.threads.net/@jcpgim_church", icon: "threads" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/images/logo.png" alt="JCPGIM Logo" width={40} height={30} className="object-contain" />
              <span className="font-bold">JCPGIM</span>
            </div>
            <p className="text-gray-400 text-sm">Impossible is Possible</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">About Us</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white">Events</Link>
              </li>
              <li>
                <Link href="/chosen-band" className="hover:text-white">Chosen Band</Link>
              </li>
              <li>
                <Link href="/praises" className="hover:text-white">Praises</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/" className="hover:text-white">Online Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Sunday Worship</a>
              </li>
              <li>
                <Link href="/prayer-request" className="hover:text-white">Prayer Request</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-colors"
                  title={social.name}
                >
                  <span className="text-sm font-bold">
                    {social.icon === "facebook" && "f"}
                    {social.icon === "twitter" && "𝕏"}
                    {social.icon === "instagram" && "📷"}
                    {social.icon === "youtube" && "▶"}
                    {social.icon === "whatsapp" && "💬"}
                    {social.icon === "threads" && "@"}
                  </span>
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Follow us for updates and inspiration</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Jesus Christ Power of Glory International Ministries. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
