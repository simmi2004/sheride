import { forwardRef } from 'react'

const Input = forwardRef(function Input({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}, ref) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender/60" />
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-2xl border border-lavender/20 bg-white/80 dark:bg-white/5 dark:border-white/10 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-lavender transition-all ${Icon ? 'pl-10' : ''} ${error ? 'border-red-400 focus:ring-red-300' : ''}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
})

export default Input
