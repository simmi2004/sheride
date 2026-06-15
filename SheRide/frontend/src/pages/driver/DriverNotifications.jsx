import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import { Bell } from 'lucide-react'

const ALERTS = [
  { title: 'New ride request', msg: 'Priya S. needs a ride from Connaught Place', time: '2 min ago', new: true },
  { title: 'Weekly earnings summary', msg: 'You earned ₹8,420 this week', time: '1d ago', new: false },
  { title: 'Verification renewal', msg: 'Annual renewal due in 45 days', time: '3d ago', new: false },
]

export default function DriverNotifications() {
  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <div className="space-y-3">
          {ALERTS.map((a) => (
            <GlassCard key={a.title} padding="p-4" className={`flex gap-3 ${a.new ? 'ring-1 ring-lavender/30' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${a.new ? 'gradient-primary' : 'bg-gray-100 dark:bg-white/5'}`}>
                <Bell className={`w-5 h-5 ${a.new ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{a.title}</p>
                  {a.new && <Badge variant="lavender">New</Badge>}
                </div>
                <p className="text-sm text-gray-500">{a.msg}</p>
                <p className="text-xs text-gray-400 mt-1">{a.time}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
