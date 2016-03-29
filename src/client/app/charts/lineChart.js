/*global nv, d3:true*/

export function addLineChart (inputOptions) {
  nv.addGraph(function () {
    var chart = nv.models.lineChart()
      .margin({top: 30, right: 10, bottom: 30, left: 90})
      .x(function (d) {
        return d.label
      })    // Specify the data accessors.
      .y(function (d) {
        return d.value
      })

    chart.xAxis
      .axisLabel(inputOptions.xAxisLabel)

    chart.yAxis
      .tickFormat(d3.format(',.1f'))
      .axisLabel(inputOptions.yAxisLabel)

    d3.select('#' + inputOptions.id + ' svg')
      .datum(inputOptions.data)
      .call(chart)

    nv.utils.windowResize(chart.update)

    return chart
  })
}
