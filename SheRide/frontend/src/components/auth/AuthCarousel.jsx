import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Navigation, Star, Heart, Sparkles } from 'lucide-react'

const SLIDES = [
  {
    icon: ShieldCheck,
    title: "100% Female Ecosystem",
    desc: "Only verified women riders and certified drivers with 5+ years experience.",
    tag: "Verified Safety"
  },
  {
    icon: Navigation,
    title: "Real-time Live Sharing",
    desc: "Automatically send trip tracking link to family and contacts with one click.",
    tag: "Live Track"
  },
  {
    icon: Heart,
    title: "AI Ride Guardian",
    desc: "24/7 background anomaly detector checks on you if any unusual delay occurs.",
    tag: "Active Protection"
  }
]

export default function AuthCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[index]
  const Icon = slide.icon

  return (
    <div className="relative h-full w-full min-h-[400px] lg:min-h-screen gradient-primary overflow-hidden flex flex-col justify-between p-8 sm:p-12 text-white">
      {/* Decorative animated gradient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-soft-pink opacity-25 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-purple-glow opacity-35 blur-3xl"
        />
      </div>

      {/* Brand Header */}
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">SheRide</span>
      </div>

      {/* Feature Slider */}
      <div className="relative z-10 my-auto py-12 max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-wider uppercase border border-white/5">
              {slide.tag}
            </span>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-soft-pink">
              <Icon className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              {slide.title}
            </h2>
            <p className="text-sm opacity-85 leading-relaxed">
              {slide.desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Bullet indicators */}
        <div className="flex gap-2 mt-8">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Trust stats Footer */}
      <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
        {[
          { label: 'Rides Done', value: '50K+' },
          { label: 'Rating', value: '4.9★' },
          { label: 'Drivers', value: '8K+' },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-lg font-black">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-wider opacity-60 font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
