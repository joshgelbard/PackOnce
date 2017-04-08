import * as APIUtil from '../util/api_util'
import * as StorageUtil from '../util/storage_util'

export const RECEIVE_NEW_TRIP_ITEM = "RECEIVE_NEW_TRIP_ITEM"
export const RECEIVE_NEW_TRIP_ACTIVITY = "RECEIVE_NEW_TRIP_ACTIVITY"
export const RECEIVE_SUGGESTED_ITEMS = "RECEIVE_SUGGESTED_ITEMS"
export const RECEIVE_ACTIVITY_TYPES = "RECEIVE_ACTIVITY_TYPES"
export const RECEIVE_TRIP = "RECEIVE_TRIP"

export const receiveActivityTypes = activities => ({
  type: RECEIVE_ACTIVITY_TYPES,
  activities
})

export const receiveSuggestedItems = items => ({
  type: RECEIVE_SUGGESTED_ITEMS,
  items
})

export const receiveNewTripItem = item => ({
  type: RECEIVE_NEW_TRIP_ITEM,
  item
})

export const receiveNewTripActivity = activity => ({
  type: RECEIVE_NEW_TRIP_ACTIVITY,
  activity
})

export const receiveTrip = trip => ({
  type: RECEIVE_TRIP,
  trip
})

// this should store it in the phone
export const createTrip = trip => dispatch => {
  return StorageUtil.saveTrip(trip)
    .then(res => dispatch(receiveTrip(res)))
}

export const getTrip = tripId => dispatch => {
  return StorageUtil.getTrip(tripId)
    .then(res => dispatch(receiveTrip(res)))
}

export const getSuggestedItems = activities => dispatch => {
  return APIUtil.getSuggestedItems(activities)
    .then( res => {
      if (res.status == 200) {
        return res.json().then( res => {
          const asObject = APIUtil.arrayToIdKeyedObject(res);
          dispatch(receiveSuggestedItems(asObject));
        })
      } else {
        console.log('getSuggestedItems: res status was not 200 ');
      }
    })
    .catch( res => {
      console.log('getSuggestedItems: catch ', res)
    })
}
