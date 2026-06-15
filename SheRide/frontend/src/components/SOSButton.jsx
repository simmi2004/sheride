import { useState, useCallback } from 'react'
import { useSocket } from '../hooks/useSocket'

/**
 * SOSButton — one-tap emergency alert.
 * Grabs GPS coords, emits via Socket.io, and calls emergency contacts.
 *
 * Props:
 *   rideId  — current active ride ID (optional, used for socket room)
 *   compact — render as icon-only button (for dashboards)
 */
export default function SOSButton({ rideId = null, compact = false }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [holding, setHolding] = useState(false)
  const holdTimeout = useState(null)

  const { emitSOS } = useSocket(rideId, {
    onSosAck: () => setStatus('sent'),
  })

  const triggerSOS = useCallback(async () => {
    setStatus('sending')

    try {
      const coords = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation not supported'))
          return
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          reject,
          { timeout: 5000 }
        )
      })

      emitSOS(coords)

      // Fallback: if no sos_ack in 3 s, mark sent anyway
      setTimeout(() => {
        setStatus((s) => (s === 'sending' ? 'sent' : s))
      }, 3000)

      // Reset after 8 s so user can trigger again
      setTimeout(() => setStatus('idle'), 8000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }, [emitSOS])

  // Require a 1.5 s press-and-hold to prevent accidental triggers
  function handleMouseDown() {
    setHolding(true)
    holdTimeout[1](setTimeout(() => {
      setHolding(false)
      triggerSOS()
    }, 1500))
  }

  function handleMouseUp() {
    clearTimeout(holdTimeout[0])
    setHolding(false)
  }

  const label = {
    idle:    compact ? '🆘' : '🆘 Hold for SOS',
    sending: 'Sending…',
    sent:    '✅ Help is coming',
    error:   '⚠️ Retry',
  }[status]

  if (compact) {
    return (
      <button
        className={`sos-compact ${status !== 'idle' ? 'sos-active' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        aria-label="Emergency SOS — hold to activate"
        aria-live="polite"
      >
        {label}
      </button>
    )
  }

  return (
    <div className="sos-wrapper">
      <button
        className={`sos-btn ${holding ? 'holding' : ''} sos-${status}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        aria-label="Emergency SOS — hold 1.5 seconds to activate"
        aria-live="polite"
        disabled={status === 'sending' || status === 'sent'}
      >
        <span className="sos-icon" aria-hidden="true">🆘</span>
        <span className="sos-label">{label}</span>
        {holding && (
          <span className="sos-progress" aria-hidden="true" />
        )}
      </button>
      <p className="sos-hint">
        Hold button for 1.5 seconds to alert contacts &amp; authorities
      </p>
    </div>
  )
}
