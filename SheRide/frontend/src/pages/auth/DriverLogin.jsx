import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import GlassCard from '../../components/ui/GlassCard'
import { useState } from 'react'

export default function DriverLogin() {
  const { loginDemo } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <GlassCard padding="p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <Car className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Driver Login</h1>
            <p className="text-sm text-gray-500 mt-1">For verified women drivers with 5+ years experience</p>
          </div>
          <div className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button className="w-full" onClick={() => { loginDemo('driver'); navigate('/driver/dashboard') }}>Sign In</Button>
            <Button variant="outline" className="w-full" onClick={() => { loginDemo('driver'); navigate('/driver/dashboard') }}>Demo Driver Access</Button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            New driver? <Link to="/driver/register" className="text-lavender font-semibold">Register</Link>
          </p>
          <p className="text-center text-xs text-gray-400 mt-2"><Link to="/login" className="hover:text-lavender">Rider login</Link></p>
        </GlassCard>
      </motion.div>
    </div>
  )
}
