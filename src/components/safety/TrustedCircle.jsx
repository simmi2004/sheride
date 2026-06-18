import { Users, Phone, Plus } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import { TRUSTED_CONTACTS } from '../../data/mockData'

export default function TrustedCircle({ showAdd = true }) {
  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-lavender" />
          <h3 className="font-bold text-gray-900 dark:text-white">Trusted Circle</h3>
        </div>
        {showAdd && (
          <Button variant="ghost" size="sm" icon={Plus}>Add</Button>
        )}
      </div>
      <div className="space-y-3">
        {TRUSTED_CONTACTS.map((contact) => (
          <div key={contact.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-white/5">
            <Avatar name={contact.name} size="md" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 dark:text-white">{contact.name}</p>
              <p className="text-xs text-gray-500">{contact.relation}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${contact.active ? 'bg-emerald-500' : 'bg-gray-300'}`} />
              <button className="p-2 rounded-xl hover:bg-lavender/10 text-lavender">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
