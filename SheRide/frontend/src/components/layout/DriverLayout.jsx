import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Radio, Navigation, TrendingUp, Clock, Shield,
  Car, Star, Bell, Menu, X, Moon, Sun, LogOut,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import Avatar from '../ui/Avatar'
import Toggle from '../ui/Toggle'

const NAV = [
  { to: '/driver/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/driver/requests', icon: Radio, label: 'Ride Requests' },
  { to: '/driver/navigation', icon: Navigation, label: 'Navigation' },
  { to: '/driver/earnings', icon: TrendingUp, label: 'Earnings' },
  { to: '/driver/history', icon: Clock, label: 'History' },
  { to: '/driver/verification', icon: Shield, label: 'Verification' },
  { to: '/driver/vehicle', icon: Car, label: 'Vehicle' },
  { to: '/driver/ratings', icon: Star, label: 'Ratings' },
  { to: '/driver/notifications', icon: Bell, label: 'Alerts' },
  { to: '/driver/safety', icon: Shield, label: 'Safety' },
]

export default function DriverLayout() {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [online, setOnline] = useState(true)

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold gradient-text">Driver Hub</span>
          </div>
          <div className="p-3 rounded-2xl bg-lavender/5 dark:bg-lavender/10">
            <Toggle enabled={online} onChange={setOnline} label={online ? 'You\'re Online' : 'You\'re Offline'} description={online ? 'Accepting rides' : 'Not accepting rides'} />
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${isActive ? 'bg-lavender/15 text-lavender' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <Icon className="w-5 h-5" />{label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <Avatar name={user?.name} size="md" />
            <div><p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p><p className="text-xs text-gray-500">Driver</p></div>
          </div>
          <button onClick={() => { logout(); navigate('/') }} className="flex items-center gap-2 w-full px-4 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 z-50 lg:hidden flex flex-col">
              <div className="flex justify-between p-4 border-b"><span className="font-bold">Driver Hub</span><button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button></div>
              <nav className="flex-1 p-4 space-y-1">{NAV.map(({ to, icon: Icon, label }) => (
                <NavLink key={to} to={to} onClick={() => setSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm ${isActive ? 'bg-lavender/15 text-lavender' : ''}`}>
                  <Icon className="w-5 h-5" />{label}
                </NavLink>
              ))}</nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl"><Menu className="w-5 h-5" /></button>
          <div className="lg:hidden flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${online ? 'bg-emerald-500' : 'bg-gray-400'}`} />
            <span className="text-sm font-medium">{online ? 'Online' : 'Offline'}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={toggle} className="p-2 rounded-xl text-gray-500">{dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto"><Outlet context={{ online, setOnline }} /></main>
      </div>
    </div>
  )
}
