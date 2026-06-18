import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import SOSButton from '../../components/safety/SOSButton'
import Toggle from '../../components/ui/Toggle'
import { useState } from 'react'
import { Shield, Phone } from 'lucide-react'

export default function DriverSafety() {
  const [shareLocation, setShareLocation] = useState(true)
  const [nightMode, setNightMode] = useState(true)

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Safety Features</h1>

        <div className="flex justify-center"><SOSButton /></div>

        <GlassCard className="space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Shield className="w-5 h-5 text-lavender" /> Driver Safety</h3>
          <Toggle enabled={shareLocation} onChange={setShareLocation} label="Share live location" description="Share your location with SheRide safety team during rides" />
          <Toggle enabled={nightMode} onChange={setNightMode} label="Night mode alerts" description="Enhanced monitoring during late-night shifts" />
          <Toggle enabled={true} onChange={() => {}} label="Audio recording" description="Optional trip audio for safety disputes" />
        </GlassCard>

        <GlassCard padding="p-4" className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-lavender" />
          <div className="flex-1">
            <p className="font-semibold text-sm text-gray-900 dark:text-white">24/7 Safety Hotline</p>
            <p className="text-xs text-gray-500">1800-SHE-RIDE</p>
          </div>
          <button className="text-sm text-lavender font-semibold">Call</button>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
