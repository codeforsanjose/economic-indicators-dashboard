// Get the data - ToDo - Initialize store with this data
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

//export var rootDataURL = 'https://raw.githubusercontent.com/codeforsanjose/economic-indicators-dashboard/gh-pages/data'
//export var generalConfig = 'general_config.json'
//export var chartsConfig = 'charts_config.json'

export function constructOpenDataURL (rootURL, guid, apiKey) {
  var url = `${rootURL}/${guid}/data.csv/?auth_key=${apiKey}`
  return url
}
