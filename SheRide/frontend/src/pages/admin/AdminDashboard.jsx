import PageTransition from '../../components/ui/PageTransition'
import StatCard from '../../components/ui/StatCard'
import GlassCard from '../../components/ui/GlassCard'
import { EarningsChart, RideDistributionChart } from '../../components/charts/Charts'
import { ADMIN_STATS, DRIVER_EARNINGS } from '../../data/mockData'
import { Users, Car, DollarSign, AlertTriangle } from 'lucide-react'

const RIDE_DIST = [
  { name: 'SheGo', value: 45 },
  { name: 'ShePlus', value: 35 },
  { name: 'SheXL', value: 20 },
]

export default function AdminDashboard() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Users" value={ADMIN_STATS.totalUsers.toLocaleString()} trend={8} />
          <StatCard icon={Car} label="Active Drivers" value={ADMIN_STATS.activeDrivers.toLocaleString()} trend={5} />
          <StatCard icon={DollarSign} label="Revenue (Month)" value={`₹${(ADMIN_STATS.revenue / 100000).toFixed(1)}L`} trend={18} />
          <StatCard icon={AlertTriangle} label="Active Emergencies" value={ADMIN_STATS.emergencies} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <GlassCard>
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Weekly Revenue</h2>
            <EarningsChart data={DRIVER_EARNINGS.chart.map((d) => ({ ...d, amount: d.amount * 50 }))} />
          </GlassCard>
          <GlassCard>
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Ride Distribution</h2>
            <RideDistributionChart data={RIDE_DIST} />
          </GlassCard>
        </div>

        <GlassCard>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { action: 'New driver verification pending', user: 'Sunita Rao', time: '5 min ago' },
              { action: 'SOS alert resolved', user: 'Priya Sharma', time: '1h ago' },
              { action: 'New user registered', user: 'Anika Mehta', time: '2h ago' },
              { action: 'Complaint filed', user: 'Riya Kapoor', time: '3h ago' },
            ].map((a) => (
              <div key={a.action} className="flex justify-between items-center py-2 border-b border-lavender/10 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{a.action}</p>
                  <p className="text-xs text-gray-500">{a.user}</p>
                </div>
                <span className="text-xs text-gray-400">{a.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
