import { Share2, MapPin, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'

export default function LiveSharingCard({ active = true, contacts = 2 }) {
  return (
    <GlassCard padding="p-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
            <Share2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          {active && (
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900"
            />
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-gray-900 dark:text-white">Live Ride Sharing</p>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
            <Users className="w-3 h-3" /> {contacts} contacts watching
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <MapPin className="w-3 h-3" />
            Live
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
