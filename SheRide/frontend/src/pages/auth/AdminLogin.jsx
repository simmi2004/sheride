import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Mail, Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import GlassCard from '../../components/ui/GlassCard'
import AuthCarousel from '../../components/auth/AuthCarousel'

export default function AdminLogin() {
  const { loginDemo } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-900 grid lg:grid-cols-12 items-stretch">
      {/* Left Column: Premium Carousel Banner (Desktop only) */}
      <div className="hidden lg:block lg:col-span-5 xl:col-span-4 h-full">
        <AuthCarousel />
      </div>

      {/* Right Column: Centralized Login Form */}
      <div className="lg:col-span-7 xl:col-span-8 flex items-center justify-center p-6 md:p-12 relative bg-slate-950">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-deep/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-lavender/5 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8 lg:hidden">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">SheRide Admin</h1>
          </div>

          <GlassCard padding="p-8" className="!bg-slate-900/80 !border-white/10 shadow-premium-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                Admin Portal
              </h2>
              <p className="text-xs text-gray-400 mt-1">SheRide central operations management console</p>
            </div>

            <div className="space-y-4">
              <Input
                label="Admin Email"
                type="email"
                icon={Mail}
                className="[&_label]:text-gray-300"
                placeholder="admin@sheride.com"
              />
              <Input
                label="Password"
                type="password"
                icon={Lock}
                className="[&_label]:text-gray-300"
                placeholder="••••••••"
              />
              <Button className="w-full py-3" onClick={() => { loginDemo('admin'); navigate('/admin/dashboard') }}>
                Sign In
              </Button>
              <div className="mt-4 pt-4 border-t border-white/10">
                <Button variant="outline" className="w-full !border-white/10 !text-gray-300 hover:!bg-white/5 text-xs" onClick={() => { loginDemo('admin'); navigate('/admin/dashboard') }}>
                  Demo Admin Access
                </Button>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-white/5">
              Not an admin? <Link to="/login" className="text-lavender hover:underline font-semibold">Rider Login</Link>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}

// Simple link shim for fallback in case React Router Link is needed but forgotten
function Link({ to, children, className }) {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  )
}
