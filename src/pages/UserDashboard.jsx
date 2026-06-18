import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ─── Mock data (replace with API calls) ──────────────────────────────────────
const MOCK_RIDES = [
  { id: 1, date: '12 Jun 2026', from: 'Connaught Place', to: 'Saket', fare: '₹180', status: 'completed', driver: 'Meera S.' },
  { id: 2, date: '10 Jun 2026', from: 'Lajpat Nagar', to: 'IGI Airport', fare: '₹520', status: 'completed', driver: 'Anjali R.' },
  { id: 3, date: '7 Jun 2026',  from: 'Dwarka Sec 10', to: 'Janakpuri',  fare: '₹130', status: 'cancelled', driver: 'Priya K.' },
  { id: 4, date: '2 Jun 2026',  from: 'Karol Bagh',    to: 'Rohini',    fare: '₹210', status: 'completed', driver: 'Sunita M.' },
]

const STATS = [
  { icon: '🚗', label: 'Total Rides',   value: '24'   },
  { icon: '⭐', label: 'Avg. Rating',   value: '4.8'  },
  { icon: '💰', label: 'Total Spent',   value: '₹4,320' },
  { icon: '🛡️', label: 'Safe Trips',   value: '24'   },
]

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    completed: { label: 'Completed', cls: 'badge-success' },
    cancelled: { label: 'Cancelled', cls: 'badge-danger'  },
    ongoing:   { label: 'Ongoing',   cls: 'badge-warning' },
  }
  const { label, cls } = map[status] ?? { label: status, cls: '' }
  return <span className={`status-badge ${cls}`}>{label}</span>
}

// ─── Sidebar nav items ────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: 'overview',  icon: '🏠', label: 'Overview'      },
  { key: 'rides',     icon: '🚗', label: 'My Rides'      },
  { key: 'profile',   icon: '👤', label: 'My Profile'    },
  { key: 'safety',    icon: '🛡️', label: 'Safety'        },
]

