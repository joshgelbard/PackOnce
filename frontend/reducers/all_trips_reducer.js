import {
  RECEIVE_TRIPS
} from '../actions/trip_actions';

const AllTripsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TRIPS:
      return Object.assign({}, state, action.trips)
    default:
      return state;
  }
};

export default AllTripsReducer;
