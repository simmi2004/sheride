import PageTransition from '../../components/ui/PageTransition'
import MapPlaceholder from '../../components/map/MapPlaceholder'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import { Navigation } from 'lucide-react'

const DRIVERS_ON_MAP = [
  { name: 'Meera S.', status: 'on-trip', top: '35%', left: '25%' },
  { name: 'Anjali R.', status: 'available', top: '55%', left: '60%' },
  { name: 'Priya K.', status: 'available', top: '25%', left: '70%' },
  { name: 'Sunita M.', status: 'offline', top: '70%', left: '40%' },
]

export default function AdminLiveMap() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Live Drivers Map</h1>
          <div className="flex gap-2">
            <Badge variant="success">12 Online</Badge>
            <Badge variant="warning">5 On Trip</Badge>
          </div>
        </div>
        <GlassCard padding="p-0" className="overflow-hidden h-[500px] relative">
          <MapPlaceholder className="absolute inset-0 h-full" />
          {DRIVERS_ON_MAP.map((d) => (
            <div key={d.name} className="absolute z-10 flex flex-col items-center" style={{ top: d.top, left: d.left }}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${d.status === 'on-trip' ? 'bg-amber-500' : d.status === 'available' ? 'gradient-primary' : 'bg-gray-400'}`}>
                <Navigation className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-semibold bg-white/90 dark:bg-black/70 px-1.5 py-0.5 rounded mt-1">{d.name}</span>
            </div>
          ))}
        </GlassCard>
      </div>
    </PageTransition>
  )
}
