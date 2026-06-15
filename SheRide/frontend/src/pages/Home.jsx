import { Link, useNavigate } from 'react-router-dom'
import heroImg from '../assets/hero.png'

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate()

  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-content">
        <div className="hero-badge">Women-only rides 💜</div>
        <h1 id="hero-heading" className="hero-title">
          Ride Safe.<br />Ride Together.
        </h1>
        <p className="hero-subtitle">
          SheRide connects women with verified female drivers for safe,
          comfortable, and reliable transportation — any time, anywhere.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate('/signup')}>
            Get Started
          </button>
          <a href="#how-it-works" className="btn-secondary">
            Learn More
          </a>
        </div>
      </div>
      <div className="hero-image-wrap">
        <img
          src={heroImg}
          alt="Women riding safely together"
          className="hero-img"
        />
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const STEPS = [
  { icon: '📍', title: 'Set Your Location',    desc: 'Enter your pickup and drop-off points in seconds.' },
  { icon: '🔍', title: 'Match with a Driver',  desc: 'Get matched instantly with a verified female driver nearby.' },
  { icon: '🚗', title: 'Ride Safely',          desc: 'Track your ride live and share your trip with loved ones.' },
  { icon: '⭐', title: 'Rate & Review',        desc: 'Help build our trusted community with honest feedback.' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="section" aria-labelledby="hiw-heading">
      <div className="section-inner">
        <h2 id="hiw-heading" className="section-title">How It Works</h2>
        <p className="section-subtitle">Book a ride in four simple steps</p>
        <div className="steps-grid">
          {STEPS.map((step, i) => (
            <article key={i} className="step-card">
              <div className="step-icon" aria-hidden="true">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Safety ───────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: '✅', title: 'Verified Drivers', desc: 'Every driver undergoes background checks and identity verification.' },
  { icon: '📡', title: 'Live Tracking',    desc: 'Share your real-time location with trusted contacts at any moment.' },
  { icon: '🆘', title: 'SOS Button',       desc: 'One-tap emergency alert that notifies contacts and local authorities.' },
  { icon: '🔒', title: 'Safe Payments',    desc: 'Encrypted, cashless transactions — no need to share personal details.' },
]

function Safety() {
  return (
    <section id="safety" className="section section-alt" aria-labelledby="safety-heading">
      <div className="section-inner">
        <h2 id="safety-heading" className="section-title">Your Safety, Our Priority</h2>
        <p className="section-subtitle">Built from the ground up with women's safety in mind</p>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <article key={i} className="feature-card">
              <span className="feature-icon" aria-hidden="true">{f.icon}</span>
              <div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const REVIEWS = [
  { name: 'Priya M.',  text: 'Finally a cab service where I feel genuinely safe. The SOS feature gives me so much peace of mind.' },
  { name: 'Anika S.',  text: 'As a driver, SheRide has given me a flexible income and a community I trust. Highly recommend!' },
  { name: 'Riya K.',   text: 'Clean rides, friendly drivers, and the live tracking feature is a lifesaver for late nights.' },
]

function Testimonials() {
  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <div className="section-inner">
        <h2 id="testimonials-heading" className="section-title">What Our Riders Say</h2>
        <div className="testimonials-grid">
          {REVIEWS.map((r, i) => (
            <blockquote key={i} className="testimonial-card">
              <p className="testimonial-text">"{r.text}"</p>
              <footer className="testimonial-author">— {r.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '50K+', label: 'Rides Completed' },
  { value: '8K+',  label: 'Verified Drivers' },
  { value: '4.9★', label: 'Average Rating'   },
]

function About() {
  return (
    <section id="about" className="section section-alt" aria-labelledby="about-heading">
      <div className="section-inner about-inner">
        <div className="about-text">
          <h2 id="about-heading" className="section-title left">About SheRide</h2>
          <p>
            SheRide was founded by women, for women. We believe every woman deserves
            to travel without fear — whether it's a late-night shift, an early morning
            commute, or just running errands.
          </p>
          <p>
            Our platform connects passengers with verified female drivers, building a
            community rooted in trust, safety, and empowerment.
          </p>
          <Link to="/signup" className="btn-primary inline-btn">
            Join SheRide Today
          </Link>
        </div>
        <div className="about-stats" aria-label="Platform statistics">
          {STATS.map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="cta-banner" aria-labelledby="cta-heading">
      <h2 id="cta-heading">Ready to ride with confidence?</h2>
      <p>Join thousands of women who travel safely every day with SheRide.</p>
      <Link to="/signup" className="btn-primary">
        Download the App
      </Link>
    </section>
  )
}

// ─── Home Page (default export) ───────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Safety />
      <Testimonials />
      <About />
      <CTABanner />
    </main>
  )
}
