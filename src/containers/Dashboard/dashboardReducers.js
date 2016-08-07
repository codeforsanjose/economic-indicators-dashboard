import _ from 'lodash'

import { processIndicators } from '../../utilities/processIndicators'
import processChartResults from '../../utilities/processChartResults'

import {
  INVALIDATE_GENERAL_CONFIG,
  REQUEST_GENERAL_CONFIG,
  RECEIVE_GENERAL_CONFIG,
  INVALIDATE_CHARTS_CONFIG,
  REQUEST_CHARTS_CONFIG,
  RECEIVE_CHARTS_CONFIG,
  INVALIDATE_INDICATORS,
  REQUEST_INDICATORS,
  RECEIVE_INDICATORS,
  INVALIDATE_CHART_DATA,
  REQUEST_CHART_DATA,
  RECEIVE_CHART_DATA,
  INVALIDATE_SECTOR_DATA,
  REQUEST_SECTOR_DATA,
  RECEIVE_SECTOR_DATA,
  SHOW_CHART,
  CHART_IS_SHOWING
} from './dashboardActions'

const calculateMaxBoxes = (data) => {
  let numBoxes = 0

  _.forIn(data, (item, index) => {
    if (numBoxes < item.length) {
      numBoxes = item.length
    }
  })
  return numBoxes
}

// ToDo - calculate maxBoxes from indicators
export const indicators = (state = {
  isFetching: false,
  didInvalidate: false,
  data: {},
  maxBoxes: 3
}, action) => {
  switch (action.type) {
    case INVALIDATE_INDICATORS:
      return Object.assign({}, state, {
        ...state,
        didInvalidate: true
      })
    case REQUEST_INDICATORS:
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_INDICATORS:
      const indicators = processIndicators(action.generalConfig, action.data)
      const maxBoxes = calculateMaxBoxes(indicators)
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        didInvalidate: false,
        data: indicators,
        maxBoxes,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export const generalConfig = (state = {
  isFetching: false,
  didInvalidate: false,
  data: {}
}, action) => {
  switch (action.type) {
    case INVALIDATE_GENERAL_CONFIG:
      return Object.assign({}, state, {
        ...state,
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

export const charts = (state = {
  config: {
    isFetching: false,
    didInvalidate: false,
    data: {},
    showChart: false
  },
  chartData: {},
  sectorData: {}
}, action) => {
  switch (action.type) {
    case INVALIDATE_CHARTS_CONFIG:
      return Object.assign({}, state, {
        config: {
          ...state.config,
          didInvalidate: true
        }
      })
    case REQUEST_CHARTS_CONFIG:
      return Object.assign({}, state, {
        config: {
          ...state.config,
          isFetching: true,
          didInvalidate: false
        }
      })
    case RECEIVE_CHARTS_CONFIG:
      return Object.assign({}, state, {
        config: {
          ...state.config,
          isFetching: false,
          didInvalidate: false,
          data: action.data,
          lastUpdated: action.receivedAt
        }
      })
    case INVALIDATE_CHART_DATA:
      return Object.assign({}, state, {
        chartData: {
          ...state.chartData,
          [action.idi]: {
            didInvalidate: true
          }
        }
      })
    case REQUEST_CHART_DATA:
      return Object.assign({}, state, {
        config: {
          ...state.config,
          showChart: false,
          selectedItem: action.item,
          selectedEventId: action.eventId
        },
        chartData: {
          ...state.chartData,
          [action.item.id]: {
            isFetching: true,
            didInvalidate: false
          }
        }
      })
    case RECEIVE_CHART_DATA:
      let chartConfig = {}
      const category = state.config.selectedItem.category
      const name = state.config.selectedItem.name
      if (state.config.data.hasOwnProperty(category)) {
        if (state.config.data[category].hasOwnProperty(name)) {
          chartConfig = state.config.data[category][name]
        }
      }
      const newData = processChartResults(action.data, chartConfig)
      return Object.assign({}, state, {
        config: {
          ...state.config,
          showChart: true
        },
        chartData: {
          ...state.chartData,
          [action.id]: {
            isFetching: false,
            didInvalidate: false,
            chartData: newData.chartData,
            xTickLabels: newData.xTickLabels,
            ymax: newData.yMax,
            lastUpdated: action.receivedAt
          }
        }
      })
    case SHOW_CHART:
      return Object.assign({}, state, {
        config: {
          ...state.config,
          showChart: true,
          selectedItem: action.item,
          selectedEventId: action.eventId
        }
      })
    case CHART_IS_SHOWING:
      return Object.assign({}, state, {
        config: {
          ...state.config,
          showChart: false
        }
      })
    case INVALIDATE_SECTOR_DATA:
      return Object.assign({}, state, {
        ...state,
        didInvalidate: true
      })
    case REQUEST_SECTOR_DATA:
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_SECTOR_DATA:
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.data,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
