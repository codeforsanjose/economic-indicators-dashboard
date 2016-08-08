import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { generalConfig, charts, indicators } from '../containers/Dashboard'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    generalConfig,
    charts,
    indicators,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
