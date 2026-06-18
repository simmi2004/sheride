import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Search, Star, Shield, Calendar, ChevronRight, ArrowRight } from 'lucide-react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import StatCard from '../../components/ui/StatCard'
import MapPlaceholder from '../../components/map/MapPlaceholder'
import SafetyScoreCard from '../../components/safety/SafetyScoreCard'
import VerificationBadge from '../../components/safety/VerificationBadge'
import { useAuth } from '../../context/AuthContext'
import { getLocalStorageRides } from '../../services/rideStorage'

export default function UserHome() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeService, setActiveService] = useState('ride') // 'ride' | 'parcel'

  const firstName = user?.name?.split(' ')[0] ?? 'there'
  const rides = getLocalStorageRides()
  const totalRidesCount = rides.filter(r => r.status === 'completed').length + 20

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto space-y-8 pb-10">
        
        {/* Hello Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Hello, {firstName} 👋</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back to SheRide</p>
          </div>
          <VerificationBadge type="user" />
        </div>

        {/* Uber-style tabs selector */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveService('ride')}
            className={`flex items-center gap-2 pb-3 px-6 font-bold text-lg transition-all border-b-4 ${activeService === 'ride' ? 'border-black text-black dark:border-white dark:text-white' : 'border-transparent text-gray-400'}`}
          >
            <span role="img" aria-label="ride">🚗</span> SheRide
          </button>
          <button
            onClick={() => setActiveService('parcel')}
            className={`flex items-center gap-2 pb-3 px-6 font-bold text-lg transition-all border-b-4 ${activeService === 'parcel' ? 'border-black text-black dark:border-white dark:text-white' : 'border-transparent text-gray-400'}`}
          >
            <span role="img" aria-label="parcel">📦</span> Parcel
          </button>
        </div>

        {activeService === 'ride' ? (
          <>
            {/* Where to Search Pill */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-4 flex items-center justify-between shadow-premium border border-gray-200/50 dark:border-gray-800">
              <div className="flex items-center gap-3 flex-1 cursor-pointer py-1 pl-2" onClick={() => navigate('/app/search')}>
                <Search className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                <span className="font-bold text-xl text-gray-800 dark:text-gray-200">Where to?</span>
              </div>
              <button
                onClick={() => navigate('/app/search')}
                className="flex items-center gap-2 bg-white dark:bg-black hover:bg-gray-50 px-4 py-2.5 rounded-full shadow-premium text-sm font-bold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800"
              >
                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                Later
              </button>
            </div>

            {/* Saved Destinations / Promotion Rows */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden shadow-premium">
              <button
                onClick={() => navigate('/app/search')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-500 flex-shrink-0">
                    <span className="text-xl">🏷️</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Coder Roots - Best IT Company in Mohali, Punjab</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Ground floor, Plot no - F 135...</p>
                    <p className="text-xs text-red-500 font-bold mt-0.5">6% off select trips</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => navigate('/app/search')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-500 flex-shrink-0">
                    <span className="text-xl">🏷️</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Guru Nanak Enclave</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Ramgarh, to Maloa Road, 16...</p>
                    <p className="text-xs text-red-500 font-bold mt-0.5">6% off select trips</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* "For You" Circle Icons Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">For you</h2>
                <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Trip', icon: '🚗', badge: '25% off' },
                  { label: 'Parcel', icon: '📦', badge: '25% off' },
                  { label: 'Bike', icon: '🏍️' },
                  { label: 'Auto', icon: '🛺' },
                  { label: 'Rentals', icon: '⏱️' },
                  { label: 'Intercity', icon: '💼' },
                  { label: 'Bus tickets', icon: '🚌', badge: 'Promo' },
                  { label: 'Reserve', icon: '📅', badge: 'Promo' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate('/app/search')}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700/80 flex items-center justify-center transition-all">
                      {item.badge && (
                        <span className="absolute -top-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-red-500 shadow">
                          {item.badge}
                        </span>
                      )}
                      <span className="text-3xl transition-transform group-hover:scale-110 duration-200">{item.icon}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200 text-center">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* "Ride as you like it" Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Ride as you like it</h2>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { name: 'Book Bike', desc: 'Zip through traffic', icon: '🏍️', bg: 'bg-indigo-50 dark:bg-indigo-950/20' },
                  { name: 'Book Rental', desc: 'Travel stress-free', icon: '⏱️', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
                  { name: 'Request XL', desc: 'For when you need space', icon: '🚙', bg: 'bg-purple-50 dark:bg-purple-950/20' },
                ].map((item, idx) => (
                  <div key={idx} className={`w-52 flex-shrink-0 ${item.bg} p-4 rounded-2xl flex flex-col justify-between h-32 cursor-pointer hover:opacity-95 transition-all`} onClick={() => navigate('/app/search')}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                      </div>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <span className="text-xs font-bold text-lavender flex items-center gap-1">Book now →</span>
                  </div>
                ))}
              </div>
            </div>

            {/* "Outstation getaways" Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Outstation getaways</h2>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { name: 'Mussoorie', price: '₹3,999', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80', desc: 'Starting at' },
                  { name: 'Manali', price: '₹5,999', img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&q=80', desc: 'Starting at' },
                  { name: 'Shimla', price: '₹4,499', img: 'https://images.unsplash.com/photo-1588668214407-6eb952705990?w=400&q=80', desc: 'Starting at' },
                ].map((item, idx) => (
                  <div key={idx} className="w-56 flex-shrink-0 bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-premium cursor-pointer hover:scale-[1.01] transition-all" onClick={() => navigate('/app/search')}>
                    <img src={item.img} alt={item.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.desc} {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Dashboard Info */}
            <div className="grid sm:grid-cols-3 gap-4">
              <StatCard icon={MapPin} label="Total Rides" value={totalRidesCount.toString()} delay={0.1} />
              <StatCard icon={Star} label="Avg Rating" value="4.8" delay={0.2} />
              <StatCard icon={Shield} label="Safety Score" value="94" delay={0.3} />
            </div>

            <SafetyScoreCard score={94} />
          </>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 text-center space-y-4 shadow-premium">
            <span className="text-5xl block">📦</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Send packages with SheRide Parcel</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">Get items delivered across Chandigarh and surrounding regions safely and instantly.</p>
            <Button className="px-8" onClick={() => navigate('/app/search')}>Book a Parcel Delivery</Button>
          </div>
        )}
        
      </div>
    </PageTransition>
  )
}
