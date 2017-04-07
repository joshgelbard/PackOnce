import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import TripDetailReducer from './reducers/trip_detail_reducer'
import { Root } from './router'

const RootReducer = combineReducers({
  TripDetail: TripDetailReducer
})

const _preloadedState = {
  TripDetail: {
    activities: {
      0: { id: 0, name: 'Camping', selected: false },
      1: { id: 1, name: 'Skiing', selected: false }
    }
  }
}

const configureStore = (preloadedState = _preloadedState) => {
  return createStore(RootReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore
