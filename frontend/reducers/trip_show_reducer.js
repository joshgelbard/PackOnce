import {
  RECEIVE_TRIP,
  CLEAR_ACTIVE_TRIP
} from '../actions/trip_actions';

const nullTrip = {id: undefined, name: undefined, activities: [], items: {} };

const TripShowReducer = (state = nullTrip, action) => {
  switch (action.type) {
    case RECEIVE_TRIP:
        return Object.assign({}, state, action.trip );
    case CLEAR_ACTIVE_TRIP:
      return Object.assign({}, state, nullTrip );
    default:
      return state;
  }
};

export default TripShowReducer;
