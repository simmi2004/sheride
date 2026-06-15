import { useEffect, useRef, useCallback } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:5000'

/**
 * useSocket — connects to the Socket.io server and returns a stable socket ref.
 *
 * @param {string|null} rideId  - join a specific ride room when provided
 * @param {Object}      handlers - { onRideStatus, onDriverLocation, onSosAck }
 */
export function useSocket(rideId = null, handlers = {}) {
  const socketRef = useRef(null)

  useEffect(() => {
    const token =
      localStorage.getItem('sheride_token') ??
      sessionStorage.getItem('sheride_token')

    socketRef.current = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    })

    const socket = socketRef.current

    socket.on('connect', () => {
      if (rideId) socket.emit('join_ride', { rideId })
    })

    if (handlers.onRideStatus) {
      socket.on('ride_status', handlers.onRideStatus)
    }
    if (handlers.onDriverLocation) {
      socket.on('driver_location', handlers.onDriverLocation)
    }
    if (handlers.onSosAck) {
      socket.on('sos_ack', handlers.onSosAck)
    }

    return () => {
      socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rideId])

  /** Emit an SOS event with current GPS coords */
  const emitSOS = useCallback((coords) => {
    socketRef.current?.emit('sos', { coords })
  }, [])

  /** Emit a driver location update */
  const emitLocation = useCallback((coords) => {
    socketRef.current?.emit('location_update', { coords })
  }, [])

  return { socket: socketRef, emitSOS, emitLocation }
}
