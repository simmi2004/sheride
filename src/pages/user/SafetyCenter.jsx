import PageTransition from '../../components/ui/PageTransition'
import SafetyScoreCard from '../../components/safety/SafetyScoreCard'
import RideGuardian from '../../components/safety/RideGuardian'
import TrustedCircle from '../../components/safety/TrustedCircle'
import LiveSharingCard from '../../components/safety/LiveSharingCard'
import SOSButton from '../../components/safety/SOSButton'
import GlassCard from '../../components/ui/GlassCard'
import { Shield, Phone, MapPin, Eye } from 'lucide-react'

const TIPS = [
  { icon: Phone, title: 'Share your trip', desc: 'Always share ride details with someone you trust' },
  { icon: MapPin, title: 'Verify the car', desc: 'Check license plate and driver photo before entering' },
  { icon: Eye, title: 'Stay alert', desc: 'Keep your phone charged and location services on' },
]

export default function SafetyCenter() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Safety Center</h1>
          <p className="text-sm text-gray-500 mt-1">Your complete safety toolkit for every ride</p>
        </div>

        <div className="flex justify-center py-4">
          <SOSButton />
        </div>

        <SafetyScoreCard score={94} />
        <RideGuardian />
        <LiveSharingCard active contacts={2} />
        <TrustedCircle showAdd={false} />

        <div>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-lavender" /> Safety Tips
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {TIPS.map(({ icon: Icon, title, desc }) => (
              <GlassCard key={title} padding="p-4">
                <Icon className="w-5 h-5 text-lavender mb-2" />
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{title}</p>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
