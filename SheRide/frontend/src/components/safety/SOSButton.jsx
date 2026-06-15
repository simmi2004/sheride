import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export default function SOSButton({ compact = false, className = '' }) {
  const [status, setStatus] = useState('idle')
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  let holdTimer = null
  let progressInterval = null

  const triggerSOS = useCallback(() => {
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1500)
    setTimeout(() => setStatus('idle'), 6000)
  }, [])

  function startHold() {
    if (status !== 'idle') return
    setHolding(true)
    setProgress(0)
    const start = Date.now()
    progressInterval = setInterval(() => {
      const p = Math.min((Date.now() - start) / 1500, 1)
      setProgress(p)
    }, 30)
    holdTimer = setTimeout(() => {
      clearInterval(progressInterval)
      setHolding(false)
      setProgress(0)
      triggerSOS()
    }, 1500)
  }

  function endHold() {
    clearTimeout(holdTimer)
    clearInterval(progressInterval)
    setHolding(false)
    setProgress(0)
  }

  const labels = { idle: 'SOS', sending: 'Sending…', sent: 'Help Sent' }

  if (compact) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onMouseDown={startHold}
        onMouseUp={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        className={`relative px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-bold ${status === 'sent' ? 'bg-emerald-500' : ''} ${className}`}
      >
        {labels[status]}
      </motion.button>
    )
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <motion.button
        onMouseDown={startHold}
        onMouseUp={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        disabled={status !== 'idle'}
        className={`relative w-36 h-36 rounded-full flex flex-col items-center justify-center gap-1 text-white font-bold sos-pulse ${
          status === 'sent' ? 'bg-emerald-500' : status === 'sending' ? 'bg-amber-500' : 'bg-red-500'
        } shadow-xl shadow-red-500/30 disabled:cursor-default`}
        whileHover={status === 'idle' ? { scale: 1.05 } : {}}
      >
        {holding && (
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
            <circle
              cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="3"
              strokeDasharray={`${progress * 289} 289`} strokeLinecap="round"
            />
          </svg>
        )}
        <AlertTriangle className="w-8 h-8" />
        <span className="text-sm uppercase tracking-wider">{labels[status]}</span>
      </motion.button>
      <AnimatePresence>
        {status === 'sent' && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold text-center"
          >
            Contacts & authorities notified with your location
          </motion.p>
        )}
      </AnimatePresence>
      {status === 'idle' && (
        <p className="text-xs text-gray-500 text-center max-w-[200px]">Hold for 1.5 seconds to trigger emergency alert</p>
      )}
    </div>
  )
}
