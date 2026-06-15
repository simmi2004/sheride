import { useState } from 'react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { ADMIN_DRIVERS } from '../../data/mockData'

const FILTERS = ['all', 'verified', 'pending']

export default function AdminDriverVerification() {
  const [filter, setFilter] = useState('all')
  const drivers = ADMIN_DRIVERS.filter((d) => filter === 'all' || d.status === filter)

  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Driver Verification</h1>

        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${filter === f ? 'gradient-primary text-white' : 'glass-card text-gray-600'}`}>
              {f} {f === 'pending' && `(${ADMIN_DRIVERS.filter((d) => d.status === 'pending').length})`}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {drivers.map((d) => (
            <GlassCard key={d.id} padding="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{d.name}</p>
                    <Badge variant={d.status === 'verified' ? 'verified' : 'warning'}>{d.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{d.email} · {d.vehicle}</p>
                  <p className="text-xs text-gray-400 mt-1">★ {d.rating} · {d.rides} rides</p>
                </div>
                {d.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reject</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
