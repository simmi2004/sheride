import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import GlassCard from '../../components/ui/GlassCard'

export default function AdminLogin() {
  const { loginDemo } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <GlassCard padding="p-8" className="!bg-gray-800/80 !border-white/10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-sm text-gray-400 mt-1">SheRide management console</p>
          </div>
          <div className="space-y-4">
            <Input label="Admin Email" type="email" className="[&_label]:text-gray-300" />
            <Input label="Password" type="password" className="[&_label]:text-gray-300" />
            <Button className="w-full" onClick={() => { loginDemo('admin'); navigate('/admin/dashboard') }}>Sign In</Button>
            <Button variant="outline" className="w-full !border-white/20 !text-gray-300" onClick={() => { loginDemo('admin'); navigate('/admin/dashboard') }}>
              Demo Admin Access
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
