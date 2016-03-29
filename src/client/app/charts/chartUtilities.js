/*global $:true*/

// import {addLineChart} from './lineChart'
import {addBarChart} from './barChart'
// import {addScatterChart} from './scatterChart'

import {unemployment_data_url} from '../config/dataURLs'

function addJobsChart (chartID) {
  function processResults (result) {
    var values = result.split('\n')
    var dataValues = []

    values.shift() // ignore the header
    var done = false
    values.map(function (item) {
      var items = item.split('"')
      var test = items[0].replace(/\,/g, '')
      test = test.trim()

      if (test.length === 0) {
        done = true
      }

      if (!done) {
        var empNum = parseInt(items[1].replace(/\,/g, ''))
        dataValues.push({
          label: items[0],
          value: empNum
        })
      }
    })
    var chartData = []
    console.log('=============')
    console.log(dataValues)
    console.log('=============')

    chartData.push({
      key: 'Number of Jobs',
      values: dataValues
    })

    var inputParams = {
      yAxisLabel: '',
      xAxisLabel: '',
      data: chartData,
      id: chartID
    }

    addBarChart(inputParams)
  }

  $.get(unemployment_data_url, function (result) {
    processResults(result)
  })
}

export function showChart (chartID) {
  switch (chartID) {
    case 'unemp-chart':
      break
    case 'jobs-chart':
      addJobsChart(chartID)
      break
  }
}
