/*global nv, d3:true*/

export function addBarChart (inputOptions) {
  nv.addGraph(function () {
    var chart = nv.models.discreteBarChart()
      .margin({top: 50, right: 20, bottom: 150, left: 120})
      .x(function (d) { return d.label })    // Specify the data accessors.
      .y(function (d) { return d.value })

    chart.xAxis
      .axisLabel(inputOptions.xAxisLabel)

    chart.yAxis
      .tickFormat(d3.format(',.1f'))
      .axisLabel(inputOptions.yAxisLabel)

    chart.rotateLabels(-45)

    d3.select('#' + inputOptions.id + ' svg')
      .datum(inputOptions.data)
      .call(chart)

    nv.utils.windowResize(chart.update)

    return chart
  })
}
