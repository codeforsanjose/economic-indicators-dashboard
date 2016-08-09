import {addLineChart} from './lineChart'
import {addBarChart} from './barChart'
import _ from 'lodash'
// import {addScatterChart} from './scatterChart'

const displaySectorResults = (label,
  sectorID,
  configData,
  sectorData,
  key) => {
  if (_.isNil(sectorData)) {
    return
  }
  let sectorChartData = []

  sectorChartData.push({
    key: label,
    values: sectorData[key]
  })

  let inputParams = {
    data: sectorChartData,
    id: sectorID,
    title: label
  }

  let newTitle = `${configData.title} - ${label}`

  addBarChart(inputParams, configData, newTitle)
}

export const showChart = (chartID,
                  dataURL,
                  sectorID,
                  sectorURL,
                  sectorTitleID,
                  chartsConfig,
                  chartDataParam,
                  sectorData) => {
  const chartData = chartDataParam.chartData
  const xTickLabels = chartDataParam.xTickLabels
  const yMax = chartDataParam.yMax
  var inputParams = []

  const chartEventHandler = (label, value) => {
    const key = label.replace(/ /g, '-')
    displaySectorResults(label,
      sectorID,
      chartsConfig['detail2'],
      sectorData.data,
      key)
  }

  switch (chartsConfig['detail1'].plotstyle) {
    case 'line':
      var showLegend = (chartData.length > 1)
      inputParams = {
        data: chartData,
        id: chartID,
        xTickLabels: xTickLabels,
        chartEvents: chartEventHandler,
        yMax: yMax,
        showLegend: showLegend
      }
      addLineChart(inputParams, chartsConfig['detail1'])
      if (!_.isNil(sectorURL)) {
        const label = xTickLabels[xTickLabels.length - 1]
        const key = label.replace(/ /g, '-')

        displaySectorResults(label,
          sectorID,
          chartsConfig['detail2'],
          sectorData.data,
          key)
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
