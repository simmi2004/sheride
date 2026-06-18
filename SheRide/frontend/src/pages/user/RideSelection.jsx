import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, Shield, ArrowLeft, ChevronRight, Calendar } from 'lucide-react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Avatar from '../../components/ui/Avatar'
import VerificationBadge from '../../components/safety/VerificationBadge'
import MapPlaceholder from '../../components/map/MapPlaceholder'
import { saveLocalStorageRide } from '../../services/rideStorage'
import { useAuth } from '../../context/AuthContext'

const DRIVERS = [
  { id: 1, name: 'Meera Singh', car: 'Toyota Innova · White', rating: 4.9, trips: 1247, eta: '3 min' },
  { id: 2, name: 'Anjali Rao', car: 'Honda City · Silver', rating: 4.8, trips: 890, eta: '5 min' },
]

const OPTIONS = [
  { id: 'gononac', name: 'Go Non AC', multiplier: 0.55, icon: '🚗', eta: '5 min', time: '1:40 PM' },
  { id: 'bikesaver', name: 'Bike Saver', multiplier: 0.43, icon: '🏍️', eta: '3 min', time: '1:38 PM' },
  { id: 'ubergo', name: 'Uber Go', multiplier: 0.58, originalMultiplier: 0.72, icon: '🚗', eta: '4 min', time: '1:39 PM', discount: true },
  { id: 'uberxl', name: 'UberXL', multiplier: 1.0, icon: '🚙', eta: '7 min', time: '1:42 PM' },
]

export default function RideSelection() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedRide, setSelectedRide] = useState('gononac')
  const [selectedDriver, setSelectedDriver] = useState(1)
  
  const baseFare = state?.fare || 180
  const activeRideOption = OPTIONS.find((r) => r.id === selectedRide)
  const calculatedFare = Math.round(baseFare * (activeRideOption?.multiplier || 1))

  const handleConfirmRide = () => {
    const rideId = `R-${Date.now().toString().slice(-4)}`
    const selectedDriverObj = DRIVERS.find(d => d.id === selectedDriver)
    const newRide = {
      id: rideId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      from: state?.pickup || 'Pickup Location',
      to: state?.destination || 'Destination Location',
      fare: calculatedFare,
      status: 'ongoing',
      driver: selectedDriverObj?.name || 'Meera S.',
      rider: user?.name || 'Priya Sharma',
      pickupCoords: state?.pickupCoords || [28.6304, 77.2177],
      dropCoords: state?.dropCoords || [28.5244, 77.2066]
    }
    
    // Save to localStorage
    saveLocalStorageRide(newRide)
    
    // Navigate to tracking
    navigate(`/app/rides/track/${rideId}`)
  }

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-112px)] min-h-[500px]">
        
        {/* Navigation Header bar mimicking Uber's top indicator */}
        <div className="bg-white dark:bg-black p-4 flex items-center gap-3 border border-gray-100 dark:border-gray-850 rounded-2xl mb-4 shadow-sm">
          <button onClick={() => navigate('/app/search')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-extrabold tracking-wider">Your Route</p>
            <p className="font-extrabold text-gray-900 dark:text-white truncate text-base">
              {state?.pickup ?? 'Pickup'} &rarr; {state?.destination ?? 'Destination'}
            </p>
          </div>
        </div>

        {/* Split screen content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch min-h-0">
          
          {/* Left Side: Sleek Grayscale Map */}
          <div className="order-1 lg:col-span-7 relative min-h-[300px] lg:min-h-0 rounded-3xl overflow-hidden shadow-premium border border-gray-150 dark:border-gray-850">
            <MapPlaceholder
              className="absolute inset-0 w-full h-full"
              pickupCoords={state?.pickupCoords}
              dropCoords={state?.dropCoords}
              showRoute
            />
          </div>

          {/* Right Side: Options drawer pane */}
          <div className="order-2 lg:col-span-5 flex flex-col h-full overflow-y-auto pr-1 space-y-5">
            <GlassCard padding="p-5" className="flex flex-col gap-4 border border-gray-100 dark:border-gray-850 rounded-3xl shadow-premium-lg">
              
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Choose a trip</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Safe and vetted drivers available nearby</p>
              </div>

              {/* Uber-style choices list */}
              <div className="space-y-2.5">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedRide(opt.id)}
                    className={`w-full bg-white dark:bg-neutral-900 rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer select-none border-2 ${
                      selectedRide === opt.id
                        ? 'border-black dark:border-white bg-neutral-50 dark:bg-neutral-800'
                        : 'border-gray-100 dark:border-neutral-800'
                    }`}
                  >
                    <span className="text-3xl flex-shrink-0" role="img" aria-label={opt.name}>{opt.icon}</span>
                    <div className="flex-1 pl-4 text-left">
                      <p className="font-extrabold text-gray-900 dark:text-white text-base">
                        {opt.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.time} · {opt.eta}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        {opt.discount && <span className="text-xs text-emerald-500 font-bold">&darr;</span>}
                        <p className="font-extrabold text-gray-900 dark:text-white text-base">₹{Math.round(baseFare * opt.multiplier)}</p>
                      </div>
                      {opt.discount && (
                        <p className="text-xs text-gray-400 line-through">₹{Math.round(baseFare * opt.originalMultiplier)}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Payment selection selector */}
              <div className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-2xl border border-gray-100 dark:border-neutral-800 cursor-pointer transition-all select-none">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💵</span>
                  <span className="font-extrabold text-sm text-gray-800 dark:text-white">Cash</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              {/* Action confirmations */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleConfirmRide}
                  className="flex-1 py-4 bg-black dark:bg-white text-white dark:text-black font-black text-base rounded-2xl hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-all cursor-pointer shadow-lg select-none"
                >
                  Choose {OPTIONS.find(opt => opt.id === selectedRide)?.name || 'Go Non AC'}
                </button>
                <button
                  onClick={() => navigate('/app/search')}
                  className="p-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300 rounded-2xl transition-all cursor-pointer flex-shrink-0"
                >
                  <Calendar className="w-6 h-6" />
                </button>
              </div>

            </GlassCard>

            {/* Selected Driver detail card */}
            <div className="p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-850 rounded-3xl shadow flex items-center gap-4">
              <Avatar name={DRIVERS[selectedDriver - 1].name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{DRIVERS[selectedDriver - 1].name}</p>
                  <VerificationBadge type="driver" size="sm" />
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">{DRIVERS[selectedDriver - 1].car}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 justify-end">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-gray-800 dark:text-white">{DRIVERS[selectedDriver - 1].rating}</span>
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{DRIVERS[selectedDriver - 1].eta} away</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </PageTransition>
  )
}
