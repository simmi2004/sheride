import { useState } from 'react'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import { ADMIN_USERS } from '../../data/mockData'
import { Search } from 'lucide-react'

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const users = ADMIN_USERS.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search))

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <div className="w-full sm:w-64">
            <Input icon={Search} placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <GlassCard padding="p-0" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-lavender/10 bg-lavender/5">
                  {['Name', 'Email', 'Rides', 'Status', 'Joined', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-lavender/5 hover:bg-lavender/5 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{u.name}</td>
                    <td className="px-5 py-4 text-gray-500">{u.email}</td>
                    <td className="px-5 py-4">{u.rides}</td>
                    <td className="px-5 py-4"><Badge variant={u.status === 'active' ? 'success' : 'danger'}>{u.status}</Badge></td>
                    <td className="px-5 py-4 text-gray-500">{u.joined}</td>
                    <td className="px-5 py-4">
                      <button className="text-lavender font-semibold text-xs hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
