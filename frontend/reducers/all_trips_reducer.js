import {
  RECEIVE_TRIPS,
  RECEIVE_TRIP,
  UPDATE_TRIP
} from '../actions/trip_actions';

const AllTripsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TRIPS:
      return Object.assign({}, state, action.trips);
    case RECEIVE_TRIP:
      const trips = Object.assign({}, state);
      trips[action.trip.id] = action.trip;
      return trips;
    default:
      return state;
  }
};

export default AllTripsReducer;
