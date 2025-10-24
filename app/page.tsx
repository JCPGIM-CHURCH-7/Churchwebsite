import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Welcome to JCPGIM</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-95">
                Where Impossible becomes Possible through the Power of Jesus Christ. Join our daily online
                services and experience God's miraculous power.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/prayer-request">
                  <a className="inline-block px-6 py-3 bg-white text-yellow-600 font-semibold rounded-md">Request
                    Prayer</a>
                </Link>
                <Link href="/give">
                  <a className="inline-block px-6 py-3 border border-white text-white rounded-md">Give</a>
                </Link>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-2xl h-72 md:h-96">
              <Image src="/images/front-page.jpg" alt="Daily Online Service" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Join Our Live Stream</h2>
          <p className="text-gray-600">Daily online services and weekly worship — everyone is welcome.</p>
        </div>

        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/yVhKuyAdi_Q?autoplay=0"
            title="JCPGIM Live Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </section>
    </div>
  )
}
