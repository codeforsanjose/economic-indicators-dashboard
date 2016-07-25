import _ from 'lodash'

import { fetchJSONData2, fetchJSONData, fetchTextData } from '../../utilities/fetchCalls'
import { chartURL, indicatorURL } from '../../utilities/dataURLs'
import { processIndicators } from '../../utilities/processIndicators'

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
  const chartsConfig = state.chartsConfig
  if (_.isEmpty(chartsConfig.data)) {
    return true
  }
  if (chartsConfig.isFetching) {
    return false
  }
  return chartsConfig.didInvalidate
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
      const indicators = processIndicators(getState(), data)
      dispatch({
        type: RECEIVE_INDICATORS,
        indicators,
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
export const invalidateChartData = () => {
  return {
    type: INVALIDATE_CHART_DATA
  }
}

const fetchChartData = (url) => {
  return (dispatch, getState) => {
    dispatch({
      type: REQUEST_CHART_DATA
    })

    const fetchChartDataSuccessCallback = (data) => {
      // const indicators = processIndicators(getState(), data)
      dispatch({
        type: RECEIVE_CHART_DATA,
        data,
        receivedAt: Date.now()
      })
    }

    const fetchChartDataErrorCallback = (err) => {
      console.log(err)
    }

    return fetchTextData(url, fetchChartDataSuccessCallback, fetchChartDataErrorCallback)
  }
}

const shouldFetchChartData = (state) => {
  const indicators = state.indicators
  if (_.isEmpty(indicators.data)) {
    return true
  }
  if (indicators.isFetching) {
    return false
  }
  return indicators.didInvalidate
}

export const fetchChartDataIfNeeded = (url) => {
  return (dispatch, getState) => {
    if (shouldFetchChartData(getState(), url)) {
      return dispatch(fetchChartData(url))
    }
  }
}

// =================================
// Sector Data
export const invalidateSectorData = () => {
  return {
    type: INVALIDATE_SECTOR_DATA
  }
}

const fetchSectorData = (url) => {
  return (dispatch, getState) => {
    dispatch({
      type: REQUEST_SECTOR_DATA
    })

    const fetchSectorDataSuccessCallback = (data) => {
      // const indicators = processIndicators(getState(), data)
      dispatch({
        type: RECEIVE_SECTOR_DATA,
        data,
        receivedAt: Date.now()
      })
    }

    const fetchSectorDataErrorCallback = (err) => {
      console.log(err)
    }

    return fetchTextData(url, fetchSectorDataSuccessCallback, fetchSectorDataErrorCallback)
  }
}

const shouldFetchSectorData = (state) => {
  const indicators = state.indicators
  if (_.isEmpty(indicators.data)) {
    return true
  }
  if (indicators.isFetching) {
    return false
  }
  return indicators.didInvalidate
}

export const fetchSectorDataIfNeeded = (url) => {
  return (dispatch, getState) => {
    if (shouldFetchSectorData(getState(), url)) {
      return dispatch(fetchSectorData(url))
    }
  }
}
