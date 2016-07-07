import _ from 'lodash'

import { fetchJSONData2, fetchJSONData, fetchTextData } from '../../utilities/fetchCalls'
import { constructOpenDataURL } from '../../config/dataURLs'
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

// =================================
// General Config
export const invalidateGeneralConfig = () => {
  return {
    type: INVALIDATE_GENERAL_CONFIG
  }
}

const requestGeneralConfig = () => {
  return {
    type: REQUEST_GENERAL_CONFIG
  }
}

const receiveGeneralConfig = (data) => {
  return {
    type: RECEIVE_GENERAL_CONFIG,
    data,
    receivedAt: Date.now()
  }
}

const fetchGeneralConfig = (url) => {
  return dispatch => {
    dispatch(requestGeneralConfig(url))

    return fetchJSONData2(url)
    .then(data => {
      dispatch(receiveGeneralConfig(data))

      const latestIndicatorsURL = constructOpenDataURL(data['open-data-url'],
                                                       data['indicator-guid'],
                                                       data['api-key'])

      dispatch(fetchIndicatorsIfNeeded(latestIndicatorsURL))

      const chartURL = data['chart-config-file']
      dispatch(fetchChartsConfigIfNeeded(chartURL))
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

const requestChartsConfig = () => {
  return {
    type: REQUEST_CHARTS_CONFIG
  }
}

const receiveChartsConfig = (data) => {
  console.log('receiveChartsConfig....')
  console.log(data)
  return {
    type: RECEIVE_CHARTS_CONFIG,
    data,
    receivedAt: Date.now()
  }
}

const fetchChartsConfig = (url) => {
  return dispatch => {
    dispatch(requestChartsConfig(url))

    const fetchChartsConfigSuccessCallback = (data) => {
      dispatch(receiveChartsConfig(data))
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

const requestIndicators = () => {
  return {
    type: REQUEST_INDICATORS
  }
}

const receiveIndicators = (data) => {
  console.log('receiveIndicators....')
  console.log(data)
  return {
    type: RECEIVE_INDICATORS,
    data,
    receivedAt: Date.now()
  }
}

const fetchIndicators = (url) => {
  return (dispatch, getState) => {
    dispatch(requestIndicators(url))

    const fetchIndicatorsSuccessCallback = (data) => {
      const indicators = processIndicators(getState(), data)
      dispatch(receiveIndicators(indicators))
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
