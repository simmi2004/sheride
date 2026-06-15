import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, Shield, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import AuthCarousel from '../../components/auth/AuthCarousel'

export default function UserRegister() {
  const { register, loginDemo } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', agree: false })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (!form.agree) { setError('Please accept the terms'); return }
    setLoading(true)
    setError('')
    try {
      await register({ ...form, role: 'rider' })
      navigate('/app/home')
    } catch {
      setError('Registration failed. Try demo access below.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 grid lg:grid-cols-12 items-stretch">
      {/* Left Column: Premium Carousel Banner (Desktop only) */}
      <div className="hidden lg:block lg:col-span-5 xl:col-span-4 h-full">
        <AuthCarousel />
      </div>

      {/* Right Column: Centralized Register Form */}
      <div className="lg:col-span-7 xl:col-span-8 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto max-h-screen">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-soft-pink/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-lavender/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg py-8"
        >
          <div className="text-center mb-6 lg:hidden">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SheRide</h1>
          </div>

          <GlassCard padding="p-8" className="shadow-premium-lg">
            <div className="mb-6 flex flex-col items-start gap-2">
              <Badge variant="verified">Female-only platform 💜</Badge>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-1">Join SheRide</h2>
              <p className="text-xs text-gray-500">Create your safe riding account in minutes</p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                icon={User}
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                icon={Mail}
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <Input
                label="Phone"
                type="tel"
                icon={Phone}
                placeholder="+91 98765 XXXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
              <Input
                label="Confirm Password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                required
              />
              <label className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                  className="accent-lavender mt-0.5"
                />
                <span>I confirm I am a woman and agree to SheRide's Terms and identity verification process.</span>
              </label>
              <Button type="submit" className="w-full py-3" loading={loading}>
                Create Account
              </Button>
            </form>

            <div className="mt-4 flex items-center gap-2 p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              All passenger and driver accounts require identity verification.
            </div>

            <div className="mt-5 pt-5 border-t border-lavender/10">
              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => { loginDemo('rider'); navigate('/app/home') }}
              >
                Try Demo Account
              </Button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account? <Link to="/login" className="text-lavender font-bold hover:underline">Sign in</Link>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
