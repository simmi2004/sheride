import { useState } from 'react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import { MOCK_RIDES } from '../../data/mockData'

export default function AdminRideMonitoring() {
  const [filter, setFilter] = useState('all')
  const statuses = ['all', 'ongoing', 'completed', 'cancelled']
  const rides = MOCK_RIDES.map((r) => ({ ...r, status: r.status === 'completed' ? 'completed' : r.status }))
  const ongoing = { id: 'R005', from: 'Connaught Place', to: 'Saket', driver: 'Meera S.', rider: 'Priya S.', status: 'ongoing', fare: 180 }
  const allRides = [ongoing, ...rides]
  const filtered = filter === 'all' ? allRides : allRides.filter((r) => r.status === filter)

  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ride Monitoring</h1>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${filter === s ? 'gradient-primary text-white' : 'glass-card'}`}>{s}</button>
          ))}
        </div>
        <GlassCard padding="p-0" className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-lavender/10 bg-lavender/5">
                {['ID', 'Route', 'Rider', 'Driver', 'Fare', 'Status'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-lavender/5 hover:bg-lavender/5">
                  <td className="px-5 py-4 font-mono text-xs">{r.id}</td>
                  <td className="px-5 py-4">{r.from} → {r.to}</td>
                  <td className="px-5 py-4">{r.rider ?? '—'}</td>
                  <td className="px-5 py-4">{r.driver}</td>
                  <td className="px-5 py-4 font-semibold text-lavender">₹{r.fare}</td>
                  <td className="px-5 py-4">
                    <Badge variant={r.status === 'ongoing' ? 'warning' : r.status === 'completed' ? 'success' : 'danger'}>{r.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
