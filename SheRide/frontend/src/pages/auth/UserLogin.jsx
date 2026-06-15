import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import GlassCard from '../../components/ui/GlassCard'

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
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <GlassCard padding="p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
              <p className="text-sm text-gray-500 mt-1">Women only — verified female riders</p>
            </div>

            {error && <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Email" type="email" icon={Mail} placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <Input label="Password" type="password" icon={Lock} placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} className="accent-lavender rounded" />
                Remember me
              </label>
              <Button type="submit" className="w-full" loading={loading}>Sign In</Button>
            </form>

            <div className="mt-6 pt-6 border-t border-lavender/10">
              <p className="text-xs text-gray-500 text-center mb-3">Demo access (no backend required)</p>
              <Button variant="outline" className="w-full" onClick={handleDemo}>Continue as Demo Rider</Button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account? <Link to="/signup" className="text-lavender font-semibold hover:underline">Sign up</Link>
            </p>
            <p className="text-center text-xs text-gray-400 mt-3">
              <Link to="/driver/login" className="hover:text-lavender">Driver login</Link> · <Link to="/admin/login" className="hover:text-lavender">Admin login</Link>
            </p>
          </GlassCard>
        </motion.div>
    </div>
  )
}
