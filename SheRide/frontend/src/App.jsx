import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ProtectedRoute from './components/ProtectedRoute'

// Layouts
import UserLayout from './components/layout/UserLayout'
import AdminLayout from './components/layout/AdminLayout'

// Landing & Auth
import LandingPage from './pages/landing/LandingPage'
import UserLogin from './pages/auth/UserLogin'
import UserRegister from './pages/auth/UserRegister'
import AdminLogin from './pages/auth/AdminLogin'

// User Panel
import UserHome from './pages/user/UserHome'
import SearchRide from './pages/user/SearchRide'
import RideSelection from './pages/user/RideSelection'
import LiveTracking from './pages/user/LiveTracking'
import TrustedContacts from './pages/user/TrustedContacts'
import UserRideHistory from './pages/user/UserRideHistory'
import Wallet from './pages/user/Wallet'
import UserNotifications from './pages/user/UserNotifications'
import ProfileSettings from './pages/user/ProfileSettings'
import SafetyCenter from './pages/user/SafetyCenter'
import RateDriver from './pages/user/RateDriver'

// Admin Panel
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminDriverVerification from './pages/admin/AdminDriverVerification'
import AdminRideMonitoring from './pages/admin/AdminRideMonitoring'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminRevenue from './pages/admin/AdminRevenue'
import AdminComplaints from './pages/admin/AdminComplaints'
import AdminEmergencies from './pages/admin/AdminEmergencies'
import AdminLiveMap from './pages/admin/AdminLiveMap'
import AdminSettings from './pages/admin/AdminSettings'

export default function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Legacy redirects */}
          <Route path="/dashboard" element={<Navigate to="/app/home" replace />} />
          <Route path="/book" element={<Navigate to="/app/search" replace />} />
          <Route path="/rides" element={<Navigate to="/app/history" replace />} />
          <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />

          {/* User Panel */}
          <Route path="/app" element={
            <ProtectedRoute role="rider" loginPath="/login">
              <UserLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<UserHome />} />
            <Route path="search" element={<SearchRide />} />
            <Route path="rides/select" element={<RideSelection />} />
            <Route path="rides/track/:id" element={<LiveTracking />} />
            <Route path="contacts" element={<TrustedContacts />} />
            <Route path="history" element={<UserRideHistory />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="notifications" element={<UserNotifications />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="safety" element={<SafetyCenter />} />
            <Route path="rate/:id" element={<RateDriver />} />
          </Route>

          {/* Admin Panel */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin" loginPath="/admin/login">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="drivers" element={<AdminDriverVerification />} />
            <Route path="rides" element={<AdminRideMonitoring />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="revenue" element={<AdminRevenue />} />
            <Route path="complaints" element={<AdminComplaints />} />
            <Route path="emergencies" element={<AdminEmergencies />} />
            <Route path="map" element={<AdminLiveMap />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={
            <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-4 text-center">
              <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center mb-6 text-3xl">🚗</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Page not found</h1>
              <p className="text-gray-500 mb-8">This route doesn't exist.</p>
              <a href="/" className="gradient-primary text-white px-6 py-3 rounded-2xl font-semibold">Go Home</a>
            </div>
          } />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}
