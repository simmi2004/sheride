import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import { NOTIFICATIONS } from '../../data/mockData'
import { Bell, Shield, Car, CreditCard, Info } from 'lucide-react'

const ICONS = { ride: Car, safety: Shield, payment: CreditCard, info: Info }

export default function UserNotifications() {
  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <button className="text-sm text-lavender font-semibold">Mark all read</button>
        </div>

        <div className="space-y-3">
          {NOTIFICATIONS.map((n) => {
            const Icon = ICONS[n.type] ?? Bell
            return (
              <GlassCard key={n.id} padding="p-4" className={`flex gap-4 ${!n.read ? 'ring-1 ring-lavender/30' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${!n.read ? 'gradient-primary' : 'bg-gray-100 dark:bg-white/5'}`}>
                  <Icon className={`w-5 h-5 ${!n.read ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{n.title}</p>
                    {!n.read && <Badge variant="lavender">New</Badge>}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </PageTransition>
  )
}
