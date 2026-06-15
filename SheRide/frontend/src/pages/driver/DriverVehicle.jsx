import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import { Car, Edit } from 'lucide-react'

export default function DriverVehicle() {
  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vehicle Details</h1>
          <Button variant="ghost" size="sm" icon={Edit}>Edit</Button>
        </div>

        <GlassCard className="text-center">
          <div className="w-24 h-24 rounded-3xl bg-lavender/10 flex items-center justify-center mx-auto mb-4">
            <Car className="w-12 h-12 text-lavender" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Toyota Innova Crysta</h2>
          <p className="text-gray-500">Pearl White · 2022</p>
        </GlassCard>

        <GlassCard>
          <dl className="space-y-4">
            {[
              { l: 'License Plate', v: 'DL 01 AB 1234' },
              { l: 'Make & Model', v: 'Toyota Innova Crysta' },
              { l: 'Color', v: 'Pearl White' },
              { l: 'Year', v: '2022' },
              { l: 'Seats', v: '7' },
              { l: 'Insurance', v: 'Valid until Dec 2026' },
              { l: 'Registration', v: 'Valid until Mar 2027' },
            ].map((r) => (
              <div key={r.l} className="flex justify-between py-2 border-b border-lavender/10 last:border-0">
                <dt className="text-sm text-gray-500">{r.l}</dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-white">{r.v}</dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
