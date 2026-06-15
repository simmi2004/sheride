import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const INITIAL_FORM = {
  email: '',
  password: '',
  rememberMe: false,
}

function validate(fields) {
  const errors = {}

  if (!fields.email.trim())
    errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Enter a valid email address.'

  if (!fields.password)
    errors.password = 'Password is required.'

  return errors
}

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const fieldErrors = validate(form)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setSubmitting(true)
    try {
      // TODO: replace with real API call, e.g. await axios.post('/api/auth/login', form)
      await new Promise((res) => setTimeout(res, 800)) // simulate network
      navigate('/')
    } catch (_err) {
      setErrors({ form: 'Invalid email or password. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <span className="auth-logo" aria-hidden="true">🚗</span>
          <h1>Welcome Back</h1>
          <p>Log in to your SheRide account</p>
        </div>

        {/* Form-level error */}
        {errors.form && (
          <p className="field-error form-error" role="alert">{errors.form}</p>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="field-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              aria-describedby={errors.email ? 'err-login-email' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span id="err-login-email" className="field-error">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="field-group">
            <div className="label-row">
              <label htmlFor="login-password">Password</label>
              <a href="#" className="inline-link forgot-link">Forgot password?</a>
            </div>
            <div className="input-wrap">
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                aria-describedby={errors.password ? 'err-login-password' : undefined}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                className="toggle-password"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <span id="err-login-password" className="field-error">{errors.password}</span>
            )}
          </div>

          {/* Remember me */}
          <div className="field-group checkbox-group">
            <label className="checkbox-label">
              <input
                name="rememberMe"
                type="checkbox"
                checked={form.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary full-width"
            disabled={submitting}
          >
            {submitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </main>
  )
}
