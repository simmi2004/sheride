import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation, Clock, ShieldCheck, MapPin, Sparkles } from 'lucide-react'
import Button from '../ui/Button'
import GlassCard from '../ui/GlassCard'
import { useNavigate } from 'react-router-dom'

const ESTIMATE_DESTINATIONS = [
  { id: 'airport', name: 'Airport T2', address: 'Terminal 2, Sahar Road', x: 280, y: 120, dist: '8.4 km', time: '22 min', fare: 260 },
  { id: 'bkc', name: 'BKC Tech Park', address: 'G Block, Bandra East', x: 220, y: 250, dist: '5.2 km', time: '14 min', fare: 180 },
  { id: 'mall', name: 'Phoenix Mall', address: 'LBS Marg, Kurla West', x: 310, y: 320, dist: '6.8 km', time: '18 min', fare: 210 },
  { id: 'metro', name: 'Metro Station', address: 'Andheri Kurla Road', x: 140, y: 400, dist: '3.1 km', time: '9 min', fare: 110 },
]

const VEHICLE_OPTIONS = [
  { id: 'shego', name: 'SheGo', desc: 'Affordable, everyday hatchbacks', multiplier: 1, eta: '3 min', icon: '🚗' },
  { id: 'sheplus', name: 'ShePlus', desc: 'Premium, spacious sedans', multiplier: 1.4, eta: '4 min', icon: '✨' },
  { id: 'shexl', name: 'SheXL', desc: 'Comfortable 6-seater SUVs', multiplier: 1.8, eta: '5 min', icon: '🚙' },
]

export default function FareEstimator() {
  const navigate = useNavigate()
  const [selectedDest, setSelectedDest] = useState(ESTIMATE_DESTINATIONS[0])
  const [selectedVehicle, setSelectedVehicle] = useState('shego')
  const [animateKey, setAnimateKey] = useState(0)

  useEffect(() => {
    // Reset path animation key when destination changes
    setAnimateKey(prev => prev + 1)
  }, [selectedDest])

  const currentVehicle = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle)
  const currentFare = Math.round(selectedDest.fare * (currentVehicle?.multiplier ?? 1))

  return (
    <GlassCard padding="p-0" className="overflow-hidden border border-lavender/20 shadow-premium-lg flex flex-col h-full min-h-[500px]">
      <div className="p-4 bg-gradient-to-r from-lavender/10 to-soft-pink/10 border-b border-lavender/10 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5 text-sm">
            <Sparkles className="w-4 h-4 text-lavender" /> Live Ride Estimator
          </h3>
          <p className="text-[10px] text-gray-500">Calculate fare to top spots instantly</p>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure Pricing
        </div>
      </div>

      <div className="grid md:grid-cols-5 flex-1 min-h-0">
        {/* Map preview */}
        <div className="md:col-span-3 relative h-48 md:h-auto min-h-[220px] bg-slate-50 dark:bg-slate-950 overflow-hidden map-grid">
          {/* Animated SVG Path representing mock road network */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500" preserveAspectRatio="none">
            {/* Background Roads */}
            <path d="M 50,50 Q 200,80 350,50 T 200,450" fill="none" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="3" />
            <path d="M 10,200 L 390,200" fill="none" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="2" />
            <path d="M 80,450 Q 150,200 350,150" fill="none" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="2" />

            {/* Active Route Path */}
            <AnimatePresence mode="wait">
              <motion.path
                key={animateKey}
                d={`M 100,380 Q 200,300 ${selectedDest.x / 2 + 50},${(selectedDest.y + 380) / 2} T ${selectedDest.x},${selectedDest.y}`}
                fill="none"
                stroke="#B57EDC"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </svg>

          {/* Pickup Marker */}
          <div className="absolute left-[100px] top-[380px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-950 shadow-md ring-4 ring-emerald-500/20" />
            <span className="text-[9px] font-bold bg-white dark:bg-gray-900 px-1.5 py-0.5 rounded shadow mt-1 text-gray-700 dark:text-gray-300">Pickup</span>
          </div>

          {/* Destination Marker */}
          <AnimatePresence>
            <motion.div
              key={selectedDest.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{ left: selectedDest.x, top: selectedDest.y }}
              className="absolute -translate-x-1/2 -translate-y-[80%] flex flex-col items-center"
            >
              <MapPin className="w-6 h-6 text-purple-deep dark:text-lavender filter drop-shadow-md" />
              <span className="text-[9px] font-bold bg-purple-deep text-white px-1.5 py-0.5 rounded shadow mt-0.5 whitespace-nowrap">
                {selectedDest.name}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Animated Mock Driver Car */}
          <motion.div
            key={`car-${animateKey}`}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="absolute"
            style={{
              motionPath: `path('M 100,380 Q 200,300 ${selectedDest.x / 2 + 50},${(selectedDest.y + 380) / 2} T ${selectedDest.x},${selectedDest.y}')`,
              motionRotation: "auto"
            }}
          >
            <div className="w-7 h-7 rounded-full bg-lavender border-2 border-white dark:border-gray-950 shadow-premium flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
              <span className="text-xs">🚗</span>
            </div>
          </motion.div>
        </div>

        {/* Control & Details panel */}
        <div className="md:col-span-2 p-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-lavender/10">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">1. Choose Destination</p>
              <div className="grid grid-cols-2 gap-1.5">
                {ESTIMATE_DESTINATIONS.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedDest(dest)}
                    className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold text-left transition-all ${selectedDest.id === dest.id ? 'bg-lavender/15 border-lavender text-purple-deep dark:text-white' : 'border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                  >
                    📍 {dest.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">2. Select Ride Type</p>
              <div className="space-y-1.5">
                {VEHICLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedVehicle(opt.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all ${selectedVehicle === opt.id ? 'bg-lavender/10 border-lavender/60' : 'border-transparent hover:bg-gray-50 dark:hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg w-7 h-7 rounded-lg bg-lavender/10 flex items-center justify-center">{opt.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-gray-800 dark:text-white">{opt.name}</p>
                        <p className="text-[9px] text-gray-500 truncate max-w-[120px]">{opt.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-lavender">₹{Math.round(selectedDest.fare * opt.multiplier)}</p>
                      <p className="text-[9px] text-gray-400 flex items-center gap-0.5 justify-end"><Clock className="w-2.5 h-2.5" /> {opt.eta}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-lavender/10 mt-4">
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Distance</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedDest.dist}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Duration</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedDest.time}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white pt-1">
                <span>Estimated Fare</span>
                <span className="text-lavender text-base">₹{currentFare}</span>
              </div>
            </div>

            <Button
              className="w-full flex items-center justify-center gap-2 text-xs py-2 rounded-xl"
              onClick={() => navigate('/signup')}
            >
              <Navigation className="w-4 h-4" /> Book Ride Now
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
