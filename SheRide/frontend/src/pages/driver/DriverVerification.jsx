import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import VerificationBadge from '../../components/safety/VerificationBadge'
import { CheckCircle, Clock, Upload } from 'lucide-react'

const STEPS = [
  { title: 'Identity Verification', status: 'completed', desc: 'Government ID verified' },
  { title: 'Background Check', status: 'completed', desc: 'Criminal record cleared' },
  { title: 'Vehicle Inspection', status: 'completed', desc: 'Vehicle meets safety standards' },
  { title: 'In-Person Interview', status: 'completed', desc: 'Safety training completed' },
  { title: 'Annual Renewal', status: 'pending', desc: 'Due in 45 days' },
]

export default function DriverVerification() {
  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Verification</h1>
          <VerificationBadge type="driver" className="mt-2" />
        </div>

        <GlassCard className="text-center">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fully Verified</h2>
          <p className="text-sm text-gray-500 mt-1">Your profile meets all SheRide safety requirements</p>
        </GlassCard>

        <div className="space-y-3">
          {STEPS.map((step) => (
            <GlassCard key={step.title} padding="p-4" className="flex items-center gap-4">
              {step.status === 'completed' ? (
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              ) : (
                <Clock className="w-6 h-6 text-amber-500 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{step.title}</p>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </div>
              <Badge variant={step.status === 'completed' ? 'success' : 'warning'}>{step.status}</Badge>
            </GlassCard>
          ))}
        </div>

        <GlassCard padding="p-4" className="flex items-center justify-between border-dashed">
          <span className="text-sm text-gray-600 dark:text-gray-300">Update documents</span>
          <button className="flex items-center gap-1 text-sm text-lavender font-semibold"><Upload className="w-4 h-4" /> Upload</button>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
