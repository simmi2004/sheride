import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import { RevenueBarChart } from '../../components/charts/Charts'

const REVENUE_DATA = [
  { month: 'Jan', revenue: 980000 },
  { month: 'Feb', revenue: 1050000 },
  { month: 'Mar', revenue: 1120000 },
  { month: 'Apr', revenue: 1080000 },
  { month: 'May', revenue: 1180000 },
  { month: 'Jun', revenue: 1240000 },
]

export default function AdminRevenue() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue Reports</h1>
        <div className="grid sm:grid-cols-3 gap-4">
          {[{ l: 'This Month', v: '₹12.4L' }, { l: 'Last Month', v: '₹11.8L' }, { l: 'YoY Growth', v: '+24%' }].map((s) => (
            <GlassCard key={s.l} padding="p-5">
              <p className="text-sm text-gray-500">{s.l}</p>
              <p className="text-2xl font-bold gradient-text mt-1">{s.v}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Monthly Revenue</h2>
          <RevenueBarChart data={REVENUE_DATA} />
        </GlassCard>
      </div>
    </PageTransition>
  )
}