// ─── Overview tab ─────────────────────────────────────────────────────────────
function OverviewTab({ user }) {
  const recent = MOCK_RIDES.slice(0, 3)

  return (
    <div className="tab-content">
      <h2 className="tab-title">Welcome back, {user?.name?.split(' ')[0]} 👋</h2>
      <p className="tab-subtitle">Here's a summary of your SheRide activity.</p>

      {/* Stats */}
      <div className="stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className="dash-stat-card">
            <span className="dash-stat-icon" aria-hidden="true">{s.icon}</span>
            <span className="dash-stat-value">{s.value}</span>
            <span className="dash-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Book ride CTA */}
      <div className="book-cta">
        <div>
          <h3>Ready to ride?</h3>
          <p>Book a safe, verified ride in seconds.</p>
        </div>
        <Link to="/book" className="btn-primary">Book a Ride</Link>
      </div>

      {/* Recent rides */}
      <h3 className="section-label">Recent Rides</h3>
      <div className="rides-list">
        {recent.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </div>
    </div>
  )
}

// ─── Ride card ────────────────────────────────────────────────────────────────
function RideCard({ ride }) {
  return (
    <article className="ride-card">
      <div className="ride-route">
        <span className="ride-dot from" aria-hidden="true" />
        <div className="ride-stops">
          <span className="ride-place">{ride.from}</span>
          <span className="ride-place to">{ride.to}</span>
        </div>
      </div>
      <div className="ride-meta">
        <span className="ride-date">{ride.date}</span>
        <span className="ride-driver">Driver: {ride.driver}</span>
      </div>
      <div className="ride-right">
        <span className="ride-fare">{ride.fare}</span>
        <StatusBadge status={ride.status} />
      </div>
    </article>
  )
}

// ─── Rides tab ────────────────────────────────────────────────────────────────
function RidesTab() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? MOCK_RIDES
    : MOCK_RIDES.filter((r) => r.status === filter)

  return (
    <div className="tab-content">
      <h2 className="tab-title">My Rides</h2>

      <div className="filter-row" role="group" aria-label="Filter rides">
        {['all', 'completed', 'cancelled'].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No {filter} rides found.</p>
      ) : (
        <div className="rides-list">
          {filtered.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Profile tab ─────────────────────────────────────────────────────────────
function ProfileTab({ user, updateUser }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm]       = useState({ name: user?.name ?? '', phone: user?.phone ?? '' })
  const [saved, setSaved]     = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSave(e) {
    e.preventDefault()
    updateUser(form)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="tab-content">
      <h2 className="tab-title">My Profile</h2>

      <div className="profile-card">
        <div className="profile-avatar" aria-hidden="true">
          {user?.name?.charAt(0).toUpperCase() ?? '?'}
        </div>

        {saved && (
          <p className="save-notice" role="status">✅ Profile updated successfully.</p>
        )}

        {editing ? (
          <form className="profile-form" onSubmit={handleSave}>
            <div className="field-group">
              <label htmlFor="p-name">Full Name</label>
              <input id="p-name" name="name" type="text" value={form.name} onChange={handleChange} required />
            </div>
            <div className="field-group">
              <label htmlFor="p-phone">Phone Number</label>
              <input id="p-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="profile-actions">
              <button type="submit" className="btn-primary">Save Changes</button>
              <button type="button" className="btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <dl className="profile-details">
            <div className="profile-row">
              <dt>Full Name</dt>
              <dd>{user?.name ?? '—'}</dd>
            </div>
            <div className="profile-row">
              <dt>Email</dt>
              <dd>{user?.email ?? '—'}</dd>
            </div>
            <div className="profile-row">
              <dt>Phone</dt>
              <dd>{user?.phone ?? '—'}</dd>
            </div>
            <div className="profile-row">
              <dt>Account Type</dt>
              <dd className="role-pill">{user?.role === 'driver' ? '🚗 Driver' : '🧍 Rider'}</dd>
            </div>
          </dl>
        )}

        {!editing && (
          <button className="btn-ghost edit-btn" onClick={() => setEditing(true)}>
            ✏️ Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Safety tab ───────────────────────────────────────────────────────────────
function SafetyTab() {
  return (
    <div className="tab-content">
      <h2 className="tab-title">Safety Settings</h2>

      <div className="safety-grid">
        <div className="safety-card">
          <span className="safety-icon" aria-hidden="true">👥</span>
          <h3>Trusted Contacts</h3>
          <p>Add up to 3 contacts who receive your live location during rides.</p>
          <button className="btn-ghost">Manage Contacts</button>
        </div>
        <div className="safety-card">
          <span className="safety-icon" aria-hidden="true">🆘</span>
          <h3>SOS Alert</h3>
          <p>One tap sends your location to contacts and local authorities.</p>
          <button className="btn-ghost">Test SOS</button>
        </div>
        <div className="safety-card">
          <span className="safety-icon" aria-hidden="true">📍</span>
          <h3>Share Live Location</h3>
          <p>Share real-time trip tracking with anyone via a secure link.</p>
          <button className="btn-ghost">Share Trip</button>
        </div>
        <div className="safety-card">
          <span className="safety-icon" aria-hidden="true">🔒</span>
          <h3>PIN Verification</h3>
          <p>Set a 4-digit ride PIN your driver must confirm before you board.</p>
          <button className="btn-ghost">Set PIN</button>
        </div>
      </div>
    </div>
  )
}

// ─── UserDashboard ────────────────────────────────────────────────────────────
export default function UserDashboard() {
  const { user, logout, updateUser, loading } = useAuth()
  const navigate  = useNavigate()
  const [active, setActive]     = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Redirect to login if unauthenticated after hydration
  if (!loading && !user) {
    navigate('/login', { replace: true })
    return null
  }

  if (loading) {
    return (
      <div className="dash-loading" role="status" aria-live="polite">
        <span className="spinner" aria-hidden="true" />
        Loading your dashboard…
      </div>
    )
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  const tabProps = { user, updateUser }

  return (
    <div className="dashboard">
      {/* ── Sidebar ── */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`} aria-label="Dashboard navigation">
        <div className="dash-brand">
          <span aria-hidden="true">🚗</span> SheRide
        </div>

        <nav>
          <ul role="list">
            {NAV_ITEMS.map(({ key, icon, label }) => (
              <li key={key}>
                <button
                  className={`dash-nav-item ${active === key ? 'active' : ''}`}
                  onClick={() => { setActive(key); setSidebarOpen(false) }}
                  aria-current={active === key ? 'page' : undefined}
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button className="dash-logout" onClick={handleLogout}>
          <span aria-hidden="true">🚪</span> Log Out
        </button>
      </aside>

      {/* ── Main ── */}
      <div className="dash-main">
        {/* Top bar */}
        <header className="dash-topbar">
          <button
            className="sidebar-toggle"
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((v) => !v)}
          >
            ☰
          </button>
          <div className="topbar-user">
            <span className="topbar-avatar" aria-hidden="true">
              {user.name?.charAt(0).toUpperCase()}
            </span>
            <span className="topbar-name">{user.name}</span>
          </div>
        </header>

        {/* Tab content */}
        <div className="dash-body">
          {active === 'overview' && <OverviewTab {...tabProps} />}
          {active === 'rides'    && <RidesTab />}
          {active === 'profile'  && <ProfileTab {...tabProps} />}
          {active === 'safety'   && <SafetyTab />}
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
