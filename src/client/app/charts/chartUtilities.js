/*global $:true*/

import {addLineChart} from './lineChart'
import {addBarChart} from './barChart'
// import {addScatterChart} from './scatterChart'

import {rootDataURL} from '../config/dataURLs'

function addChart (chartID, dataURL, sectorID, sectorURL, sectorTitleID) {
  var sectorResults

  function processSectorResults (result) {
    sectorResults = {}

    var values = result.split('\n')

    var cols = values[0].split(',')
    var numCols = cols.length

    var temp = []

    for (var j = 0; j < values.length; j++) {
      temp.push(values[j].split(','))
    }

    for (var i = 1; i < numCols; i++) {
      var dataValues = []

      for (var k = 1; k < values.length; k++) {
        if (temp[k][0].trim().length > 0) {
          dataValues.push({
            label: temp[k][0],
            value: parseInt(temp[k][i])
          })
        }
      }

      sectorResults[cols[i]] = dataValues
    }
  }

  function displaySectorResults (label, sectorTitleID) {
    var chartData = []

    chartData.push({
      key: label,
      values: sectorResults[label]
    })

    var inputParams = {
      yAxisLabel: '',
      xAxisLabel: '',
      data: chartData,
      id: sectorID,
      title: label
    }

    var id = '#' + sectorTitleID

    $(id).text(label)
    addBarChart(inputParams)
  }

  function handleChartEvents (label, value) {
    if (sectorResults === undefined) {
      $.get(sectorURL, function (result) {
        processSectorResults(result)
        displaySectorResults(label, sectorTitleID)
      })
    } else {
      displaySectorResults(label, sectorTitleID)
    }
  }

  function processResults (result) {
    // var values = result.split('\r\n')
    var values = result.replace(/(\r\n|\n|\r)/gm,"~foo~").split('~foo~')

    var dataValues = []
    var xTickLabels = []

    var header = values[0].split(',')

    values.shift() // ignore the header
    var done = false
    var index = 0
    var maxY = 0
    values.map(function (item) {
      var items = item.split(',')
      var test = items[0].replace(/,/g, '')
      test = test.trim()

      if (test.length === 0) {
        done = true
      }

      if (!done) {
        var empNum = parseInt(items[1].replace(/,/g, '').replace(/"/g, ''))
        dataValues.push({
          label: index,
          value: empNum
        })
        xTickLabels.push(test)
        index++

        // Track the maximum y value
        if (empNum > maxY) {
          maxY = empNum
        }
      }
    })
    var chartData = []

    chartData.push({
      key: header[1],
      values: dataValues
    })

    var inputParams = {
      yAxisLabel: '',
      xAxisLabel: '',
      data: chartData,
      id: chartID,
      xTickLabels: xTickLabels,
      maxY: maxY,
      chartEvents: handleChartEvents
    }

    addLineChart(inputParams)
  }

  $.get(dataURL, function (result) {
    processResults(result)
  })
}

export function showChart (chartID, fileName, sectorID, sectorFile, sectorTitleID) {
  var dataURL = rootDataURL + '/' + fileName
  var sectorDataURL = rootDataURL + '/' + sectorFile
  addChart(chartID, dataURL, sectorID, sectorDataURL, sectorTitleID)
}
