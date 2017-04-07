import {
  RECEIVE_TRIP_NAME,
  RECEIVE_ITEMS,
  RECEIVE_ACTIVITIES,
  CLEAR_ACTIVE_TRIP
} from '../actions/trip_actions';

const nullTrip = {id: undefined, name: undefined, activities: [], items: {} };

const TripShowReducer = (state = nullTrip, action) => {
  console.log("in the reducer");
  console.log(action);
  switch (action.type) {
    case RECEIVE_TRIP_NAME:
        return Object.assign({}, state, { name: action.name });
    case RECEIVE_ACTIVITIES:
      return Object.assign({}, state, { activities: action.activities });
    case RECEIVE_ITEMS:
      return Object.assign({}, state, { items: action.items });
    case CLEAR_ACTIVE_TRIP:
      return Object.assign({}, state, nullTrip );
    default:
      return state;
  }
};

export default TripShowReducer;
