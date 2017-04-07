import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import TripDetailReducer from './reducers/trip_detail_reducer'
import { Root } from './router'

const RootReducer = combineReducers({
  TripDetail: TripDetailReducer
})

const configureStore = (preloadedState = {}) => {
  return createStore(RootReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore
