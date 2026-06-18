import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Search, Clock, Wallet, Bell, User, Shield, Users,
  Menu, X, Moon, Sun, LogOut, MapPin,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import Avatar from '../ui/Avatar'
import SOSButton from '../safety/SOSButton'

const NAV = [
  { to: '/app/home', icon: Home, label: 'Home' },
  { to: '/app/search', icon: Search, label: 'Book' },
  { to: '/app/history', icon: Clock, label: 'History' },
  { to: '/app/wallet', icon: Wallet, label: 'Wallet' },
  { to: '/app/contacts', icon: Users, label: 'Contacts' },
  { to: '/app/safety', icon: Shield, label: 'Safety' },
  { to: '/app/notifications', icon: Bell, label: 'Alerts' },
  { to: '/app/profile', icon: User, label: 'Profile' },
]

const MOBILE_NAV = [
  { to: '/app/home', icon: Home, label: 'Home' },
  { to: '/app/search', icon: MapPin, label: 'Book' },
  { to: '/app/history', icon: Clock, label: 'Rides' },
  { to: '/app/profile', icon: User, label: 'Profile' },
]

export default function UserLayout() {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-soft-pink/20 via-white to-lavender/5 dark:from-gray-950 dark:via-gray-900 dark:to-purple-deep/10">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 glass border-r border-lavender/10 sticky top-0 h-screen">
        <div className="p-6 border-b border-lavender/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold gradient-text">SheRide</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  isActive
                    ? 'gradient-primary text-white shadow-premium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-lavender/10'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-lavender/10 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <Avatar name={user?.name} size="md" />
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate text-gray-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              className="fixed left-0 top-0 bottom-0 w-72 glass z-50 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-lavender/10">
                <span className="font-bold gradient-text">SheRide</span>
                <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {NAV.map(({ to, icon: Icon, label }) => (
                  <NavLink key={to} to={to} onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium ${isActive ? 'gradient-primary text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                    <Icon className="w-5 h-5" />{label}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 glass border-b border-lavender/10 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-lavender/10">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white lg:hidden">SheRide</h1>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={toggle} className="p-2 rounded-xl hover:bg-lavender/10 text-gray-500">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <NavLink to="/app/notifications" className="relative p-2 rounded-xl hover:bg-lavender/10">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </NavLink>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 pb-24 lg:pb-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 glass border-t border-lavender/10 z-30 px-2 py-2 safe-area-pb">
          <div className="flex justify-around">
            {MOBILE_NAV.map(({ to, icon: Icon, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-medium ${isActive ? 'text-lavender' : 'text-gray-500'}`}>
                <Icon className="w-5 h-5" />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Floating SOS */}
        <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40">
          <SOSButton compact />
        </div>
      </div>
    </div>
  )
}
