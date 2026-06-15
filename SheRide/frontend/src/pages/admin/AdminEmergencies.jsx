import { motion } from 'framer-motion'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { AlertTriangle, MapPin } from 'lucide-react'

const ALERTS = [
  { id: 'E001', user: 'Priya Sharma', location: 'Saket, New Delhi', time: '2 min ago', status: 'active', type: 'SOS' },
  { id: 'E002', user: 'Anika Mehta', location: 'Dwarka Sec 10', time: '15 min ago', status: 'responding', type: 'SOS' },
  { id: 'E003', user: 'Riya Kapoor', location: 'Karol Bagh', time: '1h ago', status: 'resolved', type: 'Check-in' },
]

export default function AdminEmergencies() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Emergency Alerts</h1>
          <Badge variant="danger" icon={AlertTriangle}>3 Active</Badge>
        </div>
        <div className="space-y-3">
          {ALERTS.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <GlassCard padding="p-5" className={a.status === 'active' ? 'ring-2 ring-red-500/50' : ''}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {a.status === 'active' && (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-gray-400">{a.id}</span>
                        <Badge variant={a.status === 'active' ? 'danger' : a.status === 'resolved' ? 'success' : 'warning'}>{a.status}</Badge>
                        <Badge variant="neutral">{a.type}</Badge>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">{a.user}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" />{a.location}</p>
                      <p className="text-xs text-gray-400 mt-1">{a.time}</p>
                    </div>
                  </div>
                  {a.status !== 'resolved' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Map</Button>
                      <Button size="sm" variant="danger">Dispatch Help</Button>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
