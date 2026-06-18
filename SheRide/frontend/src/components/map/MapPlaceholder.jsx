import { useEffect, useState, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api'

const LIBRARIES = ['places']
const DEFAULT_CENTER = { lat: 28.6139, lng: 77.209 } // New Delhi

// Premium Uber-style SVGs
const UBER_PICKUP_SVG = 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="black" stroke="white" stroke-width="3"/><circle cx="10" cy="10" r="3" fill="white"/></svg>'
const UBER_DROPOFF_SVG = 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect x="4" y="4" width="12" height="12" fill="black" stroke="white" stroke-width="3"/></svg>'

export default function MapPlaceholder({
  className = '',
  showRoute = false,
  pickupCoords,
  dropCoords,
  onPickupChange,
  onDropChange,
  interactive = false,
  children
}) {
  const hasKey = !!(import.meta.env.VITE_GOOGLE_MAPS_KEY)

  // ─── Google Maps loading ───────────────────────────────────────────────────
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY ?? '',
    libraries: LIBRARIES,
  })

  const useGoogle = isLoaded && hasKey && !loadError
  const [directions, setDirections] = useState(null)
  const googleMapRef = useRef(null)
  const [nearbyCars, setNearbyCars] = useState([])

  useEffect(() => {
    const center = pickupLatLng || (dropLatLng ? dropLatLng : DEFAULT_CENTER)
    const cars = [
      { id: 'c1', lat: center.lat + 0.0012, lng: center.lng + 0.0015, heading: 45 },
      { id: 'c2', lat: center.lat - 0.0010, lng: center.lng - 0.0018, heading: 120 },
      { id: 'c3', lat: center.lat + 0.0016, lng: center.lng - 0.0008, heading: 280 },
    ]
    setNearbyCars(cars)
  }, [pickupCoords, dropCoords])

  // Parse coords helper
  const getLatLng = (coords) => {
    if (coords && Array.isArray(coords) && coords.length === 2) {
      return { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]) }
    }
    return null
  }

  const pickupLatLng = getLatLng(pickupCoords)
  const dropLatLng = getLatLng(dropCoords)

  // Google Maps Directions
  useEffect(() => {
    if (useGoogle && showRoute && pickupLatLng && dropLatLng && window.google) {
      const directionsService = new window.google.maps.DirectionsService()
      directionsService.route(
        {
          origin: pickupLatLng,
          destination: dropLatLng,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result)
          } else {
            console.error(`Directions request failed due to ${status}`)
          }
        }
      )
    } else {
      setDirections(null)
    }
  }, [pickupCoords, dropCoords, showRoute, useGoogle])

  // Google Maps Bounds fitting
  useEffect(() => {
    if (!useGoogle || !googleMapRef.current) return

    const map = googleMapRef.current
    const bounds = new window.google.maps.LatLngBounds()

    if (pickupLatLng) bounds.extend(pickupLatLng)
    if (dropLatLng) bounds.extend(dropLatLng)

    if (pickupLatLng || dropLatLng) {
      if (pickupLatLng && dropLatLng) {
        map.fitBounds(bounds)
        const listener = window.google.maps.event.addListener(map, 'bounds_changed', () => {
          if (map.getZoom() > 16) map.setZoom(15)
          window.google.maps.event.removeListener(listener)
        })
      } else {
        map.panTo(pickupLatLng || dropLatLng)
        map.setZoom(14)
      }
    }
  }, [pickupCoords, dropCoords, useGoogle])

  const handleGoogleMapClick = (e) => {
    if (!interactive || !e.latLng) return
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()

    if (!pickupCoords) {
      if (onPickupChange) onPickupChange([lat, lng])
    } else {
      if (onDropChange) onDropChange([lat, lng])
    }
  }

  // ─── Leaflet Fallback loading ──────────────────────────────────────────────
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const leafletContainerRef = useRef(null)
  const leafletMapInstanceRef = useRef(null)
  const leafletPickupMarkerRef = useRef(null)
  const leafletDropMarkerRef = useRef(null)
  const leafletRouteLineRef = useRef(null)
  const leafletCarMarkersRef = useRef([])

  useEffect(() => {
    if (useGoogle) return
    if (window.L) {
      setLeafletLoaded(true)
      return
    }

    try {
      const cssLink = document.createElement('link')
      cssLink.rel = 'stylesheet'
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      cssLink.id = 'leaflet-css'
      document.head.appendChild(cssLink)

      const jsScript = document.createElement('script')
      jsScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      jsScript.id = 'leaflet-js'
      jsScript.onload = () => setLeafletLoaded(true)
      document.head.appendChild(jsScript)
    } catch (err) {
      console.warn("Leaflet resources load failed", err)
    }
  }, [useGoogle])

  // Initialize Leaflet Map Instance
  useEffect(() => {
    if (useGoogle || !leafletLoaded || !leafletContainerRef.current || leafletMapInstanceRef.current) return

    const L = window.L
    const map = L.map(leafletContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([28.6139, 77.209], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)
    leafletMapInstanceRef.current = map

    if (interactive) {
      map.on('click', (e) => {
        const { lat, lng } = e.latlng
        if (!pickupCoords) {
          if (onPickupChange) onPickupChange([lat, lng])
        } else {
          if (onDropChange) onDropChange([lat, lng])
        }
      })
    }

    return () => {
      if (leafletMapInstanceRef.current) {
        leafletMapInstanceRef.current.remove()
        leafletMapInstanceRef.current = null
        leafletPickupMarkerRef.current = null
        leafletDropMarkerRef.current = null
        leafletRouteLineRef.current = null
        leafletCarMarkersRef.current = []
      }
    }
  }, [leafletLoaded, useGoogle])

  // Sync Leaflet markers and route
  useEffect(() => {
    if (useGoogle || !leafletLoaded || !leafletMapInstanceRef.current) return

    const L = window.L
    const map = leafletMapInstanceRef.current

    const pickupIcon = L.divIcon({
      className: 'custom-leaflet-pickup',
      html: `<div style="width: 18px; height: 18px; background: black; border: 3px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"><div style="width: 6px; height: 6px; background: white; border-radius: 50%;"></div></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    })

    const dropIcon = L.divIcon({
      className: 'custom-leaflet-drop',
      html: `<div style="width: 16px; height: 16px; background: black; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    })

    // Sync pickup marker
    if (pickupCoords && pickupCoords[0]) {
      if (leafletPickupMarkerRef.current) {
        leafletPickupMarkerRef.current.setLatLng(pickupCoords)
      } else {
        const marker = L.marker(pickupCoords, {
          icon: pickupIcon,
          draggable: interactive
        }).addTo(map)

        if (interactive && onPickupChange) {
          marker.on('dragend', (e) => {
            const { lat, lng } = e.target.getLatLng()
            onPickupChange([lat, lng])
          })
        }
        leafletPickupMarkerRef.current = marker
      }
    } else {
      if (leafletPickupMarkerRef.current) {
        map.removeLayer(leafletPickupMarkerRef.current)
        leafletPickupMarkerRef.current = null
      }
    }

    // Sync dropoff marker
    if (dropCoords && dropCoords[0]) {
      if (leafletDropMarkerRef.current) {
        leafletDropMarkerRef.current.setLatLng(dropCoords)
      } else {
        const marker = L.marker(dropCoords, {
          icon: dropIcon,
          draggable: interactive
        }).addTo(map)

        if (interactive && onDropChange) {
          marker.on('dragend', (e) => {
            const { lat, lng } = e.target.getLatLng()
            onDropChange([lat, lng])
          })
        }
        leafletDropMarkerRef.current = marker
      }
    } else {
      if (leafletDropMarkerRef.current) {
        map.removeLayer(leafletDropMarkerRef.current)
        leafletDropMarkerRef.current = null
      }
    }

    // Sync Route polyline
    if (showRoute && pickupCoords && dropCoords && pickupCoords[0] && dropCoords[0]) {
      const points = [pickupCoords, dropCoords]
      if (leafletRouteLineRef.current) {
        leafletRouteLineRef.current.setLatLngs(points)
      } else {
        const line = L.polyline(points, {
          color: '#111111',
          weight: 5,
          opacity: 0.9,
          lineCap: 'round'
        }).addTo(map)
        leafletRouteLineRef.current = line
      }

      const bounds = L.latLngBounds(points)
      map.fitBounds(bounds, { padding: [60, 60] })
    } else {
      if (leafletRouteLineRef.current) {
        map.removeLayer(leafletRouteLineRef.current)
        leafletRouteLineRef.current = null
      }
      if (pickupCoords && pickupCoords[0]) {
        map.setView(pickupCoords, 13)
      }
    }

    // Sync nearby cars
    leafletCarMarkersRef.current.forEach(marker => map.removeLayer(marker))
    leafletCarMarkersRef.current = []

    const carIcon = L.divIcon({
      className: 'custom-leaflet-car',
      html: `<div style="font-size: 20px; filter: drop-shadow(0px 2px 3px rgba(0,0,0,0.3)); transform: rotate(15deg); cursor: pointer;">🚗</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })

    const currentCoords = pickupCoords && pickupCoords[0] ? pickupCoords : (dropCoords && dropCoords[0] ? dropCoords : [28.6139, 77.209])
    const mockOffset = [
      [0.0012, 0.0015],
      [-0.0010, -0.0018],
      [0.0016, -0.0008]
    ]

    mockOffset.forEach((offset, idx) => {
      const carLat = currentCoords[0] + offset[0]
      const carLng = currentCoords[1] + offset[1]
      const marker = L.marker([carLat, carLng], { icon: carIcon }).addTo(map)
      leafletCarMarkersRef.current.push(marker)
    })
  }, [leafletLoaded, pickupCoords, dropCoords, showRoute, interactive, useGoogle])

  return (
    <div className={`relative w-full h-full min-h-[250px] overflow-hidden rounded-3xl ${className}`}>
      {useGoogle ? (
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={pickupLatLng || dropLatLng || DEFAULT_CENTER}
          zoom={13}
          onLoad={(map) => { googleMapRef.current = map }}
          onClick={handleGoogleMapClick}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            styles: [
              {
                "elementType": "geometry",
                "stylers": [{ "color": "#f5f5f5" }]
              },
              {
                "elementType": "labels.icon",
                "stylers": [{ "visibility": "off" }]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#616161" }]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [{ "color": "#f5f5f5" }]
              },
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{ "color": "#eeeeee" }]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [{ "visibility": "off" }]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{ "color": "#ffffff" }]
              },
              {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#757575" }]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{ "color": "#dadada" }]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#616161" }]
              },
              {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
              },
              {
                "featureType": "transit",
                "stylers": [{ "visibility": "off" }]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{ "color": "#c9c9c9" }]
              }
            ]
          }}
        >
          {pickupLatLng && (
            <Marker
              position={pickupLatLng}
              draggable={interactive && !!onPickupChange}
              onDragEnd={(e) => {
                if (onPickupChange && e.latLng) {
                  onPickupChange([e.latLng.lat(), e.latLng.lng()])
                }
              }}
              icon={window.google ? {
                url: UBER_PICKUP_SVG,
                scaledSize: new window.google.maps.Size(20, 20),
                anchor: new window.google.maps.Point(10, 10),
              } : undefined}
            />
          )}

          {dropLatLng && (
            <Marker
              position={dropLatLng}
              draggable={interactive && !!onDropChange}
              onDragEnd={(e) => {
                if (onDropChange && e.latLng) {
                  onDropChange([e.latLng.lat(), e.latLng.lng()])
                }
              }}
              icon={window.google ? {
                url: UBER_DROPOFF_SVG,
                scaledSize: new window.google.maps.Size(20, 20),
                anchor: new window.google.maps.Point(10, 10),
              } : undefined}
            />
          )}

          {/* Render nearby cars */}
          {nearbyCars.map((car) => (
            <Marker
              key={car.id}
              position={{ lat: car.lat, lng: car.lng }}
              icon={window.google ? {
                url: 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>',
              } : undefined}
              label={window.google ? {
                text: '🚗',
                fontSize: '22px'
              } : undefined}
            />
          ))}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#222222',
                  strokeOpacity: 0.9,
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      ) : (
        /* Dynamic Leaflet Fallback Container */
        <div ref={leafletContainerRef} className="w-full h-full min-h-[250px] relative z-0" />
      )}

      {/* Floating children overlays */}
      {children && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {children}
        </div>
      )}
    </div>
  )
}
