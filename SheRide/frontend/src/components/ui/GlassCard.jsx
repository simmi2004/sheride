import { motion } from 'framer-motion'

export default function GlassCard({
  children,
  className = '',
  hover = false,
  padding = 'p-6',
  onClick,
}) {
  const Component = onClick ? motion.button : motion.div

  return (
    <Component
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4, boxShadow: '0 16px 48px rgba(181,126,220,0.2)' } : undefined}
      transition={{ duration: 0.3 }}
      className={`glass-card rounded-3xl ${padding} ${hover ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </Component>
  )
}
