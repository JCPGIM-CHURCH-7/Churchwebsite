import DynamicDailyGrace from '@/components/DailyGrace'

export const metadata = {
  title: 'Daily Grace Experience - JCPGIM',
  description: 'Swipeable Daily Grace experience (prototype).',
}

export default function DailyGraceReelsPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-6">Daily Grace — Experience</h1>
        <div className="px-4">
          <DynamicDailyGrace />
        </div>
      </div>
    </main>
  )
}
