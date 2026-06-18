import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSocket } from '../hooks/useSocket'
import SOSButton from '../components/SOSButton'

const MOCK_REQUESTS = [
  { id: 'R101', rider: 'Priya M.',  from: 'Connaught Place', to: 'Saket',      fare: '₹180', distance: '8.2 km' },
  { id: 'R102', rider: 'Anjali S.', from: 'Lajpat Nagar',   to: 'IGI Airport', fare: '₹520', distance: '18 km' },
]

const MOCK_HISTORY = [
  { id: 'R090', date: '12 Jun 2026', rider: 'Riya K.',   fare: '₹210', status: 'completed', rating: 5 },
  { id: 'R089', date: '10 Jun 2026', rider: 'Neha T.',   fare: '₹340', status: 'completed', rating: 4 },
  { id: 'R088', date: '8 Jun 2026',  rider: 'Sana M.',   fare: '₹150', status: 'cancelled', rating: null },
]

const STATS = [
  { icon: '💰', label: 'Today\'s Earnings', value: '₹1,240' },
  { icon: '🚗', label: 'Rides Today',       value: '7'       },
  { icon: '⭐', label: 'Rating',            value: '4.9'     },
  { icon: '🕐', label: 'Hours Online',      value: '6.5'     },
]

const NAV_ITEMS = [
  { key: 'overview',  icon: '🏠', label: 'Overview'    },
  { key: 'requests',  icon: '🔔', label: 'Ride Requests' },
  { key: 'history',   icon: '📋', label: 'History'      },
  { key: 'earnings',  icon: '💰', label: 'Earnings'     },
  { key: 'profile',   icon: '👤', label: 'Profile'      },
]

function StatusBadge({ status }) {
  const map = {
    completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  }
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? ''}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function DriverDashboard() {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const [active,      setActive]      = useState('overview')
  const [available,   setAvailable]   = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [requests,    setRequests]    = useState(MOCK_REQUESTS)

  // Socket: receive new ride requests in real time
  const { emitLocation } = useSocket(null, {
    onRideStatus: (data) => {
      if (data.type === 'new_request') {
        setRequests((prev) => [data.ride, ...prev])
      }
    },
  })

  // Emit location every 10s when available
  useEffect(() => {
    if (!available) return
    const interval = setInterval(() => {
      navigator.geolocation?.getCurrentPosition((pos) => {
        emitLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      })
    }, 10000)
    return () => clearInterval(interval)
  }, [available, emitLocation])

  if (!loading && (!user || user.role !== 'driver')) {
    navigate('/login', { replace: true })
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-pink-500 border-t-transparent" />
      </div>
    )
  }

  function handleLogout() { logout(); navigate('/') }

  function acceptRide(id) {
    setRequests((prev) => prev.filter((r) => r.id !== id))
    alert(`Ride ${id} accepted! Navigation will start.`)
  }

  function declineRide(id) {
    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <span className="text-xl font-bold text-pink-500">🚗 SheRide</span>
          <p className="text-xs text-gray-400 mt-1">Driver Portal</p>
        </div>

        {/* Availability toggle */}
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available for rides</span>
            <div
              className={`relative w-11 h-6 rounded-full transition-colors ${available ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              onClick={() => setAvailable((v) => !v)}
              role="switch"
              aria-checked={available}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setAvailable((v) => !v)}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${available ? 'translate-x-5' : ''}`} />
            </div>
          </label>
          <p className={`text-xs mt-1 ${available ? 'text-green-500' : 'text-gray-400'}`}>
            {available ? '🟢 Online' : '⚫ Offline'}
          </p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ key, icon, label }) => (
              <li key={key}>
                <button
                  onClick={() => { setActive(key); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                    ${active === key
                      ? 'bg-pink-50 dark:bg-pink-950 text-pink-600 dark:text-pink-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  aria-current={active === key ? 'page' : undefined}
                >
                  <span>{icon}</span>{label}
                  {key === 'requests' && requests.length > 0 && (
                    <span className="ml-auto bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {requests.length}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <SOSButton compact />
          <button onClick={handleLogout} className="w-full mt-2 flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 rounded-xl">
            🚪 Log Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >☰</button>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 flex items-center justify-center font-bold text-sm">
              {user.name?.charAt(0)}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{user.name}</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8">

          {/* Overview */}
          {active === 'overview' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Good day, {user.name?.split(' ')[0]} 👋</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Here's your driving summary for today.</p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 text-center">
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Incoming requests preview */}
              {requests.length > 0 && (
                <div className="bg-pink-50 dark:bg-pink-950 border border-pink-200 dark:border-pink-800 rounded-2xl p-4 mb-6">
                  <h3 className="font-semibold text-pink-700 dark:text-pink-300 mb-3">🔔 {requests.length} Pending Request{requests.length > 1 ? 's' : ''}</h3>
                  <button onClick={() => setActive('requests')} className="btn-primary text-sm px-4 py-2">View Requests</button>
                </div>
              )}
            </div>
          )}

          {/* Ride Requests */}
          {active === 'requests' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Ride Requests</h2>
              {requests.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-4xl mb-2">🔕</p>
                  <p>No pending ride requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((r) => (
                    <div key={r.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{r.rider}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{r.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-pink-500">{r.fare}</p>
                          <p className="text-xs text-gray-400">{r.distance}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <div>
                          <p>📍 {r.from}</p>
                          <p>🏁 {r.to}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => acceptRide(r.id)} className="flex-1 btn-primary py-2">Accept</button>
                        <button onClick={() => declineRide(r.id)} className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium text-sm">Decline</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* History */}
          {active === 'history' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Ride History</h2>
              <div className="space-y-3">
                {MOCK_HISTORY.map((r) => (
                  <div key={r.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{r.rider}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{r.date} · {r.id}</p>
                      {r.rating && <span className="text-yellow-400 text-sm">{'★'.repeat(r.rating)}</span>}
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <span className="font-bold text-pink-500">{r.fare}</span>
                      <StatusBadge status={r.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Earnings */}
          {active === 'earnings' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Earnings</h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Today',     value: '₹1,240' },
                  { label: 'This Week', value: '₹7,850' },
                  { label: 'This Month',value: '₹28,400'},
                ].map((e) => (
                  <div key={e.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 text-center">
                    <p className="text-2xl font-bold text-pink-500">{e.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{e.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400 dark:text-gray-500">Detailed payout breakdown coming soon.</p>
            </div>
          )}

          {/* Profile */}
          {active === 'profile' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Driver Profile</h2>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 max-w-md">
                <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 text-2xl flex items-center justify-center font-bold mx-auto mb-4">
                  {user.name?.charAt(0)}
                </div>
                <dl className="space-y-3">
                  {[
                    { label: 'Name',  value: user.name },
                    { label: 'Email', value: user.email },
                    { label: 'Phone', value: user.phone ?? '—' },
                    { label: 'Role',  value: '🚗 Driver' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <dt className="text-sm text-gray-500 dark:text-gray-400">{label}</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
