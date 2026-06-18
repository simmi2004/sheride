import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Star } from 'lucide-react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Avatar from '../../components/ui/Avatar'
import MapPlaceholder from '../../components/map/MapPlaceholder'
import LiveSharingCard from '../../components/safety/LiveSharingCard'
import RideGuardian from '../../components/safety/RideGuardian'
import VerificationBadge from '../../components/safety/VerificationBadge'
import SOSButton from '../../components/safety/SOSButton'
import { getLocalStorageRides, updateLocalStorageRideStatus } from '../../services/rideStorage'

export default function LiveTracking() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Find ride in localStorage
  const rides = getLocalStorageRides()
  const ride = rides.find((r) => r.id === id) || {
    id: id || 'R005',
    from: 'Connaught Place',
    to: 'Saket',
    driver: 'Meera Singh',
    fare: 180,
    pickupCoords: [28.6304, 77.2177],
    dropCoords: [28.5244, 77.2066],
    status: 'ongoing'
  }

  const handleCompleteRide = () => {
    updateLocalStorageRideStatus(ride.id, 'completed')
    navigate(`/app/rate/${ride.id}`)
  }

  return (
    <PageTransition className="fixed inset-0 lg:relative lg:inset-auto lg:h-[calc(100vh-96px)] lg:min-h-[500px] flex flex-col -m-4 md:-m-6">
      <div className="flex-1 relative">
        <MapPlaceholder
          className="absolute inset-0 h-full"
          pickupCoords={ride.pickupCoords}
          dropCoords={ride.dropCoords}
          showRoute
        />

        <div className="absolute top-4 left-4 right-4 z-10 max-w-lg mx-auto">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <GlassCard padding="p-3" className="flex items-center gap-3">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-3 h-3 rounded-full bg-emerald-500" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {ride.status === 'completed' ? 'Ride Completed' : 'Driver arriving in 4 min'}
                </p>
                <p className="text-xs text-gray-500">{ride.driver} is on the way</p>
              </div>
              <span className="text-xs font-bold text-lavender">{ride.status.toUpperCase()}</span>
            </GlassCard>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 max-w-lg mx-auto w-full space-y-3">
          <LiveSharingCard active contacts={2} />
          <RideGuardian compact />

          <GlassCard padding="p-5" className="border border-gray-100 dark:border-gray-850 rounded-3xl shadow-premium-lg">
            <div className="flex items-center gap-4 mb-4">
              <Avatar name={ride.driver} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900 dark:text-white truncate">{ride.driver}</p>
                  <VerificationBadge type="driver" size="sm" />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Toyota Innova · DL 01 AB 1234</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">4.9 · 1,247 trips</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-800 dark:text-white transition-all cursor-pointer"><Phone className="w-4.5 h-4.5" /></button>
                <button className="p-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-800 dark:text-white transition-all cursor-pointer"><MessageCircle className="w-4.5 h-4.5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-750">
                <p className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider">Pickup</p>
                <p className="font-bold text-gray-900 dark:text-white truncate text-xs mt-0.5">{ride.from}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-750">
                <p className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider">Drop</p>
                <p className="font-bold text-gray-900 dark:text-white truncate text-xs mt-0.5">{ride.to}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4 px-1">
              <span className="text-sm font-bold text-gray-500">Fare Amount</span>
              <span className="font-black text-gray-900 dark:text-white text-lg">₹{ride.fare}</span>
            </div>

            <div className="flex justify-center mb-4">
              <SOSButton />
            </div>

            <button
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-extrabold text-base rounded-2xl hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-all cursor-pointer shadow-lg select-none"
              onClick={handleCompleteRide}
            >
              Complete Ride & Rate
            </button>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
