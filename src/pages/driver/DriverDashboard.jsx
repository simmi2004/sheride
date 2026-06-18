import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import PageTransition from '../../components/ui/PageTransition'
import StatCard from '../../components/ui/StatCard'
import GlassCard from '../../components/ui/GlassCard'
import { EarningsChart } from '../../components/charts/Charts'
import { TrendingUp, Star, Clock, Car } from 'lucide-react'
import { DRIVER_EARNINGS, DRIVER_REQUESTS } from '../../data/mockData'
import Button from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'

export default function DriverDashboard() {
  const { online } = useOutletContext() ?? { online: true }
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-500">{online ? 'You\'re online and accepting rides' : 'Go online to start earning'}</p>
          </div>
          <motion.span
            animate={{ scale: online ? [1, 1.1, 1] : 1 }}
            transition={{ repeat: online ? Infinity : 0, duration: 2 }}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${online ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-gray-100 text-gray-500'}`}
          >
            {online ? '● Online' : '○ Offline'}
          </motion.span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={TrendingUp} label="Today's Earnings" value={`₹${DRIVER_EARNINGS.today}`} trend={12} delay={0} />
          <StatCard icon={Car} label="Rides Today" value="8" delay={0.1} />
          <StatCard icon={Star} label="Rating" value="4.9" delay={0.2} />
          <StatCard icon={Clock} label="Online Hours" value="6.5h" delay={0.3} />
        </div>

        {online && DRIVER_REQUESTS.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-3">Incoming Requests</h2>
            {DRIVER_REQUESTS.map((req) => (
              <motion.div key={req.id} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <GlassCard padding="p-5" className="mb-3">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{req.rider}</p>
                      <p className="text-sm text-gray-500">{req.pickup} → {req.drop}</p>
                    </div>
                    <span className="font-bold text-lavender">₹{req.fare}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500 mb-4">
                    <span>{req.distance}</span><span>{req.eta}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Decline</Button>
                    <Button size="sm" className="flex-1" onClick={() => navigate('/driver/navigation')}>Accept</Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}

        <GlassCard>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Weekly Earnings</h2>
          <EarningsChart data={DRIVER_EARNINGS.chart} />
        </GlassCard>
      </div>
    </PageTransition>
  )
}
