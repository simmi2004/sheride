import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home           from './pages/Home'
import Login          from './pages/Login'
import Register       from './pages/Register'
import UserDashboard  from './pages/UserDashboard'
import BookRide       from './pages/BookRide'
import RideHistory    from './pages/RideHistory'
import DriverDashboard from './pages/DriverDashboard'
import AdminDashboard  from './pages/AdminDashboard'

import './App.css'

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-12 mb-10">
        <div className="flex-1 min-w-[180px]">
          <p className="text-xl font-bold text-pink-400 mb-2">🚗 SheRide</p>
          <p className="text-sm text-gray-400">Safe rides for every woman.</p>
        </div>
        <nav aria-label="Company links">
          <h3 className="text-xs font-semibold text-gray-100 uppercase tracking-wider mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#about"  className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#safety" className="hover:text-white transition-colors">Safety</a></li>
            <li><Link to="/signup" className="hover:text-white transition-colors">Become a Driver</Link></li>
          </ul>
        </nav>
        <nav aria-label="Support links">
          <h3 className="text-xs font-semibold text-gray-100 uppercase tracking-wider mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="mailto:support@sheride.com" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </nav>
      </div>
      <p className="text-center text-xs text-gray-500 border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} SheRide. All rights reserved.
      </p>
    </footer>
  )
}

// ─── Layout: pages with Navbar + Footer ───────────────────────────────────────
function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

// ─── Layout: full-screen pages (dashboards, book ride) ────────────────────────
function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      {children}
    </div>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/"       element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/login"  element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout><Register /></PublicLayout>} />

        {/* Protected — rider */}
        <Route path="/dashboard" element={
          <ProtectedRoute role="rider">
            <AppLayout><UserDashboard /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/book" element={
          <ProtectedRoute role="rider">
            <AppLayout><BookRide /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/rides" element={
          <ProtectedRoute role="rider">
            <PublicLayout><RideHistory /></PublicLayout>
          </ProtectedRoute>
        } />

        {/* Protected — driver */}
        <Route path="/driver-dashboard" element={
          <ProtectedRoute role="driver">
            <AppLayout><DriverDashboard /></AppLayout>
          </ProtectedRoute>
        } />

        {/* Protected — admin */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute role="admin">
            <AppLayout><AdminDashboard /></AppLayout>
          </ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={
          <PublicLayout>
            <div className="flex flex-col items-center justify-center flex-1 py-32 text-center px-4">
              <p className="text-7xl mb-6">🚗</p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Page not found</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-8">This route doesn't exist.</p>
              <Link to="/" className="btn-primary px-6 py-3">Go Home</Link>
            </div>
          </PublicLayout>
        } />
      </Routes>
    </Router>
  )
}
