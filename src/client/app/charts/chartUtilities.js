/*global $:true*/

import {addLineChart} from './lineChart'
import {addBarChart} from './barChart'
// import {addScatterChart} from './scatterChart'

import {rootDataURL} from '../config/dataURLs'

function addChart (chartID, dataURL) {
  function processSectorResults (result, year) {
    var dataValues = []

    var values = result.split('\n')
    values.shift() // ignore the header

    values.map(function (item) {
      var items = item.split(',')
      var test = items[0].replace(/,/g, '')
      test = test.trim()

      if (test.length > 0) {
        var jobNum = parseInt(items[1].replace(/,/g, ''))
        dataValues.push({
          label: test,
          value: jobNum
        })
      }
    })

    var chartData = []

    chartData.push({
      key: 'Jobs By Sector - ' + year,
      values: dataValues
    })

    var inputParams = {
      yAxisLabel: '',
      xAxisLabel: '',
      data: chartData,
      id: 'sector-chart'
    }

    // Add title

    var title = 'Jobs by Sector - ' + year
    document.getElementById('sector-title').innerHTML = title
    addBarChart(inputParams)
  }

  function handleChartEvents (label, value) {
    console.log('(' + label + ') , (' + value + ')')
    var sectorDataURL

    var labelArray = label.split('-')
    var year = '20' + labelArray[1]
    var url = sectorDataURL + year + '.csv'
    console.log(url)
    $.get(url, function (result) {
      processSectorResults(result, year)
    })
  }

  function processResults (result) {
    var values = result.split('\r\n')
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

export function showChart (chartID, fileName) {
  var dataURL = rootDataURL + '/' + fileName
  addChart(chartID, dataURL)
}
