import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const PUBLIC_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Safety',       href: '#safety'       },
  { label: 'About',        href: '#about'        },
]

export default function Navbar() {
  const { user, logout }  = useAuth()
  const { dark, toggle }  = useTheme()
  const navigate          = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const close = () => setMenuOpen(false)

  function handleLogout() {
    logout()
    navigate('/')
    close()
  }

  // Dashboard link per role
  const dashboardHref =
    user?.role === 'admin'  ? '/admin/dashboard'  :
    '/app/home'

  return (
    <nav
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-pink-500 font-bold text-xl"
            aria-label="SheRide home"
            onClick={close}
          >
            <span aria-hidden="true">🚗</span>
            <span>SheRide</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {PUBLIC_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? '☀️' : '🌙'}
            </button>

            {user ? (
              <>
                <NavLink
                  to={dashboardHref}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-pink-500 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Dashboard
                </NavLink>
                {user.role === 'rider' && (
                  <NavLink
                    to="/book"
                    className="text-sm font-semibold bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl transition-colors"
                  >
                    Book Ride
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 px-3 py-2 rounded-lg transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-xl hover:border-pink-400 hover:text-pink-500 transition-colors"
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-sm font-semibold bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl transition-colors"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`block w-5 h-0.5 bg-current mb-1 transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current mb-1 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pb-4 space-y-2"
        >
          {PUBLIC_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-pink-500"
            >
              {label}
            </a>
          ))}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-2">
            {user ? (
              <>
                <Link to={dashboardHref} onClick={close} className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Dashboard</Link>
                {user.role === 'rider' && (
                  <Link to="/book" onClick={close} className="block py-2 text-sm font-semibold text-pink-500">Book a Ride</Link>
                )}
                <button onClick={handleLogout} className="block py-2 text-sm font-medium text-red-500">Log Out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={close} className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Log In</Link>
                <Link to="/signup" onClick={close} className="block py-2 text-sm font-semibold text-pink-500">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
