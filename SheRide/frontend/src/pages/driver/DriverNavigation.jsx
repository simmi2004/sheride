import PageTransition from '../../components/ui/PageTransition'
import MapPlaceholder from '../../components/map/MapPlaceholder'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import { Navigation, Phone, CheckCircle } from 'lucide-react'

export default function DriverNavigation() {
  return (
    <PageTransition className="fixed inset-0 lg:relative lg:inset-auto flex flex-col -m-4 md:-m-6">
      <div className="flex-1 relative">
        <MapPlaceholder className="absolute inset-0 h-full" showRoute />
        <div className="absolute top-4 left-4 right-4 z-10 max-w-lg mx-auto">
          <GlassCard padding="p-4" className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-lavender" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Navigate to pickup</p>
              <p className="text-xs text-gray-500">Connaught Place · 1.2 km away</p>
            </div>
            <span className="text-sm font-bold text-lavender">4 min</span>
          </GlassCard>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 max-w-lg mx-auto w-full">
          <GlassCard padding="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Avatar name="Priya Sharma" size="lg" />
              <div className="flex-1">
                <p className="font-bold text-gray-900 dark:text-white">Priya Sharma</p>
                <p className="text-sm text-gray-500">Pickup → Saket</p>
              </div>
              <button className="p-2.5 rounded-xl bg-lavender/10 text-lavender"><Phone className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm" icon={CheckCircle}>Arrived</Button>
            </div>
            <Button className="w-full" size="lg">Start Trip</Button>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
