/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

const constructOpenDataURL = (rootURL, guid, apiKey) => {
  const url = `${rootURL}/${guid}/data.csv/?auth_key=${apiKey}`
  return url
}

const constructURL = (data, item) => {
  let endpoint = item

  if (data.urlConfig.useDataMap) {
    endpoint = data.urlConfig.dataMap[item]
  }

  const url = `${data.urlConfig.dataURL}/${endpoint}`
  return url
}

export const getInitialDataURL = () => {
  const rootDiv = document.getElementById('root')
  return rootDiv.getAttribute('data-config')
}

export const constructDataURL = (data, item) => {
  let url = ''

  if ((typeof data.urlConfig !== 'undefined') &&
        data.urlConfig.useURLConfig) {
    url = constructURL(data, item)
  } else {
    url = constructOpenDataURL(data['open-data-url'],
                       item,
                       data['api-key'])
  }
  return url
}

export const indicatorURL = (data) => {
  return constructDataURL(data, data['indicator-guid'])
}

export const chartURL = (data) => {
  let url = ''

  if ((typeof data.urlConfig !== 'undefined') &&
      data.urlConfig.useURLConfig) {
    url = `${data.urlConfig.configURL}/${data.chartsConfigFileName}`
  } else {
    url = data['chart-config-file']
  }
  return url
}
