import * as StorageUtil from '../util/storage_util'

export const RECEIVE_TRIP = "RECEIVE_TRIP"
export const RECEIVE_TRIPS = "RECEIVE_TRIPS"
export const CLEAR_ACTIVE_TRIP = "CLEAR_ACTIVE_TRIP"

export const receiveTrip = trip => ({
  type: RECEIVE_TRIP,
  trip
})

export const receiveTrips = trips => ({
  type: RECEIVE_TRIPS,
  trips
})

export const createTrip = trip => dispatch => {
  return StorageUtil.saveTrip(trip)
    .then(res => dispatch(receiveTrip(res)))
}

export const getAllTrips = () => dispatch => {
  return StorageUtil.getAllTrips()
    .then(res => dispatch(receiveTrips(res)))
}

export const loadTrip = tripId => dispatch => {
  return StorageUtil.loadTrip(tripId)
    .then(res => dispatch(receiveTrip(res)))
}

export const deleteAllTrips = () => dispatch => {
  return StorageUtil.deleteAllTrips()
}
