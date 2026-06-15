import { motion } from 'framer-motion'
import { Navigation, MapPin } from 'lucide-react'

export default function MapPlaceholder({ className = '', showRoute = false, children }) {
  return (
    <div className={`relative map-grid bg-gradient-to-br from-soft-pink/20 via-lavender/10 to-purple-100/30 dark:from-purple-deep/20 dark:via-lavender/5 dark:to-black/40 overflow-hidden ${className}`}>
      {/* Decorative map elements */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,200 Q200,150 400,200 T800,180" fill="none" stroke="#B57EDC" strokeWidth="2" opacity="0.3" />
          <path d="M0,350 Q300,300 600,350 T1200,320" fill="none" stroke="#B57EDC" strokeWidth="1.5" opacity="0.2" />
        </svg>
      </div>

      {showRoute && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 600" preserveAspectRatio="none">
          <motion.path
            d="M80,500 Q120,400 150,350 T200,200 T280,100"
            fill="none" stroke="#B57EDC" strokeWidth="4" strokeLinecap="round"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>
      )}

      {/* Pickup marker */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute bottom-[30%] left-[20%] flex flex-col items-center"
      >
        <div className="w-4 h-4 rounded-full bg-lavender border-2 border-white shadow-lg" />
        <span className="text-[10px] font-semibold bg-white/90 dark:bg-black/70 px-2 py-0.5 rounded-full mt-1 text-gray-700 dark:text-gray-200">Pickup</span>
      </motion.div>

      {/* Destination marker */}
      {showRoute && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-[18%] right-[25%] flex flex-col items-center"
        >
          <MapPin className="w-6 h-6 text-purple-deep drop-shadow" />
          <span className="text-[10px] font-semibold bg-white/90 dark:bg-black/70 px-2 py-0.5 rounded-full mt-0.5 text-gray-700 dark:text-gray-200">Drop</span>
        </motion.div>
      )}

      {/* Driver marker */}
      {showRoute && (
        <motion.div
          animate={{ x: [0, 20, 40], y: [0, -30, -60] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute bottom-[45%] left-[35%]"
        >
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-premium">
            <Navigation className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      )}

      {children}
    </div>
  )
}
