import Papa from 'papaparse'
import _ from 'lodash'

const processChartResults = (result, chartsConfig) => {
  var values = Papa.parse(result)

  var dataValues = {}
  var xTickLabels = []

  var header = values.data[0]

  header.map(function (headerItem, idx) {
    if (idx > 0) {
      dataValues[headerItem] = {
        values: [],
        key: headerItem
      }
    }
  })

  values.data.shift() // ignore the header
  var done = false
  var index = 0
  var yMax = 0

  values.data.map(function (item) {
    var axisLabel = item[0]
    axisLabel = axisLabel.trim().replace(/"/g, '')

    if (axisLabel.length === 0) {
      done = true
    }

    if (!done) {
      // Get rid of the first element
      item.shift()

      item.map(function (dataPoint, idx) {
        var value = parseFloat(dataPoint.replace(/,/g, '').replace(/"/g, '').replace(/\$/g, ''))

        var labelVal = index
        if (chartsConfig['detail1'].plotstyle === 'horizontal-bar-chart') {
          labelVal = axisLabel
        }

        var headerName = header[idx + 1]

        dataValues[headerName].values.push({
          label: labelVal,
          value: value
        })

        // Track the maximum y value
        if (value > yMax) {
          yMax = value
        }
      })
      xTickLabels.push(axisLabel)
      index++
    }
  })

  var chartData = []

  _.forIn(dataValues, function (dataSet, dataKey) {
    chartData.push({
      key: dataSet.key,
      values: dataSet.values
    })
  })

  return {
    chartData,
    xTickLabels,
    yMax
  }
}

export default processChartResults
