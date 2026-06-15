import axios from 'axios'

// ─── Base client ──────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Attach token from storage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sheride_token')
               ?? sessionStorage.getItem('sheride_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Global response error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status
    if (status === 401) {
      // Token expired — clear storage and redirect to login
      localStorage.removeItem('sheride_token')
      localStorage.removeItem('sheride_user')
      sessionStorage.removeItem('sheride_token')
      sessionStorage.removeItem('sheride_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  /** POST /auth/register */
  register: (payload) => api.post('/auth/register', payload),

  /** POST /auth/login */
  login: (payload) => api.post('/auth/login', payload),

  /** GET /auth/me */
  me: () => api.get('/auth/me'),
}

// ─── Rides ────────────────────────────────────────────────────────────────────
export const ridesApi = {
  /** GET /rides  — rider's own ride history */
  getMyRides: () => api.get('/rides'),

  /** POST /rides  — book a new ride */
  bookRide: (payload) => api.post('/rides', payload),

  /** GET /rides/:id */
  getRide: (id) => api.get(`/rides/${id}`),

  /** PATCH /rides/:id/cancel */
  cancelRide: (id) => api.patch(`/rides/${id}/cancel`),

  /** GET /rides/fare-estimate  — query params: { from, to } */
  getFareEstimate: (from, to) =>
    api.get('/rides/fare-estimate', { params: { from, to } }),
}

// ─── Driver ───────────────────────────────────────────────────────────────────
export const driverApi = {
  /** GET /driver/dashboard */
  getDashboard: () => api.get('/driver/dashboard'),

  /** GET /driver/rides */
  getRides: () => api.get('/driver/rides'),

  /** PATCH /driver/availability  — { available: boolean } */
  setAvailability: (available) =>
    api.patch('/driver/availability', { available }),

  /** PATCH /driver/rides/:id/accept */
  acceptRide: (id) => api.patch(`/driver/rides/${id}/accept`),

  /** PATCH /driver/rides/:id/complete */
  completeRide: (id) => api.patch(`/driver/rides/${id}/complete`),
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export const adminApi = {
  /** GET /admin/stats */
  getStats: () => api.get('/admin/stats'),

  /** GET /admin/users */
  getUsers: (params) => api.get('/admin/users', { params }),

  /** PATCH /admin/users/:id/status  — { status: 'active' | 'suspended' } */
  updateUserStatus: (id, status) =>
    api.patch(`/admin/users/${id}/status`, { status }),

  /** GET /admin/rides */
  getRides: (params) => api.get('/admin/rides', { params }),

  /** GET /admin/drivers/pending  — unverified drivers */
  getPendingDrivers: () => api.get('/admin/drivers/pending'),

  /** PATCH /admin/drivers/:id/verify */
  verifyDriver: (id) => api.patch(`/admin/drivers/${id}/verify`),
}

// ─── User profile ─────────────────────────────────────────────────────────────
export const userApi = {
  /** PATCH /user/profile */
  updateProfile: (payload) => api.patch('/user/profile', payload),

  /** PATCH /user/safety/contacts */
  updateTrustedContacts: (contacts) =>
    api.patch('/user/safety/contacts', { contacts }),
}

export default api
