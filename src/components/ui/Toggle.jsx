import { motion } from 'framer-motion'

export default function Toggle({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        {label && <p className="font-semibold text-gray-800 dark:text-gray-100">{label}</p>}
        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative w-14 h-8 rounded-full transition-colors ${enabled ? 'bg-lavender' : 'bg-gray-200 dark:bg-white/10'}`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md ${enabled ? 'left-7' : 'left-1'}`}
        />
      </button>
    </div>
  )
}
