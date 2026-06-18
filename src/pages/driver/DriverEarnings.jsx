import { motion } from 'framer-motion'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import StatCard from '../../components/ui/StatCard'
import { EarningsChart } from '../../components/charts/Charts'
import { DRIVER_EARNINGS } from '../../data/mockData'
import { DollarSign, TrendingUp, Calendar } from 'lucide-react'

export default function DriverEarnings() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Earnings Analytics</h1>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: DollarSign, label: 'Today', value: `₹${DRIVER_EARNINGS.today}`, trend: 8 },
            { icon: TrendingUp, label: 'This Week', value: `₹${DRIVER_EARNINGS.week}`, trend: 15 },
            { icon: Calendar, label: 'This Month', value: `₹${DRIVER_EARNINGS.month}`, trend: 22 },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <StatCard {...s} delay={i * 0.1} />
            </motion.div>
          ))}
        </div>

        <GlassCard>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Weekly Breakdown</h2>
          <EarningsChart data={DRIVER_EARNINGS.chart} />
        </GlassCard>

        <div className="grid sm:grid-cols-2 gap-4">
          <GlassCard>
            <p className="text-sm text-gray-500">Avg per ride</p>
            <p className="text-3xl font-bold gradient-text mt-1">₹155</p>
          </GlassCard>
          <GlassCard>
            <p className="text-sm text-gray-500">Total rides (month)</p>
            <p className="text-3xl font-bold gradient-text mt-1">209</p>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
