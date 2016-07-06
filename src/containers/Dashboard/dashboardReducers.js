import { combineReducers } from 'redux'
import {
  INVALIDATE_GENERAL_CONFIG,
  REQUEST_GENERAL_CONFIG,
  RECEIVE_GENERAL_CONFIG,
  INVALIDATE_CHARTS_CONFIG,
  REQUEST_CHARTS_CONFIG,
  RECEIVE_CHARTS_CONFIG,
  INVALIDATE_INDICATORS,
  REQUEST_INDICATORS,
  RECEIVE_INDICATORS
} from './dashboardActions'

// ToDo - calculate maxBoxes from indicators
const indicators = (state = {
  isFetching: false,
  didInvalidate: false,
  data: {},
  maxBoxes: 3
}, action) => {
  switch (action.type) {
    case INVALIDATE_INDICATORS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_INDICATORS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_INDICATORS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.data,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
const chartsConfig = (state = {
  isFetching: false,
  didInvalidate: false,
  data: {}
}, action) => {
  switch (action.type) {
    case INVALIDATE_CHARTS_CONFIG:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_CHARTS_CONFIG:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_CHARTS_CONFIG:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.data,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const generalConfig = (state = {
  isFetching: false,
  didInvalidate: false,
  data: {}
}, action) => {
  switch (action.type) {
    case INVALIDATE_GENERAL_CONFIG:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_GENERAL_CONFIG:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_GENERAL_CONFIG:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.data,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const dashboardReducer = combineReducers({
  generalConfig,
  chartsConfig,
  indicators
})

export default dashboardReducer
