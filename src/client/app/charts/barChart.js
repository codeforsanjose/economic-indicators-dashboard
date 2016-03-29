/*global nv, d3:true*/

export function addBarChart (inputOptions) {
  nv.addGraph(function () {
    var chart = nv.models.multiBarChart()
      .margin({top: 30, right: 20, bottom: 50, left: 90})
      .reduceXTicks(true)   // If 'false', every single x-axis tick label will be rendered.
      .showControls(inputOptions.showControls)   // Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.3)    // Distance between each group of bars.
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
