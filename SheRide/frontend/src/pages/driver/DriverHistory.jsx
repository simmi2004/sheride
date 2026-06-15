import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import { MOCK_RIDES } from '../../data/mockData'

export default function DriverHistory() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ride History</h1>
        <div className="space-y-3">
          {MOCK_RIDES.filter((r) => r.status === 'completed').map((ride) => (
            <GlassCard key={ride.id} padding="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{ride.from} → {ride.to}</p>
                  <p className="text-sm text-gray-500 mt-1">{ride.date} · {ride.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lavender">₹{ride.fare}</p>
                  <Badge variant="success" className="mt-1">Completed</Badge>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
