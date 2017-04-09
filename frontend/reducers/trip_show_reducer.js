import {
  RECEIVE_TRIP,
  CLEAR_ACTIVE_TRIP,
  UPDATE_TRIP
} from '../actions/trip_actions';

const nullTrip = {id: 'testing', name: undefined, activities: [], items: {} };

const TripShowReducer = (state = nullTrip, action) => {
  switch (action.type) {
    case RECEIVE_TRIP:
        return Object.assign({}, state, action.trip );
    case CLEAR_ACTIVE_TRIP:
      return Object.assign({}, state, nullTrip );
    case UPDATE_TRIP:
      const trip = state;
      trip.name = action.trip.name;
      return Object.assign({}, state, trip);
    default:
      return state;
  }
};

export default TripShowReducer;
