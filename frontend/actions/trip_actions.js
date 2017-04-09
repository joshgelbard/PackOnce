import * as StorageUtil from '../util/storage_util'
import * as APIUtil from '../util/api_util'

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

export const clearActiveTrip = () => ({
  type: CLEAR_ACTIVE_TRIP
})

export const createTrip = trip => dispatch => {
  return StorageUtil.saveTrip(trip)
    .then(res => dispatch(receiveTrip(res)))
}

export const getAllTrips = () => dispatch => {
  return StorageUtil.getAllTrips()
    .then(res => dispatch(receiveTrips(res)))
}

export const sendTaggedTripItems = (items, activities, categories) => dispatch => {

  return APIUtil.sendTaggedTripItems(items, activities, categories)
    .then( res => {
      if (res.status == 200) {
        return res.json().then( data => {
          dispatch(clearActiveTrip());
        })
      } else {
        console.log('sendTaggedTripItems: res status was not 200 ');
      }
    })
    .catch( res => {
      console.log('sendTaggedTripItems: catch ', res)
    })
};

export const loadTrip = tripId => dispatch => {
  return StorageUtil.loadTrip(tripId)
    .then(res => dispatch(receiveTrip(res)))
}

export const deleteAllTrips = () => dispatch => {
  return StorageUtil.deleteAllTrips()
}
