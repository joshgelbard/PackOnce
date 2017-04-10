import * as APIUtil from '../util/api_util'

export const RECEIVE_NEW_TRIP_ITEM = "RECEIVE_NEW_TRIP_ITEM"
export const RECEIVE_NEW_TRIP_ACTIVITY = "RECEIVE_NEW_TRIP_ACTIVITY"
export const RECEIVE_SUGGESTED_ITEMS = "RECEIVE_SUGGESTED_ITEMS"
export const RECEIVE_ACTIVITY_TYPES = "RECEIVE_ACTIVITY_TYPES"
export const CLEAR_NEW_TRIP = "CLEAR_NEW_TRIP"

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

export const clearNewTrip = () => ({
  type: CLEAR_NEW_TRIP
})

export const getSuggestedItems = activities => dispatch => {
  return APIUtil.getSuggestedItems(activities)
    .then( res => {
      if (res.status === 200) {
        return res.json().then( data => {
          const asObject = APIUtil.arrayToIdKeyedObject(data);
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
