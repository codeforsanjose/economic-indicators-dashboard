import _ from 'lodash'

import { fetchJSONData2, fetchJSONData, fetchTextData } from '../../utilities/fetchCalls'
import { chartURL, indicatorURL } from '../../utilities/dataURLs'

export const REQUEST_GENERAL_CONFIG = 'REQUEST_GENERAL_CONFIG'
export const RECEIVE_GENERAL_CONFIG = 'RECEIVE_GENERAL_CONFIG'
export const INVALIDATE_GENERAL_CONFIG = 'INVALIDATE_GENERAL_CONFIG'

export const REQUEST_CHARTS_CONFIG = 'REQUEST_CHARTS_CONFIG'
export const RECEIVE_CHARTS_CONFIG = 'RECEIVE_CHARTS_CONFIG'
export const INVALIDATE_CHARTS_CONFIG = 'INVALIDATE_CHARTS_CONFIG'

export const REQUEST_INDICATORS = 'REQUEST_INDICATORS'
export const RECEIVE_INDICATORS = 'RECEIVE_INDICATORS'
export const INVALIDATE_INDICATORS = 'INVALIDATE_INDICATORS'

export const REQUEST_CHART_DATA = 'REQUEST_CHART_DATA'
export const RECEIVE_CHART_DATA = 'RECEIVE_CHART_DATA'
export const INVALIDATE_CHART_DATA = 'INVALIDATE_CHART_DATA'
export const SHOW_CHART = 'SHOW_CHART'
export const CHART_IS_SHOWING = 'CHART_IS_SHOWING'

export const REQUEST_SECTOR_DATA = 'REQUEST_SECTOR_DATA'
export const RECEIVE_SECTOR_DATA = 'RECEIVE_SECTOR_DATA'
export const INVALIDATE_SECTOR_DATA = 'INVALIDATE_SECTOR_DATA'

// =================================
// General Config
export const invalidateGeneralConfig = () => {
  return {
    type: INVALIDATE_GENERAL_CONFIG
  }
}

