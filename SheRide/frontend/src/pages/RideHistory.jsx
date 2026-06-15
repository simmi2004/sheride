import { useState } from 'react'
import { Link } from 'react-router-dom'

// ─── Mock data (replace with API) ─────────────────────────────────────────────
const MOCK_RIDES = [
  { id: 'R001', date: '12 Jun 2026', from: 'Connaught Place', to: 'Saket',      fare: '₹180', status: 'completed', driver: 'Meera S.',  rating: 5 },
  { id: 'R002', date: '10 Jun 2026', from: 'Lajpat Nagar',   to: 'IGI Airport', fare: '₹520', status: 'completed', driver: 'Anjali R.', rating: 4 },
  { id: 'R003', date: '7 Jun 2026',  from: 'Dwarka Sec 10',  to: 'Janakpuri',   fare: '₹130', status: 'cancelled', driver: 'Priya K.',  rating: null },
  { id: 'R004', date: '2 Jun 2026',  from: 'Karol Bagh',     to: 'Rohini',      fare: '₹210', status: 'completed', driver: 'Sunita M.', rating: 5 },
  { id: 'R005', date: '28 May 2026', from: 'Hauz Khas',      to: 'Noida Sec 62',fare: '₹340', status: 'completed', driver: 'Meera S.',  rating: 5 },
  { id: 'R006', date: '20 May 2026', from: 'Vasant Kunj',    to: 'Gurgaon',     fare: '₹450', status: 'cancelled', driver: 'Anjali R.', rating: null },
]

const STATUS_MAP = {
  completed: { label: 'Completed', cls: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
  ongoing:   { label: 'Ongoing',   cls: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
}

function StatusBadge({ status }) {
  const { label, cls } = STATUS_MAP[status] ?? { label: status, cls: '' }
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {label}
    </span>
  )
}

function StarRating({ rating }) {
  if (!rating) return <span className="text-xs text-gray-400">Not rated</span>
  return (
    <span className="text-yellow-400 text-sm" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  )
}

export default function RideHistory() {
  const [rides,    setRides]    = useState(MOCK_RIDES)  // eslint-disable-line no-unused-vars
  const [filter,   setFilter]   = useState('all')
  const [search,   setSearch]   = useState('')
  const [loading]               = useState(false)  // set true when real API is wired

  // TODO: swap mock for real API
  // useEffect(() => {
  //   ridesApi.getMyRides().then(({ data }) => setRides(data))
  // }, [])

  const filtered = rides.filter((r) => {
    const matchStatus = filter === 'all' || r.status === filter
    const matchSearch = search === '' ||
      r.from.toLowerCase().includes(search.toLowerCase()) ||
      r.to.toLowerCase().includes(search.toLowerCase()) ||
      r.driver.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const totalSpent = rides
    .filter((r) => r.status === 'completed')
    .reduce((sum, r) => sum + parseInt(r.fare.replace('₹', '')), 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ride History</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{rides.length} rides · Total spent ₹{totalSpent.toLocaleString()}</p>
          </div>
          <Link to="/book" className="btn-primary text-sm px-4 py-2">
            + Book New Ride
          </Link>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="search"
            placeholder="Search by location or driver…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <div className="flex gap-2" role="group" aria-label="Filter rides">
            {['all', 'completed', 'cancelled'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors
                  ${filter === f
                    ? 'bg-pink-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-pink-300'
                  }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Ride list */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-pink-500 border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-4xl mb-3">🚗</p>
            <p className="font-medium">No rides found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((ride) => (
              <article
                key={ride.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
              >
                {/* Route */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center pt-1 gap-1">
                      <span className="w-2 h-2 rounded-full bg-pink-500 flex-shrink-0" aria-hidden="true" />
                      <span className="w-0.5 h-6 bg-gray-200 dark:bg-gray-600" aria-hidden="true" />
                      <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{ride.from}</p>
                      <p className="text-gray-500 dark:text-gray-400 truncate">{ride.to}</p>
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-1 text-sm min-w-[120px]">
                  <span className="text-gray-500 dark:text-gray-400">{ride.date}</span>
                  <span className="text-gray-600 dark:text-gray-300">{ride.driver}</span>
                  <StarRating rating={ride.rating} />
                </div>

                {/* Right side */}
                <div className="flex flex-col items-end gap-2 min-w-[90px]">
                  <span className="text-lg font-bold text-pink-500">{ride.fare}</span>
                  <StatusBadge status={ride.status} />
                  <span className="text-xs text-gray-400">{ride.id}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
