import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, Upload, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import { useState } from 'react'

export default function DriverRegister() {
  const { loginDemo } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <GlassCard padding="p-8">
          <div className="text-center mb-6">
            <Badge variant="verified" className="mb-3">Women Drivers Only · 5+ Yrs Experience</Badge>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Become a Driver</h1>
            <p className="text-sm text-gray-500 mt-2">Only women with 5+ years of driving experience can apply</p>
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 rounded-full transition-all ${s <= step ? 'w-8 bg-lavender' : 'w-4 bg-gray-200 dark:bg-gray-700'}`} />
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 rounded-xl bg-lavender/10 text-xs text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-lavender flex-shrink-0 mt-0.5" />
                Eligibility: You must be a woman with at least 5 years of valid driving experience. Only women can book rides on SheRide.
              </div>
              <Input label="Full Name" placeholder="Your name" />
              <Input label="Email" type="email" />
              <Input label="Phone" type="tel" />
              <Input label="Years of Driving Experience" type="number" placeholder="Minimum 5 years" min="5" />
              <Input label="Password" type="password" />
              <Button className="w-full" onClick={() => setStep(2)}>Continue</Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3">
              <Input label="Vehicle Make & Model" placeholder="e.g. Toyota Innova" />
              <Input label="License Plate" placeholder="DL 01 AB 1234" />
              <Input label="Driving License Number" />
              <Input label="License Issue Year" placeholder="Must show 5+ years experience" />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(3)}>Continue</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              {['Government ID', 'Driver License (5+ yrs)', 'Vehicle Registration', 'Profile Photo', 'Experience Certificate'].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-4 rounded-2xl border border-dashed border-lavender/30">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{doc}</span>
                  <button className="flex items-center gap-1 text-sm text-lavender font-semibold"><Upload className="w-4 h-4" /> Upload</button>
                </div>
              ))}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 text-xs">
                <CheckCircle className="w-4 h-4" /> Verification takes 24-48 hours
              </div>
              <Button className="w-full" onClick={() => { loginDemo('driver'); navigate('/driver/dashboard') }}>Submit Application</Button>
            </div>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Already registered? <Link to="/driver/login" className="text-lavender font-semibold">Sign in</Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}
