import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import NewTripReducer from './reducers/new_trip_reducer'
// import TripShowReducer from './reducers/trip_show'
import { Root } from './router'

const RootReducer = combineReducers({
  NewTrip: NewTripReducer
})

const _preloadedState = {
  NewTrip: {
    name: 'New trip!!',
    activities: {
      0: { id: 0, name: 'Camping', selected: false },
      1: { id: 1, name: 'Skiing', selected: false }
    },
    items: {
      0: { id: 0, name: 'Umbrella', selected: true, category: 'Utility' },
      1: { id: 1, name: 'Tent', selected: true, category: 'Equipment' }
    }
  },
  // TripShow: {
  //   name: 'Cool trip',
  //   items: {
  //     0: { id: 0, name: 'Umbrella', checked: true, category: 'Utility' },
  //     1: { id: 1, name: 'Tent', checked: false, category: 'Equipment' }
  //   },
  //   activities: ['Camping', 'Skiing']
  // }
}

const configureStore = (preloadedState = _preloadedState) => {
  return createStore(RootReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore
