import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Shield } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import Button from '../ui/Button'

const LINKS = [
  { label: 'Safety', href: '#safety' },
  { label: 'Features', href: '#features' },
  { label: 'Drivers', href: '#drivers' },
  { label: 'FAQ', href: '#faq' },
]

export default function LandingNavbar() {
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-lavender/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">SheRide</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map(({ label, href }) => (
              <a key={href} href={href} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-lavender transition-colors">
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggle} className="p-2.5 rounded-xl hover:bg-lavender/10 text-gray-500" aria-label="Toggle theme">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Log In</Button>
            <Button size="sm" onClick={() => navigate('/signup')}>Get Started</Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-xl text-gray-500">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setOpen(!open)} className="p-2 rounded-xl text-gray-500">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-lavender/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {LINKS.map(({ label, href }) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  {label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { navigate('/login'); setOpen(false) }}>Log In</Button>
                <Button size="sm" className="flex-1" onClick={() => { navigate('/signup'); setOpen(false) }}>Sign Up</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
