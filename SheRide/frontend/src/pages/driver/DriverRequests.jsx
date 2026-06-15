import { motion } from 'framer-motion'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import { DRIVER_REQUESTS } from '../../data/mockData'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock } from 'lucide-react'

export default function DriverRequests() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ride Requests</h1>
        <div className="space-y-4">
          {DRIVER_REQUESTS.map((req, i) => (
            <motion.div key={req.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <GlassCard padding="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600">New Request</span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white text-lg mb-1">{req.rider}</p>
                <div className="space-y-2 my-4">
                  <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-lavender" />{req.pickup}</div>
                  <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-purple-deep" />{req.drop}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{req.eta}</span>
                  <span>{req.distance}</span>
                  <span className="font-bold text-lavender text-base">₹{req.fare}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Decline</Button>
                  <Button className="flex-1" onClick={() => navigate('/driver/navigation')}>Accept Ride</Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
