import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const COMPLAINTS = [
  { id: 'C001', user: 'Riya Kapoor', type: 'Ride issue', desc: 'Driver took longer route than expected', status: 'open', date: '14 Jun' },
  { id: 'C002', user: 'Anika Mehta', type: 'Payment', desc: 'Double charged for ride R002', status: 'investigating', date: '13 Jun' },
  { id: 'C003', user: 'Priya Sharma', type: 'Safety', desc: 'Concern about driver behavior', status: 'resolved', date: '10 Jun' },
]

export default function AdminComplaints() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Complaint Management</h1>
        <div className="space-y-3">
          {COMPLAINTS.map((c) => (
            <GlassCard key={c.id} padding="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-gray-400">{c.id}</span>
                    <Badge variant={c.status === 'resolved' ? 'success' : c.status === 'open' ? 'danger' : 'warning'}>{c.status}</Badge>
                    <Badge variant="neutral">{c.type}</Badge>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">{c.user}</p>
                  <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
                  <p className="text-xs text-gray-400 mt-2">{c.date}</p>
                </div>
                {c.status !== 'resolved' && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Assign</Button>
                    <Button size="sm">Resolve</Button>
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
