/*global $:true*/

import Papa from 'papaparse'

import {addLineChart} from './lineChart'
import {addBarChart} from './barChart'
// import {addScatterChart} from './scatterChart'

function addChart (chartID, dataURL, sectorID, sectorURL, sectorTitleID, chartsConfig) {
  var sectorResults

  function processSectorResults (result) {
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

  function displaySectorResults (label, sectorTitleID, configData) {
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

  function handleChartEvents (label, value) {
    if (sectorResults === undefined) {
      $.get(sectorURL, function (result) {
        processSectorResults(result)
        displaySectorResults(label, sectorTitleID, chartsConfig['detail2'])
      })
    } else {
      displaySectorResults(label, sectorTitleID, chartsConfig['detail2'])
    }
  }

  function processResults (result) {
    // var values = result.split('\r\n')
    var values = result.replace(/(\r\n|\n|\r)/gm, '~foo~').split('~foo~')

    var dataValues = []
    var xTickLabels = []

    var header = values[0].split(',')

    values.shift() // ignore the header
    var done = false
    var index = 0
    var yMax = 0

    values.map(function (item) {
      var items = item.split(',')

      var axisLabel = items[0].replace(/,/g, '')
      axisLabel = axisLabel.trim().replace(/"/g, '')

      if (axisLabel.length === 0) {
        done = true
      }

      if (!done) {
        var empNum = parseFloat(items[1].replace(/,/g, '').replace(/"/g, ''))

        var labelVal = index
        if (chartsConfig['detail1'].plotstyle === 'horizontal-bar-chart') {
          labelVal = axisLabel
        }

        dataValues.push({
          label: labelVal,
          value: empNum
        })
        xTickLabels.push(axisLabel)
        index++

        // Track the maximum y value
        if (empNum > yMax) {
          yMax = empNum
        }
      }
    })
    var chartData = []

    chartData.push({
      key: header[1],
      values: dataValues
    })

    var inputParams = []

    if (chartsConfig['detail1'].plotstyle === 'line') {
      inputParams = {
        data: chartData,
        id: chartID,
        xTickLabels: xTickLabels,
        chartEvents: handleChartEvents,
        yMax: yMax
      }
      addLineChart(inputParams, chartsConfig['detail1'])
    } else if (chartsConfig['detail1'].plotstyle === 'horizontal-bar-chart') {
      inputParams = {
        data: chartData,
        id: chartID
      }
      addBarChart(inputParams, chartsConfig['detail1'])
    }
  }

  $.get(dataURL, function (result) {
    processResults(result)
  })
}

export function showChart (chartID, dataURL, sectorID, sectorDataURL, sectorTitleID, chartsConfig) {
  console.log(dataURL)
  console.log(sectorDataURL)

  addChart(chartID, dataURL, sectorID, sectorDataURL, sectorTitleID, chartsConfig)
}
