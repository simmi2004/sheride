export default function Skeleton({ className = 'h-4 w-full', rounded = 'rounded-xl' }) {
  return <div className={`skeleton ${rounded} ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-3xl p-6 space-y-3">
      <Skeleton className="h-10 w-10" rounded="rounded-2xl" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
}
