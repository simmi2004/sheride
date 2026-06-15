import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import StatCard from '../../components/ui/StatCard'
import { EarningsChart, RideDistributionChart } from '../../components/charts/Charts'
import { DRIVER_EARNINGS } from '../../data/mockData'
import { TrendingUp, Users, Car } from 'lucide-react'

const RIDE_DIST = [
  { name: 'SheGo', value: 45 },
  { name: 'ShePlus', value: 35 },
  { name: 'SheXL', value: 20 },
]

export default function AdminAnalytics() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={TrendingUp} label="Growth Rate" value="18%" trend={18} />
          <StatCard icon={Users} label="New Users (Week)" value="342" trend={12} />
          <StatCard icon={Car} label="Rides/Day Avg" value="3,420" trend={8} />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <GlassCard><h2 className="font-bold mb-4 text-gray-900 dark:text-white">Ride Volume</h2><EarningsChart data={DRIVER_EARNINGS.chart.map((d) => ({ day: d.day, amount: d.amount * 3 }))} /></GlassCard>
          <GlassCard><h2 className="font-bold mb-4 text-gray-900 dark:text-white">Service Mix</h2><RideDistributionChart data={RIDE_DIST} /></GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
