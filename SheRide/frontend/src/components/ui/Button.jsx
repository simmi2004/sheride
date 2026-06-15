import { motion } from 'framer-motion'

const variants = {
  primary: 'gradient-primary text-white shadow-premium hover:shadow-premium-lg',
  secondary: 'bg-white dark:bg-white/10 text-lavender border-2 border-lavender/40 hover:border-lavender hover:bg-soft-pink/30 dark:hover:bg-lavender/10',
  ghost: 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-lavender/10',
  danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25',
  outline: 'border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:border-lavender hover:text-lavender',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-2xl',
  lg: 'px-7 py-3.5 text-base rounded-2xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  icon: Icon,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: props.disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled || loading ? 1 : 0.98 }}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </motion.button>
  )
}
