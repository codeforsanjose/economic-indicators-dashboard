/*global nv, d3:true*/

export function addLineChart (inputOptions) {
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
      .margin({top: 30, right: 10, bottom: 30, left: 90})
      .useInteractiveGuideline(true)
      .showYAxis(true)
      .showXAxis(true)

    chart.xAxis
      .axisLabel(inputOptions.xAxisLabel)

    chart.yAxis
      .tickFormat(d3.format(',.1f'))
      .axisLabel(inputOptions.yAxisLabel)

    chart.forceY([0, inputOptions.maxY])
    chart.yAxis.scale().domain([0, inputOptions.maxY])

    chart.xAxis.tickFormat(function (d, index) {
      if (d) {
        return inputOptions.xTickLabels[d]
      }
    })

    chart.lines.dispatch.on('elementClick', function (e) {
      inputOptions.chartEvents(inputOptions.xTickLabels[e[0].point.label], e[0].point.value)
    })

    d3.select('#' + inputOptions.id + ' svg')
      .datum(inputOptions.data)
      .call(chart)

    nv.utils.windowResize(chart.update)

    return chart
  })
}
