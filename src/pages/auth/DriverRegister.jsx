import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, Upload, CheckCircle, Shield, ArrowLeft, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import AuthCarousel from '../../components/auth/AuthCarousel'

export default function DriverRegister() {
  const { loginDemo } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 grid lg:grid-cols-12 items-stretch">
      {/* Left Column: Premium Carousel Banner (Desktop only) */}
      <div className="hidden lg:block lg:col-span-5 xl:col-span-4 h-full">
        <AuthCarousel />
      </div>

      {/* Right Column: Multi-step Application Form */}
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
              <Car className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SheRide Driver</h1>
          </div>

          <GlassCard padding="p-8" className="shadow-premium-lg">
            <div className="mb-6 flex flex-col items-start gap-2">
              <Badge variant="verified">Women Drivers Only · 5+ Yrs Exp 💜</Badge>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-1">Become a Driver</h2>
              <p className="text-xs text-gray-500">Earn flexibly within a safe, verified female community</p>

              {/* Progress Steps bar */}
              <div className="flex items-center gap-2 mt-4 w-full">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${s <= step ? 'w-10 bg-lavender' : 'w-4 bg-gray-200 dark:bg-gray-700'}`} />
                ))}
                <span className="text-[10px] font-bold text-gray-400 ml-auto uppercase tracking-wider">Step {step} of 3</span>
              </div>
            </div>

            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-lavender/10 text-[11px] text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-lavender flex-shrink-0 mt-0.5" />
                  Eligibility check: You must identify as a woman and possess a valid driver license with a minimum of 5 years driving history.
                </div>
                <Input label="Full Name" placeholder="Your full name" />
                <Input label="Email" type="email" placeholder="you@email.com" />
                <Input label="Phone" type="tel" placeholder="+91 98765 XXXXX" />
                <Input label="Years of Driving Experience" type="number" placeholder="Must be 5 or more" min="5" />
                <Input label="Password" type="password" placeholder="••••••••" />
                <Button className="w-full flex items-center justify-center gap-1.5 py-3" onClick={() => setStep(2)}>
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <Input label="Vehicle Model & Make" placeholder="e.g. Toyota Innova, Maruti Swift" />
                <Input label="License Plate Number" placeholder="MH 02 AB 1234" />
                <Input label="Driving License Number" placeholder="DL-XXXX-XXXXXXX" />
                <Input label="License Issue Year" placeholder="e.g. 2018" />
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs" onClick={() => setStep(3)}>
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Upload Verification Documents</p>
                {['Government ID (Aadhar/Passport)', 'Driving License (Front & Back)', 'Vehicle RC book (Registration)', 'Recent Profile Photo'].map((doc) => (
                  <div key={doc} className="flex items-center justify-between p-3.5 rounded-2xl border border-dashed border-lavender/30 hover:border-lavender/60 transition-all bg-white/40 dark:bg-white/5">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{doc}</span>
                    <button className="flex items-center gap-1 text-xs text-lavender font-bold hover:underline">
                      <Upload className="w-3.5 h-3.5" /> Upload
                    </button>
                  </div>
                ))}
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                  <CheckCircle className="w-4 h-4" /> Verification review completes in 24 - 48 hours.
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button className="flex-1 py-3 text-xs" onClick={() => { loginDemo('driver'); navigate('/driver/dashboard') }}>
                    Submit Application
                  </Button>
                </div>
              </motion.div>
            )}

            <p className="text-center text-sm text-gray-500 mt-6">
              Already applied? <Link to="/driver/login" className="text-lavender font-bold hover:underline">Sign in</Link>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
