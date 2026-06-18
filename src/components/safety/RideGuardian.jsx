import { Shield, Eye, Bell, MapPin } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import Toggle from '../ui/Toggle'
import { useState } from 'react'

const features = [
  { icon: Eye, title: 'Trip Monitoring', desc: 'AI watches for route deviations' },
  { icon: Bell, title: 'Auto Check-ins', desc: 'Periodic safety confirmations' },
  { icon: MapPin, title: 'Geo-fencing', desc: 'Alerts on unexpected stops' },
]

export default function RideGuardian({ compact = false }) {
  const [enabled, setEnabled] = useState(true)

  if (compact) {
    return (
      <GlassCard padding="p-4" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-gray-900 dark:text-white">Ride Guardian</p>
          <p className="text-xs text-gray-500">{enabled ? 'Active on this trip' : 'Disabled'}</p>
        </div>
        <Toggle enabled={enabled} onChange={setEnabled} />
      </GlassCard>
    )
  }

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Ride Guardian</h3>
            <p className="text-sm text-gray-500">AI-powered trip protection</p>
          </div>
        </div>
        <Toggle enabled={enabled} onChange={setEnabled} label="" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-3 rounded-2xl bg-lavender/5 dark:bg-lavender/10">
            <Icon className="w-4 h-4 text-lavender mb-2" />
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
