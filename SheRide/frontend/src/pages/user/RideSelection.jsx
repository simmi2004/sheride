import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, Shield, ArrowLeft } from 'lucide-react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import VerificationBadge from '../../components/safety/VerificationBadge'
import MapPlaceholder from '../../components/map/MapPlaceholder'
import { RIDE_OPTIONS } from '../../data/mockData'
import { saveLocalStorageRide } from '../../services/rideStorage'
import { useAuth } from '../../context/AuthContext'

const DRIVERS = [
  { id: 1, name: 'Meera Singh', car: 'Toyota Innova · White', rating: 4.9, trips: 1247, eta: '3 min' },
  { id: 2, name: 'Anjali Rao', car: 'Honda City · Silver', rating: 4.8, trips: 890, eta: '5 min' },
]

export default function RideSelection() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedRide, setSelectedRide] = useState('shego')
  const [selectedDriver, setSelectedDriver] = useState(1)
  
  const baseFare = state?.fare || 180
  const ride = RIDE_OPTIONS.find((r) => r.id === selectedRide)
  const calculatedFare = Math.round(baseFare * (ride?.multiplier || 1))

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
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={() => navigate('/app/search')} className="p-2 hover:bg-lavender/10 rounded-xl">
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Choose your ride</h1>
            <p className="text-sm text-gray-500">{state?.pickup ?? 'Pickup'} → {state?.destination ?? 'Destination'}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="h-64 lg:h-auto rounded-3xl overflow-hidden shadow-premium">
            <MapPlaceholder
              className="h-full min-h-[300px]"
              pickupCoords={state?.pickupCoords}
              dropCoords={state?.dropCoords}
              showRoute
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              {RIDE_OPTIONS.map((opt) => (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRide(opt.id)}
                  className={`w-full glass-card rounded-2xl p-4 flex items-center gap-4 text-left transition-all ${selectedRide === opt.id ? 'ring-2 ring-lavender bg-lavender/5' : ''}`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 dark:text-white">{opt.name}</p>
                    <p className="text-xs text-gray-500">{opt.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lavender">₹{Math.round(baseFare * opt.multiplier)}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 justify-end"><Clock className="w-3 h-3" />{opt.eta}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-lavender" /> Nearby Drivers
            </h3>
            {DRIVERS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDriver(d.id)}
                className={`w-full glass-card rounded-2xl p-4 flex items-center gap-3 text-left transition-all ${selectedDriver === d.id ? 'ring-2 ring-lavender bg-lavender/5' : ''}`}
              >
                <Avatar name={d.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{d.name}</p>
                    <VerificationBadge type="driver" size="sm" />
                  </div>
                  <p className="text-xs text-gray-500">{d.car}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-gray-500">{d.rating} · {d.trips} trips</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-lavender">{d.eta}</span>
              </button>
            ))}

            <GlassCard padding="p-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Estimated fare ({ride?.name})</span>
                <span className="font-bold text-lavender text-lg">₹{calculatedFare}</span>
              </div>
              <p className="text-xs text-gray-400">Includes safety fee & taxes</p>
            </GlassCard>

            <Button className="w-full" size="lg" onClick={handleConfirmRide}>
              Confirm {ride?.name}
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
