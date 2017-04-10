import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import NewTripReducer from './reducers/new_trip_reducer';
import AllTripsReducer from './reducers/all_trips_reducer';
import TripShowReducer from './reducers/trip_show_reducer';
import { Root } from './router';

const RootReducer = combineReducers({
  NewTrip: NewTripReducer,
  AllTrips: AllTripsReducer,
  TripShow: TripShowReducer
});

const _preloadedState = {

  NewTrip: {
    name: 'New Trip',
    activities: {
      0: { id: 0, name: 'Gadgets', selected: false },
      1: { id: 1, name: 'Traveling with Children', selected: false },
      2: { id: 2, name: 'Essentials', selected: false },
      3: { id: 3, name: 'On a Plane', selected: false },
      4: { id: 4, name: 'In the Car', selected: false },
      5: { id: 5, name: 'Beach/Camping and Outdoors', selected: false },
      6: { id: 6, name: 'Important Documents', selected: false },
      7: { id: 7, name: 'Formal Events', selected: false },
    },
    items: {}
  }
};

const configureStore = (preloadedState = _preloadedState) => {
  return createStore(RootReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore;
