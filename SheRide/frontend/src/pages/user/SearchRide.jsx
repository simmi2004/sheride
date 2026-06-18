import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Navigation, Clock, Search, Loader2 } from 'lucide-react'
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'
import PageTransition from '../../components/ui/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import BottomSheet from '../../components/ui/BottomSheet'

import { FAVORITE_PLACES } from '../../data/mockData'

const LIBRARIES = ['places']

const PRESET_COORDS = {
  "B-42, Saket, New Delhi": [28.5244, 77.2066],
  "Cyber Hub, Gurugram": [28.4950, 77.0878],
  "Select Citywalk, Saket": [28.5276, 77.2183],
  "Connaught Place": [28.6304, 77.2177],
  "Current Location": [28.6139, 77.209]
}

function getHaversineDistance(coords1, coords2) {
  const [lat1, lon1] = coords1
  const [lat2, lon2] = coords2
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function SearchRide() {
  const navigate = useNavigate()
  const [pickup, setPickup] = useState('Fetching current location...')
  const [destination, setDestination] = useState('')
  const [pickupCoords, setPickupCoords] = useState([28.6139, 77.209]) // central Delhi default
  const [dropCoords, setDropCoords] = useState(null)
  
  const [distanceText, setDistanceText] = useState('4.2 km')
  const [durationText, setDurationText] = useState('12 min')
  const [estFare, setEstFare] = useState(180)
  
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loadingGeocode, setLoadingGeocode] = useState(false)

  // Autocomplete refs for Google
  const pickupAutocompleteRef = useRef(null)
  const dropoffAutocompleteRef = useRef(null)

  // Local fallback states for Autocomplete suggestions
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [dropSuggestions, setDropSuggestions] = useState([])
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDropSuggestions, setShowDropSuggestions] = useState(false)

  const hasKey = !!(import.meta.env.VITE_GOOGLE_MAPS_KEY)
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY ?? '',
    libraries: LIBRARIES,
  })

  const useGoogle = isLoaded && hasKey && !loadError

  // Fetch geolocation on mount
  useEffect(() => {
    handleUseCurrentLocation()
  }, [useGoogle])

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setPickupCoords([lat, lng])
          
          if (useGoogle && window.google) {
            const geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
              if (status === 'OK' && results[0]) {
                setPickup(results[0].formatted_address)
              } else {
                reverseGeocode(lat, lng, 'pickup')
              }
            })
          } else {
            reverseGeocode(lat, lng, 'pickup')
          }
        },
        (error) => {
          console.warn("Geolocation error:", error)
          setPickup('New Delhi, India')
          setPickupCoords([28.6139, 77.209])
        }
      )
    } else {
      setPickup('New Delhi, India')
      setPickupCoords([28.6139, 77.209])
    }
  }

  // Debounced query suggestions for Pickup from Nominatim (Fallback)
  useEffect(() => {
    if (useGoogle) return
    if (!pickup || pickup === 'Fetching current location...' || pickup === 'Current Location' || pickup.length < 3) {
      setPickupSuggestions([])
      return
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(pickup)}&limit=5&countrycodes=in`)
        const data = await res.json()
        if (data) {
          setPickupSuggestions(data.map((item) => ({
            description: item.display_name,
            coords: [parseFloat(item.lat), parseFloat(item.lon)]
          })))
        }
      } catch (err) {
        console.error("Nominatim suggestion query error:", err)
      }
    }, 600)

    return () => clearTimeout(delayDebounce)
  }, [pickup, useGoogle])

  // Debounced query suggestions for Dropoff from Nominatim (Fallback)
  useEffect(() => {
    if (useGoogle) return
    if (!destination || destination.length < 3) {
      setDropSuggestions([])
      return
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}&limit=5&countrycodes=in`)
        const data = await res.json()
        if (data) {
          setDropSuggestions(data.map((item) => ({
            description: item.display_name,
            coords: [parseFloat(item.lat), parseFloat(item.lon)]
          })))
        }
      } catch (err) {
        console.error("Nominatim suggestion query error:", err)
      }
    }, 600)

    return () => clearTimeout(delayDebounce)
  }, [destination, useGoogle])

  // Recalculate distance and fares whenever coordinates update
  useEffect(() => {
    if (pickupCoords && dropCoords) {
      const dist = getHaversineDistance(pickupCoords, dropCoords)
      const time = Math.round(dist * 3.5) // estimated traffic time
      const fare = Math.round(40 + dist * 13)
      setDistanceText(`${dist.toFixed(1)} km`)
      setDurationText(`${time} min`)
      setEstFare(fare)
    }
  }, [pickupCoords, dropCoords])

  // Look up address from coordinates (OSM fallback)
  const reverseGeocode = async (lat, lng, target) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      const data = await res.json()
      if (data && data.display_name) {
        const parts = data.display_name.split(',')
        const shortAddress = parts.slice(0, 3).join(',').trim()
        if (target === 'pickup') {
          setPickup(shortAddress)
        } else {
          setDestination(shortAddress)
        }
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err)
    }
  }

  // Look up coordinates from text address (OSM fallback)
  const geocodeAddress = async (query, target) => {
    if (PRESET_COORDS[query]) {
      const coords = PRESET_COORDS[query]
      if (target === 'pickup') setPickupCoords(coords)
      else setDropCoords(coords)
      return coords
    }

    setLoadingGeocode(true)
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`)
      const data = await res.json()
      if (data && data.length > 0) {
        const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)]
        if (target === 'pickup') {
          setPickupCoords(coords)
        } else {
          setDropCoords(coords)
        }
        setLoadingGeocode(false)
        return coords
      }
    } catch (err) {
      console.error("Geocoding error:", err)
    }
    setLoadingGeocode(false)
    return null
  }

  const handleFavoriteClick = (p) => {
    setDestination(p.address)
    const coords = PRESET_COORDS[p.address]
    if (coords) {
      setDropCoords(coords)
    } else {
      geocodeAddress(p.address, 'drop')
    }
  }

  async function handleSearch() {
    if (!destination) return
    let finalDropCoords = dropCoords
    let finalPickupCoords = pickupCoords

    if (!finalPickupCoords) {
      const coords = await geocodeAddress(pickup, 'pickup')
      if (coords) finalPickupCoords = coords
    }

    if (!finalDropCoords) {
      const coords = await geocodeAddress(destination, 'drop')
      if (coords) finalDropCoords = coords
    }

    navigate('/app/rides/select', {
      state: {
        pickup,
        destination,
        pickupCoords: finalPickupCoords || [28.6139, 77.209],
        dropCoords: finalDropCoords || [28.5244, 77.2066],
        distance: distanceText,
        duration: durationText,
        fare: estFare
      }
    })
  }

  return (
    <PageTransition className="flex flex-col lg:h-[calc(100vh-112px)] lg:min-h-[550px] gap-6">
      {/* Suggestions Close Backdrop overlay */}
      {(showPickupSuggestions || showDropSuggestions) && (
        <div className="fixed inset-0 z-20 cursor-default" onClick={() => { setShowPickupSuggestions(false); setShowDropSuggestions(false) }} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch">
        
        {/* Left Side: Solid control panel (stacked on mobile) */}
        <div className="order-1 lg:col-span-12 flex flex-col h-full z-30">
          <GlassCard padding="p-6" className="flex flex-col h-full justify-between shadow-premium-lg border border-lavender/20 dark:border-white/10 rounded-3xl">
            
            {/* Header and inputs */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Where to?</h2>
                <p className="text-xs text-gray-500 mt-1">Request a ride in just a few taps</p>
              </div>

              {/* Uber-style connected input fields */}
              <div className="relative space-y-4">
                {/* Visual Connector Line */}
                <div className="absolute left-[19px] top-[24px] bottom-[24px] w-0.5 border-l-2 border-dashed border-lavender/35 dark:border-lavender/20" />
                
                {/* Pickup Input Container */}
                <div className="flex flex-col relative">
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 z-10 flex-shrink-0 ml-[14px]" />
                    {useGoogle ? (
                      <Autocomplete
                        className="flex-1"
                        onLoad={(ac) => (pickupAutocompleteRef.current = ac)}
                        onPlaceChanged={() => {
                          const place = pickupAutocompleteRef.current.getPlace()
                          if (place.geometry && place.geometry.location) {
                            const lat = place.geometry.location.lat()
                            const lng = place.geometry.location.lng()
                            setPickup(place.formatted_address || place.name || '')
                            setPickupCoords([lat, lng])
                          }
                        }}
                      >
                        <Input
                          placeholder="Enter pickup address"
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                          className="w-full font-semibold text-gray-800 dark:text-gray-100"
                        />
                      </Autocomplete>
                    ) : (
                      <Input
                        placeholder="Enter pickup address"
                        value={pickup}
                        onChange={(e) => {
                          setPickup(e.target.value)
                          setShowPickupSuggestions(true)
                        }}
                        onFocus={() => setShowPickupSuggestions(true)}
                        className="flex-1 font-semibold text-gray-800 dark:text-gray-100"
                      />
                    )}
                    <button
                      onClick={handleUseCurrentLocation}
                      title="Use current location"
                      className="p-2.5 text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all flex-shrink-0"
                    >
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Local Suggestions dropdown for Pickup */}
                  {!useGoogle && showPickupSuggestions && pickupSuggestions.length > 0 && (
                    <div className="absolute top-full left-[44px] right-0 bg-white dark:bg-slate-900 border border-lavender/25 rounded-2xl shadow-premium-lg mt-1.5 overflow-hidden z-40 max-h-48 overflow-y-auto">
                      {pickupSuggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setPickup(s.description)
                            setPickupCoords(s.coords)
                            setShowPickupSuggestions(false)
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-lavender/5 text-xs text-gray-700 dark:text-gray-200 border-b border-lavender/5 last:border-0 truncate"
                        >
                          📍 {s.description}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Destination Input Container */}
                <div className="flex flex-col relative">
                  <div className="flex items-center gap-3 w-full">
                    <MapPin className="w-5 h-5 text-red-500 z-10 flex-shrink-0 ml-2.5" />
                    {useGoogle ? (
                      <Autocomplete
                        className="flex-1"
                        onLoad={(ac) => (dropoffAutocompleteRef.current = ac)}
                        onPlaceChanged={() => {
                          const place = dropoffAutocompleteRef.current.getPlace()
                          if (place.geometry && place.geometry.location) {
                            const lat = place.geometry.location.lat()
                            const lng = place.geometry.location.lng()
                            setDestination(place.formatted_address || place.name || '')
                            setDropCoords([lat, lng])
                          }
                        }}
                      >
                        <Input
                          placeholder="Where to? (Start typing...)"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full font-semibold text-gray-800 dark:text-gray-100"
                        />
                      </Autocomplete>
                    ) : (
                      <Input
                        placeholder="Where to? (Start typing...)"
                        value={destination}
                        onChange={(e) => {
                          setDestination(e.target.value)
                          setShowDropSuggestions(true)
                        }}
                        onFocus={() => setShowDropSuggestions(true)}
                        className="flex-1 font-semibold text-gray-800 dark:text-gray-100"
                      />
                    )}
                    <button
                      onClick={() => geocodeAddress(destination, 'drop')}
                      className="p-2.5 text-lavender hover:bg-lavender/10 rounded-xl flex-shrink-0"
                    >
                      {loadingGeocode ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Local Suggestions dropdown for Dropoff */}
                  {!useGoogle && showDropSuggestions && dropSuggestions.length > 0 && (
                    <div className="absolute top-full left-[44px] right-0 bg-white dark:bg-slate-900 border border-lavender/25 rounded-2xl shadow-premium-lg mt-1.5 overflow-hidden z-40 max-h-48 overflow-y-auto">
                      {dropSuggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setDestination(s.description)
                            setDropCoords(s.coords)
                            setShowDropSuggestions(false)
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-lavender/5 text-xs text-gray-700 dark:text-gray-200 border-b border-lavender/5 last:border-0 truncate"
                        >
                          🏁 {s.description}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Nearby / Suggested Locations Section */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Nearby & Favorites</h4>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {FAVORITE_PLACES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleFavoriteClick(p)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-lavender/5 border border-transparent hover:border-lavender/10 text-left transition-all"
                    >
                      <div className="w-8 h-8 rounded-xl bg-lavender/10 flex items-center justify-center text-lavender flex-shrink-0 text-sm">
                        {p.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white">{p.name}</p>
                        <p className="text-[11px] text-gray-500 truncate">{p.address}</p>
                      </div>
                    </button>
                  ))}
                  {/* Extra mock nearby points for Chandigarh area to look premium */}
                  {[{ name: "Elante Mall", address: "Phase 1, Industrial Area, Chandigarh", icon: "🛍️" }, { name: "Sector 17 Market", address: "Sector 17, Chandigarh", icon: "⛲" }].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDestination(p.address)
                        geocodeAddress(p.address, 'drop')
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-lavender/5 border border-transparent hover:border-lavender/10 text-left transition-all"
                    >
                      <div className="w-8 h-8 rounded-xl bg-lavender/10 flex items-center justify-center text-lavender flex-shrink-0 text-sm">
                        {p.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white">{p.name}</p>
                        <p className="text-[11px] text-gray-500 truncate">{p.address}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Separate ride search button placed at the bottom, Uber-style */}
            <div className="mt-6 pt-4 border-t border-lavender/10">
              <Button
                className="w-full py-4 text-sm font-bold shadow-premium gradient-primary hover:opacity-95 rounded-2xl flex items-center justify-center"
                size="lg"
                onClick={handleSearch}
                disabled={!destination}
              >
                <Navigation className="w-4 h-4 mr-2 animate-pulse" /> Find Rides
              </Button>
            </div>

          </GlassCard>
        </div>

      </div>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Estimated Fare Breakdown">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Base Fare</span>
            <span>₹40</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Distance Cost ({distanceText})</span>
            <span>₹{Math.round(estFare - 70)}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Time & Safety Fee</span>
            <span>₹30</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-3 border-t border-lavender/25">
            <span>Total Estimated</span>
            <span className="text-lavender">₹{estFare}</span>
          </div>
        </div>
      </BottomSheet>
    </PageTransition>
  )
}
