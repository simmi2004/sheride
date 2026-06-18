import { Link } from 'react-router-dom'
import { Shield, Share2, Globe, Mail } from 'lucide-react'

const FOOTER_LINKS = {
  Product: [
    { label: 'Safety Features', href: '#safety' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact', href: 'mailto:support@sheride.com' },
    { label: 'Privacy', href: '#' },
  ],
}

export default function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">SheRide</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">Safe, elegant rides built exclusively for women. By women, for women.</p>
            <div className="flex gap-3 mt-5">
              {[Share2, Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-lavender/20 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith('/') ? (
                      <Link to={href} className="text-sm text-gray-400 hover:text-lavender transition-colors">{label}</Link>
                    ) : (
                      <a href={href} className="text-sm text-gray-400 hover:text-lavender transition-colors">{label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} SheRide. All rights reserved.</p>
          <p className="text-xs text-gray-500">Made with 💜 for women's safety</p>
        </div>
      </div>
    </footer>
  )
}
