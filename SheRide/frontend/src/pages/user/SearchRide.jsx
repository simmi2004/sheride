import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Navigation, Clock } from 'lucide-react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import BottomSheet from '../../components/ui/BottomSheet'
import MapPlaceholder from '../../components/map/MapPlaceholder'
import { FAVORITE_PLACES } from '../../data/mockData'

export default function SearchRide() {
  const navigate = useNavigate()
  const [pickup, setPickup] = useState('Current Location')
  const [destination, setDestination] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)

  function handleSearch() {
    if (destination) {
      navigate('/app/rides/select', { state: { pickup, destination } })
    }
  }

  return (
    <PageTransition className="fixed inset-0 lg:relative lg:inset-auto flex flex-col -m-4 md:-m-6">
      <div className="flex-1 relative">
        <MapPlaceholder className="absolute inset-0 h-full" showRoute={!!destination} />

        <div className="absolute top-4 left-4 right-4 z-10 max-w-lg mx-auto space-y-3">
          <GlassCard padding="p-4" className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-lavender ring-4 ring-lavender/20" />
              <Input placeholder="Pickup location" value={pickup} onChange={(e) => setPickup(e.target.value)} className="flex-1" />
            </div>
            <div className="w-0.5 h-4 bg-lavender/30 ml-1.5" />
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-purple-deep dark:text-lavender flex-shrink-0" />
              <Input placeholder="Where to?" value={destination} onChange={(e) => setDestination(e.target.value)} className="flex-1" />
            </div>
          </GlassCard>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {FAVORITE_PLACES.map((p) => (
              <button key={p.id} onClick={() => setDestination(p.address)} className="flex-shrink-0 glass-card rounded-xl px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200">
                {p.icon} {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <GlassCard padding="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Est. 12 min · 4.2 km</span>
              </div>
              <button onClick={() => setSheetOpen(true)} className="text-sm text-lavender font-semibold">Fare details</button>
            </div>
            <Button className="w-full" size="lg" onClick={handleSearch} disabled={!destination}>
              <Navigation className="w-4 h-4" /> Find Rides
            </Button>
          </GlassCard>
        </div>
      </div>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Estimated Fare">
        <div className="space-y-3 text-sm">
          {[{ l: 'Base fare', v: '₹80' }, { l: 'Distance (4.2 km)', v: '₹65' }, { l: 'Time', v: '₹25' }, { l: 'Safety fee', v: '₹10' }].map((r) => (
            <div key={r.l} className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>{r.l}</span><span>{r.v}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg pt-3 border-t border-lavender/20">
            <span>Total</span><span className="text-lavender">₹180</span>
          </div>
        </div>
      </BottomSheet>
    </PageTransition>
  )
}
