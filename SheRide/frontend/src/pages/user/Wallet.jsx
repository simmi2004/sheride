import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { CreditCard, Plus, Wallet as WalletIcon } from 'lucide-react'

const TRANSACTIONS = [
  { id: 1, desc: 'Ride to Saket', amount: -180, date: '12 Jun 2026' },
  { id: 2, desc: 'Cashback reward', amount: 50, date: '10 Jun 2026' },
  { id: 3, desc: 'Ride to Airport', amount: -520, date: '10 Jun 2026' },
  { id: 4, desc: 'Wallet top-up', amount: 1000, date: '5 Jun 2026' },
]

const PAYMENT_METHODS = [
  { id: 1, type: 'UPI', detail: 'priya@upi', default: true },
  { id: 2, type: 'Card', detail: '•••• 4242', default: false },
]

export default function Wallet() {
  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Wallet & Payments</h1>

        <GlassCard className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 gradient-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center gap-3 mb-4">
            <WalletIcon className="w-6 h-6 text-lavender" />
            <span className="text-sm text-gray-500">Available Balance</span>
          </div>
          <p className="text-4xl font-bold gradient-text mb-6">₹1,350</p>
          <div className="flex gap-3">
            <Button size="sm" icon={Plus}>Add Money</Button>
            <Button variant="outline" size="sm">Withdraw</Button>
          </div>
        </GlassCard>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 dark:text-white">Payment Methods</h2>
            <Button variant="ghost" size="sm" icon={Plus}>Add</Button>
          </div>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((m) => (
              <GlassCard key={m.id} padding="p-4" className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-lavender" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{m.type}</p>
                  <p className="text-xs text-gray-500">{m.detail}</p>
                </div>
                {m.default && <Badge variant="lavender">Default</Badge>}
              </GlassCard>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>
          <div className="space-y-2">
            {TRANSACTIONS.map((t) => (
              <GlassCard key={t.id} padding="p-4" className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.desc}</p>
                  <p className="text-xs text-gray-500">{t.date}</p>
                </div>
                <span className={`font-bold text-sm ${t.amount > 0 ? 'text-emerald-600' : 'text-gray-900 dark:text-white'}`}>
                  {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount)}
                </span>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
