import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import { Star } from 'lucide-react'

const REVIEWS = [
  { rider: 'Priya S.', rating: 5, text: 'Very safe and comfortable ride. Meera was professional and friendly.', date: '12 Jun' },
  { rider: 'Anika M.', rating: 5, text: 'Clean car and smooth driving. Highly recommend!', date: '10 Jun' },
  { rider: 'Riya K.', rating: 4, text: 'Good experience overall. Arrived on time.', date: '7 Jun' },
]

export default function DriverRatings() {
  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ratings & Reviews</h1>

        <GlassCard className="text-center">
          <p className="text-5xl font-bold gradient-text">4.9</p>
          <div className="flex justify-center gap-1 my-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
          </div>
          <p className="text-sm text-gray-500">Based on 1,247 reviews</p>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-lavender/10">
            {[{ l: '5★', v: '89%' }, { l: '4★', v: '8%' }, { l: '<4★', v: '3%' }].map((r) => (
              <div key={r.l}><p className="font-bold text-gray-900 dark:text-white">{r.v}</p><p className="text-xs text-gray-500">{r.l}</p></div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-3">
          {REVIEWS.map((r) => (
            <GlassCard key={r.rider} padding="p-4">
              <div className="flex justify-between mb-2">
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{r.rider}</p>
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{r.text}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
