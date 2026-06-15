import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Toggle from '../../components/ui/Toggle'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useState } from 'react'

export default function AdminSettings() {
  const [maintenance, setMaintenance] = useState(false)
  const [autoVerify, setAutoVerify] = useState(false)

  return (
    <PageTransition>
      <div className="max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

        <GlassCard className="space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Platform</h3>
          <Toggle enabled={maintenance} onChange={setMaintenance} label="Maintenance Mode" description="Temporarily disable new bookings" />
          <Toggle enabled={autoVerify} onChange={setAutoVerify} label="Auto-verify drivers" description="Skip manual review for trusted applicants" />
        </GlassCard>

        <GlassCard className="space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Pricing</h3>
          <Input label="Base Fare (₹)" defaultValue="80" />
          <Input label="Per KM Rate (₹)" defaultValue="15" />
          <Input label="Safety Fee (₹)" defaultValue="10" />
          <Button size="sm">Save Pricing</Button>
        </GlassCard>

        <GlassCard className="space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
          <Toggle enabled={true} onChange={() => {}} label="Emergency alerts" description="Instant notifications for SOS events" />
          <Toggle enabled={true} onChange={() => {}} label="Daily reports" description="Email summary of platform metrics" />
        </GlassCard>
      </div>
    </PageTransition>
  )
}
