import uuidV4 from 'uuid/v4'
import { AsyncStorage } from 'react-native'

const STORAGE_PREFIX = "@PackOnce:"
const tripKey = (id) =>(`${STORAGE_PREFIX}Trips:${id}`)

export const saveTrip = async (trip) => {
  const tripWithId = trip.id ? trip : Object.assign({}, trip, { id: uuidV4() })
  const key = tripKey(tripWithId.id)
  try {
    await AsyncStorage.setItem(key, JSON.stringify(tripWithId))
    return tripWithId
  } catch (error) {
    console.log('saveTrip: error saving data: ', error)
  }
}

export const loadTrip = async (tripId) => {
  try {
    const trip = await AsyncStorage.getItem(tripKey(tripId))
    return JSON.parse(trip)
  } catch (error) {
    console.log('getTrip: error retrieving data: " ', error)
  }
}

export const getAllTrips = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys()
    const allTrips = await AsyncStorage.multiGet(allKeys)
    const trips = {}
    allTrips.forEach( pair => {
      const trip = JSON.parse(pair[1])
      trips[trip.id] = trip
    })
    return trips
  } catch (error) {
    console.log('getAllTrips error: ', error)
  }
}
