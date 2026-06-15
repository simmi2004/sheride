import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, Shield, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'

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
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
          <GlassCard padding="p-8">
            <div className="text-center mb-6">
              <Badge variant="verified" className="mb-4">Female-only platform</Badge>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Join SheRide</h1>
              <p className="text-sm text-gray-500 mt-1">Create your safe riding account</p>
            </div>

            {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input label="Full Name" icon={User} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input label="Email" type="email" icon={Mail} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <Input label="Phone" type="tel" icon={Phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              <Input label="Password" type="password" icon={Lock} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              <Input label="Confirm Password" type="password" icon={Lock} value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
              <label className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} className="accent-lavender mt-0.5" />
                I confirm I am a woman and agree to identity verification
              </label>
              <Button type="submit" className="w-full" loading={loading}>Create Account</Button>
            </form>

            <div className="mt-5 flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              All accounts require female identity verification
            </div>

            <Button variant="outline" className="w-full mt-4" onClick={() => { loginDemo('rider'); navigate('/app/home') }}>
              Try Demo Account
            </Button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account? <Link to="/login" className="text-lavender font-semibold">Sign in</Link>
            </p>
          </GlassCard>
        </motion.div>
    </div>
  )
}
