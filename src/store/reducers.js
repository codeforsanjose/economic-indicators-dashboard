import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { generalConfig, charts, indicators } from '../containers/Dashboard'

const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    generalConfig,
    charts,
    indicators,
    router,
    ...asyncReducers
  })
}

/* eslint-disable no-param-reassign */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}
/* eslint-enable no-param-reassign */

export default makeRootReducer
