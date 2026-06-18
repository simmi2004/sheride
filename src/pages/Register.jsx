import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: 'rider',        // 'rider' | 'driver'
  agreeToTerms: false,
}

function validate(fields) {
  const errors = {}

  if (!fields.name.trim())
    errors.name = 'Full name is required.'

  if (!fields.email.trim())
    errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Enter a valid email address.'

  if (!fields.phone.trim())
    errors.phone = 'Phone number is required.'
  else if (!/^\+?[\d\s\-()]{7,15}$/.test(fields.phone))
    errors.phone = 'Enter a valid phone number.'

  if (!fields.password)
    errors.password = 'Password is required.'
  else if (fields.password.length < 8)
    errors.password = 'Password must be at least 8 characters.'

  if (!fields.confirmPassword)
    errors.confirmPassword = 'Please confirm your password.'
  else if (fields.password !== fields.confirmPassword)
    errors.confirmPassword = 'Passwords do not match.'

  if (!fields.agreeToTerms)
    errors.agreeToTerms = 'You must agree to the terms to continue.'

  return errors
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleRoleSelect(role) {
    setForm((prev) => ({ ...prev, role }))
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
      // TODO: replace with real API call, e.g. await axios.post('/api/auth/register', form)
      await new Promise((res) => setTimeout(res, 800)) // simulate network
      navigate('/login')
    } catch (_err) {
      setErrors({ form: 'Registration failed. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card register-card">
        {/* Header */}
        <div className="auth-header">
          <span className="auth-logo" aria-hidden="true">🚗</span>
          <h1>Join SheRide</h1>
          <p>Create your account and ride safely today</p>
        </div>

        {/* Role toggle */}
        <div className="role-toggle" role="group" aria-label="Select account type">
          <button
            type="button"
            className={`role-btn ${form.role === 'rider' ? 'active' : ''}`}
            onClick={() => handleRoleSelect('rider')}
            aria-pressed={form.role === 'rider'}
          >
            🧍 I'm a Rider
          </button>
          <button
            type="button"
            className={`role-btn ${form.role === 'driver' ? 'active' : ''}`}
            onClick={() => handleRoleSelect('driver')}
            aria-pressed={form.role === 'driver'}
          >
            🚗 I'm a Driver
          </button>
        </div>

        {/* Form-level error */}
        {errors.form && (
          <p className="field-error form-error" role="alert">{errors.form}</p>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="field-group">
            <label htmlFor="reg-name">Full Name</label>
            <input
              id="reg-name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              aria-describedby={errors.name ? 'err-name' : undefined}
              aria-invalid={!!errors.name}
            />
            {errors.name && <span id="err-name" className="field-error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="field-group">
            <label htmlFor="reg-email">Email Address</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              aria-describedby={errors.email ? 'err-email' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span id="err-email" className="field-error">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="field-group">
            <label htmlFor="reg-phone">Phone Number</label>
            <input
              id="reg-phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              aria-describedby={errors.phone ? 'err-phone' : undefined}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <span id="err-phone" className="field-error">{errors.phone}</span>}
          </div>

          {/* Password */}
          <div className="field-group">
            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              name="password"
              type="password"
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              aria-describedby={errors.password ? 'err-password' : undefined}
              aria-invalid={!!errors.password}
            />
            {errors.password && <span id="err-password" className="field-error">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="field-group">
            <label htmlFor="reg-confirm">Confirm Password</label>
            <input
              id="reg-confirm"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              aria-describedby={errors.confirmPassword ? 'err-confirm' : undefined}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <span id="err-confirm" className="field-error">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Terms */}
          <div className="field-group checkbox-group">
            <label className="checkbox-label">
              <input
                name="agreeToTerms"
                type="checkbox"
                checked={form.agreeToTerms}
                onChange={handleChange}
                aria-describedby={errors.agreeToTerms ? 'err-terms' : undefined}
                aria-invalid={!!errors.agreeToTerms}
              />
              <span>
                I agree to the{' '}
                <a href="#" className="inline-link">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="inline-link">Privacy Policy</a>
              </span>
            </label>
            {errors.agreeToTerms && (
              <span id="err-terms" className="field-error">{errors.agreeToTerms}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary full-width"
            disabled={submitting}
          >
            {submitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </main>
  )
}
