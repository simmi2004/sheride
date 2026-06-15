import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { MOCK_RIDES } from '../../data/mockData'

const FILTERS = ['all', 'completed', 'cancelled']

export default function UserRideHistory() {
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()
  const rides = MOCK_RIDES.filter((r) => filter === 'all' || r.status === filter)

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ride History</h1>

        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${filter === f ? 'gradient-primary text-white' : 'glass-card text-gray-600 dark:text-gray-300'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {rides.map((ride) => (
            <GlassCard key={ride.id} padding="p-5" hover>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={ride.status === 'completed' ? 'success' : 'danger'}>{ride.status}</Badge>
                    <span className="text-xs text-gray-500">{ride.id}</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">{ride.from} → {ride.to}</p>
                  <p className="text-sm text-gray-500 mt-1">{ride.date} · {ride.time} · {ride.driver}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lavender">₹{ride.fare}</p>
                  {ride.status === 'completed' && !ride.rating && (
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => navigate(`/app/rate/${ride.id}`)}>Rate</Button>
                  )}
                  {ride.rating && <p className="text-xs text-amber-500 mt-1">★ {ride.rating}</p>}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
