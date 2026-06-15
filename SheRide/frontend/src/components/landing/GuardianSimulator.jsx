import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, BellRing, Phone, Send, UserCheck, AlertOctagon, RefreshCw, Smartphone } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import Button from '../ui/Button'

export default function GuardianSimulator() {
  const [rideState, setRideState] = useState('active') // 'active', 'flagged', 'sos', 'resolved'
  const [anomalyType, setAnomalyType] = useState('')
  const [countdown, setCountdown] = useState(10)
  const [events, setEvents] = useState([
    { id: 1, time: '10:12 PM', text: 'Ride started with verified driver Meera S.' },
    { id: 2, time: '10:13 PM', text: 'Safety link automatically shared with 2 contacts' }
  ])

  useEffect(() => {
    let timer
    if (rideState === 'flagged') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      } else {
        triggerSos('Timeout (No user response)')
      }
    }
    return () => clearTimeout(timer)
  }, [rideState, countdown])

  function addEvent(text) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    setEvents(prev => [{ id: Date.now(), time, text }, ...prev])
  }

  function simulateAnomaly(type) {
    setAnomalyType(type === 'route' ? 'Route Deviation Detected' : 'Unexpected Long Idle Stop')
    setRideState('flagged')
    setCountdown(10)
    addEvent(`⚠️ AI Alert: ${type === 'route' ? 'Route deviation flagged' : 'Prolonged stop detected'}`)
  }

  function resolveSafety() {
    setRideState('resolved')
    addEvent('✅ User confirmed safe. Guardian auto-monitoring resumed.')
    setTimeout(() => {
      setRideState('active')
    }, 2500)
  }

  function triggerSos(reason = 'User Tapped SOS') {
    setRideState('sos')
    addEvent(`🚨 Emergency SOS Triggered (${reason})`)
    addEvent('📞 Dialing local police emergency desk...')
    addEvent('💬 Alert sent to Mom: "Priya needs help! Track ride at sheride.com/track/R005"')
  }

  function resetSimulator() {
    setRideState('active')
    setCountdown(10)
    setEvents([
      { id: 1, time: '10:12 PM', text: 'Ride started with verified driver Meera S.' },
      { id: 2, time: '10:13 PM', text: 'Safety link automatically shared with 2 contacts' }
    ])
  }

  return (
    <div className="grid lg:grid-cols-12 gap-6 items-stretch max-w-4xl mx-auto">
      {/* Smartphone frame simulator */}
      <div className="lg:col-span-7 flex justify-center">
        <div className="relative w-[300px] h-[580px] rounded-[2.8rem] border-[12px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden flex flex-col">
          {/* Speaker ear piece & camera notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 flex justify-center z-50">
            <div className="w-24 h-4 bg-slate-950 rounded-b-xl flex items-center justify-between px-3">
              <div className="w-8 h-1 bg-slate-800 rounded-full" />
              <div className="w-2.5 h-2.5 bg-slate-900 border border-slate-800 rounded-full" />
            </div>
          </div>

          {/* Screen Content */}
          <div className={`flex-1 flex flex-col pt-6 relative overflow-hidden transition-colors duration-500 ${
            rideState === 'flagged' ? 'bg-red-950/20' :
            rideState === 'sos' ? 'bg-red-950/40' : 'bg-slate-50 dark:bg-slate-900'
          }`}>
            {/* Live Status Header */}
            <div className="p-3 border-b border-lavender/10 bg-white/70 dark:bg-slate-900/80 backdrop-blur flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-500">Trip SheGo-092</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  rideState === 'active' ? 'bg-emerald-500 animate-pulse' :
                  rideState === 'flagged' ? 'bg-amber-500 animate-pulse' : 'bg-red-500 animate-ping'
                }`} />
                <span className={`font-bold ${
                  rideState === 'active' ? 'text-emerald-600 dark:text-emerald-400' :
                  rideState === 'flagged' ? 'text-amber-600 dark:text-amber-400' : 'text-red-500'
                }`}>
                  {rideState === 'active' ? 'Safe Monitoring Active' :
                   rideState === 'flagged' ? 'Guardian Checking In' :
                   rideState === 'resolved' ? 'Confirmed Safe' : 'SOS ALERT ACTIVE'}
                </span>
              </div>
            </div>

            {/* Simulating Map visual */}
            <div className="h-44 bg-slate-100 dark:bg-slate-950 relative overflow-hidden map-grid flex items-center justify-center">
              {/* SVG Map details */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,100 L300,100 M100,0 L100,200 M200,0 L200,200" stroke="#B57EDC" strokeWidth="2" />
              </svg>
              {/* Route Deviation Marker */}
              {rideState === 'flagged' && (
                <div className="absolute top-[35%] left-[60%] flex flex-col items-center">
                  <div className="px-2 py-0.5 bg-amber-500 text-white rounded text-[8px] font-bold shadow-md">Route Deviation</div>
                  <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white animate-ping mt-1" />
                </div>
              )}
              {/* SOS Marker */}
              {rideState === 'sos' && (
                <div className="absolute top-[40%] left-[50%] flex flex-col items-center z-10">
                  <div className="px-2 py-0.5 bg-red-600 text-white rounded text-[8px] font-bold shadow-md animate-bounce">HELP NEEDED</div>
                  <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white animate-ping mt-1" />
                </div>
              )}
              {/* Mock Car */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-700 ${
                rideState === 'sos' ? 'bg-red-500' : 'bg-lavender'
              }`}>
                <span className="text-sm">🚗</span>
              </div>
            </div>

            {/* Simulated Live Action UI Card */}
            <div className="flex-1 p-3 flex flex-col justify-between">
              {/* Active Monitoring details */}
              <AnimatePresence mode="wait">
                {rideState === 'active' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                    <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-lavender/10 shadow-sm">
                      <p className="text-[10px] text-gray-400">YOUR GUARDIAN</p>
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-0.5">Watching route & speed profile.</p>
                      <div className="flex gap-2 items-center mt-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                          <Shield className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] text-gray-500">Trip verified safe within bounds.</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-lavender/10 shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">M</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 dark:text-white">Meera Singh</p>
                        <p className="text-[10px] text-gray-400">Verified Driver · 4.9★</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {rideState === 'resolved' && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Confirmed Safe</h4>
                    <p className="text-[10px] text-gray-500 max-w-[180px] mt-1">Monitoring resumed. Guardian is active.</p>
                  </motion.div>
                )}

                {rideState === 'flagged' && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -10 }} className="p-3 bg-white dark:bg-slate-800 rounded-2xl border-2 border-amber-500 shadow-xl space-y-3 relative z-10">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <AlertOctagon className="w-5 h-5 animate-bounce" />
                      <h4 className="text-xs font-extrabold uppercase tracking-wide">Are you okay?</h4>
                    </div>
                    <p className="text-[10px] text-gray-600 dark:text-gray-300 leading-relaxed">
                      AI Guardian detected: <span className="font-bold text-gray-800 dark:text-white">{anomalyType}</span>.
                    </p>

                    <div className="py-2 text-center bg-amber-50 dark:bg-amber-950/20 rounded-xl">
                      <p className="text-[10px] text-gray-500 uppercase">Emergency Alert in</p>
                      <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{countdown}s</p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <button onClick={resolveSafety} className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold transition-all shadow-md">
                        Yes, I am Safe
                      </button>
                      <button onClick={() => triggerSos('User Tapped SOS')} className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-bold transition-all shadow-md">
                        Emergency SOS!
                      </button>
                    </div>
                  </motion.div>
                )}

                {rideState === 'sos' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-600 text-white rounded-2xl shadow-xl space-y-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto animate-ping">
                      <BellRing className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest">SOS ACTIVE</h4>
                      <p className="text-[9px] opacity-90 mt-1">Police & Emergency contacts notified.</p>
                    </div>
                    <div className="p-2 bg-black/10 rounded-xl text-left text-[9px] space-y-1 border border-white/10">
                      <p className="flex items-center gap-1 font-semibold"><Send className="w-2.5 h-2.5" /> SMS Alerts Sent</p>
                      <p className="opacity-80">✓ Mom (98765-XXXXX)</p>
                      <p className="opacity-80">✓ Sister (98765-XXXXX)</p>
                      <p className="flex items-center gap-1 font-semibold pt-1 border-t border-white/10"><Phone className="w-2.5 h-2.5" /> Dialing Helpline</p>
                      <p className="opacity-80">✓ Police Control Desk (112)</p>
                    </div>
                    <button onClick={resetSimulator} className="w-full py-1.5 bg-white text-red-600 rounded-xl text-[10px] font-bold transition-all hover:bg-red-50">
                      Dismiss / False Alarm
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Quick-Access SOS Button */}
              {rideState !== 'sos' && rideState !== 'flagged' && (
                <button
                  onClick={() => triggerSos('User manual SOS click')}
                  className="w-full py-3 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-2xl text-xs font-bold border border-red-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <BellRing className="w-4 h-4" /> Trigger Instant SOS
                </button>
              )}
            </div>
          </div>

          {/* Home button bar */}
          <div className="h-4 bg-slate-900 flex justify-center items-center pb-1">
            <div className="w-24 h-1 bg-slate-800 rounded-full" />
          </div>
        </div>
      </div>

      {/* Simulator Description & Actions panel */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
        <GlassCard className="flex-1 flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-lavender/20 text-purple-deep dark:text-lavender text-[10px] font-bold uppercase tracking-wider">
              How it works
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-3">AI Ride Guardian</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Our AI constantly tracks speed, stop durations, and route progression in the background. If something deviates from normal patterns, it auto-initiates verification.
            </p>

            <div className="mt-4 space-y-2.5">
              <p className="text-xs font-bold text-gray-500 uppercase">Test the Simulator:</p>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={() => simulateAnomaly('route')}
                  disabled={rideState === 'flagged' || rideState === 'sos'}
                  className="!justify-start text-xs rounded-xl"
                >
                  🚙 Simulate Route Deviation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => simulateAnomaly('stop')}
                  disabled={rideState === 'flagged' || rideState === 'sos'}
                  className="!justify-start text-xs rounded-xl"
                >
                  🛑 Simulate Long Idle Stop
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-lavender/10 mt-5">
            <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Safety Operations Logs:</p>
            <div className="h-32 overflow-y-auto pr-1 space-y-2 text-[11px] font-mono scrollbar">
              {events.map((e) => (
                <div key={e.id} className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">{e.time}</span>
                  <span className="text-gray-700 dark:text-gray-300">{e.text}</span>
                </div>
              ))}
            </div>

            {(rideState !== 'active') && (
              <button
                onClick={resetSimulator}
                className="mt-3 text-[10px] font-semibold text-lavender hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset Simulator
              </button>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
