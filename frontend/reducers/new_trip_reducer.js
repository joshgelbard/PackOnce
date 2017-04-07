import {
  RECEIVE_TRIP,
  RECEIVE_ITEM,
  RECEIVE_ACTIVITY,
  RECEIVE_ITEMS,
  RECEIVE_ACTIVITIES
} from '../actions/trip_actions';

const nullTrip = {id: undefined, name: undefined, activities: {}, items: {} };

const NewTripReducer = (state = nullTrip, action) => {
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      return Object.assign({}, state, { activities: action.activities })
    case RECEIVE_ITEMS:
      return Object.assign({}, state, { items: action.items })
    case RECEIVE_ITEM:
      const items = Object.assign({}, state.items);
      items[action.item.id] = action.item;
      return Object.assign({}, state, { items });
    case RECEIVE_ACTIVITY:
      const activities = Object.assign({}, state.activities)
      activities[action.activity.id] = action.activity
      return Object.assign({}, state, { activities })
    default:
      return state;
  }
};

export default NewTripReducer;
