import Papa from 'papaparse'
import _ from 'lodash'
require('es6-promise').polyfill()
import fetch from 'isomorphic-fetch'

import {addLineChart} from './lineChart'
import {addBarChart} from './barChart'
// import {addScatterChart} from './scatterChart'

const addChart = (chartID, dataURL, sectorID, sectorURL, sectorTitleID, chartsConfig) => {
  var sectorResults

  const processSectorResults = (result) => {
    sectorResults = {}

    var sectorVals = Papa.parse(result)

    var values = result.split('\n')

    var cols = values[0].split(',')
    var numCols = cols.length

    for (var i = 1; i < numCols; i++) {
      var dataValues = []

      for (var k = 1; k < sectorVals.data.length; k++) {
        if (sectorVals.data[k][0].trim().length > 0) {
          dataValues.push({
            label: sectorVals.data[k][0],
            value: parseFloat(sectorVals.data[k][i])
          })
        }
      }

      var index = cols[i].replace(/"/g, '')
      sectorResults[index] = dataValues
    }
  }

  const displaySectorResults = (label, sectorTitleID, configData) => {
    var chartData = []

    chartData.push({
      key: label,
      values: sectorResults[label]
    })

    var inputParams = {
      data: chartData,
      id: sectorID,
      title: label
    }

    var newTitle = configData.title + ' - ' + label

    addBarChart(inputParams, configData, newTitle)
  }

  const handleChartEvents = (label, value) => {
    if (sectorResults === undefined) {
      fetch(sectorURL, {
        method: 'get'
      })
      .then((res) => res.text())
      .then((data) => {
        processSectorResults(data)
        displaySectorResults(label, sectorTitleID, chartsConfig['detail2'])
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      displaySectorResults(label, sectorTitleID, chartsConfig['detail2'])
    }
  }

  const processResultsMultiLines = (result) => {
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

    var inputParams = []

    switch (chartsConfig['detail1'].plotstyle) {
      case 'line':
        var showLegend = (chartData.length > 1)
        inputParams = {
          data: chartData,
          id: chartID,
          xTickLabels: xTickLabels,
          chartEvents: handleChartEvents,
          yMax: yMax,
          showLegend: showLegend
        }
        addLineChart(inputParams, chartsConfig['detail1'])
        if (sectorURL !== null && (typeof sectorURL !== 'undefined') && sectorURL.length > 0) {
          fetch(sectorURL, {
            method: 'get'
          })
          .then((res) => res.text())
          .then((data) => {
            processSectorResults(data)
            const label = xTickLabels[xTickLabels.length - 1]
            displaySectorResults(label, sectorTitleID, chartsConfig['detail2'])
          })
          .catch((err) => {
            console.log(err)
          })
        }
        break
      case 'horizontal-bar-chart':
        inputParams = {
          data: chartData,
          id: chartID
        }
        addBarChart(inputParams, chartsConfig['detail1'])
        break
      case 'doughnut':
        // TBD
        break
    }
  }

  fetch(dataURL, {
    method: 'get'
  })
  .then((res) => res.text())
  .then((data) => {
    processResultsMultiLines(data)
  })
  .catch((err) => {
    console.log(err)
  })
}

export function showChart (chartID, dataURL, sectorID, sectorDataURL, sectorTitleID, chartsConfig) {
  console.log(dataURL)
  console.log(sectorDataURL)

  addChart(chartID, dataURL, sectorID, sectorDataURL, sectorTitleID, chartsConfig)
}