const fetchGeneralConfig = (url) => {
  return dispatch => {
    dispatch({
      type: REQUEST_GENERAL_CONFIG
    })

    return fetchJSONData2(url)
    .then(data => {
      dispatch({
        type: RECEIVE_GENERAL_CONFIG,
        data,
        receivedAt: Date.now()
      })

      const latestIndicatorsURL = indicatorURL(data)
      dispatch(fetchIndicatorsIfNeeded(latestIndicatorsURL))

      const url = chartURL(data)
      dispatch(fetchChartsConfigIfNeeded(url))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

const shouldFetchGeneralConfig = (state) => {
  const generalConfig = state.generalConfig
  if (_.isEmpty(generalConfig.data)) {
    return true
  }
  if (generalConfig.isFetching) {
    return false
  }
  return generalConfig.didInvalidate
}

export const fetchGeneralConfigIfNeeded = (generalURL) => {
  return (dispatch, getState) => {
    if (shouldFetchGeneralConfig(getState(), generalURL)) {
      return dispatch(fetchGeneralConfig(generalURL))
    }
  }
}

// =================================
// Charts Config
export const invalidateChartsConfig = () => {
  return {
    type: INVALIDATE_CHARTS_CONFIG
  }
}

const fetchChartsConfig = (url) => {
  return dispatch => {
    dispatch({
      type: REQUEST_CHARTS_CONFIG
    })

    const fetchChartsConfigSuccessCallback = (data) => {
      dispatch({
        type: RECEIVE_CHARTS_CONFIG,
        data,
        receivedAt: Date.now()
      })
    }

    const fetchChartsConfigErrorCallback = (err) => {
      console.log(err)
    }
    return fetchJSONData(url, fetchChartsConfigSuccessCallback, fetchChartsConfigErrorCallback)
  }
}

const shouldFetchChartsConfig = (state) => {
  const charts = state.charts
  if (_.isEmpty(charts.config.data)) {
    return true
  }
  if (charts.config.isFetching) {
    return false
  }
  return charts.config.didInvalidate
}

export const fetchChartsConfigIfNeeded = (url) => {
  return (dispatch, getState) => {
    if (shouldFetchChartsConfig(getState(), url)) {
      return dispatch(fetchChartsConfig(url))
    }
  }
}

// =================================
// Indicators
export const invalidateIndicators = () => {
  return {
    type: INVALIDATE_INDICATORS
  }
}

const fetchIndicators = (url) => {
  return (dispatch, getState) => {
    dispatch({
      type: REQUEST_INDICATORS
    })

    const fetchIndicatorsSuccessCallback = (data) => {
      const state = getState()
      dispatch({
        type: RECEIVE_INDICATORS,
        data,
        generalConfig: state.generalConfig,
        receivedAt: Date.now()
      })
    }

    const fetchIndicatorsErrorCallback = (err) => {
      console.log(err)
    }

    return fetchTextData(url, fetchIndicatorsSuccessCallback, fetchIndicatorsErrorCallback)
  }
}

const shouldFetchIndicators = (state) => {
  const indicators = state.indicators
  if (_.isEmpty(indicators.data)) {
    return true
  }
  if (indicators.isFetching) {
    return false
  }
  return indicators.didInvalidate
}

export const fetchIndicatorsIfNeeded = (url) => {
  return (dispatch, getState) => {
    if (shouldFetchIndicators(getState(), url)) {
      return dispatch(fetchIndicators(url))
    }
  }
}

// =================================
// Chart Data
export const invalidateChartData = (id) => {
  return {
    type: INVALIDATE_CHART_DATA,
    id
  }
}

export const showChart = (item, eventId) => {
  return {
    type: SHOW_CHART,
    item,
    eventId
  }
}

export const chartIsShowing = () => {
  return {
    type: CHART_IS_SHOWING
  }
}

const fetchChartData = (item, eventId) => {
  return (dispatch, getState) => {
    dispatch({
      type: REQUEST_CHART_DATA,
      item,
      eventId
    })

    const fetchChartDataSuccessCallback = (data) => {
      dispatch({
        type: RECEIVE_CHART_DATA,
        data,
        id: item.id,
        receivedAt: Date.now()
      })
    }

    const fetchChartDataErrorCallback = (err) => {
      console.log(err)
    }

    return fetchTextData(item.dataURL, fetchChartDataSuccessCallback, fetchChartDataErrorCallback)
  }
}

const shouldFetchChartData = (state, id) => {
  const chartData = state.charts.chartData
  if (_.isEmpty(chartData[id])) {
    return true
  }
  if (chartData[id].isFetching) {
    return false
  }
  return chartData[id].didInvalidate
}

export const fetchChartDataIfNeeded = (item, eventId) => {
  return (dispatch, getState) => {
    if (shouldFetchChartData(getState(), item.id)) {
      return dispatch(fetchChartData(item, eventId))
    } else {
      return dispatch(showChart(item, eventId))
    }
  }
}

// =================================
// Sector Data
export const invalidateSectorData = (id) => {
  return {
    type: INVALIDATE_SECTOR_DATA,
    id
  }
}

const fetchSectorData = (url, id) => {
  return (dispatch, getState) => {
    dispatch({
      type: REQUEST_SECTOR_DATA,
      id
    })

    const fetchSectorDataSuccessCallback = (data) => {
      dispatch({
        type: RECEIVE_SECTOR_DATA,
        data,
        id,
        receivedAt: Date.now()
      })
    }

    const fetchSectorDataErrorCallback = (err) => {
      console.log(err)
    }

    return fetchTextData(url, fetchSectorDataSuccessCallback, fetchSectorDataErrorCallback)
  }
}

const shouldFetchSectorData = (state, id) => {
  const sectorData = state.charts.sectorData
  if (_.isEmpty(sectorData[id])) {
    return true
  }
  if (sectorData[id].isFetching) {
    return false
  }
  return sectorData[id].didInvalidate
}

export const fetchSectorDataIfNeeded = (url, id) => {
  return (dispatch, getState) => {
    if (shouldFetchSectorData(getState(), id)) {
      return dispatch(fetchSectorData(url, id))
    }
  }
}
