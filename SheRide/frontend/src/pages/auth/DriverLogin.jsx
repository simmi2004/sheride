import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, Mail, Lock, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import GlassCard from '../../components/ui/GlassCard'
import AuthCarousel from '../../components/auth/AuthCarousel'

export default function DriverLogin() {
  const { loginDemo } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 grid lg:grid-cols-12 items-stretch">
      {/* Left Column: Premium Carousel Banner (Desktop only) */}
      <div className="hidden lg:block lg:col-span-5 xl:col-span-4 h-full">
        <AuthCarousel />
      </div>

      {/* Right Column: Centralized Login Form */}
      <div className="lg:col-span-7 xl:col-span-8 flex items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-soft-pink/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-lavender/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8 lg:hidden">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
              <Car className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SheRide Driver</h1>
          </div>

          <GlassCard padding="p-8" className="shadow-premium-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                Driver Login
              </h2>
              <p className="text-xs text-gray-500 mt-1">For verified women drivers with 5+ years experience</p>
            </div>

            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="driver@sheride.com"
              />
              <Input
                label="Password"
                type="password"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Button className="w-full py-3" onClick={() => { loginDemo('driver'); navigate('/driver/dashboard') }}>
                Sign In
              </Button>
              <div className="mt-4 pt-4 border-t border-lavender/10">
                <Button variant="outline" className="w-full text-xs" onClick={() => { loginDemo('driver'); navigate('/driver/dashboard') }}>
                  Demo Driver Access
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              New driver? <Link to="/driver/register" className="text-lavender font-bold hover:underline">Apply Now</Link>
            </p>
            <p className="text-center text-xs text-gray-400 mt-4 pt-4 border-t border-lavender/5">
              Not a driver? <Link to="/login" className="text-lavender hover:underline font-semibold">Rider Login</Link>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
