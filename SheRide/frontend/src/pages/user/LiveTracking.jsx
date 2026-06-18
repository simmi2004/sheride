import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Star } from 'lucide-react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
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

          <GlassCard padding="p-5">
            <div className="flex items-center gap-4 mb-4">
              <Avatar name={ride.driver} size="lg" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900 dark:text-white">{ride.driver}</p>
                  <VerificationBadge type="driver" size="sm" />
                </div>
                <p className="text-sm text-gray-500">Toyota Innova · DL 01 AB 1234</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-500">4.9 · 1,247 trips</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 rounded-xl bg-lavender/10 text-lavender"><Phone className="w-5 h-5" /></button>
                <button className="p-2.5 rounded-xl bg-lavender/10 text-lavender"><MessageCircle className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div className="p-3 rounded-xl bg-lavender/5">
                <p className="text-gray-500 text-xs">Pickup</p>
                <p className="font-medium text-gray-900 dark:text-white truncate">{ride.from}</p>
              </div>
              <div className="p-3 rounded-xl bg-lavender/5">
                <p className="text-gray-500 text-xs">Drop</p>
                <p className="font-medium text-gray-900 dark:text-white truncate">{ride.to}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4 px-1">
              <span className="text-sm text-gray-500">Fare Amount</span>
              <span className="font-bold text-lavender text-lg">₹{ride.fare}</span>
            </div>

            <div className="flex justify-center mb-4">
              <SOSButton />
            </div>

            <Button variant="outline" className="w-full" onClick={handleCompleteRide}>
              Complete Ride & Rate
            </Button>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
