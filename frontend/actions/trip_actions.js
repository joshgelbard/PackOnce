import * as APIUtil from '../util/api_util'

export const RECEIVE_TRIP = "RECEIVE_TRIP"
export const RECEIVE_ITEM = "RECEIVE_ITEM"
export const RECEIVE_ACTIVITY = "RECEIVE_ACTIVITY"
export const RECEIVE_ACTIVITIES = "RECEIVE_ACTIVITIES"
export const RECEIVE_ITEMS = "RECEIVE_ITEMS"
export const GET_SUGGESTED_ITEMS = "GET_SUGGESTED_ITEMS"

export const receiveTrip = trip => ({
  type: RECEIVE_TRIP,
  trip
})

export const receiveActivities = activities => ({
  type: RECEIVE_ACTIVITIES,
  activities
})

export const receiveItems = items => ({
  type: RECEIVE_ITEMS,
  items
})

export const receiveItem = item => ({
  type: RECEIVE_ITEM,
  item
})

export const receiveActivity = activity => ({
  type: RECEIVE_ACTIVITY,
  activity
})

export const getSuggestedItems = activities => dispatch => {
  console.log('trying to getSuggestedItems...');
  return APIUtil.getSuggestedItems(activities)
    .then( res => {
      if (res.status == 200) {
        res.json().then( data => console.log('SUCCESS RES=', data));
        dispatch(receiveItems(res))
      } else {
        console.log('res status was not 200');
      }
    })
    .catch( res => {
      console.log('CATCH RES=', res)
    })
}
