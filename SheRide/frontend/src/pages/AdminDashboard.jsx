import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_STATS = {
  totalUsers:    1240,
  totalDrivers:  312,
  ridesTotal:    8940,
  ridesToday:    87,
  revenue:       '₹4,23,800',
  pendingDrivers: 14,
}

const MOCK_USERS = [
  { id: 'U001', name: 'Priya Mehra',   email: 'priya@email.com',  role: 'rider',  status: 'active',    joined: '10 Jan 2026' },
  { id: 'U002', name: 'Anjali Rao',    email: 'anjali@email.com', role: 'driver', status: 'active',    joined: '5 Feb 2026'  },
  { id: 'U003', name: 'Riya Kapoor',   email: 'riya@email.com',   role: 'rider',  status: 'suspended', joined: '20 Mar 2026' },
  { id: 'U004', name: 'Sunita Verma',  email: 'sunita@email.com', role: 'driver', status: 'pending',   joined: '1 Jun 2026'  },
  { id: 'U005', name: 'Neha Sharma',   email: 'neha@email.com',   role: 'rider',  status: 'active',    joined: '15 Apr 2026' },
]

const MOCK_RIDES = [
  { id: 'R201', date: '12 Jun 2026', rider: 'Priya M.',  driver: 'Anjali R.', fare: '₹180', status: 'completed' },
  { id: 'R202', date: '12 Jun 2026', rider: 'Neha T.',   driver: 'Sunita V.', fare: '₹340', status: 'ongoing'   },
  { id: 'R203', date: '11 Jun 2026', rider: 'Riya K.',   driver: 'Meera S.',  fare: '₹130', status: 'cancelled' },
  { id: 'R204', date: '11 Jun 2026', rider: 'Sana M.',   driver: 'Anjali R.', fare: '₹520', status: 'completed' },
]

const PENDING_DRIVERS = [
  { id: 'D001', name: 'Kavya Singh',  email: 'kavya@email.com',  vehicle: 'Swift Dzire • DL 5C 1234', submitted: '10 Jun 2026' },
  { id: 'D002', name: 'Nisha Patel',  email: 'nisha@email.com',  vehicle: 'Wagon R • MH 02 5678',     submitted: '11 Jun 2026' },
]

const NAV_ITEMS = [
  { key: 'overview', icon: '🏠', label: 'Overview'        },
  { key: 'users',    icon: '👥', label: 'Users'           },
  { key: 'rides',    icon: '🚗', label: 'All Rides'       },
  { key: 'drivers',  icon: '✅', label: 'Driver Approvals' },
]

const STATUS_CLS = {
  active:    'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  suspended: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  pending:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  ongoing:   'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
}

function Badge({ status }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_CLS[status] ?? ''}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const [active,       setActive]       = useState('overview')
  const [sidebarOpen,  setSidebarOpen]  = useState(false)
  const [users,        setUsers]        = useState(MOCK_USERS)
  const [pendingDrivers, setPending]    = useState(PENDING_DRIVERS)
  const [userSearch,   setUserSearch]   = useState('')

  if (!loading && (!user || user.role !== 'admin')) {
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

  function toggleUserStatus(id) {
    setUsers((prev) => prev.map((u) =>
      u.id === id
        ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
        : u
    ))
  }

  function approveDriver(id) {
    setPending((prev) => prev.filter((d) => d.id !== id))
    setUsers((prev) => prev.map((u) =>
      u.id === id ? { ...u, status: 'active' } : u
    ))
  }

  function rejectDriver(id) {
    setPending((prev) => prev.filter((d) => d.id !== id))
  }

  const filteredUsers = users.filter(
    (u) => userSearch === '' ||
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <span className="text-xl font-bold text-pink-500">🚗 SheRide</span>
          <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
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
                >
                  <span>{icon}</span>{label}
                  {key === 'drivers' && pendingDrivers.length > 0 && (
                    <span className="ml-auto bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingDrivers.length}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <button onClick={() => { logout(); navigate('/') }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-500 rounded-xl">
            🚪 Log Out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button className="lg:hidden p-2 rounded-lg text-gray-500" onClick={() => setSidebarOpen(true)} aria-label="Open menu">☰</button>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
              {user.name?.charAt(0)}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{user.name}</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8">

          {/* ── Overview ── */}
          {active === 'overview' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Platform Overview</h2>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: '👥', label: 'Total Users',     value: MOCK_STATS.totalUsers.toLocaleString() },
                  { icon: '🚗', label: 'Total Drivers',   value: MOCK_STATS.totalDrivers },
                  { icon: '🛣️', label: 'Total Rides',     value: MOCK_STATS.ridesTotal.toLocaleString() },
                  { icon: '📅', label: 'Rides Today',     value: MOCK_STATS.ridesToday },
                  { icon: '💰', label: 'Total Revenue',   value: MOCK_STATS.revenue },
                  { icon: '⏳', label: 'Pending Drivers', value: MOCK_STATS.pendingDrivers },
                ].map((s) => (
                  <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>

              {pendingDrivers.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4">
                  <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                    ⏳ {pendingDrivers.length} driver{pendingDrivers.length > 1 ? 's' : ''} awaiting verification
                  </h3>
                  <button onClick={() => setActive('drivers')} className="btn-primary text-sm px-4 py-2">Review Now</button>
                </div>
              )}
            </div>
          )}

          {/* ── Users ── */}
          {active === 'users' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">User Management</h2>

              <input
                type="search"
                placeholder="Search users by name or email…"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full max-w-sm mb-4 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    <tr>
                      {['Name', 'Email', 'Role', 'Status', 'Joined', 'Action'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{u.name}</td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{u.email}</td>
                        <td className="px-4 py-3 capitalize">{u.role}</td>
                        <td className="px-4 py-3"><Badge status={u.status} /></td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{u.joined}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className={`text-xs font-medium px-3 py-1 rounded-lg transition-colors ${
                              u.status === 'active'
                                ? 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 hover:bg-red-100'
                                : 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 hover:bg-green-100'
                            }`}
                          >
                            {u.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── All Rides ── */}
          {active === 'rides' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">All Rides</h2>
              <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    <tr>
                      {['Ride ID', 'Date', 'Rider', 'Driver', 'Fare', 'Status'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {MOCK_RIDES.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">{r.id}</td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{r.date}</td>
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{r.rider}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{r.driver}</td>
                        <td className="px-4 py-3 font-semibold text-pink-500">{r.fare}</td>
                        <td className="px-4 py-3"><Badge status={r.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Driver Approvals ── */}
          {active === 'drivers' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Driver Verification</h2>
              {pendingDrivers.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-4xl mb-2">✅</p>
                  <p>All drivers verified</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingDrivers.map((d) => (
                    <div key={d.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                      <div className="flex justify-between items-start flex-wrap gap-3">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{d.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{d.email}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">🚗 {d.vehicle}</p>
                          <p className="text-xs text-gray-400 mt-1">Submitted: {d.submitted}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => approveDriver(d.id)} className="btn-primary text-sm px-4 py-2">✅ Approve</button>
                          <button onClick={() => rejectDriver(d.id)} className="px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">Reject</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
