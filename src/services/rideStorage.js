import { MOCK_RIDES, ADMIN_USERS } from '../data/mockData'

const RIDES_KEY = 'sheride_rides'
const USERS_KEY = 'sheride_users'

export function getLocalStorageRides() {
  const rides = localStorage.getItem(RIDES_KEY)
  if (!rides) {
    localStorage.setItem(RIDES_KEY, JSON.stringify(MOCK_RIDES))
    return MOCK_RIDES
  }
  try {
    return JSON.parse(rides)
  } catch {
    return MOCK_RIDES
  }
}

export function saveLocalStorageRide(ride) {
  const rides = getLocalStorageRides()
  const updated = [ride, ...rides]
  localStorage.setItem(RIDES_KEY, JSON.stringify(updated))
  return updated
}

export function updateLocalStorageRideStatus(id, status) {
  const rides = getLocalStorageRides()
  const updated = rides.map((r) => {
    if (r.id === id) {
      return { ...r, status }
    }
    return r
  })
  localStorage.setItem(RIDES_KEY, JSON.stringify(updated))
  return updated
}

export function getLocalStorageUsers() {
  const users = localStorage.getItem(USERS_KEY)
  if (!users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(ADMIN_USERS))
    return ADMIN_USERS
  }
  try {
    return JSON.parse(users)
  } catch {
    return ADMIN_USERS
  }
}

export function addLocalStorageUser(user) {
  const users = getLocalStorageUsers()
  // Avoid duplicates
  if (users.some((u) => u.email === user.email)) return users
  const updated = [user, ...users]
  localStorage.setItem(USERS_KEY, JSON.stringify(updated))
  return updated
}
