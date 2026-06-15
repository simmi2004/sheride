import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, role, loginPath = '/login' }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen gradient-hero">
        <div className="w-12 h-12 border-4 border-lavender border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to={loginPath} state={{ from: location }} replace />
  }

  if (role && user.role !== role) {
    const redirects = { rider: '/app/home', driver: '/driver/dashboard', admin: '/admin/dashboard' }
    return <Navigate to={redirects[user.role] ?? '/'} replace />
  }

  return children
}
