import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import VerificationBadge from '../../components/safety/VerificationBadge'

const TAGS = ['Safe driving', 'Friendly', 'Clean car', 'On time', 'Great conversation']

export default function RateDriver() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [selectedTags, setSelectedTags] = useState([])
  const [comment, setComment] = useState('')

  function toggleTag(tag) {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
  }

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Rate your ride</h1>

        <GlassCard className="text-center">
          <Avatar name="Meera Singh" size="xl" className="mx-auto mb-3" />
          <p className="font-bold text-gray-900 dark:text-white">Meera Singh</p>
          <VerificationBadge type="driver" className="mt-2" />
          <p className="text-sm text-gray-500 mt-2">Ride {id} · Connaught Place → Saket</p>
        </GlassCard>

        <GlassCard className="text-center">
          <p className="text-sm text-gray-500 mb-4">How was your experience?</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(s)}
              >
                <Star className={`w-10 h-10 transition-colors ${(hover || rating) >= s ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-gray-600'}`} />
              </motion.button>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">What went well?</p>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedTags.includes(tag) ? 'gradient-primary text-white' : 'bg-lavender/10 text-gray-600 dark:text-gray-300'}`}
              >
                {tag}
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Additional comments (optional)"
            className="w-full mt-4 p-3 rounded-2xl border border-lavender/20 bg-white/50 dark:bg-white/5 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-lavender/30"
          />
        </GlassCard>

        <Button className="w-full" size="lg" disabled={!rating} onClick={() => navigate('/app/home')}>
          Submit Rating
        </Button>
      </div>
    </PageTransition>
  )
}
