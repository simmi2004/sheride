import { motion } from 'framer-motion'
import GlassCard from './GlassCard'

export default function StatCard({ icon: Icon, label, value, trend, delay = 0, className = '' }) {
  return (
    <GlassCard className={className} padding="p-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
            {Icon && <Icon className="w-5 h-5 text-white" />}
          </div>
          {trend && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend > 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
      </motion.div>
    </GlassCard>
  )
}
