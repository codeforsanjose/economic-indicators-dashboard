import nv from 'nvd3'
import d3 from 'd3'
import _ from 'lodash'
import numeral from 'numeral'

export const addLineChart = (inputOptions, config) => {
  nv.addGraph(function () {
    var chart = nv.models.lineChart()
      .x(function (d) {
        if (d) {
          return d.label
        }
      })
      .y(function (d) {
        if (d) {
          return d.value
        }
      })
      .margin({top: 30, right: 10, bottom: 60, left: 100})
      .useInteractiveGuideline(true)
      .showYAxis(true)
      .showXAxis(true)
      .showLegend(inputOptions.showLegend)

    chart.legend.margin({top: 20, right: 0, bottom: 15, left: 0})

    chart.xAxis
      .axisLabel(inputOptions.xAxisLabel)

    if (inputOptions.yMax < 100) {
      chart.yAxis
        .tickFormat(d3.format(',.1f'))
    } else {
      chart.yAxis
        .tickFormat(d3.format(',.0d'))
    }

    chart.yAxis
        .axisLabel(config['y-title'])
        .axisLabelDistance(config['y-title-offset'])

    if (config.hasOwnProperty('x-tick-interval')) {
      const numValues = inputOptions.data[0].values.length
      const tickInterval = config['x-tick-interval']
      let tickValues = []
      switch (tickInterval) {
        case 'months':
          const numYears = Math.ceil(numValues / 12)

          tickValues = _.times(numYears, (index) => {
            return index * 12
          })
          break
        case 'quarters':
          const intervalCount = Math.ceil(numValues / 4)

          tickValues = _.times(intervalCount, (index) => {
            return index * 4
          })
          break
      }
      chart.xAxis.tickValues(tickValues)
    }

    chart.xAxis
        .axisLabel(config['x-title'])
        .axisLabelDistance(config['x-title-offset'])
        .showMaxMin(false)

    var yMin = 0
    var yMax = 100000

    if (config.hasOwnProperty(['y-min'])) {
      yMin = config['y-min']
    }

    if (config.hasOwnProperty('y-max')) {
      yMax = config['y-max']
    } else if (inputOptions.hasOwnProperty('yMax')) {
      yMax = inputOptions.yMax
    }

    if (config.hasOwnProperty('y-axis-tick-format')) {
      const yAxisTickFormat = config['y-axis-tick-format']
      switch (yAxisTickFormat) {
        case 'currency':
          chart.yAxis.tickFormat(function (d, index) {
            if (d) {
              return numeral(d).format('$0,0')
            }
          })
          break
        case 'percent':
          chart.yAxis.tickFormat(function (d, index) {
            if (d) {
              return d + '%'
            }
          })
          break
      }
    }

    chart.forceY([yMin, yMax])
    chart.yAxis.scale().domain([yMin, yMax])

    chart.xAxis.tickFormat(function (d, index) {
      if (d) {
        return inputOptions.xTickLabels[d]
      }
    })

    chart.xAxis.rotateLabels(-45)

    chart.lines.dispatch.on('elementClick', function (e) {
      inputOptions.chartEvents(inputOptions.xTickLabels[e[0].point.label], e[0].point.value)
      chart.lines.clearHighlights()
      chart.lines.highlightPoint(inputOptions.xTickLabels[e[0].point.label], e[0].point.value, true)
    })

    chart.interactiveLayer.dispatch.on('elementMousemove', function (e) {
      inputOptions.chartEvents(inputOptions.xTickLabels[e[0].point.label], e[0].point.value)
      chart.lines.clearHighlights()
      chart.lines.highlightPoint(inputOptions.xTickLabels[e[0].point.label], e[0].point.value, true)
    })

    chart.interactiveLayer.dispatch.on('elementMouseout', function (e) {
      chart.lines.clearHighlights()
    })

    var id = '#' + inputOptions.id

    d3.select(id + ' svg')
      .datum(inputOptions.data)
      .call(chart)

    var titleOffset = document.getElementById(inputOptions.id).offsetWidth / 2

    d3.selectAll('.nv-axisMax-y').remove()

    d3.select(id + ' svg').select('svg > text').remove()
    d3.select(id + ' svg')
      .append('text')
      .attr('x', titleOffset)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text(config['title'])

    nv.utils.windowResize(chart.update)

    return chart
  })
}
