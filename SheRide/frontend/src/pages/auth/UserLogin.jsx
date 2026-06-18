import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import GlassCard from '../../components/ui/GlassCard'
import AuthCarousel from '../../components/auth/AuthCarousel'

export default function UserLogin() {
  const { login, loginDemo } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login({ email: form.email, password: form.password, rememberMe: form.remember })
      navigate('/app/home')
    } catch {
      setError('Invalid credentials. Try demo login below.')
    } finally {
      setLoading(false)
    }
  }

  function handleDemo() {
    loginDemo('rider')
    navigate('/app/home')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 grid lg:grid-cols-12 items-stretch">
      {/* Left Column: Premium Carousel Banner (Desktop only) */}
      <div className="hidden lg:block lg:col-span-5 xl:col-span-4 h-full">
        <AuthCarousel />
      </div>

      {/* Right Column: Centralized Login Form */}
      <div className="lg:col-span-7 xl:col-span-8 flex items-center justify-center p-6 md:p-12 relative">
        {/* Floating background blobs for aesthetics */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-soft-pink/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-lavender/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8 lg:hidden">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SheRide</h1>
          </div>

          <GlassCard padding="p-8" className="shadow-premium-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Welcome back</h2>
              <p className="text-xs text-gray-500 mt-1">Exclusively for women — verified riders login</p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                icon={Mail}
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <Input
                label="Password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                    className="accent-lavender rounded"
                  />
                  Remember me
                </label>
                <a href="#" className="text-xs text-lavender font-semibold hover:underline">Forgot password?</a>
              </div>
              <Button type="submit" className="w-full py-3" loading={loading}>
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-lavender/10">
              <p className="text-[10px] text-gray-500 text-center mb-3 font-semibold uppercase tracking-wider">
                Or try instant demo access
              </p>
              <Button variant="outline" className="w-full text-xs" onClick={handleDemo}>
                Continue as Demo Rider
              </Button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account? <Link to="/signup" className="text-lavender font-bold hover:underline">Sign up</Link>
            </p>
            <p className="text-center text-xs text-gray-400 mt-4 pt-4 border-t border-lavender/5">
              Are you an admin? <Link to="/admin/login" className="text-lavender hover:underline font-semibold">Admin Login</Link>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
