import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, ShieldCheck, Car, BarChart3, DollarSign,
  MessageSquare, AlertTriangle, Map, Settings, Menu, X, Moon, Sun, LogOut,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/drivers', icon: ShieldCheck, label: 'Driver Verification' },
  { to: '/admin/rides', icon: Car, label: 'Ride Monitoring' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin/revenue', icon: DollarSign, label: 'Revenue' },
  { to: '/admin/complaints', icon: MessageSquare, label: 'Complaints' },
  { to: '/admin/emergencies', icon: AlertTriangle, label: 'Emergencies' },
  { to: '/admin/map', icon: Map, label: 'Live Map' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      <aside className={`hidden lg:flex flex-col bg-gray-900 text-gray-300 transition-all duration-300 sticky top-0 h-screen ${collapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          {!collapsed && <span className="font-bold text-white text-lg">SheRide Admin</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-white/10">
            <Menu className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-lavender text-white' : 'hover:bg-white/5'}`}>
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={() => { logout(); navigate('/') }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10">
            <LogOut className="w-5 h-5" />{!collapsed && 'Log Out'}
          </button>
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} className="fixed left-0 top-0 bottom-0 w-72 bg-gray-900 z-50 lg:hidden flex flex-col">
              <div className="flex justify-between p-4 border-b border-white/10"><span className="font-bold text-white">Admin</span><button onClick={() => setMobileOpen(false)}><X className="w-5 h-5 text-white" /></button></div>
              <nav className="flex-1 p-3 space-y-1">{NAV.map(({ to, icon: Icon, label }) => (
                <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${isActive ? 'bg-lavender text-white' : 'text-gray-300'}`}>
                  <Icon className="w-5 h-5" />{label}
                </NavLink>
              ))}</nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-xl"><Menu className="w-5 h-5" /></button>
          <p className="text-sm text-gray-500 hidden sm:block">Welcome, <span className="font-semibold text-gray-900 dark:text-white">{user?.name}</span></p>
          <button onClick={toggle} className="p-2 rounded-xl text-gray-500 ml-auto">{dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto"><Outlet /></main>
      </div>
    </div>
  )
}
