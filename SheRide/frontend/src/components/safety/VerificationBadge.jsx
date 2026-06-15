import { ShieldCheck } from 'lucide-react'
import Badge from '../ui/Badge'

export default function VerificationBadge({ type = 'driver', size = 'md' }) {
  const labels = {
    driver: 'Verified Female Driver',
    user: 'Verified Female Rider',
    id: 'ID Verified',
    background: 'Background Checked',
  }

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: '',
    lg: 'text-sm px-4 py-1.5',
  }

  return (
    <Badge variant="verified" icon={ShieldCheck} className={sizes[size]}>
      {labels[type] ?? labels.driver}
    </Badge>
  )
}
