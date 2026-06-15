import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

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
    // TODO: swap URL for your real backend endpoint
    const { data } = await axios.post('/api/auth/register', {
      name,
      email,
      phone,
      password,
      role,
    })
    // Expected response: { token: string, user: { id, name, email, phone, role } }
    persist(data.token, data.user, true)
    return { success: true }
  }, [])

  // ── login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ email, password, rememberMe = false }) => {
    const { data } = await axios.post('/api/auth/login', { email, password })
    persist(data.token, data.user, rememberMe)
    return { success: true }
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

  const value = {
    user,           // current user object or null
    token,          // raw JWT or null
    loading,        // true while hydrating from storage
    isAuthenticated: !!user,
    isRider:  user?.role === 'rider',
    isDriver: user?.role === 'driver',
    register,
    login,
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
