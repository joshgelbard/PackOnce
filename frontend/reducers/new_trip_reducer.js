import {
  RECEIVE_NEW_TRIP_ITEM,
  RECEIVE_NEW_TRIP_ACTIVITY,
  RECEIVE_SUGGESTED_ITEMS,
  RECEIVE_ACTIVITY_TYPES,
  CLEAR_NEW_TRIP
} from '../actions/new_trip_actions';

const nullTrip = { name: 'New Trip', activities: {}, items: {} };

const NewTripReducer = (state = nullTrip, action) => {
  switch (action.type) {
    case CLEAR_NEW_TRIP:
      return nullTrip
    case RECEIVE_ACTIVITY_TYPES:
      return Object.assign({}, state, { activities: action.activities })
    case RECEIVE_SUGGESTED_ITEMS:
      return Object.assign({}, state, { items: action.items })
    case RECEIVE_NEW_TRIP_ITEM:
      const items = Object.assign({}, state.items);
      items[action.item.id] = action.item;
      return Object.assign({}, state, { items });
    case RECEIVE_NEW_TRIP_ACTIVITY:
      const activities = Object.assign({}, state.activities)
      activities[action.activity.id] = action.activity
      return Object.assign({}, state, { activities })
    default:
      return state;
  }
};

export default NewTripReducer;
