import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Search, Star, Shield } from 'lucide-react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import StatCard from '../../components/ui/StatCard'
import MapPlaceholder from '../../components/map/MapPlaceholder'
import SafetyScoreCard from '../../components/safety/SafetyScoreCard'
import VerificationBadge from '../../components/safety/VerificationBadge'
import { useAuth } from '../../context/AuthContext'
import { MOCK_RIDES, FAVORITE_PLACES } from '../../data/mockData'

export default function UserHome() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hello, {firstName} 👋</h1>
            <p className="text-gray-500 text-sm mt-1">Where would you like to go today?</p>
          </div>
          <VerificationBadge type="user" />
        </div>

        <GlassCard padding="p-0" className="overflow-hidden">
          <div className="relative h-48 sm:h-64">
            <MapPlaceholder className="absolute inset-0" />
            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={() => navigate('/app/search')}
                className="w-full flex items-center gap-3 p-4 rounded-2xl glass shadow-premium text-left"
              >
                <Search className="w-5 h-5 text-lavender" />
                <span className="text-gray-500 text-sm">Search destination...</span>
              </button>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FAVORITE_PLACES.map((place) => (
            <motion.button
              key={place.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/app/search')}
              className="glass-card rounded-2xl p-4 text-left"
            >
              <span className="text-2xl">{place.icon}</span>
              <p className="font-semibold text-sm text-gray-900 dark:text-white mt-2">{place.name}</p>
              <p className="text-xs text-gray-500 truncate">{place.address}</p>
            </motion.button>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard icon={MapPin} label="Total Rides" value="24" delay={0.1} />
          <StatCard icon={Star} label="Avg Rating" value="4.8" delay={0.2} />
          <StatCard icon={Shield} label="Safety Score" value="94" delay={0.3} />
        </div>

        <SafetyScoreCard score={94} />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 dark:text-white">Recent Rides</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/app/history')}>View all</Button>
          </div>
          <div className="space-y-3">
            {MOCK_RIDES.slice(0, 3).map((ride) => (
              <GlassCard key={ride.id} padding="p-4" hover onClick={() => navigate('/app/history')}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{ride.from} → {ride.to}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{ride.date} · {ride.driver}</p>
                  </div>
                  <span className="font-bold text-lavender">₹{ride.fare}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={() => navigate('/app/search')}>Book a Ride</Button>
      </div>
    </PageTransition>
  )
}
