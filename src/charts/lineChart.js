/*global nv, d3:true*/

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

    chart.xAxis
        .axisLabel(config['x-title'])
        .axisLabelDistance(config['x-title-offset'])

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

    var id = '#' + inputOptions.id

    d3.select(id + ' svg')
      .datum(inputOptions.data)
      .call(chart)

    var titleOffset = document.getElementById(inputOptions.id).offsetWidth / 2

    d3.selectAll('.nv-axisMax-y').remove()

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
