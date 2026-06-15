import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from '@react-google-maps/api'
import { useAuth } from '../context/AuthContext'
import SOSButton from '../components/SOSButton'

const LIBRARIES = ['places']
const MAP_CENTER = { lat: 28.6139, lng: 77.209 } // New Delhi default

// ─── Mock nearby drivers ──────────────────────────────────────────────────────
const MOCK_DRIVERS = [
  { id: 1, name: 'Meera S.',  rating: 4.9, car: 'Swift Dzire • DL 5C 1234', eta: '3 min',  lat: 28.617, lng: 77.211 },
  { id: 2, name: 'Anjali R.', rating: 4.8, car: 'Wagon R • DL 8A 5678',     eta: '5 min',  lat: 28.611, lng: 77.207 },
  { id: 3, name: 'Priya K.',  rating: 4.7, car: 'Hyundai i20 • DL 3B 9012', eta: '7 min',  lat: 28.615, lng: 77.215 },
]

// ─── Driver profile card ──────────────────────────────────────────────────────
function DriverCard({ driver, selected, onSelect }) {
  return (
    <button
      className={`driver-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(driver)}
      aria-pressed={selected}
    >
      <div className="driver-avatar">{driver.name.charAt(0)}</div>
      <div className="driver-info">
        <span className="driver-name">{driver.name}</span>
        <span className="driver-car">{driver.car}</span>
        <span className="driver-rating">⭐ {driver.rating}</span>
      </div>
      <div className="driver-eta">
        <span className="eta-value">{driver.eta}</span>
        <span className="eta-label">away</span>
      </div>
    </button>
  )
}

// ─── Fare estimate card ───────────────────────────────────────────────────────
function FareCard({ distance, duration, fare }) {
  return (
    <div className="fare-card">
      <div className="fare-row">
        <span>📏 Distance</span><strong>{distance}</strong>
      </div>
      <div className="fare-row">
        <span>⏱ ETA</span><strong>{duration}</strong>
      </div>
      <div className="fare-row fare-total">
        <span>💰 Estimated Fare</span><strong>{fare}</strong>
      </div>
    </div>
  )
}

// ─── BookRide page ────────────────────────────────────────────────────────────
export default function BookRide() {
  const { } = useAuth()  // auth context available for future use
  const navigate = useNavigate()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY ?? '',
    libraries: LIBRARIES,
  })

  const [pickup,      setPickup]      = useState('')
  const [dropoff,     setDropoff]     = useState('')
  const [directions,  setDirections]  = useState(null)
  const [fareInfo,    setFareInfo]    = useState(null)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [step,        setStep]        = useState('input')   // input | drivers | confirm | booked
  const [booking,     setBooking]     = useState(false)
  const [activeRideId, setActiveRideId] = useState(null)

  const pickupRef  = useRef(null)
  const dropoffRef = useRef(null)

  // Calculate route + fare estimate
  const handleSearch = useCallback(async () => {
    if (!pickup || !dropoff) return

    const directionsService = new window.google.maps.DirectionsService()
    const result = await directionsService.route({
      origin:      pickup,
      destination: dropoff,
      travelMode:  window.google.maps.TravelMode.DRIVING,
    })

    setDirections(result)

    const leg = result.routes[0].legs[0]
    const km  = (leg.distance.value / 1000).toFixed(1)
    const baseFare = Math.round(30 + km * 12)

    setFareInfo({
      distance: leg.distance.text,
      duration: leg.duration.text,
      fare:     `₹${baseFare}`,
    })
    setStep('drivers')
  }, [pickup, dropoff])

  // Confirm + book
  const handleBook = useCallback(async () => {
    if (!selectedDriver) return
    setBooking(true)
    try {
      // TODO: swap for real API — const { data } = await ridesApi.bookRide(...)
      await new Promise((r) => setTimeout(r, 1000))
      const mockRideId = `RIDE-${Date.now()}`
      setActiveRideId(mockRideId)
      setStep('booked')
    } catch {
      alert('Booking failed. Please try again.')
    } finally {
      setBooking(false)
    }
  }, [selectedDriver])

  return (
    <div className="book-page">
      {/* ── Left panel ── */}
      <div className="book-panel">
        <h1 className="book-title">Book a Ride</h1>

        {step === 'input' && (
          <div className="book-form">
            <div className="field-group">
              <label htmlFor="pickup">📍 Pickup Location</label>
              {isLoaded ? (
                <Autocomplete
                  onLoad={(ref) => (pickupRef.current = ref)}
                  onPlaceChanged={() => setPickup(pickupRef.current?.getPlace()?.formatted_address ?? '')}
                >
                  <input
                    id="pickup"
                    type="text"
                    placeholder="Enter pickup address"
                    className="map-input"
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </Autocomplete>
              ) : (
                <input id="pickup" type="text" placeholder="Loading maps…" disabled className="map-input" />
              )}
            </div>

            <div className="field-group">
              <label htmlFor="dropoff">🏁 Drop-off Location</label>
              {isLoaded ? (
                <Autocomplete
                  onLoad={(ref) => (dropoffRef.current = ref)}
                  onPlaceChanged={() => setDropoff(dropoffRef.current?.getPlace()?.formatted_address ?? '')}
                >
                  <input
                    id="dropoff"
                    type="text"
                    placeholder="Enter destination"
                    className="map-input"
                    onChange={(e) => setDropoff(e.target.value)}
                  />
                </Autocomplete>
              ) : (
                <input id="dropoff" type="text" placeholder="Loading maps…" disabled className="map-input" />
              )}
            </div>

            <button
              className="btn-primary w-full"
              onClick={handleSearch}
              disabled={!pickup || !dropoff || !isLoaded}
            >
              Find Drivers
            </button>
          </div>
        )}

        {step === 'drivers' && (
          <>
            {fareInfo && <FareCard {...fareInfo} />}

            <h2 className="drivers-heading">Available Drivers</h2>
            <div className="drivers-list">
              {MOCK_DRIVERS.map((d) => (
                <DriverCard
                  key={d.id}
                  driver={d}
                  selected={selectedDriver?.id === d.id}
                  onSelect={setSelectedDriver}
                />
              ))}
            </div>

            <div className="book-actions">
              <button className="btn-ghost" onClick={() => setStep('input')}>← Change Route</button>
              <button
                className="btn-primary"
                onClick={() => setStep('confirm')}
                disabled={!selectedDriver}
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === 'confirm' && selectedDriver && (
          <div className="confirm-panel">
            <h2>Confirm Your Ride</h2>
            <div className="confirm-detail"><span>From</span><strong>{pickup}</strong></div>
            <div className="confirm-detail"><span>To</span><strong>{dropoff}</strong></div>
            <div className="confirm-detail"><span>Driver</span><strong>{selectedDriver.name}</strong></div>
            <div className="confirm-detail"><span>Car</span><strong>{selectedDriver.car}</strong></div>
            {fareInfo && <div className="confirm-detail fare"><span>Fare</span><strong>{fareInfo.fare}</strong></div>}

            <div className="book-actions">
              <button className="btn-ghost" onClick={() => setStep('drivers')}>← Back</button>
              <button className="btn-primary" onClick={handleBook} disabled={booking}>
                {booking ? 'Booking…' : '✅ Confirm Ride'}
              </button>
            </div>
          </div>
        )}

        {step === 'booked' && (
          <div className="booked-panel">
            <div className="booked-icon" aria-hidden="true">🚗</div>
            <h2>Ride Confirmed!</h2>
            <p>Your driver <strong>{selectedDriver?.name}</strong> is on the way.</p>
            <p className="ride-id">Ride ID: <code>{activeRideId}</code></p>

            <div className="live-status">
              <span className="pulse-dot" aria-hidden="true" />
              Driver is {selectedDriver?.eta} away
            </div>

            <SOSButton rideId={activeRideId} />

            <button className="btn-ghost w-full mt-4" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </button>
          </div>
        )}
      </div>

      {/* ── Map panel ── */}
      <div className="map-panel">
        {isLoaded ? (
          <GoogleMap
            mapContainerClassName="google-map"
            center={MAP_CENTER}
            zoom={13}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {/* Driver markers */}
            {step !== 'booked' && MOCK_DRIVERS.map((d) => (
              <Marker
                key={d.id}
                position={{ lat: d.lat, lng: d.lng }}
                label={{ text: '🚗', fontSize: '20px' }}
                title={d.name}
              />
            ))}

            {/* Route polyline */}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        ) : (
          <div className="map-loading">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-pink-500 border-t-transparent mx-auto" />
            <p>Loading map…</p>
          </div>
        )}
      </div>
    </div>
  )
}
