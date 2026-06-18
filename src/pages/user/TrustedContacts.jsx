import PageTransition from '../../components/ui/PageTransition'
import TrustedCircle from '../../components/safety/TrustedCircle'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import { Plus, Share2 } from 'lucide-react'

export default function TrustedContacts() {
  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trusted Contacts</h1>
          <p className="text-sm text-gray-500 mt-1">People who receive your live ride updates and SOS alerts</p>
        </div>

        <GlassCard>
          <div className="flex items-center gap-3 mb-2">
            <Share2 className="w-5 h-5 text-lavender" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Auto-share rides</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">Automatically share trip details with your trusted circle when you start a ride.</p>
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Enabled for all rides</span>
            <span className="w-10 h-6 rounded-full bg-emerald-500 relative"><span className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" /></span>
          </div>
        </GlassCard>

        <TrustedCircle />

        <Button icon={Plus} className="w-full">Add Trusted Contact</Button>
      </div>
    </PageTransition>
  )
}
