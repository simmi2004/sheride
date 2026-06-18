import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Eye, Users, Star, ChevronDown, CheckCircle,
  Lock, Radio, Brain, MapPin, Sparkles, Bell
} from 'lucide-react'
import LandingNavbar from '../../components/layout/LandingNavbar'
import LandingFooter from '../../components/layout/LandingFooter'
import Button from '../../components/ui/Button'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import FareEstimator from '../../components/landing/FareEstimator'
import GuardianSimulator from '../../components/landing/GuardianSimulator'
import { TESTIMONIALS, FAQ_ITEMS } from '../../data/mockData'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const SAFETY_FEATURES = [
  { icon: Shield, title: 'Verified Female Drivers', desc: 'Only verified women with 5+ years of driving experience can become SheRide drivers.' },
  { icon: Radio, title: 'Live Trip Sharing', desc: 'Automatically share your ride with trusted contacts in real-time.' },
  { icon: Lock, title: 'SOS Emergency', desc: 'One-tap emergency alert notifies contacts and authorities instantly.' },
  { icon: Brain, title: 'AI Safety Score', desc: 'Intelligent monitoring detects unusual patterns during your ride.' },
  { icon: Eye, title: 'Ride Guardian', desc: 'AI companion watches your trip and checks in periodically.' },
  { icon: MapPin, title: 'Night Mode Safety', desc: 'Enhanced protections and priority support during late-night rides.' },
]

const WHY_SAFER = [
  { title: 'Women-Only Ecosystem', desc: 'Only women can book rides on SheRide. Every driver is also a verified woman — creating a fundamentally safer space.' },
  { title: 'Experienced Drivers', desc: 'All SheRide drivers must have at least 5 years of professional driving experience before they can join the platform.' },
  { title: '24/7 Safety Team', desc: 'Dedicated safety specialists monitoring rides and responding to emergencies around the clock.' },
]

const LIVE_ACTIVITIES = [
  { text: "Ride #409: Safe arrival in Bandra West 🛡️", badge: "Safe Trip" },
  { text: "Riya K. matched with driver Sunita M. 💜", badge: "Match Found" },
  { text: "ShePlus ride requested for Airport T2 ✨", badge: "Booking" },
  { text: "Ride #922: Safety check-in verified 📱", badge: "Guardian Active" },
  { text: "Alisha rated driver Meera S. 5-stars 🌟", badge: "Review" },
  { text: "Emergency contacts verified for Divya R. 🔒", badge: "Account" },
  { text: "Ride #812: OTP check successful ⚡", badge: "Safety Verify" }
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)
  const [activityIndex, setActivityIndex] = useState(0)
  const [showToast, setShowToast] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowToast(false)
      setTimeout(() => {
        setActivityIndex((prev) => (prev + 1) % LIVE_ACTIVITIES.length)
        setShowToast(true)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      <LandingNavbar />

      {/* Hero with interactive FareEstimator */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <Badge variant="lavender" className="mb-6">Women-only rides 💜</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6">
              Ride with{' '}
              <span className="gradient-text">confidence</span>
              <br />& elegance
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-lg">
              SheRide is exclusively for women. Only verified female riders can book rides, and only experienced female drivers with 5+ years on the road can drive.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate('/signup')}>Get Started Free</Button>
            </div>
            <div className="flex items-center gap-6 mt-10">
              {[{ v: '50K+', l: 'Rides' }, { v: '4.9★', l: 'Rating' }, { v: '8K+', l: 'Drivers' }].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-bold gradient-text">{s.v}</p>
                  <p className="text-sm text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <FareEstimator />
          </motion.div>
        </div>
        <motion.div {...fadeUp} className="flex justify-center mt-16">
          <a href="#why-safer" className="text-gray-400 hover:text-lavender transition-colors animate-bounce">
            <ChevronDown className="w-6 h-6" />
          </a>
        </motion.div>
      </section>

      {/* Why Safer */}
      <section id="why-safer" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why SheRide is safer</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Built from the ground up with women's safety as the foundation — not an afterthought.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {WHY_SAFER.map((item, i) => (
              <motion.div key={item.title} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <GlassCard hover className="h-full">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-md">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Safety Simulator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-lavender/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience Our Safety Core</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Click the options below to see how our active Ride Guardian detects and alerts during anomalous stops or route issues.</p>
          </motion.div>
          <GuardianSimulator />
        </div>
      </section>

      {/* Safety Features Cards */}
      <section id="safety" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Safety features</h2>
            <p className="text-gray-600 dark:text-gray-300">Every ride protected by multiple layers of safety technology.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SAFETY_FEATURES.map((f, i) => (
              <motion.div key={f.title} {...fadeUp} transition={{ delay: i * 0.08 }}>
                <GlassCard hover className="h-full">
                  <f.icon className="w-8 h-8 text-lavender mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1.5">{f.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Female Drivers */}
      <section id="drivers" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <Badge variant="verified" className="mb-4">Women Drivers Only</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet our female drivers</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Only women can become SheRide drivers. Each driver is verified, background-checked, and must have at least 5 years of driving experience. Rides are exclusively for women passengers.
            </p>
            <ul className="space-y-3">
              {['Women drivers only', 'Minimum 5+ years driving experience', '100% identity verified', 'Background & reference checks', 'Safety training certified'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />{t}
                </li>
              ))}
            </ul>
            {/* Join as a driver button removed */}
          </motion.div>
          <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
            {['Meera S.', 'Anjali R.', 'Priya K.', 'Sunita M.'].map((name, i) => (
              <GlassCard key={name} padding="p-5" hover>
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-lg mb-3">{name[0]}</div>
                <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-500">4.9 · 5+ yrs exp</span>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Loved by women everywhere</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">{t.avatar}</div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">"{t.text}"</p>
                  <div className="flex gap-0.5 mt-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently asked questions</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.05 }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full glass-card rounded-2xl p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-lavender flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {item.a}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto rounded-[2.5rem] gradient-primary p-12 text-center text-white shadow-premium-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to ride with confidence?</h2>
          <p className="opacity-90 mb-8">Join thousands of women who travel safely every day with SheRide.</p>
          <Button size="lg" className="!bg-white !text-lavender hover:!bg-soft-pink" onClick={() => navigate('/signup')}>Get Started Today</Button>
        </motion.div>
      </section>

      <LandingFooter />

      {/* Floating System Activities Toast Feed */}
      <div className="fixed bottom-4 left-4 z-40 hidden md:block w-72">
        <AnimatePresence mode="wait">
          {showToast && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-lavender/25 shadow-premium flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-lavender/10 flex items-center justify-center text-lavender flex-shrink-0">
                <Bell className="w-4 h-4 animate-swing" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-bold uppercase text-lavender tracking-wide">
                  {LIVE_ACTIVITIES[activityIndex].badge}
                </span>
                <p className="text-[11px] text-gray-700 dark:text-gray-200 font-medium truncate">
                  {LIVE_ACTIVITIES[activityIndex].text}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
