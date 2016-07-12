/*global nv, d3:true*/

export const addScatterChart = (inputOptions) => {
  nv.addGraph(function () {
    var chart = nv.models.scatterChart()
      .x(function (d) { return d.label })    // Specify the data accessors.
      .y(function (d) { return d.value })
      .color(d3.scale.category10().range())
      .showDistX(true)
      .showDistY(true)
      .interactive(true)

    chart.xAxis
      .axisLabel(inputOptions.xAxisLabel)

    chart.yAxis
      .tickFormat(d3.format(',.1f'))
      .axisLabel(inputOptions.yAxisLabel)

    chart.yDomain([0, inputOptions.maxY])

    d3.select('#' + inputOptions.id + ' svg')
      .datum(inputOptions.data)
      .call(chart)

    nv.utils.windowResize(chart.update)

    return chart
  })
}
