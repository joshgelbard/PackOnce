import {
  RECEIVE_TRIPS,
  UPDATE_TRIP
} from '../actions/trip_actions';

const AllTripsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TRIPS:
      return Object.assign({}, state, action.trips);
    case UPDATE_TRIP:
      return Object.assign({}, state, action.trip);
    default:
      return state;
  }
};

export default AllTripsReducer;
