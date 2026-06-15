import { useState } from 'react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Avatar from '../../components/ui/Avatar'
import VerificationBadge from '../../components/safety/VerificationBadge'
import Toggle from '../../components/ui/Toggle'
import { useAuth } from '../../context/AuthContext'

export default function ProfileSettings() {
  const { user, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' })
  const [nightMode, setNightMode] = useState(true)

  function handleSave() {
    updateUser(form)
    setEditing(false)
  }

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>

        <GlassCard className="text-center">
          <Avatar name={user?.name} size="xl" className="mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
          <VerificationBadge type="user" className="mt-2" />
          <p className="text-sm text-gray-500 mt-2">Member since Jan 2025</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900 dark:text-white">Personal Info</h3>
            <Button variant="ghost" size="sm" onClick={() => editing ? handleSave() : setEditing(true)}>
              {editing ? 'Save' : 'Edit'}
            </Button>
          </div>
          {editing ? (
            <div className="space-y-3">
              <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          ) : (
            <dl className="space-y-3">
              {[{ l: 'Name', v: user?.name }, { l: 'Email', v: user?.email }, { l: 'Phone', v: user?.phone }].map((r) => (
                <div key={r.l} className="flex justify-between py-2 border-b border-lavender/10 last:border-0">
                  <dt className="text-sm text-gray-500">{r.l}</dt>
                  <dd className="text-sm font-semibold text-gray-900 dark:text-white">{r.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </GlassCard>

        <GlassCard className="space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Preferences</h3>
          <Toggle enabled={nightMode} onChange={setNightMode} label="Night Mode Safety" description="Enhanced protections during late rides" />
          <Toggle enabled={true} onChange={() => {}} label="Ride Notifications" description="Get alerts about your trips" />
          <Toggle enabled={true} onChange={() => {}} label="Auto Share Rides" description="Share trips with trusted contacts" />
        </GlassCard>
      </div>
    </PageTransition>
  )
}
