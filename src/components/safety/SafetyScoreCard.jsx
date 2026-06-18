import { motion } from 'framer-motion'
import { Brain, TrendingUp } from 'lucide-react'
import GlassCard from '../ui/GlassCard'

export default function SafetyScoreCard({ score = 94 }) {
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (score / 100) * circumference

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-lavender/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-lavender" />
        <h3 className="font-bold text-gray-900 dark:text-white">AI Safety Score</h3>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-lavender/15" />
            <motion.circle
              cx="60" cy="60" r="54" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
              strokeLinecap="round" strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B57EDC" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold gradient-text">{score}</span>
            <span className="text-[10px] text-gray-500">/ 100</span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">Your safety profile is excellent based on ride history and verification status.</p>
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            +3 points this month
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
