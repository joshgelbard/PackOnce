import uuidV4 from 'uuid/v4'
import { AsyncStorage } from 'react-native'

const STORAGE_PREFIX = "@PackOnce:"
const tripKey = (id) =>(`${STORAGE_PREFIX}Trips:${id}`)
const isOurKey = (key) => key.slice(0, STORAGE_PREFIX.length) === STORAGE_PREFIX

const getOurKeys = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys()
    console.log(allKeys);
    return allKeys.filter( key => isOurKey(key) )
  } catch (error) {
    console.log('error in getOurKeys:', error);
  }
}

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
    const ourKeys = await getOurKeys()
    // change if we ever store anything besides trips
    const allTrips = await AsyncStorage.multiGet(ourKeys)
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

export const deleteAllTrips = async () => {
  try {
    const ourKeys = await getOurKeys()
    console.log(ourKeys);
    // change if we ever store anything besides trips
    await AsyncStorage.multiRemove(ourKeys)
    return
  } catch (error) {
    console.log('deleteAllTrips error: ', error);
  }
}

export const deleteTrip = async (tripId) => {
  try {
    await AsyncStorage.removeItem(tripKey(tripId))
    return
  } catch (error) {
    console.log(`error deleting trip ${tripId}`, error);
  }
}
