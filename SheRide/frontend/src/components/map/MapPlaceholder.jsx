import { useEffect, useState, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api'

const LIBRARIES = ['places']
const DEFAULT_CENTER = { lat: 28.6139, lng: 77.209 } // New Delhi

const GREEN_MARKER_URL = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
const RED_MARKER_URL = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'

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
      }
    }
  }, [leafletLoaded, useGoogle])

  // Sync Leaflet markers and route
  useEffect(() => {
    if (useGoogle || !leafletLoaded || !leafletMapInstanceRef.current) return

    const L = window.L
    const map = leafletMapInstanceRef.current

    const pickupIcon = L.icon({
      iconUrl: GREEN_MARKER_URL,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    })

    const dropIcon = L.icon({
      iconUrl: RED_MARKER_URL,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
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
          color: '#B57EDC',
          weight: 4.5,
          dashArray: '8, 8',
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
                featureType: 'administrative.land_parcel',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'poi',
                elementType: 'labels.text',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'road',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'road.local',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'transit',
                stylers: [{ visibility: 'off' }],
              },
            ],
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
              icon={{
                url: GREEN_MARKER_URL,
                scaledSize: new window.google.maps.Size(26, 41),
                anchor: new window.google.maps.Point(13, 41),
              }}
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
              icon={{
                url: RED_MARKER_URL,
                scaledSize: new window.google.maps.Size(26, 41),
                anchor: new window.google.maps.Point(13, 41),
              }}
            />
          )}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#B57EDC',
                  strokeOpacity: 0.8,
                  strokeWeight: 6,
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
