import { motion } from 'framer-motion'
import { Shield, Heart, Sparkles } from 'lucide-react'

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-4 rounded-[3rem] gradient-primary opacity-20 blur-2xl"
      />
      <div className="relative glass-card rounded-[3rem] p-8 h-full flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mb-6 shadow-premium-lg">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 dark:bg-white/5">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Heart className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-lavender/30 rounded-full w-3/4 mb-1.5" />
              <div className="h-2 bg-lavender/15 rounded-full w-1/2" />
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 dark:bg-white/5">
            <div className="w-10 h-10 rounded-full bg-soft-pink/60 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-lavender" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-lavender/30 rounded-full w-full mb-1.5" />
              <div className="h-2 bg-lavender/15 rounded-full w-2/3" />
            </div>
          </div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg"
        >
          Verified ✓
        </motion.div>
      </div>
    </div>
  )
}
