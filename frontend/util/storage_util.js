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

export const getTrip = async (tripId) => {
  try {
    const trip = await AsyncStorage.getItem(tripKey(tripId))
    return trip
  } catch (error) {
    console.log('getTrip: error retrieving data: " ', error)
  }
}
