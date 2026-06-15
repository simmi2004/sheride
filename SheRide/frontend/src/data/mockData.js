export const MOCK_USER = {
  id: 'u1',
  name: 'Priya Sharma',
  email: 'priya@sheride.com',
  phone: '+91 98765 43210',
  role: 'rider',
  verified: true,
  avatar: null,
  safetyScore: 94,
  memberSince: 'Jan 2025',
}

export const MOCK_DRIVER = {
  id: 'd1',
  name: 'Meera Singh',
  email: 'meera@sheride.com',
  phone: '+91 98765 43211',
  role: 'driver',
  verified: true,
  rating: 4.9,
  totalRides: 1247,
  vehicle: { make: 'Toyota', model: 'Innova Crysta', plate: 'DL 01 AB 1234', color: 'Pearl White' },
}

export const MOCK_ADMIN = {
  id: 'a1',
  name: 'Admin User',
  email: 'admin@sheride.com',
  role: 'admin',
}

export const RIDE_OPTIONS = [
  { id: 'shego', name: 'SheGo', desc: 'Affordable everyday rides', icon: '🚗', eta: '3 min', price: 180, multiplier: 1 },
  { id: 'sheplus', name: 'ShePlus', desc: 'Premium comfort with extra safety', icon: '✨', eta: '5 min', price: 280, multiplier: 1.4 },
  { id: 'shexl', name: 'SheXL', desc: 'Spacious rides for groups', icon: '🚙', eta: '7 min', price: 350, multiplier: 1.8 },
]

export const MOCK_RIDES = [
  { id: 'R001', date: '12 Jun 2026', time: '6:30 PM', from: 'Connaught Place', to: 'Saket', fare: 180, status: 'completed', driver: 'Meera S.', rating: 5 },
  { id: 'R002', date: '10 Jun 2026', time: '9:15 AM', from: 'Lajpat Nagar', to: 'IGI Airport', fare: 520, status: 'completed', driver: 'Anjali R.', rating: 5 },
  { id: 'R003', date: '7 Jun 2026', time: '11:00 PM', from: 'Dwarka Sec 10', to: 'Janakpuri', fare: 130, status: 'cancelled', driver: 'Priya K.', rating: null },
  { id: 'R004', date: '2 Jun 2026', time: '4:45 PM', from: 'Karol Bagh', to: 'Rohini', fare: 210, status: 'completed', driver: 'Sunita M.', rating: 4 },
]

export const TRUSTED_CONTACTS = [
  { id: 1, name: 'Mom', phone: '+91 98765 11111', relation: 'Family', active: true },
  { id: 2, name: 'Ananya', phone: '+91 98765 22222', relation: 'Friend', active: true },
  { id: 3, name: 'Riya', phone: '+91 98765 33333', relation: 'Colleague', active: false },
]

export const FAVORITE_PLACES = [
  { id: 1, name: 'Home', address: 'B-42, Saket, New Delhi', icon: '🏠' },
  { id: 2, name: 'Office', address: 'Cyber Hub, Gurugram', icon: '💼' },
  { id: 3, name: 'Gym', address: 'Select Citywalk, Saket', icon: '💪' },
]

export const NOTIFICATIONS = [
  { id: 1, title: 'Ride completed', message: 'Your ride to Saket was completed. Rate your driver!', time: '2h ago', read: false, type: 'ride' },
  { id: 2, title: 'Safety check-in', message: 'We hope you arrived safely. Tap to confirm.', time: '5h ago', read: false, type: 'safety' },
  { id: 3, title: 'Wallet credited', message: '₹50 cashback added to your wallet.', time: '1d ago', read: true, type: 'payment' },
  { id: 4, title: 'New feature', message: 'Ride Guardian is now available on all trips.', time: '2d ago', read: true, type: 'info' },
]

export const DRIVER_EARNINGS = {
  today: 1240,
  week: 8420,
  month: 32400,
  chart: [
    { day: 'Mon', amount: 980 },
    { day: 'Tue', amount: 1120 },
    { day: 'Wed', amount: 890 },
    { day: 'Thu', amount: 1340 },
    { day: 'Fri', amount: 1560 },
    { day: 'Sat', amount: 1890 },
    { day: 'Sun', amount: 1240 },
  ],
}

export const DRIVER_REQUESTS = [
  { id: 'req1', rider: 'Priya S.', pickup: 'Connaught Place', drop: 'Saket', fare: 180, distance: '4.2 km', eta: '12 min' },
  { id: 'req2', rider: 'Anika M.', pickup: 'Karol Bagh', drop: 'Dwarka', fare: 320, distance: '18 km', eta: '35 min' },
]

export const ADMIN_STATS = {
  totalUsers: 12450,
  activeDrivers: 2840,
  ridesToday: 3420,
  revenue: 1240000,
  emergencies: 3,
  pendingVerifications: 28,
}

export const ADMIN_USERS = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya@sheride.com', rides: 24, status: 'active', joined: 'Jan 2025' },
  { id: 'u2', name: 'Anika Mehta', email: 'anika@sheride.com', rides: 56, status: 'active', joined: 'Dec 2024' },
  { id: 'u3', name: 'Riya Kapoor', email: 'riya@sheride.com', rides: 12, status: 'suspended', joined: 'Mar 2025' },
]

export const ADMIN_DRIVERS = [
  { id: 'd1', name: 'Meera Singh', email: 'meera@sheride.com', rating: 4.9, rides: 1247, status: 'verified', vehicle: 'Toyota Innova' },
  { id: 'd2', name: 'Sunita Rao', email: 'sunita@sheride.com', rating: 4.8, rides: 890, status: 'pending', vehicle: 'Maruti Swift' },
  { id: 'd3', name: 'Kavita Nair', email: 'kavita@sheride.com', rating: 4.7, rides: 456, status: 'verified', vehicle: 'Honda City' },
]

export const TESTIMONIALS = [
  { name: 'Priya M.', role: 'Daily Commuter', text: 'Finally a ride app where I feel genuinely safe. The SOS feature and verified drivers give me peace of mind on late-night commutes.', avatar: 'P' },
  { name: 'Anika S.', role: 'SheRide Driver', text: 'As a driver, SheRide has given me flexible income and a community I trust. The platform truly cares about women\'s safety.', avatar: 'A' },
  { name: 'Riya K.', role: 'Student', text: 'Clean rides, friendly drivers, and live tracking shared with my mom automatically. SheRide changed how I travel.', avatar: 'R' },
]

export const FAQ_ITEMS = [
  { q: 'Who can book rides on SheRide?', a: 'Only women can register and book rides on SheRide. Every rider undergoes female identity verification before their first ride.' },
  { q: 'Who can become a SheRide driver?', a: 'Only verified women with a minimum of 5 years of professional driving experience can apply to become a SheRide driver. Background checks and in-person interviews are mandatory.' },
  { q: 'How does SheRide verify drivers?', a: 'Every driver undergoes identity verification, background checks, driving experience validation (5+ years), and in-person interviews. Only verified female drivers can accept rides.' },
  { q: 'Is SheRide available 24/7?', a: 'Yes! SheRide operates round the clock in major cities with enhanced safety features during night hours.' },
  { q: 'What is Ride Guardian?', a: 'Ride Guardian is our AI-powered safety companion that monitors your trip and alerts trusted contacts if anything unusual is detected.' },
  { q: 'How does the SOS button work?', a: 'Hold the SOS button for 1.5 seconds to instantly alert your trusted contacts and local authorities with your live location.' },
]
