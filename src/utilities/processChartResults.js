import Papa from 'papaparse'
import _ from 'lodash'

const processChartResults = (result, chartsConfig) => {
  const values = Papa.parse(result)

  const dataValues = {}
  const xTickLabels = []

  const header = values.data[0]

  header.map((headerItem, idx) => {
    if (idx > 0) {
      dataValues[headerItem] = {
        values: [],
        key: headerItem
      }
    }
    // ToDo - refactor to create array from
    // returned values
    return null
  })

  values.data.shift() // ignore the header
  let done = false
  let index = 0
  let yMax = 0

  values.data.map((item) => {
    let axisLabel = item[0]
    axisLabel = axisLabel.trim().replace(/"/g, '')

    if (axisLabel.length === 0) {
      done = true
    }

    if (!done) {
      // Get rid of the first element
      item.shift()

      item.map((dataPoint, idx) => {
        const value = parseFloat(dataPoint.replace(/,/g, '').replace(/"/g, '').replace(/\$/g, ''))

        let labelVal = index
        if (chartsConfig.detail1.plotstyle === 'horizontal-bar-chart') {
          labelVal = axisLabel
        }

        const headerName = header[idx + 1]

        dataValues[headerName].values.push({
          label: labelVal,
          value
        })

        // Track the maximum y value
        if (value > yMax) {
          yMax = value
        }

        // ToDo - refactor to create array from
        // returned values
        return null
      })
      xTickLabels.push(axisLabel)
      index++
    }
    // ToDo - refactor to create array from
    // returned values
    return null
  })

  const chartData = []

  _.forIn(dataValues, (dataSet) => {
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
