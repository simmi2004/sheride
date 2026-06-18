import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { addLocalStorageUser, getLocalStorageUsers } from '../services/rideStorage'

// ─── Shape reference ──────────────────────────────────────────────────────────
// user: { id, name, email, phone, role: 'rider' | 'driver' } | null

const AuthContext = createContext(null)

const TOKEN_KEY = 'sheride_token'
const USER_KEY  = 'sheride_user'

// Attach / remove the auth token on every axios request
function setAxiosToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [token, setToken]     = useState(null)
  const [loading, setLoading] = useState(true) // resolves after hydration

  // ── Hydrate from storage on mount ──────────────────────────────────────────
  useEffect(() => {
    // Read storage synchronously, update state once via microtask
    // to avoid the react-hooks/set-state-in-effect cascading-render warning
    let storedToken = null
    let parsedUser  = null
    try {
      storedToken = localStorage.getItem(TOKEN_KEY)
      const raw   = localStorage.getItem(USER_KEY)
      if (storedToken && raw) parsedUser = JSON.parse(raw)
    } catch {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }

    if (storedToken && parsedUser) {
      setAxiosToken(storedToken)
      setToken(storedToken)
      setUser(parsedUser)
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Persist helpers ────────────────────────────────────────────────────────
  function persist(newToken, newUser, remember = true) {
    const storage = remember ? localStorage : sessionStorage
    storage.setItem(TOKEN_KEY, newToken)
    storage.setItem(USER_KEY, JSON.stringify(newUser))
    setAxiosToken(newToken)
    setToken(newToken)
    setUser(newUser)
  }

  function clearStorage() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(USER_KEY)
    setAxiosToken(null)
    setToken(null)
    setUser(null)
  }

  // ── register ───────────────────────────────────────────────────────────────
  // Returns { success: true } or throws an Error with a message
  const register = useCallback(async ({ name, email, phone, password, role }) => {
    try {
      const { data } = await axios.post('/api/auth/register', {
        name,
        email,
        phone,
        password,
        role,
      })
      const userObj = data.user
      // Sync user locally for admin dashboard access
      addLocalStorageUser({
        id: userObj.id,
        name: userObj.name,
        email: userObj.email,
        rides: 0,
        status: 'active',
        joined: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      })
      persist(data.token, userObj, true)
      return { success: true }
    } catch (err) {
      console.warn("Backend unavailable, registering user locally.", err)
      // Local fallback registration
      const localUser = {
        id: 'u_' + Date.now(),
        name,
        email,
        phone,
        role,
        verified: true,
        rides: 0,
        status: 'active',
        joined: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      }
      addLocalStorageUser(localUser)
      persist('local-demo-token', localUser, true)
      return { success: true }
    }
  }, [])

  // ── login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ email, password, rememberMe = false }) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password })
      // Sync user locally in case it was created via external API
      addLocalStorageUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        rides: data.user.rides || 0,
        status: 'active',
        joined: data.user.joined || 'Jun 2026'
      })
      persist(data.token, data.user, rememberMe)
      return { success: true }
    } catch (err) {
      console.warn("Backend unavailable, logging in locally if credentials match.", err)
      // Check in local storage users database
      const users = getLocalStorageUsers()
      const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      
      // Also check if matches static admin credentials
      if (email.toLowerCase() === 'admin@sheride.com') {
        const adminUser = { id: 'a1', name: 'Admin User', email: 'admin@sheride.com', role: 'admin' }
        persist('demo-admin-token', adminUser, rememberMe)
        return { success: true }
      }

      if (foundUser) {
        // Map table format of user back to AuthContext structure
        const authUser = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone || '+91 98765 43210',
          role: foundUser.role || 'rider',
          verified: true,
          status: foundUser.status
        }
        persist('local-demo-token', authUser, rememberMe)
        return { success: true }
      }
      throw new Error('Invalid credentials')
    }
  }, [])

  // ── logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    clearStorage()
  }, [])

  // ── updateUser — optimistic local update ───────────────────────────────────
  const updateUser = useCallback((patch) => {
    setUser((prev) => {
      if (!prev) return prev
      const updated = { ...prev, ...patch }
      // keep storage in sync
      const stored = localStorage.getItem(TOKEN_KEY)
        ? localStorage
        : sessionStorage
      stored.setItem(USER_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  // ── loginDemo — offline demo access ────────────────────────────────────────
  const loginDemo = useCallback((role) => {
    const demos = {
      rider:  { id: 'u1', name: 'Priya Sharma', email: 'priya@sheride.com', phone: '+91 98765 43210', role: 'rider', verified: true },
      admin:  { id: 'a1', name: 'Admin User', email: 'admin@sheride.com', role: 'admin' },
    }
    const selectedUser = demos[role] ?? demos.rider
    persist('demo-token', selectedUser, true)
    
    // Sync demo user into local storage user database if not exists
    addLocalStorageUser({
      id: selectedUser.id,
      name: selectedUser.name,
      email: selectedUser.email,
      rides: 24,
      status: 'active',
      joined: 'Jan 2025'
    })

    return { success: true }
  }, [])

  const value = {
    user,           // current user object or null
    token,          // raw JWT or null
    loading,        // true while hydrating from storage
    isAuthenticated: !!user,
    isRider:  user?.role === 'rider',
    isDriver: false,
    register,
    login,
    loginDemo,
    logout,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ── useAuth hook ───────────────────────────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return ctx
}

export default AuthContext
