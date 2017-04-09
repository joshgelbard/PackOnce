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

  TripShow: {
    name: 'Preloaded TripShow',
    items: {
      0: { id: 0, name: 'Preloaded Umbrella', checked: true, category: 'Utility' },
      1: { id: 1, name: 'Preloaded Tent', checked: false, category: 'Equipment' }
    },
    activities: ['Preloaded Camping']
  },

  NewTrip: {
    name: 'New Trip',
    activities: {
      0: { id: 0, name: 'Skiing', selected: false },
      1: { id: 1, name: 'Camping', selected: false }
    },
    items: {

    }
  }
};

const configureStore = (preloadedState = _preloadedState) => {
  return createStore(RootReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore;
