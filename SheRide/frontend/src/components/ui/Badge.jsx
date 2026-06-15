const styles = {
  verified: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  lavender: 'bg-lavender/15 text-lavender border-lavender/30',
  pink: 'bg-soft-pink/60 dark:bg-soft-pink-dark/40 text-purple-deep dark:text-soft-pink border-soft-pink',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200',
  danger: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200',
  success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200',
  neutral: 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10',
}

export default function Badge({ children, variant = 'lavender', icon: Icon, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[variant]} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  )
}
